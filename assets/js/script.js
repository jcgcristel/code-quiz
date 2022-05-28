// variables //
var quizEl = document.querySelector(".quiz-window");
var resultEl = document.querySelector(".result");

var questionItr = 0;
var timer = 30;

// question object to hold question and multiple choice
var questions = [
    {
        question: "Question 1",
        choices: [
            {choice: "A", answer: true},
            {choice: "B", answer: false},
            {choice: "C", answer: false},
            {choice: "D", answer: false}]
    },
    {
        question: "Question 2",
        choices: [
            {choice: "E", answer: false},
            {choice: "F", answer: true},
            {choice: "G", answer: false},
            {choice: "H", answer: false}]
        },
]

// display quiz question //
var showQuestion = function() {
    // clear HTMl
    quizEl.innerHTML = "";
    
    if (questionItr >= questions.length){
        quizEnd();
        return;
    }

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
    // element to hold result
    var showResultEl = document.createElement("h3");
    showResultEl .textContent = result;

    resultEl.appendChild(showResultEl);
}

// answering question
var clickChoice = function (event) {
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
            result("Correct!");
        } 
        // incorrect answer
        else {
            result("Incorrect!");
        }

        showQuestion();
    }
}

// counter tick //

var quizEnd = function() {
    // clear html
    quizEl.innerHTML = "";
    
    // create ending text element
    var endEl = document.createElement("h2");
    endEl.textContent = "Quiz end.";
    
    quizEl.appendChild(endEl);
}

// game start: cycle through quiz //
var start = function() {
    var startButton = document.createElement("button");
    startButton.textContent = "Start Quiz";
    startButton.id = "start";

    quizEl.appendChild(startButton);
}

start();

// when selecting a choice
quizEl.addEventListener("click", showQuestion);
quizEl.addEventListener("click", clickChoice);