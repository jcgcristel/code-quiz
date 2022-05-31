// variables
var clearScoreEl = document.querySelector("#clear-score")

var loadScores = function() {
    // variables
    var initialEl = document.querySelector("#initial");
    var scoreEl = document.querySelector("#score")

    initialEl.innerHTML = "";
    scoreEl.innerHTML = "";

    var savedScore = localStorage.getItem("scores");

    var scoreList = JSON.parse(savedScore);

    // handler for empty scoreboard
    if (scoreList == null) {
        // calling scoreboard class element
        var scoreboardEl = document.querySelector(".scoreboard");
        
        // create p element to hold empty score message
        var pEl = document.createElement("p");
        pEl.id = "empty";
        pEl.textContent = "No score currently logged."    

        // display message to html
        scoreboardEl.appendChild(pEl);
        return;
    }

    // proceed with function when scores are found in local storage

    // order list from greates score to lowest
    scoreList = scoreList.sort(function(a, b) {
        return b.score - a.score;
    });



    // loop through scores array grabbed from local storage
    for (var i = 0; i < scoreList.length; i++) {
        // list item element
        var initialItemEl = document.createElement("li");
        var scoreItemEl = document.createElement("li");

        // grab initials and append to initial list
        initialItemEl.textContent = scoreList[i].initials;
        initialEl.appendChild(initialItemEl);
        
        // grab score and append to score list
        scoreItemEl.textContent = scoreList[i].score;
        scoreEl.appendChild(scoreItemEl);
    }
}

var clearScore = function() {
    // checks if board is already empty
    if (document.querySelector("#empty") == null) {
        localStorage.removeItem("scores");
        loadScores();
    }
}

loadScores();

// listeners
clearScoreEl.addEventListener("click", clearScore);
