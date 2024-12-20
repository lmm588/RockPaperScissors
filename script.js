let players = {
    user: { userName: "", score: 0, choice: "", },
    computer: { score: 0, choice: null, }
};

const choices = ["rock", "paper", "scissors"];
let result = "";
let hasGameFinished = false;
let currentMessage = "";
let roundCount = 0;

const getComputerChoice = () => {
    players.computer["choice"] = Math.floor(Math.random() * 3) + 1; //Get a random number between 1 and 3.
}

function resetGame() {

}

const iconsWrapper = document.querySelector(".icons-wrapper");
iconsWrapper.addEventListener("click", (e) => {
    let isButton = e.target.nodeName === "IMG";
    if (!isButton || hasGameFinished) {
        return
    } else players.user["choice"] = e.target.classList.value;
    document.querySelector(".accordion").classList.remove("hidden")
    getComputerChoice();
    console.log(players.user["choice"]);
    console.log(players.computer["choice"]);
    playRound(players.user["choice"], players.computer["choice"]);
});

function playRound(userChoice, computerChoice) {
    if (players.computer["score"] === 5 || players.user["score"] === 5) {
        hasGameFinished = true;
        calculateScore(result);
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
    currentMessage = hasGameFinished ? `Game over! You: ${players.user["score"]} Opponent: ${players.computer["score"]}` :
        `You chose ${players.user["choice"]}. \r\n 
    Your opponent chose ${choices[+players.computer["choice"] - 1]}.. ` + result + `!`;
    roundCount += 1;
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