const cardsAmount = 28;
let cards = [],
    pressedButton = null,
    timerInAction = false,
    seconds = 0, minutes = 0, t,
    sw = document.getElementById('stopwatch');

restart();

// Stopwatch
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds %= 60;
        minutes++;
    }
    sw.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

function restart() {
    sw.textContent = "00:00";
    seconds = 0; minutes = 0;
    if(timerInAction) return;
    cards = [];
    //Random generation of cards
    for(let i = 0; i < cardsAmount/2; i++){
        for(let j = 0; j < 2; j++){
            while(true){
                a = randomInteger(0, cardsAmount-1);
                if(cards[a] == undefined){
                    cards[a] = i; 
                    break;
                }
            }
        }
    }

    for(let i = 0; i < cardsAmount; i++){
        document.getElementById("cell_" + i).src = "images/default.jpg";
    }

    document.getElementById("helpbutton").innerHTML = '<input type="button" value="Подсказка(+30sec)" onclick="helpButton()">';
    clearTimeout(t);
    timer();
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
                endGameCheck();
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
    if(timerInAction) return;
    for(let i = 0; i < cardsAmount; i++){
        if(document.getElementById("cell_" + i).src.indexOf("images/blank.jpg") == -1)
            document.getElementById("cell_" + i).src = "images/" + cards[i] + ".png";
    }
    
    for(let i = 0; i < cardsAmount; i++){
        timerInAction = true;
        setTimeout(function(){
            if(document.getElementById("cell_" + i).src.indexOf("images/blank.jpg") == -1)
                document.getElementById("cell_" + i).src = "images/default.jpg";
            timerInAction = false;
        }, 3000);
    }
    seconds += 30;
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function endGameCheck() {
    for(let i = 0; i < cardsAmount; i++){
        if(document.getElementById("cell_" + i).src.indexOf("images/blank.jpg") == -1){
            return;
        }
    }
    clearTimeout(t);
    timerInAction = true;
    setTimeout(function(){
        for(let i = 0; i < cardsAmount; i++)
            document.getElementById("cell_" + i).src = "images/" + cards[i] + ".png";
        timerInAction = false;
    }, 300);

    document.getElementById("helpbutton").innerHTML = "Level complete<br>Want restart?";
}
