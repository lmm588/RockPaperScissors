let players = {
    user: { userName: "", score: 0, choice: "", },
    computer: { score: 0, choice: null, }
};

const choices = ["rock", "paper", "scissors"];
let result = "";
let hasGameFinished = false;
let currentMessage = "";

const getComputerChoice = () => {
    players.computer["choice"] = Math.floor(Math.random() * 4) + 1; //Get a random number between 1 and 3.
}

const getUserChoice = () => {
    document.querySelector(".icons-wrapper").addEventListener("click", (e) => {
        let isButton = e.target.nodeName === "BUTTON";
        if (!isButton) {
            return
        } else players.user["choice"] = e.target.innerHTML;
        getComputerChoice();
        playRound(players.user["choice"], players.computer["choice"]);
    });
}

function playRound(userChoice, computerChoice) {
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

function calculateScore(result) {
    players.computer["score"] = result.split(" ").includes("win") ? players.computer["score"] :
    result.split(" ").includes("lose") ? players.computer["score"] += 1 :
    players.computer["score"];

    players.user["score"] = result.split(" ").includes("win") ? players.user["score"] += 1 :
    result.split(" ").includes("lose") ? players.user["score"] :
    players.user["score"]

    currentMessage = `Your opponent chose ${choices[+players.computer["choice"] - 1]}.. ` + result + `! The current score is Player: ${players.user["score"]} Computer: ${players.computer["score"]}`;
    printCurrentMessage();
}

function printCurrentMessage() {
    console.log(currentMessage);
}

getUserChoice();