// Get all necessary DOM nodes

//This code block gets all necessary DOM nodes by selecting various elements on the page using document.querySelector 
//and document.querySelectorAll methods. The Array.from method is used to convert the returned NodeList from 
//querySelectorAll into an array. These variables will be used later in the game to update the DOM with game results.
const images            = Array.from(document.querySelectorAll('.card-image'));
const message           = document.querySelector('.message');
const scorePlayer       = document.querySelector('.player-score');
const scoreComputer     = document.querySelector('.computer-score');
const selectionPlayer   = document.querySelector('.player-selection');
const selectionComputer = document.querySelector('.computer-selection');









//These variables keep track of the current score for the player and computer.
let playerScore     = 0;
let computerScore   = 0;







// This code block adds a click event listener to each of the images on the page. 
//When an image is clicked, the game() function is called with the data-image attribute of the clicked image as an argument. 
//The if statement checks if either the player or computer has already won the game (i.e., they have reached a score of 5), 
//in which case the function returns early and the game does not continue.
images.forEach((image) =>
  image.addEventListener('click', () => {
    if (playerScore >= 5 || computerScore >= 5) {
      return;
    }
    game(image.dataset.image);
  })
);









/* Game Logic */
//This function generates a random number between 1 and 3 and returns a string 
//representation of the computer's selection based on the number generated.
function random(number) {
    return Math.floor(Math.random() * number + 1);
  }
  
  
function getComputerSelection() {
  let computerNumber = random(3);
  let computerGuess = '';

  switch (computerNumber) {
    case 1:
      computerGuess = 'Rock';
      break;
    case 2:
      computerGuess = 'Paper';
      break;
    case 3:
      computerGuess = 'Scissors';
      break;
    default:
      break;
  }

  return computerGuess;
}









//This function takes the player's and computer's selections as arguments 
//and determines the result of the round. The result is returned as a string.


function playRound(playerSelection, computerSelection) {
  let log = '';

  if (playerSelection === 'Rock') {
    if (computerSelection === 'Paper') {
      log = 'Computer Wins! Paper beats Rock';
    } else if (computerSelection === 'Scissors') {
      log = 'You Win! Rock beats Scissors.';
    } else {
      log = "Tie";
    }
  } else if (playerSelection === 'Paper') {
    if (computerSelection === 'Scissors') {
      log = 'Computer Wins! Scissors beats Paper';
    } else if (computerSelection === 'Rock') {
      log = 'You Win! Paper beats Rock.';
    } else {
      log = "Tie";
    }
  } else if (playerSelection === 'Scissors') {
    if (computerSelection === 'Rock') {
      log = 'Computer Wins! Rock beats Scissors';
    } else if (computerSelection === 'Paper') {
      log = 'You Win! Scissors beats Paper.';
    } else {
      log = "Tie.";
    }
  }

  return log;
}











//This function takes the player's and computer's selections as arguments and determines the result of the round. 
//The result is returned as a string.
function createParagWithText(text) {
  const p = document.createElement('p');
  p.textContent = text;

  return p;
}



//This is a JavaScript function that controls a game. The function takes in a parameter playerSelect, 
//which represents the player's selection (rock, paper, or scissors) for the current round of the game.//
function game(playerSelect) {
    //The function starts by calling two helper functions: capitalize and getComputerSelection. 
    //The capitalize function takes in a string and returns the same string with the first letter capitalized. 
  let playerSelection = capitalize(playerSelect);
  //The getComputerSelection function randomly generates a selection of rock, paper, or scissors for the computer.
  let computerSelection = getComputerSelection();
  //The function then calls the playRound function, passing in the player's selection and 
  //the computer's selection as arguments. The playRound function compares the selections and 
  //determines the result of the round (win, lose, or tie), which is stored in the roundResult variable.
  let roundResult = playRound(playerSelection, computerSelection);



  //The function then checks the roundResult variable to 
  //determine if the player won or lost the round, and 
  //updates the playerScore or computerScore variable accordingly.
  if (roundResult.search('You Win!') > -1) {
    playerScore++;
  } else if (roundResult.search('Computer Wins!') > -1) {
    computerScore++;
  }



  //The function also updates the HTML of the game board to reflect the player and computer selections, scores, and round result. 
  //The scorePlayer and scoreComputer elements display the current scores for the player and computer, and the message element
  //displays the result of the current round. The selectionPlayer and selectionComputer elements display the player and 
  //computer selections for the current round.
  scorePlayer.textContent = playerScore;
  scoreComputer.textContent = computerScore;
  message.textContent = roundResult;
  selectionPlayer.appendChild(createParagWithText(playerSelection));
  selectionComputer.appendChild(createParagWithText(computerSelection));

  if (playerScore >= 5 && computerScore < 5) {
    message.textContent = 'You Win the GAME! \n  Press Ctrl + R';
    
  } else if (playerScore < 5 && computerScore >= 5) {
    message.textContent = 'Game Over... \n  Press Ctrl + R to retry.';
  }
}













/* Helper Functions */
  
  //This function takes one parameter "string", which represents a string of text to be capitalized. 
  //It converts the entire string to lowercase using the "toLowerCase()" function, selects the first character using the "charAt(0)" function, 
  //converts it to uppercase using the "toUpperCase()" function, 
  //and then appends the remaining characters of the string using the "slice(1)" function. The final result is returned by the function.
  function capitalize(string) {
    return (
      string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1)
    );
  }
  
  /* ************************ */