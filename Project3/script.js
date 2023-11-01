const weapons = ['rock', 'paper', 'scissors']; 
const images = ['rock.jpg','paper.jpg', 'scissors.jpg']
const choiceDealer = new Map(); 
const imgTools = new Map(); 
const usesPerWeapon = new Map(); 
const botUsesPerWeapon = new Map(); 
let userTable, botTable, score, roundLog, playerItemCount, botItemCount, playerCount, botCount, weaponChoice, botWeaponDisplay, userWeaponDisplay, useCount, weaponUsed, messageBoard;  


function initialize(){  
    userTable = document.getElementById("player");
    botTable = document.getElementById("computer");  
    roundLog = document.querySelector("roundTracker tr");
    botWeaponDisplay = document.getElementById("botTool"); 
    userWeaponDisplay = document.getElementById("userTool"); 
    messageBoard = document.getElementById("status"); 

    for(let i = 0; i < weapons.length; i++){
        imgTools.set(weapons[i], images[i]); 
        choiceDealer.set(weapons[i],i); 
        usesPerWeapon.set(weapons[i], 3); 
        botUsesPerWeapon.set(weapons[i],3); 
    }


    console.log(imgTools.keys());
    console.log(imgTools.values());
    score = 0; 
    playerCount = 0;
    botCount = 0; 
    useCount = 0; 
}

function updateLog(newLog){
    let newCell = roundLog.insertCell();
    newCell.innerHTML = newLog; 
}


function manageUses(player,operation){
    let currentVal = 0; 
    let newVal =0; 

    if(player === 'bot'){
        currentVal = botUsesPerWeapon.get(p2);
        if(currentVal !== 0){
            newVal = currentVal-1; 
            botUsesPerWeapon.set(p2,newVal); 
            botCount = botUsesPerWeapon.get(p2); 
        }else{

        }
    }else{
        currentVal = usesPerWeapon.get(p1);
        if(currentVal !== 0){
            newVal = currentVal-1; 
            usesPerWeapon.set(p1,newVal); 
            playerCount = usesPerWeapon.get(p1);
             
        }
    }


}

function computerChoice(){
    let randNum = parseInt(Math.random() * 3); 
    return weapons[randNum]; 
}


function fight(p1,p2){
    let playerChoice = choiceDealer.get(p1); 
    let botChoice = choiceDealer.get(p2);
    let result = (playerChoice + 1 ) % 3; 

    if(botChoice === result){
        updateLog(`Steve won using ${p2}`);
    }else if(playerChoice === result){
        updateLog(`Player won using ${p1}`);
    }else{
        updateLog("Tie");
    }

    manageUses();

}


function game(weapon){ 
    setTimeout(() => {
        let selectedWeapon = weapon.slice(0,weapon.length-4); 
        let userWeapon = selectedWeapon === 'rock' ? 'rock' : selectedWeapon === 'paper' ? 'paper' : 'scissors'; 
        console.log(userWeapon); 
        let botWeapon = computerChoice(); 
        userWeaponDisplay.src = imgTools.get(userWeapon); 
        botWeaponDisplay.src = imgTools.get(botWeapon); 
        fight(userWeapon,botWeapon);
        // display();
    }, 450);
     
}


function reset(){
    playerCount =0; 
    botCount = 0; 
}

function display(){
    playerItemCount.innerHTML = playerCount; 
    botItemCount.innerHTML = botCount;
}
