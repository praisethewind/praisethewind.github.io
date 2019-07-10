let cardsAmount = 24,
    cards,
    pressedButton = null,
    timerInAction = false,
    seconds, minutes, t,
    sw = document.getElementById('stopwatch');

// First start
restart();

// Bold text for botton "normal"
document.getElementsByClassName('difficultyButton')[1].style.fontWeight = 'bold';

// Stopwatch
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds %= 60;
        minutes++;
    }
    sw.textContent = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

// Restart game (regenerate cards)
function restart() {
    if (timerInAction) return;
    sw.textContent = '00:00';
    seconds = 0; minutes = 0;
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
        document.getElementById('cell_' + i).src = 'images/default.jpg';
    }

    document.getElementById('helpbutton').innerHTML = '<input type="button" value="Подсказка(+30sec)" onclick="helpButton()">';
    // timer restart
    clearTimeout(t);
    timer();
}

// On press on card func
function button(targetCellNumber){
    let strCellNumber = 'cell_' + targetCellNumber;
    let strCards = 'images/' + cards[targetCellNumber] + '.png';

    if((document.getElementById(strCellNumber).src.indexOf('images/blank.jpg') != -1) || targetCellNumber == pressedButton || timerInAction){
        return;
    }
    
    if(pressedButton != null){
        //If cards are the same
        if(strCards == 'images/' + cards[pressedButton] + '.png'){
            console.log('The same: ' + targetCellNumber + ' and ' + pressedButton);
            
            timerInAction = true;
            setTimeout(function(){
                document.getElementById(strCellNumber).src = 'images/blank.jpg';
                document.getElementById('cell_' + pressedButton).src = 'images/blank.jpg';
                timerInAction = false;
                pressedButton = null;
                // Is every card is white?
                endGameCheck();
            }, 1000);
        }else{
        //Not the same
            timerInAction = true;
            setTimeout(function(){ 
                document.getElementById(strCellNumber).src = 'images/default.jpg';
                document.getElementById('cell_' + pressedButton).src = 'images/default.jpg';
                pressedButton = null;
                timerInAction = false;
            }, 1500);
        }
    }else{
        pressedButton = targetCellNumber;
    }

    document.getElementById(strCellNumber).src = strCards;
}

// Highligth all cards for 3 sec. Adds 30 sec on timer
function helpButton(){
    if(timerInAction) return;
    for(let i = 0; i < cardsAmount; i++){
        if(document.getElementById('cell_' + i).src.indexOf('images/blank.jpg') == -1)
            document.getElementById('cell_' + i).src = 'images/' + cards[i] + '.png';
    }
    
    for(let i = 0; i < cardsAmount; i++){
        timerInAction = true;
        setTimeout(function(){
            if(document.getElementById('cell_' + i).src.indexOf('images/blank.jpg') == -1)
                document.getElementById('cell_' + i).src = 'images/default.jpg';
            timerInAction = false;
        }, 3000);
    }
    seconds += 30;
}

// Random int number generate
function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

// Is every pair of cards is found
function endGameCheck() {
    for(let i = 0; i < cardsAmount; i++){
        if(document.getElementById('cell_' + i).src.indexOf('images/blank.jpg') == -1){
            return;
        }
    }
    // Stop timer
    clearTimeout(t);
    timerInAction = true;
    setTimeout(function(){
        for(let i = 0; i < cardsAmount; i++)
            document.getElementById('cell_' + i).src = 'images/' + cards[i] + '.png';
        timerInAction = false;
    }, 300);

    document.getElementById('helpbutton').innerHTML = 'Level complete<br>Want restart?';
}

// Change difficulty level (number of columns - 5,6,7)
function changeCells(columns) {
    if(cardsAmount/4 == columns || timerInAction)
        return;
    else if(cardsAmount/4 > columns) {
        for(let i = cardsAmount-1; i > columns*4-1; i--) {
            document.getElementsByClassName('gameButton')[i].remove();
        }
    } else if(cardsAmount/4 < columns) {
        for(let i = cardsAmount; i < columns*4; i++) {
            let parent = document.createElement('div');
            parent.className = 'gameButton';
            parent.innerHTML = '<img id="cell_' + i + '" onclick="button(' + i + ')" src="images/default.jpg">';
            cardsList.appendChild(parent);
        }
    } 
    for(let i = 0; i < 3; i++) {
        document.getElementsByClassName('difficultyButton')[i].style.fontWeight = 'normal';
    }
    document.getElementsByClassName('difficultyButton')[columns-5].style.fontWeight = 'bold';
    document.querySelector('.main_section').style.width = (columns*108) + 'px';
    cardsAmount = columns*4;
    restart();
}