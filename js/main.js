let cont = document.querySelector(".cont");
let gameContainer=document.querySelector("#gameContainer")
let xBtn = document.querySelector(".x");
let oBtn = document.querySelector(".o");
let playBtn = document.querySelector(".play");

let gameOverElement = document.querySelector(".gameover");

let player = new Object;

playBtn.classList.add("unclickable")

oBtn.addEventListener("click", function(){
    player.man = "O";
    player.computer = "X";
    playBtn.classList.remove("unclickable")
    switchActive(xBtn, oBtn);
});

xBtn.addEventListener("click", function(){
    player.man = "X";
    player.computer = "O";
    playBtn.classList.remove("unclickable")

    switchActive(oBtn, xBtn);
});



playBtn.addEventListener("click", function(){
    if( !player.man ){
        return false;
    }
    init(player);
    cont.classList.add("hide");
    gameContainer.classList.remove("hide")
});

function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}




