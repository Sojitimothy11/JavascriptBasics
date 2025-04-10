let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScoreParagraph = document.querySelector("#user-score span");
const compScoreParagraph = document.querySelector("#comp-score span");

// Function to get the computer's choice
const getComputerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
};

// Function to handle a draw
const drawGame = (userChoice, compChoice) => {
    msg.innerText = `It's a draw! You chose ${userChoice}, Computer chose ${compChoice}. Score: ${userScore} : ${compScore}`;
    msg.style.backgroundColor = "yellow";
};

// Function to show the winner
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScoreParagraph.innerText = userScore;
        msg.innerText = `You win! You chose ${userChoice}, Computer chose ${compChoice}. Score: ${userScore} : ${compScore}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScoreParagraph.innerText = compScore;
        msg.innerText = `Computer wins! You chose ${userChoice}, Computer chose ${compChoice}. Score: ${userScore} : ${compScore}`;
        msg.style.backgroundColor = "red";
    }
};

// Function to play a single round
const playRound = (userChoice, compChoice) => {
    if (userChoice === compChoice) {
        drawGame(userChoice, compChoice);
        return;
    }

    let userWin = false;

    // Determine the winner based on the rules
    if (
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper")
    ) {
        userWin = true;
    }

    showWinner(userWin, userChoice, compChoice);
};

// Add event listeners to each choice
choices.forEach((choice) => {
    choice.addEventListener("click", (event) => {
        const userChoice = event.target.id; // Get the user's choice from the clicked element's id
        const compChoice = getComputerChoice(); // Get the computer's choice
        playRound(userChoice, compChoice); // Play the round with both choices
    });
});