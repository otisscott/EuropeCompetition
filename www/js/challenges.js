var allChallenges;
var userChallenges;
function getChallenges() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        success: function(data){
            allChallenges = data;
            console.log(allChallenges[0].task);
            getUserChallenges();
        },
        error: function(){
            alert("failed");
        },
        url: 'https://europecompetitionbackend.herokuapp.com/api/challenges/'
    });
}
function getUserChallenges() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        success: function(data){
            userChallenges = data;
            populate();
        },
        error: function(){
            alert("failed");
        },
        url: 'https://europecompetitionbackend.herokuapp.com/api/Otis' + name,
    });
}
function populate() {
    for(var i = 0; i < allChallenges.length; i++) {
        var multiple;
        if(allChallenges[i].repeat === 1) {
            multiple = "Yes"
        } else {
            multiple = "No"
        }
        $('tbody')
            .append('<tr>\n' +
                '            <td>' + allChallenges[i].task + '</td>\n' +
                '            <td>' + allChallenges[i].points + '</td>\n' +
                '            <td>' + multiple + '</td>\n' +
                '        </tr>')
    }
}