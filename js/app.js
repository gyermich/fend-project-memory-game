/*
 * Create a list that holds all of your cards
 */

// get a NodeList of cards and convert it to an array to be able to shuffle
let cards = [...document.querySelectorAll("li.card")];
let openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 shuffledCards = shuffle(cards);

let deck = document.querySelector(".deck");

// clear contents of deck
deck.innerHTML = '';

// aapend shuffled cards to deck
for (const card of shuffledCards) {
    deck.appendChild(card);
};

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

function clearOpenCards() {
    openCards = [];
}

function checkMatch() {
    const [card1, card2] = openCards;
    if (card1.firstElementChild.classList[1] !== card2.firstElementChild.classList[1]) {
        card1.classList.add("no-match");
        card2.classList.add("no-match");
        return false;
    } else {
        return true;
    }
}

deck.addEventListener('click', function(event) {
    event.preventDefault();

    if (event.target.nodeName === "LI") {
        let card = event.target;

        displayCardSymbol(card);
        addToOpenCards(card);

        if (openCards.length == 2) {
            if (checkMatch()) {
                window.setTimeout(lockOpenCards(), 1000);
            } else {
                window.setTimeout(hideOpenCards, 1000);
            }
            window.setTimeout(clearOpenCards, 1000);
        }

    }
});
