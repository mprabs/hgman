// Aaitey
// Player Name rakhna laageko ni vayena
// Level associate garna laageko ni vayena
// Tanaab


var selectedWord = letters[Math.floor((Math.random()*(letters.length)))];
var gallery = [];
var words = new Array();
words[0]="";
var mistakes = 0;
var gameOver = false;
var remainingChances = 7;
var remark= document.getElementById('remarks');
let count=0,i=0;
var matchedLetters=0;

document.getElementById("timer").style.display='none';

function initGallery() {
	for(var i = 0; i < selectedWord[0].length; i++) {
		gallery.push("_" + ' ');
	}
}

function timer()
{
	if(gameOver==false)
	{
	document.getElementById("timer").style.display='block';
	let limit=30;
	var timing=setInterval(function(){
		document.getElementById("timer").innerHTML="Time Left = " + limit + " seconds.";
		limit--;
		if(limit<=0){
			document.getElementById("timer").innerHTML="Time finished";
			alert("Time finished. The game will restart now.");
			gameOver=true;
			checkGameOver();
		}
	},1000);
	}
	else
		clearInterval(timing);
}

initGallery();

function showHint() {
	// document.getElementById("timer").style.display='block';
	var hint = document.getElementById('hint');
	if(hint.style.display == 'block') {
		alert("It's already being displayed");
	}
	else {
		// timer();
		hint.style.display = 'block';
		document.getElementById("hint").innerHTML= selectedWord[1].toUpperCase();
		var chancesleft=remainingChances-1;
		document.getElementById("chance").innerHTML="Chances Left: " + chancesleft;
		mistakes++;
		var hangman = document.getElementById("hangman");
    	hangman.src = "assets/img/hangman" + mistakes + ".png";
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
	if(guessElement.value.toLowerCase()=="") {
		alert("First fill in the text field");
		match=true;
	} 
	if(gameOver == true || remainingChances == 0)
	{
		alert("Game finished. Try restarting.");
		document.getElementById('inputLetters').value = "";	
		gameOver=true;
		restartGame();
	}
	else {		
		for (var i = 0; i < selectedWord[0].length; i++) {
			if(selectedWord[0][i] == user_input) {
				gallery[i] = user_input + " ";
				match = true;
				console.log("Matched"+matchedLetters);
				if(selectedWord[0].length - matchedLetters <=4)
				{
					timer();
				}
				document.getElementById("remarks").innerHTML="Good..";
			}
		}
	}

	count++;
	document.getElementById('inputLetters').value = "";	
	printLines();
	if(!match) {
		for (var i = 0; i < count; i++) {
			if(words[i]==user_input){
				alert("DUPLICATE WORD !!");
				return false;
			}
		}
		words[i]=user_input;
		i++;
	 	mistakes++;
		var wrongLetters = document.getElementById("wrong-letters");
		var another = document.createTextNode(user_input.toLowerCase() + ', ');
		wrongLetters.appendChild(another);
	 	remainingChances = 6 - mistakes;
	 	document.getElementById("remarks").innerHTML=user_input.toUpperCase() + " doesn't match here.";
		document.getElementById("chance").innerHTML="Chances Left: " + remainingChances;
		var hangman = document.getElementById("hangman");
    	hangman.src = "assets/img/hangman" + mistakes + ".png";
    	count++;
	}
	checkGameOver();
}

function checkGameOver() {
	matchedLetters = 0;
	for (var i = 0; i < selectedWord[0].length; i++) {
		if(selectedWord[0][i] == gallery[i].trim())
			matchedLetters++;
	}

	if(matchedLetters == selectedWord[0].length)
		gameOver = true;

	if(gameOver)  {
		window.alert("You win!");
		hint.style.display = 'block';
		document.getElementById('hint').innerHTML = selectedWord[1];
		document.getElementById('guesss').innerHTML = selectedWord[0];
	 	document.getElementById("remarks").innerHTML="AWESOME !!!";
	 	resetInterval(timing);
		document.getElementById("timer").innerHTML='DOne in' + limit;

	}
	
	if (remainingChances == 0)	{
		alert("Uh...I guess you're dead now.");
		document.getElementById('guesss').innerHTML = selectedWord[0];
		hint.style.display = 'block';
		document.getElementById('hint').innerHTML = selectedWord[1];
	 	document.getElementById("remarks").innerHTML="Oops...Well tried !!";
		document.getElementById("timer").style.display='none';
	}
}

function restartGame() {
	location.reload();
}
window.onload = printLines;
