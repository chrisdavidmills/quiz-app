function questionApp() {
  var score = 0;
  var currentQuestion = 1;
  var questionCount = Questions.question.length;
  var wrapper = document.getElementById("wrapper");
  
  var start = document.getElementById("start");
  start.setAttribute("disabled","disabled");
  
  function checkAnswer(question,userAnswer,button) {
    var answerSplit = userAnswer.split("");
    var answerNumber = answerSplit[answerSplit.length-1];
    var correctAnswer = question.correct;
    if(answerNumber == correctAnswer) {
      score++;
    } 
    
    button.setAttribute("disabled","disabled");
            
    if(currentQuestion === questionCount) {
      finalScore();
    } else {
      var qDiv = wrapper.lastChild;
      qDiv.className = "disappear";
      currentQuestion++;
      generateQuestion();
    }
  }
  
  function finalScore() {
    var finalScore = document.createElement("div");
    var finalScoreText = document.createElement("h1");
    wrapper.appendChild(finalScore);
    finalScore.appendChild(finalScoreText);
    finalScore.setAttribute("id","score");
    finalScore.className = "appear";
    finalScoreText.innerHTML = "Your final score is " + score + " out of " + questionCount;
    
    var resetButton = document.createElement("button");
    finalScore.appendChild(resetButton);
    var resetLabel = document.createTextNode("Try again");
    resetButton.appendChild(resetLabel);
    resetButton.setAttribute("id","reset")
    resetButton.addEventListener('click', function(){reset();}, false);
  }
  
  function reset() {
    while(wrapper.lastChild && wrapper.lastChild.tagName === "DIV") {
      wrapper.removeChild(wrapper.lastChild);
    }
    questionApp();
  }
  
  function generateQuestion() {
    var selectedQuestion = Questions.question[currentQuestion-1];
    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("id", "question"+currentQuestion);
    var questionTitle = document.createElement("h2");
    var questionSelect = document.createElement("select");
    
    
    
    wrapper.appendChild(questionDiv);
    questionDiv.appendChild(questionTitle);
    questionTitle.innerHTML = "Question " + currentQuestion + ": " + selectedQuestion.question;
    questionDiv.appendChild(questionSelect);
    
    for(j=1;j<=5;j++) {
      var choice = "selectedQuestion.choice" + j;
      var choiceOption = document.createElement("option");
      choiceOption.setAttribute("value", "choice"+j);
      choiceOption.innerHTML = eval(choice);
      questionSelect.appendChild(choiceOption);
    }
    var initialChoice = document.createElement("option");
    initialChoice.innerHTML = "&lt;&lt; Click to choose &gt;&gt;";
    initialChoice.setAttribute("selected","selected");
    questionSelect.appendChild(initialChoice);
    
    var button = document.createElement("button");
    questionDiv.appendChild(button);
    var label = document.createTextNode("Input answer!");
    button.appendChild(label);
    button.setAttribute("id", "button"+currentQuestion);
    
    questionDiv.className = "appear";
        
    var currentButton = document.getElementById("button"+currentQuestion);
    
    currentButton.addEventListener('click', function(){checkAnswer(selectedQuestion,questionSelect.value,currentButton);}, false);
  }
  
  generateQuestion();
  
  
}