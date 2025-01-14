const startBtn = document.querySelector('.start');
startBtn.addEventListener('click', async () => {
    const gameStartMsg = document.createElement('p');
    gameStartMsg.textContent = "Game starts now!";
    gameStartMsg.setAttribute('style', 'font-size: 25px; margin: 10px;')
    gameStartMsg.setAttribute('id', 'gameStartMsg');
    
    const gameStartDiv = document.createElement('div');
    gameStartDiv.setAttribute('style', 'text-align: center;');
    gameStartDiv.setAttribute('class', 'gameStartDiv');
    gameStartDiv.append(gameStartMsg);
    

    const userInputMsg = document.createElement('p');
    userInputMsg.textContent = "Enter the number of rounds:  ";
    userInputMsg.setAttribute('style', 'font-size: 20px; margin: 0px 15px;');
    userInputMsg.setAttribute('id', 'userInputMsg');
    
    const userInputBox = document.createElement('input');
    userInputBox.setAttribute('type', 'number');
    userInputBox.setAttribute('id', 'userInputBox');
    userInputBox.setAttribute('style', 'padding: 0px 5px; width: 35px; border: none; border-bottom: 2px solid');
    
    const userInputDiv = document.createElement('div');
    userInputDiv.setAttribute('style', 'display: flex; justify-content: center;');

    const userSubmitBtn = document.createElement('button');
    userSubmitBtn.setAttribute('id', 'userSubmitBtn');
    userSubmitBtn.textContent = "Submit";
    userSubmitBtn.setAttribute('style', 'padding: 0px 15px; margin: 0px 10px; border: none; background-color: #3957a5; color: white; border-radius: 8px;');
    
    userInputDiv.appendChild(userInputMsg);
    userInputDiv.appendChild(userInputBox);
    userInputDiv.appendChild(userSubmitBtn);
    
    const userMsg = document.querySelector('.userMsg');
    userMsg.appendChild(gameStartDiv);
    userMsg.append(userInputDiv);

    const resetBtn = document.createElement('button');
    resetBtn.setAttribute('id', 'reset-btn');
    resetBtn.textContent = "Play Again";
    resetBtn.setAttribute('style', 'border: none; font-size: 20px; margin: 20px 2px; padding: 10px 30px; color: white; background-color: #ff7f50; border-radius: 15px; ');

    const resetArea = document.createElement('div');
    resetArea.setAttribute('class', 'reset-area');
    resetArea.setAttribute('style', 'text-align: center');
    resetArea.appendChild(resetBtn);

    const playArea = document.querySelector('.play-area');
    playArea.insertAdjacentElement('afterend', resetArea);
    
    
    const waitForRoundNumber = () => {
        return new Promise((resolve) => {
            userSubmitBtn.addEventListener('click', () => {
                const rounds = userInputBox.value;
                userInputBox.value = "";
                resolve(rounds);
            })
        })
    }
    const rounds = await waitForRoundNumber();
    console.log(rounds);


    const waitForUserInput = () => {
        return new Promise((resolve) => {
            const selectoinArea = document.querySelector('.image');
            selectoinArea.addEventListener('click', () => {
                let target = event.target;
                const choice = target.id;
                resolve(choice);
            }, {once: true})
        });
    };
    async function getHumanInput() {
        const choice = await waitForUserInput();
        return choice;
    }
    
    async function getComputerInput() {
        var num = (Math.floor(Math.random()*3))%3;
            // console.log(num);
            if(num == 0) {
                return "rock";
            } else if(num == 1) {
                return "paper";
            } else {
                return "scissor";
            }
    }

    let humanScore = 0, computerScore = 0;
    function playRound(humanChoice, computerChoice) {
        if((humanChoice == "paper" && computerChoice == "rock") || (humanChoice == "rock" && computerChoice == "scissor") || (humanChoice == "scissor" && computerChoice == "paper")) {
            console.log("You win this round");
            humanScore++;
        }
        if((computerChoice == "paper" && humanChoice == "rock") || (computerChoice == "rock" && humanChoice == "scissor") || (computerChoice == "scissor" && humanChoice == "paper")) {
            console.log("You lose this round");
            computerScore++;
        }
    }

    async function playGame(rounds) {
        const round = document.querySelector('.round');
        const roundRawText = round.textContent;

        const yourPoints = document.querySelector('#your-score');
        const yourPointsText = yourPoints.textContent;
        yourPoints.textContent = `${yourPointsText}${humanScore}`;

        const computerPoints = document.querySelector('#computer-score');
        const computerPointsText = computerPoints.textContent;
        computerPoints.textContent = `${computerPointsText}${computerScore}`;


        for(let i=0;i<rounds;i++) {
            const humanChoice = await getHumanInput();
            console.log(humanChoice);
            const computerChoice = await getComputerInput();
            console.log(computerChoice);
            playRound(humanChoice, computerChoice);


            yourPoints.textContent = `${yourPointsText}${humanScore}`;
            computerPoints.textContent = `${computerPointsText}${computerScore}`;

            round.textContent = `${roundRawText}${i+1}`;
        }
        const finalResult = document.querySelector('#final-result');
        if(humanScore == computerScore) {
            finalResult.textContent = "Draw Match";
        } else if(humanScore > computerScore) {
            finalResult.textContent = "Congratulataions! You Win!";
        } else {
            finalResult.textContent = "Computer Wins this match!";
        }
    }

    playGame(rounds);

    

}, {once: true});