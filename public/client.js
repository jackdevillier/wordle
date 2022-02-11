let answers,wordBank,targetWord;
$.get("/filesystem", function(answers_) {
    answers = answers_[0];
    answers = answers.split("\n");
    wordBank = answers_[1];
    wordBank = wordBank.split("\n");
    targetWord = answers[Math.floor(Math.random() * answers.length)];
    doShit();
});
let currLetter = 1;
let currRow = 1;
function doShit() {

    $(document).keyup(function(event) {
        //any letter
        if (event.which > 64 && event.which < 91 && currLetter < 6 && $("#row" + currRow + " #" + currLetter).contents().length < 1) {
            $("#row" + currRow + " #" + currLetter).append(String.fromCharCode(event.which) + "");
            if (currLetter < 5)
                currLetter++;
        }

        //backspace
        if (event.which == 8 && currLetter >= 1) {


            $("#row" + currRow + " #" + currLetter).contents().remove();
            if (currLetter != 1)
                currLetter--;
        }
        //enter: start wordle function
        if (event.which == 13 && currLetter == 5) {
            let guess_ = $("#row" + currRow + " #1").html().toString() + $("#row" + currRow + " #2").html().toString() + $("#row" + currRow + " #3").html().toString() + $("#row" + currRow + " #4").html().toString() + $("#row" + currRow + " #5").html().toString();
            guess_ = guess_.toLowerCase();
            wordle(guess_, targetWord)
        }
    });

}

function wordle(guess, answer) {

    let answerDupeCheck = answer;

    //just to save time as well as space, I set all of the 
    //values initially to O, or incorrect

    let accuracyArray = ["O", "O", "O", "O", "O"]

    //the word must be present in the wordBank mentioned earlier

    if (wordBank.join(' ').includes(guess)) {

        guess = guess.toLowerCase();

        //X phase. Examines correct placements of letters before anything else

        for (let letter = 0; letter < guess.length; letter++) {

            //check the same letter pos in guess and answer
            if (answer[letter] == guess[letter]) {

                //they are the same, add X to the accuracy array, 
                //placing it respectively in the array 

                accuracyArray[letter] = "X";
                answerDupeCheck = removeLetterFromDupe(guess[letter], answerDupeCheck);
            }
        }

        //I phase. Examines out-of-order placements. I decided to finish this
        //after the X phase in order to prioritize the correct guesses for
        //the answerDupeCheck. If everything was checked at the same time,
        //an out-of-order placement might unintentionally take priority 
        //over the correct placement simply because the former letter occured
        //earlier in the guess.

        for (let letter = 0; letter < guess.length; letter++) {

            //out-of-order placements

            //if the guessed letter is in a different spot AND if the 
            //letter is in answerDupeCheck (refer to line 33)
            if (answer[letter] != guess[letter] && answer.includes(guess[letter]) && answerDupeCheck.includes(guess[letter])) {
                accuracyArray[letter] = "I";
                answerDupeCheck = removeLetterFromDupe(guess[letter], answerDupeCheck);
            }
        }
        console.log(accuracyArray);
        let colorReference = accuracyArray.join("");
        for (let hint = 0; hint < colorReference.length; hint++) {
            let box = hint + 1;
            if (colorReference[hint] == "X")
                $("#row" + currRow + " #" + box).css("background","green");
            if (colorReference[hint] == "I")
                $("#row" + currRow + " #" + box).css("background","yellow");
            if (colorReference[hint] == "O")
                $("#row" + currRow + " #" + box).css("background","grey");
        }

        if (currRow < 6) {
            currRow++;
            currLetter = 1;
        } else {
            $("#winmsg").append("The answer was " + answer.toUpperCase());
        }

    } else {
        //if the word does not exist
        console.log("It needs to be a real word!");
    }


}

//refer to line 33
function removeLetterFromDupe(letter, dupeAnswer) {

    //removes a specific letter from answerDupeCheck when a new hint is given

    let tempdupe = dupeAnswer.replace(letter, "");

    return tempdupe;
}