const weapons = ['rock', 'paper', 'scissors']; 
let userTable, botTable, score, roundLog, playerItemCount, count, weaponChoice;  


function initialize(){  
    userTable = document.getElementById("player");
    botTable = document.getElementById("computer");  
    roundLog = document.getElementById("log"); 

    score = 0; 
    count = 0;

}

function updateLog(newLog){
    let newCell = roundLog.insertCell();
    newCell.innerHTML = newLog; 
}

function addItem(){
    
    count+=1; 
}

function removeItem(){
    count-=1; 
}

function computerChoice(){
    // let randNum = parseInt(Math.random() * 3);
    // return weapons[randNum]; 
    return 'scissors'; 
}
function userChoice(){}


function game(weapon){
    itemCount = document.getElementById(weapon); 
    let selectedWeapon = () =>{
        let type = str(weapon); 
        return type.slice(0,type.length-4); 
    }
    let userWeapon = selectedWeapon === 'rock' ? 'rock' : weapon === 'paper' ? 'paper' : 'scissors'; 
    console.log(userWeapon); 
    let botWeapon = computerChoice(); 

    if(userWeapon === botWeapon){
        updateLog("No winner.");
    }
    

}

function display(){
    playerItemCount.innerHTML = count; 
}
