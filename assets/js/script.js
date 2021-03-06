//While coding this I followed a tutorial to achieve basic game functionality, then built my own features on top of that code, see credits in ReadME
/* Sound Control */
class AudioController {
    constructor() {
        this.bgMusic = document.getElementById('bgMusic');
        this.bgMusic.volume = 0.2;
        this.bgMusic.loop = true; // so that if player is between levels the audio does not stop
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
    }
    
}
document.addEventListener("DOMContentLoaded", () => {
    let audioController = new AudioController();
    audioController.startMusic();
    const gameDifficulty = {
        easy: easycards,
        medium: mediumcards,
        hard: hardcards,
    };
    function setDifficulty(e) {
        difficultyLevel = e.target.id;
        cardArray = gameDifficulty[difficultyLevel];
        cardArray.sort(() => 0.5 - Math.random());
        createBoard();
    }
    let difficultyLevel = "easy";
    let cardArray = gameDifficulty[difficultyLevel];
    const easyButton = document.querySelector("#easy");
    const mediumButton = document.querySelector("#medium");
    const hardButton = document.querySelector("#hard");
    easyButton.addEventListener("click", setDifficulty);
    mediumButton.addEventListener("click", setDifficulty);
    hardButton.addEventListener("click", setDifficulty);
    cardArray.sort(() => 0.5 - Math.random());
    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");
    var cardsChosen = [];
    var cardsChosenId = [];
    let cardsWon = [];
    //create your board
    function createBoard() {
        grid.innerHTML = "";
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement("img");
            card.setAttribute("src", "assets/images/blank.png");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    }
    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute("src", "assets/images/blank.png");
            cards[optionTwoId].setAttribute("src", "assets/images/blank.png");
        } else if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute("src", "assets/images/white.png");
            cards[optionTwoId].setAttribute("src", "assets/images/white.png");
            cards[optionOneId].removeEventListener("click", flipCard);
            cards[optionTwoId].removeEventListener("click", flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute("src", "assets/images/blank.png");
            cards[optionTwoId].setAttribute("src", "assets/images/blank.png");
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = " You Won!";
            cardsWon = [];
        }
        
    }
    //flip your card
    function flipCard() {
        var cardId = this.getAttribute("data-id");
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute("src", cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
    createBoard();
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    };
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };
    // volume button
    document.getElementById('muteButton').addEventListener("click", () => {
        let mute_btn = document.getElementById("muteId");
        if (mute_btn.classList.contains('fa-volume-up')) {
            audioController.startMusic();
        } else {
           audioController.stopMusic();
        }
        mute_btn.classList.toggle('fa-volume-up');
        mute_btn.classList.toggle('fa-volume-mute');
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});