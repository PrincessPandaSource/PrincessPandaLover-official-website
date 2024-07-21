/* Debug settings:
* 0: Off
* 1: Skip to card section with bet of 500 rings
* 2: 1 but insurance option is guranteed
* 3: 1 but split option is guranteed*/
const debug = 0;

/* General elements */
const ringCounter = document.getElementById("ringCounter");

/* Bet interface elements */
const betInterface = document.getElementById("betInterface");
const oneRing = document.getElementById("oneRing");
const fiveRings = document.getElementById("fiveRings");
const tenRings = document.getElementById("tenRings");
const twentyFiveRings = document.getElementById("twentyFiveRings");
const fiftyRings = document.getElementById("fiftyRings");
const hundredRings = document.getElementById("hundredRings");
const fiveHundredRings = document.getElementById("fiveHundredRings");
const ringsBetDeal = document.getElementById("ringsBetDeal");
const subsequentBet = document.getElementById("subsequentBet");
const subBetImg = document.getElementById("subBetImg");
const subBetLabel = document.getElementById("subBetLabel");
const secondBet = document.getElementById("secondBet");
const secBetImg = document.getElementById("secBetImg");
const secBetLabel = document.getElementById("secBetLabel");
const firstBet = document.getElementById("firstBet");
const firBetImg = document.getElementById("firBetImg");
const firBetLabel = document.getElementById("firBetLabel");

/* Card interface elements */
const cardInterface = document.getElementById("cardInterface");
const sonicsCardImgs = [
    document.getElementById("sonicsCard1"),
    document.getElementById("sonicsCard2"),
    document.getElementById("sonicsCard3"),
    document.getElementById("sonicsCard4"),
    document.getElementById("sonicsCard5")
];
const sonicsTotalDisplay = document.getElementById("sonicsTotal");
const playersCardImgs = [
    document.getElementById("playersCard1"),
    document.getElementById("playersCard2"),
    document.getElementById("playersCard3"),
    document.getElementById("playersCard4"),
    document.getElementById("playersCard5")
];
const playersTotalDisplay = document.getElementById("playersTotal");
const splitRow = document.getElementById("splitRow");
const splitCardImgs = [
    document.getElementById("splitCard1"),
    document.getElementById("splitCard2"),
    document.getElementById("splitCard3"),
    document.getElementById("splitCard4"),
    document.getElementById("splitCard5")
]
const ringsBetCard = document.getElementById("ringsBetCard");
const insuranceBetSection = document.getElementById("insuranceBetDisplay");
const insuranceBetDisplay = document.getElementById("insuranceBet");
const choiceButtons = document.getElementById("choiceButtons");
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const insureButton = document.getElementById("insureButton");
const doubleDownButton = document.getElementById("doubleDownButton");
const splitButton = document.getElementById("splitButton");
const resultSection = document.getElementById("resultSection");
const resultDisplay = document.getElementById("result");
const continueButton = document.getElementById("continueButton");

/* Game over interface elements */
const gameOverInteface = document.getElementById("gameOver");
const tryAgainButton = document.getElementById("tryAgain");

/* Shuffling interface elements */
const shufflingInterface = document.getElementById("shuffling");

/* Variables and arrays */
let beganBetting = true;
let rings = 2500;
let originalRings = rings;
let bettedRings = 0;
let betRingTokens = [];
const valueRingCorr = {
    '1': "images/ring.png",
    '5': "images/whiteRing.png",
    '10': "images/blueRing.png",
    '25': "images/cyanRing.png",
    '50': "images/greenRing.png",
    '100': "images/redRing.png",
    '500': "images/purpleRing.png"
};
const cardBack = "images/cardBack.jpg";
const cardNums = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "K", "Q", "J"];
const cardSuits = ["C", "H", "D", "S"];
let cardsDealt = [];
let sonicsCards = Array(5);
let sonicsTotal = 0;
let playersCards = Array(5);
let playersTotal = 0;
let firstTurn = true;
let blurjack = false;
let insuring = false;
let insuranceBet = 0;
let splitting = false;
let splitCards = Array(5);
let splitTotal = 0;
let whichRow = 0;
let splitsFirstTurn = [true, true];
let splitDoubles = [false, false];

/* General functions */
function updateRingCounter() {
    ringCounter.innerText = rings;
    ringsBetDeal.innerText = bettedRings;
}

/* Bet functions */
function updateYourBetTokens() {
    bettedRings = betRingTokens.reduce((partialSum, a) => partialSum + a, 0);
    rings = Math.max(0, originalRings - bettedRings);
    updateRingCounter();

    if (betRingTokens.length == 0) {
        subsequentBet.style.display = "none";
        secondBet.style.display = "none";
        firstBet.style.display = "none";
    } else if (betRingTokens.length == 1) {
        subsequentBet.style.display = "none";
        secondBet.style.display = "none";

        firstBet.classList = "bettedRing";
        firstBet.style.display = "block";
        firstBet.style.zIndex = 1;
        firstBet.style.marginLeft = "0";
        firstBet.style.cursor = "pointer";
        firBetImg.src = valueRingCorr[String(betRingTokens[betRingTokens.length - 1])];
        firBetLabel.innerText = betRingTokens[betRingTokens.length - 1];
    } else if (betRingTokens.length == 2) {
        subsequentBet.style.display = "none";

        secondBet.classList = "bettedRing";
        secondBet.style.display = "block";
        secondBet.style.zIndex = 1;
        secondBet.style.marginLeft = "0";
        secondBet.style.cursor = "pointer";
        secBetImg.src = valueRingCorr[String(betRingTokens[betRingTokens.length - 1])];
        secBetLabel.innerText = betRingTokens[betRingTokens.length - 1];

        firstBet.classList = "bettedRing unclickableRing";
        firstBet.style.display = "block";
        firstBet.style.zIndex = -1;
        firstBet.style.marginLeft = "-125px";
        firstBet.style.cursor = "default";
        firBetImg.src = valueRingCorr[String(betRingTokens[betRingTokens.length - 2])];
        firBetLabel.innerText = "";
    } else if (betRingTokens.length >= 3) {
        subsequentBet.classList = "bettedRing";
        subsequentBet.style.display = "block";
        subsequentBet.style.cursor = "pointer";
        subBetImg.src = valueRingCorr[String(betRingTokens[betRingTokens.length - 1])];
        subBetLabel.innerText = betRingTokens[betRingTokens.length - 1];

        secondBet.classList = "bettedRing unclickableRing";
        secondBet.style.display = "block";
        secondBet.style.zIndex = -1;
        secondBet.style.marginLeft = "-130px";
        secondBet.style.cursor = "default";
        secBetImg.src = valueRingCorr[String(betRingTokens[betRingTokens.length - 2])];
        secBetLabel.innerText = "";

        firstBet.classList = "bettedRing unclickableRing";
        firstBet.style.display = "block";
        firstBet.style.zIndex = -2;
        firstBet.style.marginLeft = "-125px";
        firstBet.style.cursor = "default";
        firBetImg.src = valueRingCorr[String(betRingTokens[betRingTokens.length - 3])];
        firBetLabel.innerText = "";
    }
}

function updateBetDisplay() {
    updateYourBetTokens();

    if (beganBetting) {
        const ringValues = [500, 100, 50, 25, 10, 5, 1];
        for (let value of ringValues) {
            while (rings < value && betRingTokens.includes(value)) {
                const index = betRingTokens.findIndex(i => i == value);
                betRingTokens.splice(index, 1);
                updateYourBetTokens();
            }
        }
        beganBetting = false;
    }

    const ringElements = {
        1: oneRing,
        5: fiveRings,
        10: tenRings,
        25: twentyFiveRings,
        50: fiftyRings,
        100: hundredRings,
        500: fiveHundredRings
    };

    for (let [value, element] of Object.entries(ringElements)) {
        element.classList = rings >= value ? "ringToBet" : "ringToBet disabledRing";
    }
}

function switchToBet() {
    betInterface.classList = "shown";
    cardInterface.classList = "hidden";
    splitRow.classList = "rowMain hidden";
    gameOverInteface.classList = "hidden";
    shufflingInterface.classList = "hidden";

    beganBetting = true;
    updateBetDisplay();
    updateRingCounter();
}

/* Game over functions */
function switchToGameOver() {
    betInterface.classList = "hidden";
    cardInterface.classList = "hidden";
    splitRow.classList = "rowMain hidden";
    gameOverInteface.classList = "shownFlex";

    updateRingCounter();
}

function switchToShuffling() {
    cardInterface.classList = "hidden";
    splitRow.classList = "rowMain hidden";
    shufflingInterface.classList = "shownFlex";
    updateRingCounter();

    cardsDealt = [];

    setTimeout(() => {
        switchToBet();
      }, 2000);      
}

/* Card functions */
function totalWithAce(sumWithoutAces, aceCount) {
    let bestValue = sumWithoutAces;
    for (let i = 0; i < aceCount; i++) {
        if (bestValue + 11 <= 21) {
        bestValue += 11;
        } else {
        bestValue += 1;
        }
    }

    return bestValue;
}

function updateCardDisplay() {
    let cardNum;
    let aceCount = 0;
    sonicsTotal = 0;
    for (let i = 0; i < sonicsCards.length; i++) {
        if (!sonicsCards[i]) {
            sonicsCardImgs[i].style.visibility = "hidden";
        } else {
            sonicsCardImgs[i].style.visibility = "visible";
            if (sonicsCards[i] == "back" || (i == 1 && insuring)) {
                sonicsCardImgs[i].src = cardBack;
                if (i == 1 && sonicsCards[i] != "back") {
                    cardNum = sonicsCards[i][0];
                    if (cardNum == "A") {
                        aceCount++;
                    } else if ((cardNum == "K") || (cardNum == "Q") || (cardNum == "J") || (cardNum == "T")) {
                        sonicsTotal += 10;
                    } else {
                        sonicsTotal += parseInt(cardNum);
                    } 
                }
            } else {
                sonicsCardImgs[i].src = "images/cardFronts/".concat(sonicsCards[i], ".jpg");
                cardNum = sonicsCards[i][0];
                if (cardNum == "A") {
                    aceCount++;
                } else if ((cardNum == "K") || (cardNum == "Q") || (cardNum == "J") || (cardNum == "T")) {
                    sonicsTotal += 10;
                } else {
                    sonicsTotal += parseInt(cardNum);
                }
            }
        }
    }
    sonicsTotal = totalWithAce(sonicsTotal, aceCount);
    if (!insuring) {
        sonicsTotalDisplay.innerText = sonicsTotal;
    }

    aceCount = 0;
    playersTotal = 0;
    for (let i = 0; i < playersCards.length; i++) {
        if (!playersCards[i]) {
            playersCardImgs[i].style.visibility = "hidden";
        } else {
            playersCardImgs[i].style.visibility = "visible";
            if (playersCards[i] == "back") {
                playersCardImgs[i].src = cardBack;
            } else {
                playersCardImgs[i].src = "images/cardFronts/".concat(playersCards[i], ".jpg");
                cardNum = playersCards[i][0];
                if (cardNum == "A") {
                    aceCount++;
                } else if ((cardNum == "K") || (cardNum == "Q") || (cardNum == "J") || (cardNum == "T")) {
                    playersTotal += 10;
                } else {
                    playersTotal += parseInt(cardNum);
                }
            }
        }
    }
    playersTotal = totalWithAce(playersTotal, aceCount);
    playersTotalDisplay.innerText = playersTotal;

    if (splitCards[0]) {
        aceCount == 0;
        splitTotal = 0;
        for (let i = 0; i < splitCards.length; i++) {
            if (!splitCards[i]) {
                splitCardImgs[i].style.visibility = "hidden";
            } else {
                splitCardImgs[i].style.visibility = "visible";
                if (splitCards[i] == "back") {
                    splitCardImgs[i].src = cardBack;
                } else {
                    splitCardImgs[i].src = "images/cardFronts/".concat(splitCards[i], ".jpg");
                    cardNum = splitCards[i][0];
                    if (cardNum == "A") {
                        aceCount++;
                    } else if ((cardNum == "K") || (cardNum == "Q") || (cardNum == "J") || (cardNum == "T")) {
                        splitTotal += 10;
                    } else {
                        splitTotal += parseInt(cardNum);
                    }
                }
            }
        }
        splitTotal = totalWithAce(splitTotal, aceCount);
    }
}

function dealCard(side, num) {
    /* Pick card */
    let cardId;
    while(!cardsDealt.includes(cardId)) {
        let cardNum = cardNums[Math.floor(Math.random() * cardNums.length)];
        let cardSuit = cardSuits[Math.floor(Math.random() * cardSuits.length)];
        cardId = cardNum.concat(cardSuit);
        if (!cardsDealt.includes(cardId)) {
            cardsDealt.push(cardId);
        }
    }

    /* Give card to side */
    if (side == "Sonic") {
        sonicsCards[num] = cardId;
    } else if (side == "Player") {
        playersCards[num] = cardId;
    } else if (side == "Split") {
        splitCards[num] = cardId;
    }

    updateCardDisplay();
}

function updateButtonDisplay() {
    ringsBetCard.innerText = bettedRings;
    insuranceBetDisplay.innerText = insuranceBet;

    if ((sonicsCards[0][0] == "A") && (firstTurn)) {
        insureButton.style.display = "block";
    } else {
        insureButton.style.display = "none";
    }

    if (/*((splitting && !splitDoubles[whichRow]) || (*/firstTurn/* && !splitting))*/ && (rings >= bettedRings)) {
        doubleDownButton.style.display = "block";
    } else {
        doubleDownButton.style.display = "none";
    }

    /* Check for duplicate values in card */
    let duplicates = false;
    if ((playersCards[0][0] == "T" || playersCards[0][0] == "K" || playersCards[0][0] == "Q" || playersCards[0][0] == "J")
        && (playersCards[1][0] == "T" || playersCards[1][0] == "K" || playersCards[1][0] == "Q" || playersCards[1][0] == "J")) {
        duplicates = true;
    }
    if (playersCards[0][0] == playersCards[1][0]) {
        duplicates = true;
    }
    if ((firstTurn) && (duplicates)) {
        splitButton.style.display = "block";
    } else {
        splitButton.style.display = "none";
    }
}

function showResult(text) {
    choiceButtons.style.display = "none";
    resultDisplay.innerText = text;
    resultSection.style.display = "flex";
}

function swapArray(x, y) {
    if (whichRow == 0) {
        whichRow = 1;
    } else {
        whichRow = 0;
    }
    let temp = x.splice(0, x.length);
    x.push.apply(x, y);
    y.length = 0;
    y.push.apply(y, temp);
}

function hit() {
    if (splitting & !splitsFirstTurn[whichRow]) {
        swapArray(playersCards, splitCards);
    }
    firstTurn = false;
    let nextSpot;
    for (let i = 0; i < playersCards.length; i++) {
        if (!playersCards[i]) {
            nextSpot = i;
            break;
        }
    }
    dealCard("Player", nextSpot);
    updateCardDisplay();
    updateButtonDisplay();

    if (playersTotal == 21) {
        stand();
        return;
    }
    
    if (playersTotal > 21) {
        if (insuring) {
            insuring = false;
        } else {
            dealCard("Sonic", 1);
        }
        updateCardDisplay();
        showResult("Sonic wins");
        return;
    }
}

function stand() {
    firstTurn = false;
    if (insuring) {
        insuring = false;
    } else {
        dealCard("Sonic", 1);
    }
    updateCardDisplay();
    
    if (!blurjack) {
        while (sonicsTotal < 17) {
            let nextSpot;
            for (let i = 0; i < sonicsCards.length; i++) {
                if (!sonicsCards[i]) {
                    nextSpot = i;
                    break;
                }
            }
            dealCard("Sonic", nextSpot);
            updateCardDisplay();
        }
    }

    if (sonicsTotal == playersTotal) {
        showResult("Push");
    }
    else if (playersTotal > 21) {
        showResult("Sonic wins");
    }
    else if ((sonicsTotal > 21) || (sonicsTotal < playersTotal)) {
        showResult("Player wins");
    } else {
        showResult("Sonic wins");
    }
}

function doubleDown() {
    splitDoubles[whichRow] = true;
    bettedRings *= 2;
    hit();
    if (!splitting || (splitDoubles[0] && splitDoubles[1])) {
        updateCardDisplay();
        updateButtonDisplay();
        stand();
    } else {
        swapArray(playersCards, splitCards);
        updateCardDisplay();
        updateButtonDisplay();
        if (playersTotal >= 21) {
            stand();
        }
    }
}

function insure() {
    firstTurn = false;
    insuring = true;
    insuranceBetSection.classList = "shownFlex";
    insuranceBet = Math.round(bettedRings / 2);
    rings = originalRings - bettedRings - insuranceBet;
    updateButtonDisplay();

    dealCard("Sonic", 1);
    if (sonicsTotal == 21) {
        updateCardDisplay();
        showResult("Won insurance");
    } else {
        showResult("Lost insurance");
    }
}

function split() {
    firstTurn = false;
    splitting = true;

    splitRow.classList = "rowMain shown";
    splitCards[0] = playersCards[1];
    dealCard("Player", 1);
    dealCard("Split", 1);
    updateCardDisplay();
    updateButtonDisplay();
}

function determineIfToShuffle() {
    if ((52 - cardsDealt.length) < 10) {
        switchToShuffling();
    } else {
        switchToBet();
    }
}

function continueFunction() {
    switch(resultDisplay.textContent) {
        case "Sonic wins":
            originalRings = rings;
            if (originalRings <= 0) {
                switchToGameOver();
            } else {
                if (splitting && splitRow.classList == "rowMain shown") {
                    /*if (splitDoubles[whichRow] || playersTotal >= 21) {
                        swapArray(playersCards, splitCards);
                        whichRow = 1 - whichRow; // Toggle between 0 and 1
                        if (splitDoubles[whichRow] || playersTotal >= 21) {
                            splitRow.classList = "rowMain hidden";
                            determineIfToShuffle();
                        } else {
                            updateCardDisplay();
                            resultSection.style.display = "none";
                            choiceButtons.style.display = "flex";
                            updateRingCounter();
                            updateButtonDisplay();
                        }
                    } else {*/
                        swapArray(playersCards, splitCards);
                            splitRow.classList = "rowMain hidden";
                            updateCardDisplay();
                            if (sonicsTotal == playersTotal) {
                                showResult("Push");
                            }
                            else if (playersTotal > 21) {
                                showResult("Sonic wins");
                            }
                            else if ((sonicsTotal > 21) || (sonicsTotal < playersTotal)) {
                                showResult("Player wins");
                            } else {
                                showResult("Sonic wins");
                            }
                    }
                /*}*/ else {
                    determineIfToShuffle();
                }
            }
            break;
        case "Player wins":
            if (blurjack) {
                originalRings += Math.round(bettedRings * 1.5);
            } else {
                originalRings += bettedRings;
            }
            rings = originalRings;
            if (splitting && splitRow.classList == "rowMain shown") {
                /*if (splitDoubles[whichRow] || playersTotal >= 21) {
                    swapArray(playersCards, splitCards);
                    whichRow = 1 - whichRow; // Toggle between 0 and 1
                    if (splitDoubles[whichRow] || playersTotal >= 21) {
                        splitRow.classList = "rowMain hidden";
                        determineIfToShuffle();
                    } else {
                        updateCardDisplay();
                        resultSection.style.display = "none";
                        choiceButtons.style.display = "flex";
                        updateRingCounter();
                        updateButtonDisplay();
                    }
                } else {*/
                    swapArray(playersCards, splitCards);
                        splitRow.classList = "rowMain hidden";
                        updateCardDisplay();
                        if (sonicsTotal == playersTotal) {
                            showResult("Push");
                        }
                        else if (playersTotal > 21) {
                            showResult("Sonic wins");
                        }
                        else if ((sonicsTotal > 21) || (sonicsTotal < playersTotal)) {
                            showResult("Player wins");
                        } else {
                            showResult("Sonic wins");
                        }
                }
            /*}*/ else {
                determineIfToShuffle();
            }
            break;
        case "Push":
            if (splitting && splitRow.classList == "rowMain shown") {
                /*if (splitDoubles[whichRow] || playersTotal >= 21) {
                    swapArray(playersCards, splitCards);
                    whichRow = 1 - whichRow; // Toggle between 0 and 1
                    if (splitDoubles[whichRow] || playersTotal >= 21) {
                        splitRow.classList = "rowMain hidden";
                        determineIfToShuffle();
                    } else {
                        updateCardDisplay();
                        resultSection.style.display = "none";
                        choiceButtons.style.display = "flex";
                        updateRingCounter();
                        updateButtonDisplay();
                    }
                } else {*/
                    swapArray(playersCards, splitCards);
                        splitRow.classList = "rowMain hidden";
                        updateCardDisplay();
                        if (sonicsTotal == playersTotal) {
                            showResult("Push");
                        }
                        else if (playersTotal > 21) {
                            showResult("Sonic wins");
                        }
                        else if ((sonicsTotal > 21) || (sonicsTotal < playersTotal)) {
                            showResult("Player wins");
                        } else {
                            showResult("Sonic wins");
                        }
                }
            /*}*/ else {
                determineIfToShuffle();
            }
            break;
        case "Blurjack!":
            blurjack = true;
            stand();
            break;
        case "Won insurance":
            originalRings = originalRings - bettedRings + (insuranceBet * 2);
            insuring = false;
            insuranceBetSection.classList = "hidden";
            determineIfToShuffle();
            break;
        case "Lost insurance":
            originalRings -= insuranceBet;
            rings = originalRings - bettedRings;
            insuranceBetSection.classList = "hidden";
            resultSection.style.display = "none";
            choiceButtons.style.display = "flex";
            updateRingCounter();
            updateButtonDisplay();
            break;
    }
}

function switchToCards() {
    ringsBetCard.innerText = bettedRings;

    betInterface.classList = "hidden";
    cardInterface.classList = "shownFlex";

    /* Reset */
    sonicsCards = Array(5);
    playersCards = Array(5);
    firstTurn = true;
    insuring = false;
    splitting = false;
    splitCards = Array(5);
    blurjack = false;
    whichRow = 0;
    splitDoubles = [false, false];
    splitsFirstTurn = [false, false];
    choiceButtons.style.display = "flex";
    resultSection.style.display = "none";

    /* Start card dealing */
    if (debug == 2) {
        sonicsCards[0] = "AC";
    } else {
        dealCard("Sonic", 0);
    }
    sonicsCards[1] = "back";
    if (debug == 3) {
        playersCards[0] = "5H";
        playersCards[1] = "5D";
        updateCardDisplay();
    } else {
        dealCard("Player", 0);
        dealCard("Player", 1);
    }
    updateButtonDisplay();

    /* Blurjack! */
    if (playersTotal == 21) {
        showResult("Blurjack!");
    }
}

/* Bet event listeners */
oneRing.addEventListener("click", function() {
    betRingTokens.push(1);
    updateBetDisplay();
});
fiveRings.addEventListener("click", function() {
    betRingTokens.push(5);
    updateBetDisplay();
});
tenRings.addEventListener("click", function() {
    betRingTokens.push(10);
    updateBetDisplay();
});
twentyFiveRings.addEventListener("click", function() {
    betRingTokens.push(25);
    updateBetDisplay();
});
fiftyRings.addEventListener("click", function() {
    betRingTokens.push(50);
    updateBetDisplay();
});
hundredRings.addEventListener("click", function() {
    betRingTokens.push(100);
    updateBetDisplay();
});
fiveHundredRings.addEventListener("click", function() {
    betRingTokens.push(500);
    updateBetDisplay();
});

subsequentBet.addEventListener("click", function() {
    if (betRingTokens.length >= 3) {
        betRingTokens.pop();
        updateBetDisplay();
    }
});
secondBet.addEventListener("click", function() {
    if (betRingTokens.length == 2) {
        betRingTokens.pop();
        updateBetDisplay();
    }
});
firstBet.addEventListener("click", function() {
    if (betRingTokens.length == 1) {
        betRingTokens.pop();
        updateBetDisplay();
    }
});

dealButton.addEventListener("click", function() {
    if (bettedRings > 0) {
        switchToCards();
    } else {
        alert("You need to bet rings!");
    }
})

/* Card interface event listeners */
hitButton.addEventListener("click", function() {
    hit();
});

standButton.addEventListener("click", function() {
    stand();
});

insureButton.addEventListener("click", function() {
    insure();
});

doubleDownButton.addEventListener("click", function() {
    doubleDown();
});

splitButton.addEventListener("click", function() {
    split();
});

continueButton.addEventListener("click", function() {
    continueFunction();
});

/* Game over event listeners */
tryAgainButton.addEventListener("click", function() {
    /*Reset everything*/
    beganBetting = true;
    rings = 2500;
    originalRings = rings;
    bettedRings = 0;
    betRingTokens = [];

    switchToBet();
})

/* Start game */
updateRingCounter();
updateBetDisplay();

if (debug != 0) {
    betRingTokens.push(500);
    bettedRings = 500;
    rings -= bettedRings;
    switchToCards();
    updateRingCounter();
}