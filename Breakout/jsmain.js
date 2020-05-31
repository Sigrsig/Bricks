"use strict";

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");


/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =================
// KEYBOARD HANDLING
// =================

    var g_keys = [];

    function handleKeydown(evt) {
        g_keys[evt.keyCode] = true;
    }

    function handleKeyup(evt) {
        g_keys[evt.keyCode] = false;
    }

    function eatKey(keyCode) {
        var isDown = g_keys[keyCode];
        g_keys[keyCode] = false;
        
        return isDown;
    }

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);




// =====
// UTILS
// =====

    // Clear canvas
function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

    // Draw ball function
function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");



    // A function that is called after a game over to reset the balls, paddles, bricks, 
    // and power ups
function gameReset(){
		lives = 3;
    g_ball.reset();
    o_ball.reset();
    
    g_paddle1.halfWidth = 50;
    o_paddle1.halfWidth = 50;
        
    doubleBall = false;
    doublePaddle = false;
    bigPadd = false;
    smallPadd = false;
    
    for (var i=0; i<columnNum; i++) {
    		for (var j=0; j<rowNum; j++) {
                bricks[i][j].clear = false;
            }
        }
        
}


// =============
// GATHER INPUTS
// =============

function gatherInputs() {}


// =================
// UPDATE SIMULATION
// =================

    // Simulation updated, if double ball or double paddle upgrades are active they are 
    // also updated
function updateSimulation() {
    if (shouldSkipUpdate()) return;

    g_ball.update();
    if (doubleBall){o_ball.update();}
    
    g_paddle1.update();
    if (doublePaddle) {o_paddle1.update();}

}

window.requestAnimationFrame(updateSimulation);

    // Togglable Pause Mode (P) and single step (O)
var KEY_PAUSE = 'P'.charCodeAt(0);
var KEY_STEP  = 'O'.charCodeAt(0);

var g_isUpdatePaused = false;

function shouldSkipUpdate() {
    if (eatKey(KEY_PAUSE)) {
        g_isUpdatePaused = !g_isUpdatePaused;       	
    }
    
    return g_isUpdatePaused && !eatKey(KEY_STEP);    
}

function updateNext() {
	if (eatKey(KEY_STEP)) {
        updateSimulation();      	
    }
}

var KEY_RESET = 'C'.charCodeAt(0);

if (g_keys[KEY_RESET]){
		gameReset();
}



// =================
// RENDER SIMULATION
// =================

function renderSimulation(ctx) {
    clearCanvas(ctx);
    
    ctx.fillStyle = 'White';
   
    g_ball.render(ctx);    
    if (doubleBall){o_ball.render(ctx);}
    
    
    g_paddle1.render(ctx);
    if (doublePaddle) {o_paddle1.render(ctx);}
    
    setLives();
    
    
    drawBricks();
}

// =========
// MAIN LOOP
// =========

function mainIter() {
    if (!requestedQuit()) {
        gatherInputs();
        updateSimulation();
        renderSimulation(g_ctx);
    } else {
        window.clearInterval(intervalID);
    }
}

// Simple voluntary quit mechanism
//
var KEY_QUIT = 'Q'.charCodeAt(0);
function requestedQuit() {
    return g_keys[KEY_QUIT];
}

// ..and this is how we set it all up, by requesting a recurring periodic
// "timer event" which we can use as a kind of "heartbeat" for our game.
//
var intervalID = window.setInterval(mainIter, 16.666);

//window.focus();