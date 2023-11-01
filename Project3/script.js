const weapons = ['rock', 'paper', 'scissors']; 
const images = ['rock.jpg','paper.jpg', 'scissors.jpg']
const choiceDealer = new Map(); 
const imgTools = new Map(); 
const usesPerWeapon = new Map(); 
const botUsesPerWeapon = new Map(); 
let userTable, botTable, score, roundLog, starterItemCount, playerItemCount, botItemCount, playerCount, botCount, weaponChoice, botWeaponDisplay, userWeaponDisplay, useCount, weaponUsed, messageBoard;  


function initialize(){  
    userTable = document.getElementById("player");
    botTable = document.getElementById("computer");  
    roundLog = document.querySelector(".roundTracker tr");
    botWeaponDisplay = document.getElementById("botTool"); 
    userWeaponDisplay = document.getElementById("userTool"); 
    messageBoard = document.getElementById("status"); 
    starterItemCount = document.querySelectorAll("#count");

    for(let i = 0; i < weapons.length; i++){
        imgTools.set(weapons[i], images[i]); 
        choiceDealer.set(weapons[i],i); 
        usesPerWeapon.set(weapons[i], 3); 
        botUsesPerWeapon.set(weapons[i],3); 
    }

    console.log(imgTools.keys());
    console.log(imgTools.values());

    playerCount = 0;
    botCount = 0; 
    useCount = 0; 
}

function updateLog(newLog){
    let newCell = roundLog.insertCell();
    newCell.innerHTML = newLog; 
}

function updateUses(list, tool){
    let currentVal = 0; 
    let newVal =0; 
    currentVal = list.get(tool);
    if(currentVal !== 0){
        newVal = currentVal-1; 
        list.set(tool,newVal); 
    }
}

function manageUses(player,tool,tool2){
    if(player === 'player'){
        updateUses(usesPerWeapon, tool);
    }else if(player === 'bot'){
        updateUses(botUsesPerWeapon, tool);
    }else{
        updateUses(usesPerWeapon, tool); 
        updateUses(botUsesPerWeapon, tool2); 
    }

}

function computerChoice(){
    let randNum = parseInt(Math.random() * 3); 
    return weapons[randNum]; 
}


function fight(p1,p2){
    let playerChoice = choiceDealer.get(p1); 
    let botChoice = choiceDealer.get(p2);

    console.log("User Value:", playerChoice); 
    console.log("Bot Value:", botChoice);
    let result = (playerChoice + 1 ) % 3; 

    if(botChoice === playerChoice){
        updateLog("Tie");
        manageUses('both',p1,p2);
    }else if(botChoice === result){
        updateLog(`Steve won using ${p2}`);
        manageUses('bot',p2); 
    }else{
        updateLog(`Player won using ${p1}`);
        manageUses('player',p1); 
    }
}


function game(weapon){ 
    setTimeout(() => {
        let selectedWeapon = weapon.slice(0,weapon.length-4); 
        let userWeapon = selectedWeapon === 'rock' ? 'rock' : selectedWeapon === 'paper' ? 'paper' : 'scissors'; 
        console.log("User weapon:", userWeapon); 
        let botWeapon = computerChoice(); 
        console.log("Bot Weapon:", botWeapon); 
        userWeaponDisplay.src = imgTools.get(userWeapon); 
        botWeaponDisplay.src = imgTools.get(botWeapon); 
        fight(userWeapon,botWeapon);
        // display();
    }, 450);
    userWeaponDisplay.src = ""; 
    botWeaponDisplay.src = ""; 
     
}


function reset(){
    starterItemCount.innerHTML = 5;
}

function display(){
    playerItemCount.innerHTML = playerCount; 
    botItemCount.innerHTML = botCount;
}
