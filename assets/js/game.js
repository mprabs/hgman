var selectedWord = letters[Math.floor((Math.random()*(letters.length)))];
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

document.getElementById("remarks").innerHTML="Lets play the game !!";
document.getElementById('hint').innerHTML ="Wanna try without HINTS??";
document.getElementById("timer").style.display='none';

function autoguess() {
	var theword = selectedWord[0][Math.floor((Math.random()*(selectedWord[0].length)))];
	console.log(Math.floor((Math.random()*(selectedWord[0].length))));
	autoguessvalue=true;
	console.log("word " + theword);
	var user_input = theword;
	console.log("here "+user_input);
	checker();
}

function initGallery() {
	for(var i = 0; i < selectedWord[0].length; i++) {
		gallery.push("_" + ' ');
	}
}

initGallery();

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
		var remainingChances=total-1;
		document.getElementById("chance").innerHTML="Chances Left: " + remainingChances;
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
					if(selectedWord[0].length - matchedLetters ==4)
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
				if(selectedWord[0].length - matchedLetters ==4)
				{
					timer();
				}
				document.getElementById("remarks").innerHTML="Aww...";
				for (var i = 1; i < count; i++) {
					if(words[i]==user_input){
						alert("DUPLICATE WORD !!");
						break;
					}
				}
				words[i]=user_input;
				i++;
				// console.log("Word is" + words[i]);
				// for (var i = 1; i < selectedWord[0].length+1; i++) {
				// 	if(words[i]==user_input){
				// 		autoguess();
				// 	}
				// }
				// var temp;
				// temp=user_input;
				// user_input=words[i];
				// words[i]=temp;
				// i++;
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
		stop();
	}
	
	if (remainingChances == 0)	{
		alert("Uh...I guess you're dead now.");
		document.getElementById('guesss').innerHTML = selectedWord[0];
		hint.style.display = 'block';
		document.getElementById('hint').innerHTML = selectedWord[1];
	 	document.getElementById("remarks").innerHTML="Oops...Well tried !!";
		stop();
	}
}

function restartGame() {
	location.reload();
}
window.onload = printLines;
