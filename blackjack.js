var dealersum = 0;
var playersum = 0;

var dealeracecount =0;//håller koll på hur många ace dealern har 
var playeracecount = 0; //håller koll på hur många ace playern har 

var hidden;
var Deck;

var canhit = true; // om du är under 21 så kan då "hit"

window.onload = function(){
    builddeck();
    shuffledeck();
    startgame();
}

function builddeck(){
    let values = ["ACE","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let types = ["Clubs","Diamonds","Hearts","Spades"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let x = 0; x < values.length; x++) {
            deck.push(values[x] + "_" + types[i]);//för varje type lägger den till en value
        }
    }
    
}

function shuffledeck(){
    for (let i = 0; i < deck.length; i++) {
        let x = Math.floor(Math.random()*deck.length); // den shufflar kortleken
        let temp = deck[i];
        deck[i] = deck[x]
        deck[x] = temp;


        
    }
    console.log(deck)
}

function startgame(){
    hidden = deck.pop();
    dealersum += getvalue(hidden);
    dealeracecount += checkace(hidden);
    console.log(hidden);
    console.log(dealersum);

    while(dealersum<17){
       let cardimg = document.createElement("img");
       let card = deck.pop();
        cardimg.src = "./KIN's_Playing_Cards/" + card + ".png";
        dealersum += getvalue(card);
        dealeracecount += checkace(card);
        document.getElementById("dealer-cards").append(cardimg);
    }
console.log(dealersum);

for (let i =0; i<2; i++){
    let cardimg = document.createElement("img");
    let card = deck.pop();
     cardimg.src = "./KIN's_Playing_Cards/" + card + ".png";
     playersum += getvalue(card);
     playeracecount += checkace(card);
     document.getElementById("player-cards").append(cardimg);

     if (reduceAce(playersum,playeracecount) >21){
        canhit = false;
     }
    
     console.log(playersum);
     document.getElementById("hit").addEventListener("click", hit);
     document.getElementById("stand").addEventListener("click", stand);
}

}


function hit(){
    if (!canhit){
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./KIN's_Playing_Cards/" + card + ".png"
    playersum += getvalue(card);
    playeracecount += checkace(card);
    document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playersum, playeracecount) > 21){
        canhit = false;

    }

}

function stand(){
    dealersum = reduceAce(dealersum, dealeracecount);
    playersum = reduceAce(playersum, playeracecount);

    canhit = false;
    document.getElementById("hidden").src = "./KIN's_Playing_Cards/" + hidden +".png";

    let message = "";
    if (playersum > 21) {
        message = "You lost!!"
    }
    else if (dealersum > 21) {
        message = "You win!!"
    }
    else if (playersum == dealersum){
        message = "Tie"
    }
    else if (playersum > dealersum){
        message ="You win!!"
    }
    else if (playersum < dealersum){
        message ="You lost!!"
    }
    document.getElementById("dealer-sum").innerText = dealersum;
    document.getElementById("player-sum").innerText = playersum;
    document.getElementById("results").innerText = message;
}

function getvalue(card){
    let data = card.split("_"); //Bryter upp kortet  4_Clubs ->  ["4", "Clubs"]
    let value = data[0];

    if (isNaN(value)){
        if (value == "ACE"){ //om kortet inte har en siffra och om det är ACE får man 11. om K,Q,J return 10, annars titta vilket nummer det är och returnar value.
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkace(card){
    if (card[0] == "ACE"){
        return 1;
    }
    return 0;
}

function reduceAce(playersum,playeracecount){
    while (playersum > 21 && playeracecount>0){
        playersum -=10;
        playeracecount -=1;
    }
    return playersum;
}

function reduceAce(playersum, playeracecount) {
    while (playersum > 21 && playeracecount > 0) {
        playersum -= 10;
        playeracecount -= 1;
    }
    return playersum;
}