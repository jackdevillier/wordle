const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fs = require('fs');
let file = fs.readFileSync("./answers.txt").toString();
file = file.split("\n");
let targetWord = file[Math.floor(Math.random() * file.length)];

console.log(targetWord);
wordle(targetWord);
//O is gray, I is yellow, X is green
function wordle(answer) {
    let accuracyArray = []
    rl.question("Guess a five letter word\n", function(guess) {
        guess = guess.toLowerCase();
        for (let letter = 0; letter < guess.length; letter++) {
            //check the same letter pos in guess and answer
            if (answer[letter] == guess[letter])
            //they are the same, add O to the accuracy array, placing it in the first 
                accuracyArray.push("X");
            //check the single guess pos with every pos in the answer
            else if (answer[letter] != guess[letter]) {
                let count;
                for (let answerLetter = 0; answerLetter < answer.length; answerLetter++) {
                    if (answer[answerLetter] == guess[letter])
                        count = 1;
                }
                if (count == 1) {
                    //the guess letter is in the answer but not in the same pos
                    accuracyArray.push("I");
                } else {
                    //the letter is not in the answer anywhere
                    accuracyArray.push("O");
                }
            }

        }
        console.log(accuracyArray);
        if (accuracyArray.join("") == "XXXXX") {
            console.log("You win!!");
        } else {
            wordle(answer);
        }
    });

}