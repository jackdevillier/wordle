const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fs = require('fs');
let wordBank = fs.readFileSync("./words.txt").toString();
wordBank = wordBank.split("\n");
let file = fs.readFileSync("./answers.txt").toString();
file = file.split("\n");
let targetWord = file[Math.floor(Math.random() * file.length)];
console.log(targetWord);
// wordle(targetWord);
let tempword = "thing"
wordle(tempword);
//O is gray, I is yellow, X is gree

function wordle(answer) {
    let answerDupeCheck = answer;
    let accuracyArray = ["O", "O", "O", "O", "O"]
    rl.question("Guess a five letter word\n", function(guess) {
        if (wordBank.join(' ').includes(guess)) {

            guess = guess.toLowerCase();
            // for (let letter = 0; letter < guess.length; letter++) {
            //     //check the same letter pos in guess and answer
            //     if (answer[letter] == guess[letter])
            //     //they are the same, add X to the accuracy array, placing it in the first 
            //         accuracyArray.push("X");
            //         answerDupeCheck = removeLetterFromDupe(answer,answer[letter])
            //     //check the single guess pos with every pos in the answer
            //     else if (answer[letter] != guess[letter]) {
            //         let count;
            //          for (let answerLetter = 0; answerLetter < answer.length; answerLetter++) {
            //             if (answer[answerLetter] == guess[letter])
            //                 count = 1;
            //         }
            //         if (count == 1) {
            //             //the guess letter is in the answer but not in the same pos
            //             accuracyArray.push("I");
            //         } else {
            //             //the letter is not in the answer anywhere
            //             accuracyArray.push("O");
            //         }
            //     }

            // }
            for (let letter = 0; letter < guess.length; letter++) {
                //check the same letter pos in guess and answer
                if (answer[letter] == guess[letter]) {
                    //they are the same, add X to the accuracy array, placing it in the first 
                    accuracyArray[letter] = "X";
                    answerDupeCheck = removeLetterFromDupe(answer[letter],answerDupeCheck);
                }
            }










            for (let letter = 0; letter < guess.length; letter++) {
                console.log(answer[letter] + ", " + guess[letter]);
                if (answer[letter] != guess[letter] && answer.includes(guess[letter]) && answerDupeCheck.includes(guess[letter])) {
                    accuracyArray[letter] = "I";
                    answerDupeCheck = removeLetterFromDupe(guess[letter],answerDupeCheck);
                }
            }
            console.log(accuracyArray);
            //win case
            if (accuracyArray.join("") == "XXXXX") {
                console.log("You win!!");
            } else {
                wordle(answer);
            }
        } else {
            //if the word does not exist
            console.log("It needs to be a real word!");
            wordle(answer);
        }

    });

}

function removeLetterFromDupe(letter, dupeAnswer) {
    let tempdupe = dupeAnswer.replace(letter, "");
    console.log(letter);
    console.log("remaining letters are " + tempdupe);
    return tempdupe;
}