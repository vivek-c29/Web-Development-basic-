let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn=document.querySelector(".new-btn");
let msg=document.querySelector("#msg");
let turn0 = true;
let msgContainner=document.querySelector(".msg-containner");
let count=0;
const winningPattern = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("Box was clicked!");
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        }

        else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let isWinner=checkWinner();
        if(count==9&&!isWinner)
        {
            count=0;
            drawGame();

        }
    });
});
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    console.log(winner);
    msgContainner.classList.remove("hide");
    disableBoxes();
  };

const disableBoxes=()=>{
    for(let box of boxes)
        {
            box.disabled=true;
        }   
}

const enableBoxes=()=>{
    for(let box of boxes)
        {
            box.disabled=false;
            box.innerText="";

        }   
}

const drawGame=()=>{
    msg.innerText=`Game was a Draw`;
    msgContainner.classList.remove("hide");
    disableBoxes();
}
const resetGame=()=>{
    count=0;
    turn0=true;
    enableBoxes();
    msgContainner.classList.add("hide");
};
const checkWinner = () => {
    for (let pattern of winningPattern) {
        //    let val1=boxes[pattern[0]].innerText;
        //    let val2=boxes[pattern[1]].innerText;
        //    let val3=boxes[pattern[2]].innerText;
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val!="" && pos2Val!=""&&pos3Val!="")
        {
            if(pos1Val==pos2Val && pos2Val==pos3Val)
            {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }

    }
    
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

