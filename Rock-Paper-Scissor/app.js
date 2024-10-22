let userScore = 0;
let compScore = 0;
const btn=document.querySelector("#btn")
const choices = document.querySelectorAll(".choice");
const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");

const msg = document.querySelector("#msg");
function drawGame() {
    console.log("Draw Game!");
    msg.innerText = "Game Draw!Play Again";
    msg.style.backgroundColor="#003049";
    
}

showWinner = (userWin,userChoice,compChoice) => {
    if (userWin) {
        console.log("User Won");
        msg.innerText = `You Won! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor="#0D7C66";
        userScore++;
        userScorePara.innerText=userScore

    }
    else {
        console.log("Computer win!");
        msg.innerText = `You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor="#E4003A";
        compScore++;
        compScorePara.innerText=compScore;

    }
}
const computerChoice = () => {
    options = ["rock", "paper", "scissors"];
    idx = Math.floor(Math.random() * 3);
    return options[idx];
}
const playGame = (userChoice) => {
    console.log("User choice:", userChoice);
    const compChoice = computerChoice();
    console.log("Computer choice:", compChoice);


    if (userChoice === compChoice) {
        drawGame();
    }
    else {
        userWin = true;
        if (userChoice === "rock") {
            userWin = userChoice === "paper" ? false : true;
        }
        else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        }
        else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        console.log(userChoice);
        playGame(userChoice)
    });
});

btn.addEventListener("click",()=>{
    userScorePara.innerText=0;
    compScorePara.innerText=0;
    userScore=0;
    compScore=0;
})