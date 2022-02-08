let currLetter = 1;
$(document).keyup(function(event) {
    if (event.which > 64 && event.which < 91 && currLetter < 6) {
        $("#" + currLetter).append(String.fromCharCode(event.which) + "");
        if (currLetter < 5)
            currLetter++;
    }
    if (event.which == 8 && currLetter > 0) {
        $("#" + currLetter).contents().remove();
        if (currLetter > 1)
            currLetter--;
    }
});