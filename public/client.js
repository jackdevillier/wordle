let currLetter = 1;
let justAdded;
$(document).keyup(function(event) {
    console.log(event.which);
    //any letter
    if (event.which > 64 && event.which < 91 && currLetter < 6 && $("#" + currLetter).contents().length < 1) {
        $("#" + currLetter).append(String.fromCharCode(event.which) + "");
        if (currLetter < 5)
            currLetter++;
    }

    //backspace
    if (event.which == 8 && currLetter >= 1) {


        $("#" + currLetter).contents().remove();
        if (currLetter != 1)
            currLetter--;

    }
    //enter: start wordle function
    if (event.which == 13 && currLetter == 5) {
    	wordle()
    }
});


function wordle(guess, answer) {

    //the answerDupeCheck is a string with the same characters as the answer 
        //at the beginning of the guessing process, but every time a "hint" is 
        //given, (i.e. the letter is right (X), the letter is somewhere else in 
        //the word (I)) that letter is removed from answerDupeCheck. answerDupeCheck 
        //is used during the I phase to make sure the amount of hints given is never 
        //higher than the frequency of a specific letter.

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


}

//refer to line 33
function removeLetterFromDupe(letter, dupeAnswer) {

    //removes a specific letter from answerDupeCheck when a new hint is given

    let tempdupe = dupeAnswer.replace(letter, "");

    return tempdupe;
}