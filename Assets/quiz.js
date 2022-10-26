var containerQuestionEl = document.getElementById("questioncontainer");
var containerStartEl = document.getElementById("startercontainer");
var containerEndEl = document.getElementById("endcontainer")
var containerScoreEl = document.getElementById("scorebanner")
var formInitials = document.getElementById("initialsform")
var containerHighScoresEl = document.getElementById("highscorecontainer")
var ViewHighScoreEl = document.getElementById("viewhighscores")
var listHighScoreEl = document.getElementById("highscorelist")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")
//buttons
var btnStartEl = document.querySelector("#startgame");
var btnGoBackEl = document.querySelector("#goback")
var btnClearScoresEl = document.querySelector("#clearhighscores")
//questions/answers element
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answerbuttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

//The High Score Array
var HighScores = [];

 //assign array details for questions 
var arrayShuffledQuestions
var QuestionIndex = 0



// The array of questions for the java quiz game.
var questions = [
 
  { q: 'Inside which HTML element do we put the javascript?', 
    a: '3. <script>', 
    choices: [{choice: '1. <h1>'}, {choice: '2. <js>'}, {choice: '3. <script>'}, {choice: '4. <head>'}]
  }, 
  { q: 'Arrays in Javascript can be used to store __________.', 
    a: '4. all of the above', 
    choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
  },
  { q: 'In the code -- setinterval(time(),1000) -- what is time()?', 
    a: '1. callback function', 
    choices: [{choice: '1. callback function'}, {choice: '2. undefined'}, {choice: '3. variable'}, {choice: '4. all of the above'}]
  },
  { q: 'What syntax would call a function?', 
    a: '4. function()', 
    choices: [{choice: '1. var function'}, {choice: '2. function'}, {choice: '3. call function'}, {choice: '4. function()'}]
  },
  { q: 'When did javascript first appear?', 
    a: '1. 1995', 
    choices: [{choice: '1. 1995'}, {choice: '2. 1965'}, {choice: '3. 2005'}, {choice: '4. 2000'}]
  },
  { q: 'What does DOM stand for?', 
    a: '2. Document Object Model', 
    choices: [{choice: '1. Do Overnight Modeling'}, {choice: '2. Document Object Model'}, {choice: '3. Disco Obviously Merrymaking'}, {choice: '4. Dont Overcook Macaroni'}]
  },
  { q: 'What is getItem commonly used for?', 
    a: '2. local storage', 
    choices: [{choice: '1. adding drama'}, {choice: '2. local storage'}, {choice: '3. online shopping'}, {choice: '4. naming a variable'}]
  },
  {q: 'Is JavaScript a case-sensitive language?',
   a: '1. Yes',
   choices: [{choice: '1. Yes'}, {choice: '2. No'}]
  },
  {q: 'Can you assign an anonymous function to a variable and pass it as an argument to another function?',
   a: '2. Yes',
   choices: [{choice: '1. No'}, {choice: '2. Yes'}]
  },
  {q: 'How long did it take to develop JavaScript',
   a: '3. 10 Days',
   choices: [{choice: '1. 10 Years'}, {choice: '2. 10 Weeks'}, {choice: '3. 10 Days'},{choice: '4. 10 Minutes'  }]
  },
  {q: 'What was JavaScript original name?',
   a: '4. Mocha',
   choices: [{choice: '1. JavaPaper'}, {choice: '2. CoffeeScript'}, {choice: '3. MochaScript'}, {choice: '4. Mocha'}]
  }
];

var renderStartPage = function () {
  containerHighScoresEl.classList.add("hide")
  containerHighScoresEl.classList.remove("show")
  containerStartEl.classList.remove("hide")
  containerStartEl.classList.add("show")
  containerScoreEl.removeChild(containerScoreEl.lastChild)
  QuestionIndex = 0
  gameover = ""
  timerEl.textContent = 0 
  score = 0

  if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide")
  }
  if (wrongEl.className = "show") {
      wrongEl.classList.remove("show");
      wrongEl.classList.add("hide");
  }
}

//Start time at 45. Every second, check if game-over is true, or if there is time left. 
var setTime = function () {
  timeleft = 45;

var timercheck = setInterval(function() {
  timerEl.innerText = timeleft;
  timeleft--

  if (gameover) {
      clearInterval(timercheck)
  }
 
  if (timeleft < 0) {
      showScore()
      timerEl.innerText = 0
      clearInterval(timercheck)
  }

  }, 1000)
}

var startGame = function() {
  //show/hide start and quiz screen
  containerStartEl.classList.add('hide');
  containerStartEl.classList.remove('show');
  containerQuestionEl.classList.remove('hide');
  containerQuestionEl.classList.add('show');
  //Shuffle the questions in random order
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}

//setting the next question for quiz
var setQuestion = function() {
  resetAnswers()
  displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

//remove answer buttons
var resetAnswers = function() {
  while (answerbuttonsEl.firstChild) {
      answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
  };
};

//display question information (including answer buttons)
var displayQuestion = function(index) {
  questionEl.innerText = index.q
  for (var i = 0; i < index.choices.length; i++) {
      var answerbutton = document.createElement('button')
      answerbutton.innerText = index.choices[i].choice
      answerbutton.classList.add('btn')
      answerbutton.classList.add('answerbtn')
      answerbutton.addEventListener("click", answerCheck)
      answerbuttonsEl.appendChild(answerbutton)
      }
  };
//display correct on screen
var answerCorrect = function() {
  if (correctEl.className = "hide") {
      correctEl.classList.remove("hide")
      correctEl.classList.add("banner")
      wrongEl.classList.remove("banner")
      wrongEl.classList.add("hide")
      }
  }  
//display wrong on screen
var answerWrong = function() {
  if (wrongEl.className = "hide") {
      wrongEl.classList.remove("hide")
      wrongEl.classList.add("banner")
      correctEl.classList.remove("banner")
      correctEl.classList.add("hide")
  }
}

//check if answer is correct    
var answerCheck = function(event) {
  var selectedanswer = event.target
      if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
          answerCorrect()
          score = score + 10
      }

      else {
        answerWrong()
        score = score - 5;
        timeleft = timeleft - 2;
    };

  //go to next question and check if there is more questions
    QuestionIndex++
      if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
          setQuestion()
      }   
      else {
         gameover = "true";
         showScore();
          }
}

  //Display score screen at end of game
var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Your final score is " + score + "!");
  containerScoreEl.appendChild(scoreDisplay);
}       

//create high score values
var createHighScore = function(event) { 
  event.preventDefault() 
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

formInitials.reset();

var HighScore = {
initials: initials,
score: score
} 

//push and sort scores
HighScores.push(HighScore);
HighScores.sort((a, b) => {return b.score-a.score});

//clear visibile list to resort
while (listHighScoreEl.firstChild) {
 listHighScoreEl.removeChild(listHighScoreEl.firstChild)
}
//create elements in order of high scores
for (var i = 0; i < HighScores.length; i++) {
var highscoreEl = document.createElement("li");
highscoreEl.ClassName = "highscore";
highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
listHighScoreEl.appendChild(highscoreEl);
}

saveHighScore();
displayHighScores();

}
//save high score
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores))
      
}

//load values/ called on page load
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores")
      if (!LoadedHighScores) {
      return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => {return b.score-a.score})


  for (var i = 0; i < LoadedHighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "highscore";
      highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);

      HighScores.push(LoadedHighScores[i]);
      
  }
}  

//display high score screen from link or when intiials entered
var displayHighScores = function() {

  containerHighScoresEl.classList.remove("hide");
  containerHighScoresEl.classList.add("show");
  gameover = "true"

  if (containerEndEl.className = "show") {
      containerEndEl.classList.remove("show");
      containerEndEl.classList.add("hide");
      }
  if (containerStartEl.className = "show") {
      containerStartEl.classList.remove("show");
      containerStartEl.classList.add("hide");
      }
      
  if (containerQuestionEl.className = "show") {
      containerQuestionEl.classList.remove("show");
      containerQuestionEl.classList.add("hide");
      }

  if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide");
  }

  if (wrongEl.className = "show") {
      wrongEl.classList.remove("show");
      wrongEl.classList.add("hide");
      }
  
}
//clears high scores
var clearScores = function () {
  HighScores = [];

  while (listHighScoreEl.firstChild) {
      listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }

  localStorage.clear(HighScores);

} 

loadHighScore()
//allow page to work cuz of Floc

  
//on start click, start game
btnStartEl.addEventListener("click", startGame)
//on submit button -- enter or click
formInitials.addEventListener("submit", createHighScore)
//when view high-scores is clicked
ViewHighScoreEl.addEventListener("click", displayHighScores)
//Go back button
btnGoBackEl.addEventListener("click", renderStartPage)
//clear scores button
btnClearScoresEl.addEventListener("click", clearScores)