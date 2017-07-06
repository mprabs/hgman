var selectedWord = letters[Math.floor((Math.random()*(letters.length)))];
var gallery = [];
var hang=0;
var b=6;

window.onload=document.getElementById("chance").innerHTML="Chances left: "+ 6;

for (var i = 0; i < selectedWord[0].length; i++) {
	gallery.push("_" + ' ');
}

function myfunction() {
	var x = document.getElementById('hint');
	if(x.style.display=='block') {
		alert("Its already displayed !!!");
	}
	else if(x.style.display=='none'){
		x.style.display='block';
		hang++;
		var b=6-hang;
		document.getElementById("chance").innerHTML="Chances left "+b;
	  	console.log(x);
	}
}

document.getElementById("hint").innerHTML = selectedWord[1].toUpperCase();

function printgallery() {
	var guess = document.getElementById("guesss");
	guess.innerHTML = "";
	for (var i = 0; i < gallery.length; i++) 	{
		var another = document.createTextNode(gallery[i]);
		guesss.appendChild(another);
	}
}

var checker = function() {
	var guessElement = document.getElementById('naya');
	var user_input = guessElement.value;
	if(user_input=="") alert("First fill in the text field");
	user_input = user_input.toLowerCase();
	for (var i = 0; i < selectedWord[0].length; i++) {
		if(selectedWord[0][i] == user_input) {
			gallery[i] = user_input + " ";
			var natija = true;
		}
	}
	
	guessElement.innerHTML=""; 
	printgallery();

	document.getElementById('naya').value = "";
	if(!natija && user_input!="") {
		var feri = document.getElementById("feri");
		var another = document.createTextNode(" " + user_input.toLowerCase());
		feri.appendChild(another); 
	 	hang++;
	 	var b=6-hang;
		document.getElementById("chance").innerHTML="Chances Left " + b;
	 	console.log(chance);
		var hangman = document.getElementById("hangman");
    	hangman.src = "http://www.writteninpencil.de/Projekte/Hangman/hangman" + hang + ".png";
	}

	var gameOver = false;
	let match = 0;
	for (var i = 0; i < selectedWord[0].length; i++) {
		if(selectedWord[0][i] == gallery[i].trim())
			match++;
	}

	if(match == selectedWord[0].length)
		gameOver = true;
	
	if(gameOver)  {
		window.alert("You win!");
	}
	
	if (b==0)	{
		alert("Uh...I guess you're dead now.");
		//location.reload();
		document.getElementById('guesss').innerHTML=selectedWord[0];
		var x = document.getElementById('hint');
    	x.style.display = 'block';
	}
}

window.onload = printgallery;