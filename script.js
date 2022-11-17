let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//Winning Pattern Array
let winningPattern = [[0,1,2], [0,3,6], [2,5,8], [6,7,8], [3,4,5], [1,4,7], [0,4,8], [2,4,6]];
//Player x palys first
let xTurn = true;
let count = 0;

//Disable buttons
const disableButtons = () =>{
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
}

//Enable all buttons
const enableButtons = () =>{
    btnRef.forEach((element) => {
        element.innerText="";
        element.disabled = false
    });
    popupRef.classList.add("hide");
};

//When winning
const winFunction = (letter) =>{
    disableButtons();
    if(letter == "X"){
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    }
    else{
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

//Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E, <br> It's a Draw";
};

//new game
newgameBtn.addEventListener("click", ()=>{
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", ()=>{
    count = 0;
    enableButtons();
});

//Win logic
const winChecker = () =>{
    //Loop thorught all win pattern
    for(let i of winningPattern){
        let[element1, element2, element3] = [
            btnRef[i[0]].innerText, btnRef[i[1]].innerText, btnRef[i[2]].innerText,
        ];
        if(element1 != "" && element2 != "" && element3 !=""){
            if(element1 == element2 && element2 == element3){
                winFunction(element1);
            }
        }
    }
};

//Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn){
            xTurn = false;
            //Display X
            element.innerText = "X";
            element.disabled = true;
        } else{
            xTurn = true;
            //Display O
            element.innerText = "O";
            element.disabled = true;
        }
        //Increment count on each click;
        count +=1;
        if(count == 9){
            //It's a draw
            drawFunction();
        }
        //Check for win
        winChecker();

    });

});

//Enable buttons and disable popup on page load
window.onload = enableButtons();