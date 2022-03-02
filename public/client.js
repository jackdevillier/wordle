let answers, wordBank, targetWord;

//for changing the colors of the letters in the keyboard section
let yellowLetters = "";
let greenLetters = "";

//fetches files from serverside since you can't import stuff from frontend
$.get("/filesystem", function(answers_) {
    answers = answers_[0];
    answers = answers.split("\n");
    wordBank = answers_[1];
    wordBank = wordBank.split("\n");
    //random answer
    targetWord = answers[Math.floor(Math.random() * answers.length)];

    //originally the function was outside of the $.get() for file retrieval but because
    //  of variable scope, I believe the only option was to do the whole thing inside
    //  of $.get(). No idea if this slows down the whole script but it works!!
    fixScope();
});
//current letter for typing
let currLetter = 1;
//current row or "guess" (out of 6 guesses)
let currRow = 1;
//literally everything is in here
function fixScope() {

    $(document).keyup(function(event) {
        //any letter. "event.which" is the unicode for the keys pressed, so i
        //  can easily convert them straight to letters. This part adds the
        //  letters to the divs
        if (event.which > 64 && event.which < 91 && currLetter < 6 && $("#row" + currRow + " #" + currLetter).contents().length < 1) {
            $("#row" + currRow + " #" + currLetter).append(String.fromCharCode(event.which) + "");
            if (currLetter < 5)
                currLetter++;
        }

        //backspace
        if (event.which == 8 && currLetter >= 1) {

            if (currLetter != 1 && $("#row" + currRow + " #" + currLetter).html() == "") {
                $("#row" + currRow + " #" + (currLetter - 1)).contents().remove();
            } else {
                console.log($("#row" + currRow + " #4").html());
                $("#row" + currRow + " #" + currLetter).contents().remove();
            }


            if (currLetter != 1)
                currLetter--;
        }



        //enter: start wordle function
        if (event.which == 13 && currLetter == 5 && $("#row" + currRow + " #5").html() != "") {
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

                //coloring the keyboard

                if (!greenLetters.includes(guess[letter])) {
                    greenLetters += guess[letter];

                    if (yellowLetters.includes(guess[letter])) {
                        yellowLetters.replace(guess[letter], "");
                    }
                }
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

                //coloring the keyboard

                if (!greenLetters.includes(answer[letter]) && !yellowLetters.includes(answer[letter])) {
                    yellowLetters += guess[letter];
                }
            }
        }
        console.log(accuracyArray);
        let colorReference = accuracyArray.join("");
        for (let hint = 0; hint < colorReference.length; hint++) {
            let box = hint + 1;
            if (colorReference[hint] == "X")
                $("#row" + currRow + " #" + box).css("background", "green");
            if (colorReference[hint] == "I")
                $("#row" + currRow + " #" + box).css("background", "yellow");
            if (colorReference[hint] == "O")
                $("#row" + currRow + " #" + box).css("background", "grey");
                $("#" + guess[hint]).css("background", "grey");
        }

        for (let key = 0; key < yellowLetters.length; key++) {
            console.log(key);
            $("#" + yellowLetters[key]).css("background", "yellow");
        }
        
        for (let key = 0; key < greenLetters.length; key++) {
            console.log(key);
            $("#" + greenLetters[key]).css("background", "green");
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