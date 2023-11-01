const weapons = ['rock', 'paper', 'scissors']; 
const images = ['rock.jpg','paper.jpg', 'scissors.jpg']
const choiceDealer = [['W','L','T']]
const imgTools = new Map(); 
let userTable, botTable, score, roundLog, playerItemCount, botItemCount, playerCount, botCount, weaponChoice, botWeaponDisplay, userWeaponDisplay, userDisplay, botDisplay;  


function initialize(){  
    userTable = document.getElementById("player");
    botTable = document.getElementById("computer");  
    roundLog = document.getElementById("log"); 
    botWeaponDisplay = document.getElementById("botTool"); 
    userWeaponDisplay = document.getElementById("userTool"); 

    for(let i = 0; i < weapons.length; i++){
        imgTools.set(weapons[i], images[i]); 
    }

    console.log(imgTools.keys());
    console.log(imgTools.values());
    score = 0; 
    playerCount = 0;
    botCount = 0; 
    userDisplay = ''; 
    botDisplay = ''; 
}

function updateLog(newLog){
    let newCell = roundLog.insertCell();
    newCell.innerHTML = newLog; 
}

function addItem(){
    
}

function removeItem(){
}

function computerChoice(){
    let randNum = parseInt(Math.random() * 3); 
    return weapons[randNum]; 
}


function fight(p1,p2){

    
}


function game(weapon){
    setTimeout(() => {
        itemCount = document.getElementById(weapon); 
        let selectedWeapon = () =>{
            let type = str(weapon); 
            return type.slice(0,type.length-4); 
        }
        let userWeapon = selectedWeapon === 'rock' ? 'rock' : weapon === 'paper' ? 'paper' : 'scissors'; 
        console.log(userWeapon); 
        let botWeapon = computerChoice(); 
        userWeaponDisplay.src = imgTools.get(userWeapon); 
        botWeaponDisplay.src = imgTools.get(botWeapon); 
        fight(userWeapon,botWeapon);
        display();
    }, "500");
     
}

function display(){
    playerItemCount.innerHTML = playerCount; 
    botItemCount.innerHTML = botCount;

}
