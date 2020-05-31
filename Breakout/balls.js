// ==========
// BALLS
// ==========

// I had issues with moving this portion to another file so I kept it in jsmain.js

    // Constructors for the two available balls
    function Ball(descr) {
        for (var property in descr) {
            this[property] = descr[property];
        }
    }

    var g_ball = new Ball({
        cx: 400,
        cy: 500,
        radius: 10,

        xVel: 3,
        yVel: 2
    });

    var o_ball = new Ball({
        cx: 400,
        cy: 500,
        radius: 10,

        xVel: g_ball.xVel,
        yVel: g_ball.yVel
    });


    // The ball's direction and velocity. When a ball collides with a brick or paddle its y
    // velocity is inverted. An if statement is used for the double paddle powerup

Ball.prototype.update = function () {
    // Ball's previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute the ball's next position
    var nextX = prevX + this.xVel;
    var nextY = prevY + this.yVel;

    // Bounce off the paddles and bricks
    if (g_paddle1.collidesWith(prevX, prevY, nextX, nextY, this.radius)){
        this.yVel *= -1;
    }

    if (doublePaddle){
        if (o_paddle1.collidesWith(prevX, prevY, nextX, nextY, this.radius)){
            this.yVel *= -1;
        }
    }
    
    if (brickCollide(prevX, prevY, nextX, nextY, this.radius)){
            this.yVel *= -1;
            if (this.yVel <0){this.yVel -= 0.1}
            else this.yVel += 0.1

            if (this.xVel <0){this.xVel -= 0.1}
            else this.xVel += 0.1
    }

    
    // If the ball hits the top of the frame the y velocity is inverted
    if (nextY < 0 ) {               
        this.yVel *= -1;
    }
    
    // If the ball hits the bottom of the screen a life is lost and the ball resets
    if (nextY > g_canvas.height) {
    		loseLife();
        g_ball.reset();
        if (doubleBall) {o_ball.reset();}
    }

    // x velocity is inverted if the ball hits the sides of the frame
    if ((nextX < 0) || (nextX > g_canvas.width)) {
        this.xVel *= -1;
    }
 
    // Update ball's position
    this.cx += this.xVel;
    this.cy += this.yVel;
};

Ball.prototype.reset = function () {
    this.cx = 400;
    this.cy = 500;
    this.xVel *= -1;
    this.yVel *= -1;
};

Ball.prototype.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius, this.xVel, this.yVel);
};

    // Ball render
    Ball.prototype.render = function (ctx) {
        fillCircle(ctx, this.cx, this.cy, this.radius, this.xVel, this.yVel);
    };