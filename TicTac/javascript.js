let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msgtn");
let message=document.querySelector("#msg");
let turn0=true;

let timer; // Variable to store the timer
let timeLeft; // Variable to store the remaining time

// Function to start the timer
const startTimer = (duration) => {
    timeLeft = duration;
    const timerElement = document.querySelector("#timer"); // Select the timer element
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            msg.innerText = "Time out, Game Over!";
            msgContainer.classList.remove("hide");
            disableBoxes();
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; 
            timeLeft--;
        }
    }, 1000);
};

// Prompt players for their names
let player0Name = prompt("Enter name for Player 0:", "Player 0");
let playerXName = prompt("Enter name for Player X:", "Player X");

// Prompt for game duration
let gameDuration = parseInt(prompt("Enter game duration in seconds:", "60"), 10);
if (isNaN(gameDuration) || gameDuration <= 0) {
    gameDuration = 60; // Default to 60 seconds if invalid input
}

// Start the timer when the game begins
startTimer(gameDuration);

const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

const resetGame=()=>{
    turn0=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    for(let box of boxes){
        box.style.backgroundColor="white";
        box.innerText="";
    }
    clearInterval(timer); // Clear the timer
    startTimer(gameDuration); // Restart the timer
}
boxes.forEach((box)=>{
    box.addEventListener("click",() =>{
        console.log("box was clicked");
        if (turn0){
            box.innerText="0";
            turn0 =false;
        }else{
            box.innerText="x";
            turn0=true; 
        }
        box.disabled=true;
        checkWinner();
    });
 });

 const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
 }

 const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
 }
const showWinner = (winner) => {
    let winnerName = winner === "0" ? player0Name : playerXName;
    msg.innerText = `Congratulations, Winner is ${winnerName}!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    clearInterval(timer); // Stop the timer when a winner is found
};

const checkWinner = () => {
    let isDraw = true; // Assume it's a draw unless proven otherwise

    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                boxes[pattern[0]].style.backgroundColor = "black";
                boxes[pattern[1]].style.backgroundColor = "black";
                boxes[pattern[2]].style.backgroundColor = "black";
                showWinner(pos1); // Pass the winner symbol ("0" or "x")
                return; // Exit the function if a winner is found
            }
        }
    }

    // Check if all boxes are filled
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false; // If any box is empty, it's not a draw
            break;
        }
    }

    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
        clearInterval(timer); // Stop the timer when the game ends in a draw
    }
};

    
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

enableBoxes();

