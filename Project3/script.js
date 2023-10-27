const weapons = ['rock', 'paper', 'scissors']; 
let userTable, botTable, score, roundLog, itemCount, count, weaponChoice;  


function initialize(){  
    userTable = document.getElementById("player");
    botTable = document.getElementById("computer");  
    roundLog = document.getElementById("log"); 

    score = 0; 
    count = 0;

}



function addItem(){
    count+=1; 
}

function removeItem(){
    count-=1; 
}

function computerChoice(){}
function userChoice(){}

function fight(user,bot){
    if(user === bot){
        return false; 
    }

}

function game(weapon){
    itemCount = document.getElementById(weapon); 

    let userWeapon = weapon === 'rock' ? 'rock' : weapon === 'paper' ? 'scissors' : 'paper'; 
    console.log(userWeapon); 
    let botChoice = computerChoice(); 
    
    
    

}

function display(){
    itemCount.innerHTML = count; 
}
