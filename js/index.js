/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var name;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function login() {
    name = document.getElementById('logininput').value.toLowerCase();
    console.log(document.getElementById('logininput').value);
    $.ajax({
        type: 'GET',
        dataType: 'json',
        success: function(data){
            console.log("success");
            window.location = "../EuropeCompetition/challenges.html"
        },
        error: function(){
            alert("failed");
        },
        url: 'https://europecompetitionbackend.herokuapp.com/api/users/' + name
    });
}

var allChallenges;
var completedChallenges;

function getChallenges() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        success: function(data){
            allChallenges = data;
            getCompletedChallenges(1);
        },
        error: function(){
            alert("failed");
        },
        url: 'https://europecompetitionbackend.herokuapp.com/api/challenges/'
    });
}

function getCompletedChallenges(check) {
    if(check == 1) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            success: function(data){
                completedChallenges = data;
                if(check == 1) {
                    populate();
                } else {
                    addPoints()
                }
            },
            error: function(){
                alert("failed");
            },
            url: 'https://europecompetitionbackend.herokuapp.com/api/' + name
        });
    } else {
        name = document.getElementById('logininput').value.toLowerCase();
        $.ajax({
            type: 'GET',
            dataType: 'json',
            success: function(data){
                completedChallenges = data;
                if(check == 1) {
                    populate();
                } else {
                    addPoints()
                }
            },
            error: function(){
                alert("failed");
            },
            url: 'https://europecompetitionbackend.herokuapp.com/api/' + name
        });
    }
}

function populate() {
    for(var i = 0; i < allChallenges.length; i++) {
        var multiple;
        if(allChallenges[i].repeat === 1) {
            $('tbody')
                .append('<tr id="\' + i + \'">\n' +
                    '            <td>' + allChallenges[i].task + '</td>\n' +
                    '            <td>' + allChallenges[i].points + '</td>\n' +
                    '            <td><a class="waves-effect waves-light btn" onclick="completeChallenge(' + i + ')">Complete?</a></td>\n' +
                    '        </tr>');
            multiple = "Yes"
        } else {
            var isDone = false;
            for(var j = 0; j < completedChallenges.length; j++) {
                if (completedChallenges[j].task === allChallenges[i].task) {
                    isDone = true;
                }
            }
            if(isDone === false) {
                $('tbody')
                    .append('<tr id="' + i + '">\n' +
                        '            <td>' + allChallenges[i].task + '</td>\n' +
                        '            <td>' + allChallenges[i].points + '</td>\n' +
                        '            <td><a class="waves-effect waves-light btn" onclick="completeChallenge(' + i + ')">Complete?</a></td>\n' +
                        '        </tr>');
            }
            multiple = "No"
        }
    }
}

function completeChallenge(challengeNumber) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "task": allChallenges[challengeNumber].task,
            "points": allChallenges[challengeNumber].points
        }),
        dataType: 'json',
        success: function(data){
            singleChecker(challengeNumber);
        },
        error: function(){
            alert("failed");
        },
        url: 'https://europecompetitionbackend.herokuapp.com/api/' + name
    });
}

function singleChecker(challengeNumber) {
    if(allChallenges[challengeNumber].repeat == 0) {
        $('#' + challengeNumber.toString()).remove();
    }
}

function addPoints() {
    var myPoints = 0;
    for(var i = 0; i < completedChallenges.length; i++) {
        myPoints += completedChallenges[i].points;
    }
    $('#points').append("You have "+ myPoints +" points")
}
