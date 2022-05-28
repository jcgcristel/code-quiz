// variables //
var quizEl = document.querySelector(".quiz-window");

var questionItr = 0;

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
        console.log("Quiz end");
        return;
    }

    // print question
    console.log(questions[questionItr].question);

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
        console.log(`${questionChoice[i].choice} ${questionChoice[i].answer}`);
        
        // create choice element
        var choiceEl = document.createElement("li");
        choiceEl.textContent = questionChoice[i].choice;
        choiceEl.className = "quiz-choice"
        choicesEl.appendChild(choiceEl);
    }

    quizEl.appendChild(choicesEl);
}

// answering question
var clickChoice = function (event) {
    // target element from event
    targetEl = event.target;

    // when selecting a choice
    if (targetEl.matches("li.quiz-choice")) {
        console.log(`Clicked Choice ${targetEl.textContent}`);
        questionItr++;
    }

    showQuestion();
}

// counter tick //

// game start: cycle through quiz //
var quizStart = function() {
    
}


showQuestion();
// when selecting a choice
quizEl.addEventListener("click", clickChoice);