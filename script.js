/*
© Yrjar Vederhus 2022
*/

options = ["rock", "paper", "scissors"];
points = {"player": 0, "computer": 0};
//Creating elements for the pictures (empty, because when this loads the entire HTML has not yet been loaded)
let rockEl
let paperEl
let scissorsEl
let computerEl
let resultEl

function addListeners() {
  /*
  Creates elements and eventlisteners for the pictures
  (+ defines the resultEl for later use)
  */
  rockEl     = document.getElementById("rock");
  paperEl    = document.getElementById("paper");
  scissorsEl = document.getElementById("scissors");
  computerEl = document.getElementById("pcimg");

  rockEl    .addEventListener("click", progress);
  paperEl   .addEventListener("click", progress);
  scissorsEl.addEventListener("click", progress);

  resultEl = document.getElementById("result_out");
}

function progress(e) {
  /*
  To be called when a choice is made. Taking the element that was clicked, and making the game progress.
  */
  let playerChoice   = e.target.id
  let computerChoice = makeChoice()
  computerEl.setAttribute("src", "./images/"+computerChoice+".png")
  changeScore(playerChoice, computerChoice)
  if (points["player"] == 5 || points["computer"] == 5) {done()} //Ending when someone reaches 5 points
}

function makeChoice() {
  /*
  The computer makes a choice of either rock, paper, or scissors.
  */
  random = Math.floor(Math.random()*3);
  return options[random];
}

function changeScore(playerChoice, computerChoice) {
  /*
  Changes the scores
  var playerChoice = players choice, string in list options
  var computerChoice = computers choice, string in list options
  */
  if      (options.at( options.indexOf(playerChoice)   -1 ) == computerChoice) {points["player"]   ++}
  else if (options.at( options.indexOf(computerChoice) -1 ) == playerChoice  ) {points["computer"] ++}

  document.getElementById("playerPoints"  ).innerText = points["player"];
  document.getElementById("computerPoints").innerText = points["computer"];
  
  if (points["player"] > points["computer"]) {
    resultEl.innerText = "You are in the lead!";
  }
  else if (points["computer"] > points["player"]) {
    resultEl.innerText = "Oh no! The computer is leading!";
  }
  else {
    resultEl.innerText = "You and the computer are equally lucky, it's a tie so far!";
  }
}

function done() {
  //Removes the eventlisteners
  rockEl.removeEventListener("click", progress);
  paperEl.removeEventListener("click", progress);
  scissorsEl.removeEventListener("click", progress);

  document.querySelector("style").innerText = "#playerchoice > img {cursor: not-allowed}"

  //Writes the result
  if      (points["computer"] > points["player"]) {resultEl.innerText = "Oh no! The computer won! Reload the page to try again.";        }
  else if (points["player"] > points["computer"]) {resultEl.innerText = "Yay! You won! Reload the page to see if your luck persists."; }
  else                                            {console.error("Even points, this should not be possible"); };
}