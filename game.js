//Creating array with colours and selecting a random colour using nextSequence function.
var buttonColours = ["red", "blue", "green", "yellow"];

//Array storing the buttons the user has clicked.
var userClickedPattern = [];
//Initializing empty array to store game pattern then adding the next colour in the pattern to the array.
var gamePattern = [];

//Keeping track of the level.
var started = false;
var level = 0;

//Calling the function to start a random pattern.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Play audio based on which colour the user has clicked. then add selected colour to user pattern array.
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

//Checs if the answer is correct,
function checkAnswer(currentLevel) {


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {

        nextSequence();
      }, 1000);
    }

  } else {
    var wrong = "wrong";
    playSound(wrong);
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game over, press any key to restart");
    startOver();
  }
}

//Animates the next colour in the pattern, resets the user pattern and increases level.
function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//Plays a sound file based on the name passed in.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animates the button based on the color passed in.
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
