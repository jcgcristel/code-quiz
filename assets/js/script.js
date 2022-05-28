// variables //

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
            {choice: "A", answer: false},
            {choice: "B", answer: true},
            {choice: "C", answer: false},
            {choice: "D", answer: false}]
        },
]

// display quiz question //
var showQuestion = function() {
    for (var i = 0; i < questions.length; i++) {
        // print question
        console.log(questions[i].question);
    
        // print question choices
        showQuestionChoices(questions[i]);
    }    
}

// display quiz question choices
var showQuestionChoices = function(question) {
    var questionChoice = question.choices;

    for (var i = 0; i < questionChoice.length; i++) {
        console.log(`${questionChoice[i].choice} ${questionChoice[i].answer}`);
    }
}


// counter tick //



// game start: cycle through quiz //
showQuestion();