let cards = [];
let isPressedBoth = false;
let pressedButton = null;
let timerInAction = false;
//Random generation of cards
for(let i = 0; i < 10; i++){
    for(let j = 0; j < 2; j++){
        while(true){
            a = randomInteger(0, 19);
            if(cards[a] == undefined){
                cards[a] = i; 
                break;
            }
        }
    }
}

function button(targetCellNumber){
    let strCellNumber = "cell_" + targetCellNumber;
    let strCards = "images/" + cards[targetCellNumber] + ".png";

    if((document.getElementById(strCellNumber).src.indexOf("images/blank.jpg") != -1) || targetCellNumber == pressedButton || timerInAction){
        return;
    }
    
    if(pressedButton != null){
        //If cards are the same
        if(strCards == "images/" + cards[pressedButton] + ".png"){
            console.log("The same: " + targetCellNumber + " and " + pressedButton);
            
            timerInAction = true;
            setTimeout(function(){
                document.getElementById(strCellNumber).src = "images/blank.jpg";
                document.getElementById("cell_" + pressedButton).src = "images/blank.jpg";
                timerInAction = false;
                pressedButton = null;
            }, 1000);
        }else{
        //Not the same
            timerInAction = true;
            setTimeout(function(){ 
                document.getElementById(strCellNumber).src = "images/default.jpg";
                document.getElementById("cell_" + pressedButton).src = "images/default.jpg";
                pressedButton = null;
                timerInAction = false;
            }, 1500);
        }
    }else{
        pressedButton = targetCellNumber;
    }

    document.getElementById(strCellNumber).src = strCards;
}

function helpButton(){
    for(let i = 0; i < 20; i++){
        if(document.getElementById("cell_" + i).src.indexOf("images/blank.jpg") == -1)
            document.getElementById("cell_" + i).src = "images/" + cards[i] + ".png";
    }
    
    for(let i = 0; i < 20; i++){
        timerInAction = true;
        setTimeout(function(){
            if(document.getElementById("cell_" + i).src.indexOf("images/blank.jpg") == -1)
                document.getElementById("cell_" + i).src = "images/default.jpg";
            timerInAction = false;
        }, 3000);
    }
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}