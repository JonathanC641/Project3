const weapons = ['rock', 'paper', 'scissors']; 
const images = ['rock.jpg','paper.jpg', 'scissors.jpg']
const choiceDealer = new Map(); 
const imgTools = new Map(); 
const usesPerWeapon = new Map(); 
const botUsesPerWeapon = new Map();
const botToolTracker = new Map();  
let roundLog, playerItemCount, botItemCount, weaponChoice, 
botWeaponDisplay, userWeaponDisplay, messageBoard, 
resetButton, rounds, headerAdjuster;  


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
        botToolTracker.set(weapons[i],5); 
    }
    rounds = 0; 
    colCount = 1; 
}

//This is used to assure that 
function stillHaveItems(){
    let playerCount = 0; 
    let botCount = 0; 
    for(let i =0; i < 3; i ++){
        playerItemCount = document.getElementById(`${weapons[i]}User`);
        botItemCount = document.getElementById(`${weapons[i]}Bot`);
        if(playerItemCount.innerHTML > 0){
            playerCount++; 
        }
        if(botItemCount.innerHTML > 0){
            botCount++; 
        }
    }

    if(botCount === 0 && playerCount === 0){
        updateMessageBoard("No winner! Rematch? "); 
        return false; 
    }else if(playerCount === 0){
        updateMessageBoard("Steve wins!"); 
        return false; 
    }else if(botCount=== 0){
        updateMessageBoard("You win!"); 
        return false; 
    }else{
        return true; 
    }
}

//Creates a new record in the log detailing the most recent match played 
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
        if(botItemCount.innerHTML !== 0 && func === 'add' && playerItemCount.innerHTML > 0){
            let botVal = parseInt(botItemCount.innerHTML); 
            botVal+=1;
            botItemCount.innerHTML = botVal;  
        }else if(botItemCount.innerHTML > 0 && func === 'sub'){
            botItemCount.innerHTML-=1; 
            botUsesPerWeapon.set(item,3); 
        }else{
            botItemCount.innerHTML = 0; 
        }
        botToolTracker.set(item, botItemCount.innerHTML); 
    }else{
        playerItemCount = document.getElementById(`${item}User`);
        if(playerItemCount.innerHTML > 0 && func === 'add'){
            let playerVal = parseInt(playerItemCount.innerHTML); 
            playerVal+=1;
            playerItemCount.innerHTML = playerVal;
        }else if(playerItemCount.innerHTML > 0 && func === 'sub'){
            playerItemCount.innerHTML-=1;             
            usesPerWeapon.set(item,3); 
        }else{
            playerItemCount.innerHTML = 0; 
            updateMessageBoard("Choose another weapon!");
        }
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


//Randomizes the tool the computer selects 
function computerChoice(){
    let randWeapon = weapons[parseInt(Math.random() *3)];
    let prev = randWeapon; 
    let tracker= 0;  
    while(botToolTracker.get(randWeapon) === 0 && tracker < 3){
        randWeapon = weapons[parseInt(Math.random() *3)];
        if(prev !== randWeapon){
            tracker+=1; 
        } 
    }
    if(tracker === 3){
        updateMessageBoard("You have won!")
    }
    
    return randWeapon; 

}

//Deals with who wins the match and which player loses or gains a weapon 
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

//This function emulates the game whenever the player selects a weapon 
function game(weapon){
    if(stillHaveItems()){
        setTimeout(() => {
            let selectedWeapon = weapon.slice(0,weapon.length-4); 
            let userWeapon = selectedWeapon === 'rock' ? 'rock' : selectedWeapon === 'paper' ? 'paper' : 'scissors'; 
            let botWeapon = computerChoice(); 
            userWeaponDisplay.src = imgTools.get(userWeapon); 
            botWeaponDisplay.src = imgTools.get(botWeapon); 
            fight(userWeapon,botWeapon);
        }, 200);
    }
    userWeaponDisplay.src = ""; 
    botWeaponDisplay.src = ""; 
}


function reset(){
    userWeaponDisplay.src = ""; 
    botWeaponDisplay.src = ""; 
    rounds = 0; 
    updateMessageBoard("");
    for(let i =0; i < weapons.length; i++){
        playerItemCount = document.getElementById(`${weapons[i]}User`);
        playerItemCount.innerHTML = 5; 

        botItemCount = document.getElementById(`${weapons[i]}Bot`);
        botItemCount.innerHTML = 5; 
    }

    for(let i = 0; i < weapons.length; i++){
        usesPerWeapon.set(weapons[i], 3); 
        botUsesPerWeapon.set(weapons[i],3); 
        botToolTracker.set(weapons[i],5); 
    }
    
    const allRows = roundLog.rows;
    if(allRows[1].cells.length > 1){ //Prevents the last column from being deleted 
        for (let i = 1; i < allRows.length; i++) {
            let row = allRows[i]; 
            for(let j = 1; j < row.cells.length; j++){
                row.deleteCell(-1);
                j--;
            }
        }
    } 
}


