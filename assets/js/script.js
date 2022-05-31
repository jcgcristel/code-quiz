// variables //
var timerEl = document.querySelector("#cd")
var quizEl = document.querySelector(".quiz-window");
var resultEl = document.querySelector(".result");

var questionItr = 0;
const timerStart = 30;
var timer = timerStart;
var scores = [];

// Quiz from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS

// question object to hold question and multiple choice
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript",
        choices: [
            {choice: "<scripting>", answer: false},
            {choice: "<javascript>", answer: false},
            {choice: "<js>", answer: false},
            {choice: "<script>", answer: true}]
    },
    {
        question: 'How do you write "Hello World in an alert box?',
        choices: [
            {choice: 'msgBox("Hello World");', answer: false},
            {choice: 'alertBox("Hello World");', answer: false},
            {choice: 'alert("Hello World");', answer: true},
            {choice: 'msg("Hello World");', answer: false}]
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choices: [
            {choice: "The <head> section", answer: false},
            {choice: "The <body> section", answer: false},
            {choice: "Both the <head> section and the <body> section are correct", answer: true}]
    },
    {
        question: 'What si the correct syntax for referring to an external script called "xxx.js"?',
        choices: [
            {choice: '<script href="xxx.js"', answer: false},
            {choice: '<script src="xxx.js"', answer: true},
            {choice: '<script name="xxx.js">', answer: false}]
    },
    {
        question: 'The external JavaScript file must contain the <script> tag.',
        choices: [
            {choice: 'True', answer: false},
            {choice: 'False', answer: true}]
    },
    {
        question: 'How do you create a function in JavaScript?',
        choices: [
            {choice: 'function = myFunction()', answer: false},
            {choice: 'function:myFunction()', answer: false},
            {choice: 'function myFunction()', answer: true}]
    },
    {
        question: 'How do you call a function named "myFunction"?',
        choices: [
            {choice: 'myFunction()', answer: true},
            {choice: 'call myFunction()', answer: false},
            {choice: 'call function myFunction()', answer: false}]
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        choices: [
            {choice: 'if i = 5 then', answer: false},
            {choice: 'if i = 5', answer: false},
            {choice: 'if i == 5 then', answer: false},
            {choice: 'if (i == 5)', answer: true}]
    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        choices: [
            {choice: 'if i != 5 then', answer: false},
            {choice: 'if (i != 5)', answer: true},
            {choice: 'if (i <> 5)', answer: false},
            {choice: 'ig i <> 5', answer: false}]
    },
    {
        question: 'How does a WHILE loop start?',
        choices: [
            {choice: 'while (i <= 10; i++)', answer: false},
            {choice: 'while (i <= 10)', answer: true},
            {choice: 'while i = 1 to 10', answer: false}]
    }
]

// display quiz question //
var showQuestion = function() {
    // clear HTMl
    quizEl.innerHTML = "";

    // create question element
    var questionEl = document.createElement("h2");
    questionEl.textContent = questions[questionItr].question;
    quizEl.appendChild(questionEl);

    // print question choices
    showQuestionChoices(questions[questionItr]);
}

// display quiz question choices
var showQuestionChoices = function(question) {
    var questionChoice = question.choices;

    // create list element for choices
    var choicesEl = document.createElement("ol");

    for (var i = 0; i < questionChoice.length; i++) {  
        // create choice element
        var choiceEl = document.createElement("li");
        choiceEl.textContent = questionChoice[i].choice;
        choiceEl.className = "quiz-choice"

        // create id to classify as the answer
        if (questionChoice[i].answer === true) {
            choiceEl.setAttribute("answer", true);
        }

        choicesEl.appendChild(choiceEl);
    }
    
    quizEl.appendChild(choicesEl);
}

// print result
var result = function(result) {
    // clear results
    resultEl.innerHTML = "";
    
    // element to hold result
    var showResultEl = document.createElement("p");
    showResultEl .textContent = result;

    resultEl.appendChild(showResultEl);
}

// answering question
var clickChoice = function (event) {
    console.log("Clicking choice");

    // target element from event
    targetEl = event.target;

    // when selecting a choice
    if (targetEl.matches("li.quiz-choice")) {
        questionItr++;

        // get answer state
        isCorrect = targetEl.getAttribute("answer");

        // clear result html
        resultEl.innerHTML = "";
        
        // correct answer
        if (isCorrect){
            result("Correct");
        } 
        // incorrect answer
        else {
            result("Incorrect");
            updateTimer(-3)
        }

        // checks if there are anymore questions
        if (questionItr >= questions.length){
            // set game to end state
            timerEl.setAttribute("end", true);
            return;
        }
        else {
            showQuestion();
        }
    }
}

// Updates timer where argument passed is added to timer and updates number that is displayed
var updateTimer = function(seconds) {
    timer += seconds;
    timerEl.textContent = timer;
}

// counter tick //
var countdown = function() {
    var interval = setInterval(function() {
        var end = timerEl.getAttribute("end");

        // stop counting when timer hits zero or when quiz is finished
        if (timer <= 0 || end !== null) {
            clearInterval(interval);
            console.log("here");
            quizEnd();
            return;
        }

        timer--;

        updateTimer(-1);       
    }, 1000);
}

var quizStart = function() {
    showQuestion();
    countdown();
}

// game start: cycle through quiz //
var init = function() {
    // create quiz title
    var playQuizEl = document.createElement("h2");
    playQuizEl.textContent = "Test your Knowledge";

    // create start button
    var startButton = document.createElement("button");
    startButton.textContent = "Start Quiz";
    updateTimer(0);

    // display created elements
    quizEl.appendChild(playQuizEl)
    quizEl.appendChild(startButton);

    startButton.addEventListener("click", quizStart);
}

// reset variables
var reset = function() {
    // reset variables
    timer = timerStart;
    updateTimer(0);

    timerEl.removeAttribute("end");
    questionItr = 0;

    // clears quiz-window
    quizEl.replaceChildren("");
    resultEl.innerHTML = "";
    
    console.log("Reseting");
    init();
}

// play again screen
var playAgain = function() {
    quizEl.innerHTML = "";
    resultEl.innerHTML = "";

    // create text element to return to home screen
    var playAgainEl = document.createElement("h2");
    playAgainEl.textContent = "Return to Home Screen";

    var backBtnEl = document.createElement("button");
    backBtnEl.textContent = "Back";

    quizEl.appendChild(playAgainEl);
    quizEl.appendChild(backBtnEl);

    backBtnEl.addEventListener("click", reset);
}

// checks if initials text box is empty
var scoreSubmitHandler = function() {
    var initials = document.querySelector("#initials").value;
    console.log(initials);

    if (initials === null || initials === "") {
        result("Please input your initials before submitting.");
        alert("Please input your initials before submitting.");
        return;
    }
    
    var score = {
        initials: initials,
        score: timer
    }

    console.log(score);

    // submits score
    scoreSubmission(score);
}

// store score into localStorage
var scoreSubmission = function(score) {   
    var savedScores = localStorage.getItem("scores");

    // check if there are locally stored scores
    if (savedScores === null) {
        // convert score object into an array
        scores.push(score);
        // create a new key to store scores
        localStorage.setItem("scores", JSON.stringify(scores))
        playAgain();
        return;
    }
   
    // parse scores from localStorage
    savedScores = JSON.parse(savedScores);

    // add new score
    savedScores.push(score);

    // new score added to localStorage
    localStorage.setItem("scores", JSON.stringify(savedScores));

    playAgain();
}

// end game screen
var quizEnd = function() {
    // clear html
    quizEl.innerHTML = "";
   
    // create ending text element
    var endEl = document.createElement("h2");
    endEl.textContent = "Quiz end";
    
    // create score element
    var scoreEl = document.createElement("div")
    scoreEl.textContent = `You scored: ${timer}`;

    // create score submission elements
    // input
    var scoreSubmitInputEl = document.createElement("input");
    scoreSubmitInputEl.placeholder = "Enter initials";
    scoreSubmitInputEl.id = "initials";
    // submit
    var scoreSubmitBtnEl = document.createElement("button");
    scoreSubmitBtnEl.textContent = "Submit"
    
    // display created elements
    quizEl.appendChild(endEl);
    quizEl.appendChild(scoreEl);
    quizEl.appendChild(scoreSubmitInputEl);
    quizEl.appendChild(scoreSubmitBtnEl);
    
    scoreSubmitBtnEl.addEventListener("click", scoreSubmitHandler);
}

init();

// when selecting a choice
quizEl.addEventListener("click", clickChoice);