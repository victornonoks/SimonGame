let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let gameStarted = false;
let level = 0;

//Inicia jogo após um click em alguma tecla
$(document).keypress(function() {
    if(!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

//Click do usuário
$(".btn").on("click", function() { 

    let userChosenColour = this.id
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour)
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000)
    };
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      }
}

//Animação de click no botão
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}


//Adiciona a proxima cor a sequencia
function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}

//Toca o som do botão
function playSound(name) {
    if (name === "green") {
        let greenSound = new Audio("./sounds/green.mp3")
        greenSound.play();

    } else if (name === "red") {
        let redSound = new Audio("./sounds/red.mp3")
        redSound.play();

    } else if (name === "yellow"){
        let yellowSound = new Audio("./sounds/yellow.mp3")
        yellowSound.play();

    } else if (name === "blue") {
        let blueSound = new Audio("./sounds/blue.mp3")
        blueSound.play();

    } 
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
