
var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []

var userClickedPattern = []

var level = 0

var gameStart = false;

function nextSequence(){
    level+=1
    $("h1").text("Level "+level)
    var randomNumber = Math.floor(Math.random()* 4);

  var randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)

    
}

function playSound(sound){

    var audio = new Audio('sounds/'+sound+'.mp3');

    audio.play(); 
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(function() {
        $("#"+currentColor).removeClass('pressed');
      }, 100);

}

function startOver(){
    gameStart = false
    gamePattern = []
    userClickedPattern = []
    level = 0
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(currentLevel+1 == gamePattern.length){
            userClickedPattern = []
            setTimeout( nextSequence, 1000)
        }
        
    }else{
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
    }
}



$(document).keypress(function(){
    if(!gameStart){
        nextSequence()
        gameStart = true
    }
    else{
        console.log(gameStart)
    }
})

$(".btn").click(function(event){
    if(gameStart){
        userChosenColour = event.currentTarget.id

        userClickedPattern.push(userChosenColour)
    
        playSound(userChosenColour)
    
    
        animatePress(userChosenColour)
    
        for(var i= 0; i<userClickedPattern.length; i++){
            checkAnswer(i)
        }
    }

})