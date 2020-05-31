// =============
// BRICK COLOUR
// =============

function setColor(number){
    if (number == 3){ctx.fillStyle = "#dbdbdb";}
    else if (number == 2){ctx.fillStyle = "#c4e562";}
    else {ctx.fillStyle = "#ace8b5";}


}

// ============
// SOUNDS
// ============

function blockClearSound() {
	var blip = 'Sounds/blip.wav';
    
    var audio = new Audio();
    audio.src = blip;
    audio.play();
}

function paddleSound() {
    var boop = 'Sounds/boop.wav';

    var audio = new Audio();
    audio.src = boop;
    audio.play();
}
