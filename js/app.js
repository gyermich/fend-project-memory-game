/*
 * Create a list that holds all of your cards
 */

// get a NodeList of cards and convert it to an array to be able to shuffle
let cards = [...document.querySelectorAll("li.card")];
let openCards = [];
let moves = 0;
let deck = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function shuffleDeck() {
    // shuffle cards
    shuffledCards = shuffle(cards);
    // clear contents of deck
    deck.innerHTML = '';
    // apend shuffled cards to deck
    for (const card of shuffledCards) {
        deck.appendChild(card);
    };
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function displayCardSymbol(card) {
    card.classList.add("open", "show");
}


function addToOpenCards(card) {
    openCards.push(card);
}

function lockOpenCards() {
    for (let card of openCards) {
        card.classList.add("match");
    };
}

function hideOpenCards() {
    for (let card of openCards) {
        card.classList.remove("open", "show", "no-match");
    };
}

function resetCards() {
    for (let card of cards) {
        card.classList.remove("open", "show", "no-match", "match", "zoom");
    };
}

function clearOpenCards() {
    openCards = [];
}

function shakeCards() {
    for (let card of openCards) {
        card.classList.add("no-match");
    };
}

function zoomCards() {
    for (let card of openCards) {
        card.classList.add("zoom");
    };
}

function isMatch() {
    const [card1, card2] = openCards;
    if (card1.firstElementChild.classList[1] !== card2.firstElementChild.classList[1]) {
        shakeCards();
        return false;
    } else {
        zoomCards();
        return true;
    }
}

function updateMovesCount() {
    document.querySelector(".moves").textContent = moves;
}

shuffleDeck();

deck.addEventListener('click', function(event) {
    event.preventDefault();
    // check if the clicked element is li
    if (event.target.nodeName === "LI") {
        let card = event.target;

        displayCardSymbol(card);
        addToOpenCards(card);

        // check if there are 2 open cards
        if (openCards.length == 2) {
            if (isMatch()) {
                // if it's a match lock them open
                lockOpenCards();
            } else {
                // otherwise hide the cards
                window.setTimeout(hideOpenCards, 1000);
            }
            moves++
            updateMovesCount();
            // when done checking if it's a match clear list of open cards
            window.setTimeout(clearOpenCards, 1000);
        };
        if (deck.querySelectorAll(".match").length === 16) {
            alert("YES!");
        }
    }
});

document.querySelector(".restart").addEventListener("click", function(event){
    // reset moves
    moves = 0;
    updateMovesCount();
    resetCards();
    shuffleDeck();
})
