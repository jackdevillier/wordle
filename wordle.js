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

wordle(targetWord);

//O is gray, I is yellow, X is green

function wordle(answer) {

    //the answerDupeCheck is a string with the same characters as the answer at the beginning of the guessing process, but every time a "hint" is given, (i.e. the letter is right (X), the letter is somewhere else in the word (I)) that letter is removed from answerDupeCheck. answerDupeCheck is used during the I phase to make sure the amount of hints given is never higher than the frequency of a letter.


    let answerDupeCheck = answer;

    //just to save time as well as space, I set all of the 
    //values initially to O, or incorrect

    let accuracyArray = ["O", "O", "O", "O", "O"]
    rl.question("Guess a five letter word\n", function(guess) {

        //the word must be present in the ~5000 5-letter words I pulled from another github repo
        if (wordBank.join(' ').includes(guess)) {

            guess = guess.toLowerCase();


            //X phase

            for (let letter = 0; letter < guess.length; letter++) {

                //check the same letter pos in guess and answer

                if (answer[letter] == guess[letter]) {

                    //they are the same, add X to the accuracy array, placing it in the first 
                    
                    accuracyArray[letter] = "X";
                    answerDupeCheck = removeLetterFromDupe(guess[letter], answerDupeCheck);
                }
            }

            //I phase

            for (let letter = 0; letter < guess.length; letter++) {
                console.log(answer[letter] + ", " + guess[letter]);

                //the guess letter is in the answer but not in the same pos

                if (answer[letter] != guess[letter] && answer.includes(guess[letter]) && answerDupeCheck.includes(guess[letter])) {
                    accuracyArray[letter] = "I";
                    answerDupeCheck = removeLetterFromDupe(guess[letter], answerDupeCheck);
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