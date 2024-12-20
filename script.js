let players = {
    user: { userName: "", score: 0, choice: "", },
    computer: { score: 0, choice: null, }
};

const choices = ["rock", "paper", "scissors"];
const icons = [
    rock = {
        label: "rock",
        src: "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/512/hand-rock-512.png"},
    paper = {
        label: "paper",
        src: "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/512/hand-paper-1024.png"},
    scissors = {
        label: "scissors",
        src: "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/512/hand-scissors-512.png",}];

let result = "";
let hasGameFinished = false;
let currentMessage = "";
let enemySelectionImage = "";
let playerSelectionImage = "";

const getComputerChoice = () => {
    players.computer["choice"] = Math.floor(Math.random() * 3) + 1; //Get a random number between 1 and 3.
    enemySelectionImage = document.getElementById("enemy-selection-image");
    enemySelectionImage.src = icons[players.computer["choice"] - 1].src;
}

function resetGame() {

}

const iconsWrapper = document.querySelector(".icons-wrapper");
iconsWrapper.addEventListener("click", (e) => {
    let isButton = e.target.nodeName === "IMG";
    if (!isButton || hasGameFinished) {
        return
    } else players.user["choice"] = e.target.classList.value;
    let playerSelectionImage = document.getElementById("player-selection-image");
    let iconSearch = icons.filter((icon) => icon.label === players.user["choice"]);
    playerSelectionImage.src = iconSearch[0].src;
    document.querySelector(".accordion").classList.remove("hidden");
    getComputerChoice();
    playRound(players.user["choice"], players.computer["choice"]);
});

function playRound(userChoice, computerChoice) {
    if (hasGameFinished) {
        return
    } else
        switch (computerChoice) {
            case 1: //ROCK
                result = userChoice === "rock" ? "It's a draw" :
                    userChoice === "scissors" ? "You lose" :
                        userChoice === "paper" ? "You win" : ""
                calculateScore(result);
                break;
            case 2: //PAPER
                result = userChoice === "rock" ? "You lose" :
                    userChoice === "scissors" ? "You win" :
                        userChoice === "paper" ? "It's a draw" : ""
                calculateScore(result);
                break;
            case 3: //SCISSORS
                result = userChoice === "rock" ? "You win" :
                    userChoice === "scissors" ? "It's a draw" :
                        userChoice === "paper" ? "You lose" : ""
                calculateScore(result);
                break;
        }
}

const accordion = document.querySelector(".accordion");
accordion.addEventListener("click", function () {
    this.classList.toggle("active");
    let accordionPanel = this.nextElementSibling;
    accordionPanel.classList.toggle("collapsed");
});

function calculateScore(result) {

    if (!hasGameFinished) {
        players.computer["score"] = result.split(" ").includes("win") ? players.computer["score"] :
            result.split(" ").includes("lose") ? players.computer["score"] += 1 :
                players.computer["score"];

        players.user["score"] = result.split(" ").includes("win") ? players.user["score"] += 1 :
            result.split(" ").includes("lose") ? players.user["score"] :
                players.user["score"];

        document.getElementById("enemy-score").textContent = players.computer["score"];
        document.getElementById("player-score").textContent = players.user["score"];
    }
    if (players.computer["score"] === 5 || players.user["score"] === 5) {
        hasGameFinished = true;
    }
    currentMessage = hasGameFinished ? `Game over! You: ${players.user["score"]} Opponent: ${players.computer["score"]}` :
        `You chose ${players.user["choice"]}. \r\n 
    Your opponent chose ${choices[+players.computer["choice"] - 1]}.. ` + result + `!`;
    appendResult();
}

function appendResult() {
    let listItem = document.createElement('li');
    document.querySelector(".results-list").appendChild(listItem);
    listItem.textContent = currentMessage;
}

function introAnimation() {
    document.querySelector(".icons-wrapper").classList.add("animate");
}

setTimeout(() => introAnimation(), 1000); 