let currLetter = 1;
while (true) {
$(document).keypress(function(event) {
	if (event.which > 64 && event.which < 91) {
		console.log(event.which);
		$("#" + currLetter).append(fromCharCode(event.which) + "");
	}
});
}
