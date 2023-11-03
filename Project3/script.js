const weapons = ['rock', 'paper', 'scissors']; 
const images = ['rock.jpg','paper.jpg', 'scissors.jpg']
const choiceDealer = new Map(); 
const imgTools = new Map(); 
const usesPerWeapon = new Map(); 
const botUsesPerWeapon = new Map(); 
let roundLog, playerItemCount, botItemCount, playerCount, botCount, weaponChoice, botWeaponDisplay, userWeaponDisplay, weaponUsed, messageBoard, resetButton, rounds, headerAdjuster;  


function initialize(){  
    roundLog = document.getElementById("log");
    botWeaponDisplay = document.getElementById("botTool"); 
    userWeaponDisplay = document.getElementById("userTool"); 
    messageBoard = document.getElementById("status"); 
    resetButton = document.getElementById("resetBtn");
    headerAdjuster = document.querySelector('#head');

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

    playerCount = 5; 
    botCount = 5;  
    rounds = 0; 
    colCount = 1; 
}

function updateLog(winner,pTool,cTool){
    colCount+=1; 
    headerAdjuster.colSpan = colCount;

    let roundNum = roundLog.rows[1].insertCell(); 
    rounds+=1; 
    roundNum.innerHTML = rounds; 

    let playerTool = roundLog.rows[2].insertCell(); 
    playerTool.innerHTML = pTool; 

    let computerTool = roundLog.rows[3].insertCell(); 
    computerTool.innerHTML = cTool; 

    let result = roundLog.rows[4].insertCell();
    result.innerHTML = winner; 
}

function updateMessageBoard(newMsg){
    setTimeout(()=>{
        messageBoard.innerHTML = newMsg; 
    },200); 
}

function updateItemCount(player, item, func){
    if(player === 'bot'){
        botItemCount = document.getElementById(`${item}Bot`);
        if(func === 'add'){
            botCount+=1; 
        }else if(botCount !== 0 && func === 'sub'){
            botCount-=1; 
            botUsesPerWeapon.set(item,3); 
        }else{
            botCount = 0; 
            updateMessageBoard("Choose another weapon!");
        }
        botItemCount.innerHTML = botCount; 
    }else{
        playerItemCount = document.getElementById(`${item}User`);
        if(func === 'add'){
            playerCount+=1; 
        }else if(playerCount !== 0 && func === 'sub'){
            playerCount-=1; 
            usesPerWeapon.set(item,3); 
        }else{
            playerCount = 0; 
            updateMessageBoard("Choose another weapon!");
        }
        playerItemCount.innerHTML = playerCount; 
    }
}

function updateUses(list, tool){
    let currentVal; 
    let newVal; 
    currentVal = list.get(tool);
    newVal = currentVal-1; 
    if(newVal == 0){
        if(list === botUsesPerWeapon){
            updateItemCount('bot', tool, 'sub');
            updateMessageBoard(`Steve's ${tool} broke!`);
        }else{
            updateItemCount('player', tool, 'sub');
            updateMessageBoard(`Your ${tool} broke!`);
        }
        list.set(tool,3); 
    }else{
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
    return weapons[parseInt(Math.random() *3)]; 
}

function fight(p1,p2){
    let playerChoice = choiceDealer.get(p1); 
    let botChoice = choiceDealer.get(p2);

    let result = (playerChoice + 1 ) % 3; 

    if(botChoice === playerChoice){
        updateLog("Tie", p1, p2);
        manageUses('both',p1,p2);
        updateMessageBoard("No winners :("); 
    }else if(botChoice === result){
        updateLog('Steve', p1, p2);
        updateMessageBoard(`Steve won with ${p2}!`);
        manageUses('bot',p2); 
        updateItemCount('bot', p1, 'add');
        updateItemCount('player', p1, 'sub');  
    }else{
        updateLog("Player", p1,p2);
        updateMessageBoard(`You won using ${p1}!`);
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
    userWeaponDisplay.src = ""; 
    botWeaponDisplay.src = ""; 
    for(let i =0; i < weapons.length; i++){
        playerItemCount = document.getElementById(`${weapons[i]}User`);
        playerItemCount.innerHTML = 5; 

        botItemCount = document.getElementById(`${weapons[i]}Bot`);
        botItemCount.innerHTML = 5; 
    }

    // let row = roundLog.rows; 
    // for(let i=1; i<row.length; i++){
    //     for(let j=1; j < row[i].cells; j++){
    //         row[i].deleteCell(j); 
    //     }
    // }
    
}


