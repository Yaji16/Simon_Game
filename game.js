buttonColours = ["red","blue","green","yellow"];
gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keypress",function(){
  if(!started)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }


});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    //success
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    playSound("wrong");
    $('body').addClass("game-over");
    setTimeout(function(){
      $('body').removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//if button is clicked
$(".btn").click(function (){
  //get the id(attr) of current(this) button
  userChosenColour = $(this).attr('id') ;
  //store this in user clicked pattern
  userClickedPattern.push(userChosenColour);
  //audio of user clicked button is played
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern=[]; //resetting the sequence for next level

  $("#level-title").text("Level " + level);
  level++;


  //get random number that decides the colour
  var randomNumber = Math.floor(Math.random()*4)
  var randomChosenColour = buttonColours[randomNumber];
  //push the color in the array to store the sequence
  gamePattern.push(randomChosenColour);
  //creating a flash for the button
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //playing sound of the sequence button
  playSound(randomChosenColour);


}

//plays the audio corresponding to the button chosen
function playSound(name){
  var sound = new Audio("sounds\\"+name+".mp3");
  sound.play();
}

//animates the press by adding white shadow 20px down and removing it after 100ms
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}
function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}
