var selectedWord = letters[Math.floor((Math.random()*(letters.length)))];
var gallery = [];
var mistakes = 0;
var gameOver = false;
var remainingChances = 6;

function initGallery() {
	for(var i = 0; i < selectedWord[0].length; i++) {
		gallery.push("_" + ' ');
	}
}

initGallery();

function showHint() {
	var hint = document.getElementById('hint');
	if(hint.style.display == 'block') {
		alert("It's already being displayed");
	} else {
		hint.style.display = 'block';
		document.getElementById("hint").innerHTML= selectedWord[1].toUpperCase();
		document.getElementById("chance").innerHTML="Chances Left: " + 5;
		mistakes++;
	}
}

function printLines() {
	document.getElementById("guesss").innerHTML = "";
	var guess = document.getElementById("guesss");
	for (var i = 0; i < gallery.length; i++) 	{
		guesss.appendChild(document.createTextNode(gallery[i]));
	}
}

function checker() {
	var match = false;
	var guessElement = document.getElementById('inputLetters');
	var user_input = guessElement.value.toLowerCase();
	if(user_input=="") {
		alert("First fill in the text field");
	} else {		
		for (var i = 0; i < selectedWord[0].length; i++) {
			if(selectedWord[0][i] == user_input) {
				gallery[i] = user_input + " ";
				match = true;
			}
		}
	}

	document.getElementById('inputLetters').value = "";	
	printLines();
	
	if(!match) {
	 	mistakes++;
		var wrongLetters = document.getElementById("wrong-letters");
		var another = document.createTextNode(user_input.toLowerCase() + ', ');
		wrongLetters.appendChild(another);
	 	remainingChances = 6 - mistakes;
		document.getElementById("chance").innerHTML="Chances Left: " + remainingChances;
		var hangman = document.getElementById("hangman");
    	hangman.src = "assets/img/hangman" + mistakes + ".png";
	}
	checkGameOver();
}

function checkGameOver() {
	let matchedLetters = 0;
	for (var i = 0; i < selectedWord[0].length; i++) {
		if(selectedWord[0][i] == gallery[i].trim())
			matchedLetters++;
	}

	if(matchedLetters == selectedWord[0].length)
		gameOver = true;
	
	if(gameOver)  {
		window.alert("You win!");
	}
	
	if (remainingChances == 0)	{
		alert("Uh...I guess you're dead now.");
		document.getElementById('inputLetters').value = selectedWord[0];
		document.getElementById('hint').innerHTML = selectedWord[1];
	}
}

function restartGame() {
	gallery = [];
	selectedWord = letters[Math.floor((Math.random()*(letters.length)))];
	mistakes = 0;
	gameOver = false;
	remainingChances = 6;
	initGallery();
	printLines();
	document.getElementById('hint').style.display = 'none';
	document.getElementById('inputLetters').value = "";	
	document.getElementById('wrong-letters').innerHTML = "Wrong Letters: ";
	document.getElementById('chance').innerHTML = "";
}

window.onload = printLines;