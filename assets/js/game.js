var selectedWord;
var gallery = [];
var words = [];
var mistakes = 0;
var gameOver = false;
var remainingChances = 7;
var remark= document.getElementById('remarks');
let count=0,i=0;
var matchedLetters=0;
var total=6;
var autoguessvalue=false;
var time=20;
var guesslimit=3;

document.getElementById("remarks").innerHTML="Lets play the game !!";
document.getElementById('hint').innerHTML ="Wanna try without HINTS??";
document.getElementById("timer").style.display='none';

getlevel();

function DisplayName()
{
	var Name=document.getElementById("inputName");
	console.log("Name "+ Name);
	document.getElementById("PlayerName").innerHTML=Name;
}
DisplayName();

function getlevel() {
	var x = document.getElementById("level").value;
	switch(x) {
		case 'Easy':
			selectedWord = easy[Math.floor((Math.random()*(easy.length)))];
			break;

		case 'Medium':
			selectedWord = medium[Math.floor((Math.random()*(medium.length)))];
			break;

		case 'Hard':
			selectedWord = hard[Math.floor((Math.random()*(medium.length)))];
			break;
	}
	initGallery();
	printLines();
}

function autoguess() {
	if(gameOver==true) {
		alert("The game is already finished");
		restartGame();
	}
	else if( guesslimit<=0)
	{
		alert("AUTO GUESS LIMIT REACHED !!");
		checkGameOver();
	}
	else {
		var theword = selectedWord[0][Math.floor((Math.random()*(selectedWord[0].length)))];
		console.log(Math.floor((Math.random()*(selectedWord[0].length))));
		autoguessvalue=true;
		console.log("total " + total);
		var user_input = theword;
		console.log("here "+ remainingChances);
		checker();
		mistakes++;
		var remainingChances=total-mistakes;
		document.getElementById("chance").innerHTML="Chances Left: " + remainingChances;
		guesslimit--;
		var hangman = document.getElementById("hangman");
    	hangman.src = "assets/img/hangman" + mistakes + ".png";		
	}
}

function initGallery() {
	gallery = [];
	for(var i = 0; i < selectedWord[0].length; i++) {
		gallery.push("_" + ' ');
	}
}

function timer()
{
		var mytime=setInterval(function()
		{
			document.getElementById('timer').style.display='block';
			document.getElementById('timer').innerHTML="Time: " +time-- + " seconds remaining.";
			if(time<=-1) stop();
		},1000);
		function stop() {
			clearInterval(mytime);
			document.getElementById('timer').innerHTML="Time finished.";
			checkGameOver();
		}
}


function showHint() {
	// document.getElementById("timer").style.display='block';
	var hint = document.getElementById('hint');
	if(hint.style.display == 'block') {
		alert("It's already being displayed");
	}
	else {
		hint.style.display = 'block';
		document.getElementById("hint").innerHTML= selectedWord[1];
		mistakes++;
		var remainingChances=total-mistakes;
		document.getElementById("chance").innerHTML="Chances Left: " + remainingChances;
		document.getElementById("note").innerHTML="Note: Number of chances is decreased by 1. Hint is being displayed.";
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
	if(autoguessvalue==false){
		var match = false;
		var guessElement = document.getElementById('inputLetters');
		var user_input = guessElement.value.toLowerCase();
		if(user_input=="") {
			alert("First fill in the text field");
			match=true;
		} 
		if(gameOver == true || remainingChances == 0)
		{
			// alert("Game finished. Try restarting.");
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
					document.getElementById("remarks").innerHTML="Good..";
				}
			}
		}

		count++;
		document.getElementById('inputLetters').value = "";	
		printLines();
		if(!match) {
			for (var i = 1; i < count; i++) {
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
			total=6;
		 	remainingChances = total - mistakes;
		 	document.getElementById("remarks").innerHTML=user_input.toUpperCase() + " doesn't match here.";
			document.getElementById("chance").innerHTML="Chances Left: " + remainingChances;
			var hangman = document.getElementById("hangman");
	    	hangman.src = "assets/img/hangman" + mistakes + ".png";
	    	count++;
		}
		checkGameOver();
	}
	else {				
		if(gameOver == true || remainingChances == 0)
		{
			document.getElementById('inputLetters').value = "";	
			gameOver=true;
			restartGame();
		}	
		var theword = selectedWord[0][Math.floor((Math.random()*(selectedWord[0].length)))];
		var user_input = theword;
		for (var i = 0; i < selectedWord[0].length; i++) {
			if(selectedWord[0][i] == user_input) {
				gallery[i] = user_input + " ";
				match = true;
				console.log("Matched "+matchedLetters);
				document.getElementById("remarks").innerHTML="The word contains letter " + user_input.toUpperCase();
			}
		}
		count++;
		document.getElementById('inputLetters').value = "";	
		printLines();
		if(!match) {
		 	mistakes++;
			var wrongLetters = document.getElementById("wrong-letters");
			console.log("user input"+user_input);
			var another = document.createTextNode(user_input.toLowerCase() + ', ');
			wrongLetters.appendChild(another);
		 	remainingChances = total - mistakes;
		 	document.getElementById("remarks").innerHTML=user_input.toUpperCase() + " doesn't match here.";
			document.getElementById("chance").innerHTML="Chances Left: " + remainingChances;
			var hangman = document.getElementById("hangman");
	    	hangman.src = "assets/img/hangman" + mistakes + ".png";
	    	count++;
		}
		autoguessvalue=false;
		checkGameOver();
	}
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
		// restartGame();
	}
	
	if (remainingChances <= 0)	{
		alert("Uh...I guess you're dead now.");
		document.getElementById('guesss').innerHTML = selectedWord[0];
		hint.style.display = 'block';
		document.getElementById('hint').innerHTML = selectedWord[1];
	 	document.getElementById("remarks").innerHTML="Oops...Well tried !!";
		// restartGame();
	}
}

function restartGame() {
	location.reload();

}
window.onload = printLines(); 
// window.onload=getlevel();
