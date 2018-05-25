let openCards = [];
let moves = 0;
let deck = document.querySelector('.deck');
// get a NodeList of cards and convert it to an array to be able to shuffle
let cards = [...document.querySelectorAll('li.card')];
let elapsedTime = 0;
let playing = false;

function shuffleDeck() {
    // shuffle cards
    let shuffledCards = shuffle(cards);
    // clear contents of deck
    deck.innerHTML = '';
    // apend shuffled cards to deck
    shuffledCards.forEach(function(card) {
        deck.appendChild(card);
    });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function displayCardSymbol(card) {
    card.classList.add('open', 'show');
}

function addToOpenCards(card) {
    // only add a card if openCards doesn't already have it
    if (!openCards.includes(card)) {
        openCards.push(card);
    }
}

function lockOpenCards() {
    openCards.forEach(function(card) {
        card.classList.add('match');
    });
}

function hideOpenCards() {
    openCards.forEach(function(card) {
        card.classList.remove('open', 'show', 'no-match');
    });
}

function resetCards() {
    cards.forEach(function(card) {
        card.classList.remove('open', 'show', 'no-match', 'match', 'zoom');
    });
}

function clearOpenCards() {
    openCards = [];
}

function shakeCards() {
    openCards.forEach(function(card) {
        card.classList.add('no-match');
    });
}

function zoomCards() {
    openCards.forEach(function(card) {
        card.classList.add('zoom');
    });
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
    document.querySelector('.moves').textContent = moves;
}

function deductOneStar(star) {
    star.firstElementChild.classList.remove('fa-star');
    star.firstElementChild.classList.add('fa-star-o');
}

function resetStars(stars) {
    stars.forEach(function(star) {
        star.firstElementChild.classList.remove('fa-star-o');
        star.firstElementChild.classList.add('fa-star');
    });
}

function updateStarRating() {
    let stars = [...document.querySelector('.stars').children];

    if (moves > 15 && moves <= 30) {
        // deduct one star from rating
        deductOneStar(stars[2]);
    } else if (moves > 30) {
        // deduct second star
        deductOneStar(stars[1]);
    } else {
        // all three stars are displayed
        resetStars(stars);
    }
}

function showModalWithStats(header) {
    let starStats = document.querySelector('.stars').innerHTML;
    let moveStats = document.querySelector('.moves').textContent;
    let timeStats = document.querySelector('.timer').textContent;

    document.querySelector('.modal-stars').innerHTML = starStats;
    document.querySelector('.modal-moves').textContent = moveStats;
    document.querySelector('.modal-time').textContent = timeStats;
    document.querySelector('.modal-header').textContent = header;

    document.querySelector('.modal').style.display = 'block';
}

shuffleDeck();

deck.addEventListener('click', function(event) {
    event.preventDefault();
    // check if the clicked element is li
    if (event.target.nodeName === 'LI') {
        playing = true;
        let card = event.target;

        displayCardSymbol(card);
        addToOpenCards(card);

        // check if there are 2 open cards
        if (openCards.length === 2) {
            if (isMatch()) {
                // if it's a match lock them open
                lockOpenCards();
            } else {
                // otherwise hide the cards
                window.setTimeout(hideOpenCards, 800);
            }
            // increment moves count
            moves += 1;
            updateMovesCount();
            // map star rating to the moves count
            updateStarRating();
            // clear list of open cards
            window.setTimeout(clearOpenCards, 800);
        }
        // game over at 50 moves
        if (moves === 50) {
            playing = false;
            showModalWithStats('Game Over');
        }
        // all cards are matched - game won
        if (deck.querySelectorAll('.match').length === 16) {
            playing = false;
            showModalWithStats('You Won!');
        }
    }
});

function resetGame() {
    playing = false;
    moves = 0;
    elapsedTime = 0;
    updateMovesCount();
    updateStarRating();
    resetCards();
    shuffleDeck();
    document.querySelector('.timer').textContent = 'Time: 00:00';
    document.querySelector('.modal').style.display = 'none';
}

/*
 * Reset Button
 */

document.querySelector('.restart').addEventListener('click', resetGame);

/*
 * Modal Reset Button
 */

document.querySelector('.modal-restart').addEventListener('click', resetGame);

/*
 * Timer
 */

function padTimeDisplay(value) {
    let padding = '00';
    // pad the minutes/seconds display with 0, e.g. if value is '1', return '01'
    return padding.substring(value.toString().length) + value;
}

setInterval(function() {
    if (playing === true) {

        elapsedTime += 1;
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime - minutes * 60;

        let minutes_display = padTimeDisplay(minutes);
        let seconds_display = padTimeDisplay(seconds);
        document.querySelector('.timer').textContent = `Time: ${minutes_display}:${seconds_display}`;
    }
}, 1000);
