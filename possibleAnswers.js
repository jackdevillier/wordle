const fs = require('fs');
let file = fs.readFileSync("./words.txt").toString();
file = file.split("\n");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let tempAnswers = fs.readFileSync("./answers.txt").toString();
tempAnswers = tempAnswers.split('\n');
sortAnswers();

function sortAnswers() {
    let targetWord = file[Math.floor(Math.random() * file.length)];
    rl.question("\nAdd " + targetWord + "\n", function(answer) {
        if (answer == "done") {
            fs.writeFileSync("./answers.txt", tempAnswers.join("\n"));
            return;
        } else if (answer == "z" && !tempAnswers.includes(targetWord)) {
            console.log("Word added to answers.");
            tempAnswers.push(targetWord);
            sortAnswers();
        } else
            sortAnswers();



    });
}