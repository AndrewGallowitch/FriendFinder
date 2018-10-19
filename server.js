
var express = require('express');
var path = require('path');


var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var result;
var friends = [{
    "name": "Nicole Shultz",
    "photo": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nicole2web-1504002601.jpg?crop=1xw:1xh;center,top&resize=480:*",
    "scores": [
        "2",
        "2",
        "3",
        "3",
        "2",
        "3",
        "4",
        "4",
        "3",
        "3"
    ]
},
{
    "name": "Parker Manning",
    "photo": "https://www.research.psu.edu/sites/default/files/styles/staff_directory_pages/public/Parker%20Cleveland.jpg?itok=9IeE9TFL",
    "scores": [
        "3",
        "2",
        "3",
        "3",
        "3",
        "3",
        "5",
        "5",
        "5",
        "3"
    ]
}
]

function totalDifference(updateFriend) {
    var newScore
    var index;
    var total = 50
    for (var i = 0; i < friends.length; i++) {
        newScore = 0
        for (var x = 0; x < friends[i].scores.length; x++) {
            newScore += Math.abs(parseInt(friends[i].scores[x]) - parseInt(updateFriend.scores[x]))
        }
        if (total > newScore) {
            total = newScore;
            index = i;
        }
    }

    return friends[index];
};



app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/api/modal", function (req, res) {
    return res.json(result);
})

app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

app.post("/api/friends", function (req, res) {

    var newFriends = req.body;
    result = totalDifference(newFriends)

    console.log(newFriends);

    friends.push(newFriends);
    res.json(newFriends);

});


app.listen(PORT, function () {
    console.log("Server is listening on PORT: " + PORT);
});