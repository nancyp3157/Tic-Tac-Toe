let boxes = document.querySelectorAll(".btn");
    let reset = document.querySelector("#reset-btn");
    let newbtn = document.querySelector("#new-btn");
    let turn0 = true;
    let oScore=0;
    let xScore=0;
    let drawScore=0;
    let arr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    boxes.forEach((box) => {
        box.addEventListener("click", () => {

            if (turn0) {
                box.innerText = "O";
                turn0 = false;
                document.querySelector("#turn-msg").innerText = "it's X's turn.";
            }
            else {
                box.innerText = "X";
                turn0 = true;
                document.querySelector("#turn-msg").innerText = "it's O's turn.";
            }
            box.disabled = true;
            checkWinner();
            checkDraw();
        });
    });

    reset.addEventListener("click", () => {
        boxes.forEach((box) => {
            box.style.backgroundColor = "#B0CE88";
            box.innerText = "";
            box.disabled = false;
        });
        document.querySelector("#turn-msg").innerText = "it's O's turn.";
        document.querySelector("#winner-msg").innerText = "";
        turn0 = true;
    });

    const checkDraw = () => {
        let allFilled = true;

        boxes.forEach((box) => {
            if (box.innerText === "") {
                allFilled = false;
            }
        });

        if (allFilled && document.querySelector("#winner-msg").innerText === "") {
            document.querySelector("#winner-msg").innerText = "Oh no!! It's a draw.. please reset the game board.";
            drawScore = drawScore+1;
            document.querySelector("#scoreboard").innerText = `O: ${oScore} | X: ${xScore} | Draws:${drawScore}`;
            document.querySelector("#turn-msg").innerText = `it's draw`;
        }
    };

    const checkWinner = () => {
        for (let i of arr) {
            let pos1 = boxes[i[0]].innerText;
            let pos2 = boxes[i[1]].innerText;
            let pos3 = boxes[i[2]].innerText;

            if (pos1 != "" && pos2 != "" && pos3 != "") {
                if (pos1 === pos2 && pos2 === pos3) {
                    showWinner(pos1, i);
                }
            }
        }
    }

    function showWinner(winner, winCombo) {
        document.querySelector("#winner-msg").innerText = `yehhh!!! ${winner} is the winner. please reset the game board.`;
        winCombo.forEach((index) => {
            boxes[index].style.backgroundColor = "#A4B465";
        });
        boxes.forEach((box) => box.disabled = true);
        if(winner=='O'){
            oScore = oScore +1;
            document.querySelector("#scoreboard").innerText = `O: ${oScore} | X: ${xScore} | Draws: ${drawScore}`;
        }
        if(winner=='X'){
            xScore = xScore+1;
            document.querySelector("#scoreboard").innerText = `O: ${oScore} | X: ${xScore} | Draws: ${drawScore}`;
        }
        document.querySelector("#turn-msg").innerText = `${winner} has won the game!`;
    }

    newbtn.addEventListener("click",()=>{
        boxes.forEach((box) => {
            box.style.backgroundColor = "#B0CE88";
            box.innerText = "";
            box.disabled = false;
        });
        document.querySelector("#winner-msg").innerText = "";
        turn0 = true;
        document.querySelector("#turn-msg").innerText = "it's O's turn.";
        oScore = 0;
        xScore = 0;
        drawScore = 0;
        document.querySelector("#scoreboard").innerText = `O: ${oScore} | X: ${xScore} | Draws: ${drawScore}`;
    });
