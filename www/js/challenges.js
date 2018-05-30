var allChallenges;
var userChallenges;
function getChallenges() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        success: function(data){
            allChallenges = data;
            console.log(allChallenges)
        },
        error: function(){
            alert("failed");
        },
        url: 'https://europecompetitionbackend.herokuapp.com/api/challenges/'
    });
    for(var i = 0; i < allChallenges.length; i++) {
        var multiple;
        if(allChallenges[i].multiple == 1) {
            multiple = "Yes"
        } else {
            multiple = "No"
        }
        $('body')
            .append('<tr>\n' +
                '            <td>' + allChallenges[i].task + '</td>\n' +
                '            <td>' + allChallenges[i].points + '</td>\n' +
                '            <td>' + multiple + '</td>\n' +
                '        </tr>')
    }
}
function getUserChallenges() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        success: function(data){
            allChallenges = data;
            console.log(allChallenges)
        },
        error: function(){
            alert("failed");
        },
        url: 'https://europecompetitionbackend.herokuapp.com/api/' + name,
    });
}