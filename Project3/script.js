const weapons = ['rock', 'paper', 'scissors']; 
const images = ['rock.jpg','paper.jpg', 'scissors.jpg']
const choiceDealer = new Map(); 
const imgTools = new Map(); 
const usesPerWeapon = new Map(); 
const botUsesPerWeapon = new Map(); 
let userTable, botTable, score, roundLog, playerItemCount, botItemCount, playerCount, botCount, weaponChoice, botWeaponDisplay, userWeaponDisplay, weaponUsed, messageBoard, resetButton;  


function initialize(){  
    userTable = document.getElementById("player");
    botTable = document.getElementById("computer");  
    roundLog = document.querySelector(".roundLog tr");
    botWeaponDisplay = document.getElementById("botTool"); 
    userWeaponDisplay = document.getElementById("userTool"); 
    messageBoard = document.getElementById("status"); 
    resetButton = document.getElementById("resetBtn");

    resetButton.addEventListener("mouseover", function(){
        this.style.backgroundColor = "green";
    });
    resetButton.addEventListener("mouseout", function(){
        this.style.backgroundColor = "red"; 
    });

    for(let i = 0; i < weapons.length; i++){
        imgTools.set(weapons[i], images[i]); 
        choiceDealer.set(weapons[i],i); 
        usesPerWeapon.set(weapons[i], 3); 
        botUsesPerWeapon.set(weapons[i],3); 
    }

    console.log(imgTools.keys());
    console.log(imgTools.values());

    playerCount = 5; 
    botCount = 5;  
}

function updateLog(newLog){
    let newCell = roundLog.insertCell();
    newCell.innerHTML = newLog; 
}

function updateMessageBoard(newMsg){
    setTimeout(()=>{
        messageBoard.innerHTML = newMsg; 
    },100); 
}

function updateItemCount(player, item, func){
    if(player === 'bot'){
        botItemCount = document.getElementById(`${item}Bot`);
        if(func === 'add'){
            botCount+=1; 
        }else if(botCount !== 0 && func === 'sub'){
            botCount-=1; 
        }else{
            botCount = 0; 
        }
        botItemCount.innerHTML = botCount; 
    }else{
        playerItemCount = document.getElementById(`${item}User`);
        if(func === 'add'){
            playerCount+=1; 
        }else if(playerCount !== 0 && func === 'sub'){
            playerCount-=1; 
        }else{
            playerCount = 0; 
        }
        playerItemCount.innerHTML = playerCount; 
    }
}

function updateUses(list, tool){
    let currentVal = 0; 
    let newVal =0; 
    currentVal = list.get(tool);
    if(currentVal !== 0){
        newVal = currentVal-1; 
        list.set(tool,newVal); 
    }else{
        if(list === botUsesPerWeapon){
            updateItemCount('bot', tool, 'sub');
        }else{
            updateItemCount('player', tool, 'sub');
        }
        list.set(tool,3); 
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
    return weapons[parseInt(Math.random() *3)]; 
}

function fight(p1,p2){
    let playerChoice = choiceDealer.get(p1); 
    let botChoice = choiceDealer.get(p2);

    console.log("User Value:", playerChoice); 
    console.log("Bot Value:", botChoice);
    let result = (playerChoice + 1 ) % 3; 

    if(botChoice === playerChoice){
        updateLog(`Steve: ${p2}\nPlayer: ${p1}\nWinner: Tie`);
        manageUses('both',p1,p2);
        updateMessageBoard("No winners :("); 
    }else if(botChoice === result){
        updateLog(`Steve: ${p2}\nPlayer: ${p1}\nWinner: Steve`);
        updateMessageBoard("Steve won!");
        manageUses('bot',p2); 
        updateItemCount('bot', p1, 'add');
        updateItemCount('player', p1, 'sub');  
    }else{
        updateLog(`Steve: ${p2}\nPlayer:${p1}\nWinner: Player`);
        updateMessageBoard("You won!");
        manageUses('player',p1);
        updateItemCount('player', p2, 'add'); 
        updateItemCount('bot', p2, 'sub'); 
    }
}


function game(weapon){ 
    setTimeout(() => {
        let selectedWeapon = weapon.slice(0,weapon.length-4); 
        let userWeapon = selectedWeapon === 'rock' ? 'rock' : selectedWeapon === 'paper' ? 'paper' : 'scissors'; 
        let botWeapon = computerChoice(); 
        userWeaponDisplay.src = imgTools.get(userWeapon); 
        botWeaponDisplay.src = imgTools.get(botWeapon); 
        fight(userWeapon,botWeapon);
    }, 150);
    userWeaponDisplay.src = ""; 
    botWeaponDisplay.src = ""; 
}


function reset(){
    for(let i=1;  i<numOfLogs; i++){
        roundLog.deleteCell(i); 
    }
    userWeaponDisplay.src = ""; 
    botWeaponDisplay.src = ""; 
    playerItemCount.innerHTML = 5; 
    botItemCount.innerHTML = 5; 
    
}


