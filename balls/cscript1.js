class Ball{
    constructor(pos, speed, radius){
        this.pos = pos;
        this.speed = speed;
        this.r = radius;
        this.bf = Ball.bf1;
        this.ff = Ball.ff1
    }
//---------------------------------------------------//
    get pos() {return [this.x, this.y];}
    get speed() {return [this.vx, this.vy];}

    set pos(xy){
        this.x = xy[0];
        this.y = xy[1];
    }
    set speed(vxy){
        this.vx = vxy[0];
        this.vy = vxy[1];
    }
//----------------------------------------------------//
    update(){
        this.x  += this.vx;
        this.y  -= this.vy;
        this.vx += Ball.gx;
        this.vy += Ball.gy;

        if (this.x < 0 || this.x > width - this.r){
            this.x = max(this.r, this.x);
            this.x = min(width - this.r, this.x);

            this.vx *= -this.bf;
            this.bf = max(0,this.bf - Ball.bf2);
            this.vy *= (1 - this.ff);
            this.ff = min(1,this.ff + Ball.ff2);
        }
        
        if (this.y < 0 || this.y > (height - this.r) ){
            this.y = max(this.r, this.y);
            this.y = min(height - this.r, this.y);
            console.log(this.y);
            console.log("COLLISION");

            this.vy *= -this.bf;
            this.bf = max(0,this.bf - Ball.bf2);
            this.vx *= (1 - this.ff);
            this.ff = min(1, this.ff + Ball.ff2);
        }
    }

    draw(){
        var diameter = 2*this.r;
        ellipse(this.x, this.y, diameter, diameter);
    }
    
}
Ball.gy = -1;
Ball.gx = 0;
Ball.bf1 = .9; //controls how much speed the ball still has after bounce
Ball.bf2 = .05; //controls how much the bounce (bf1) decreases, bf1/bf2 gives how many bounces can happen
Ball.ff1 = 1/40;
Ball.ff2 = 1/40; //controls how much friction (bf2) increases

var b1 = new Ball([200,200],[10,-1], 12);
function setup(){
    fill(0);
    createCanvas(windowWidth - 10,windowHeight - 20);
}

function draw(){
    console.log("pos:",b1.pos, "\nspeed:",b1.speed);
    background(0);
    b1.update();
    b1.draw();
}