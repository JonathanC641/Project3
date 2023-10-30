const weapons = ['rock', 'paper', 'scissors']; 
const images = ['rock.jpg','paper.jpg', 'scissors.jpg']
const imgTools = new Map(); 
let userTable, botTable, score, roundLog, playerItemCount, botItemCount, playerCount, botCount, weaponChoice, botWeaponDisplay, userWeaponDisplay;  


function initialize(){  
    userTable = document.getElementById("player");
    botTable = document.getElementById("computer");  
    roundLog = document.getElementById("log"); 
    botWeaponDisplay = document.getElementById("botTool"); 
    userWeaponDisplay = document.getElementById("userTool"); 

    for(let i = 0; i < toolIdentifier; i++){
        imgTools.set(weapons[i], images[i]); 
    }

    console.log(imgTools.keys());
    console.log(imgTools.values());
    score = 0; 
    playerCount = 0;
    botCount = 0; 
    userDisplay = ''; 
    botDisplay = '' 
}

function updateLog(newLog){
    let newCell = roundLog.insertCell();
    newCell.innerHTML = newLog; 
}

// function addItem(){
    
// }

// function removeItem(){
// }

function computerChoice(){
    // let randNum = parseInt(Math.random() * 3);
    // return weapons[randNum]; 
    return 'scissors'; 
}


function fight(p1,p2){
    if(p1 === p2){
        updateLog("No winner.");
    }else if (p1 === 'rock' && p2 === 'paper' || p1 === 'paper' && p2 === 'rock'){
        updateLog(`Computer won. Weapon Used: ${p1}`); 
    }else if(p1 === 'rock' && p2 === 'scissors'){
        updateLog(`Player won. Weapon Used: ${p1}`); 
    }else if(p1 === 'paper' && p2 === 'scissors'){
        updateLog(`Computer won. Weapon Used: ${p1}`); 
    }else if(p1 === 'paper' && p2 === 'scissors'){
        updateLog(`Computer won. Weapon Used: ${p1}`); 
    }else{
        updateLog();
    }

    
}


function game(weapon){
    itemCount = document.getElementById(weapon); 
    let selectedWeapon = () =>{
        let type = str(weapon); 
        return type.slice(0,type.length-4); 
    }
    let userWeapon = selectedWeapon === 'rock' ? 'rock' : weapon === 'paper' ? 'paper' : 'scissors'; 
    console.log(userWeapon); 
    let botWeapon = computerChoice(); 

    setTimeout(function() {
        fight();
    }, delayInMilliseconds);

    display(); 
}

function display(){
    playerItemCount.innerHTML = playerCount; 
    botItemCount.innerHTML = botCount;

    userWeaponDisplay.src = ""; 

    
    
}
