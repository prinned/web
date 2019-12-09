class Ball{
    constructor(pos, speed, radius, mass){
        this.pos = pos;
        this.speed = speed;
        this.r = radius;
        if (mass === undefined) this.mass = 10;
        else this.mass = mass;
        
        this.bf = Ball.bf1;
        this.ff = Ball.ff1
        Ball.balls.push(this);
    }
//---------------------------------------------------//
    get pos() {return [this.x, this.y];}
    get speed() {return [this.vx, this.vy];} //technically velocity but thats too long a name
    get momentum(){return [this.mass * this.vx, this.mass * this.vy]}

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

        if (this.x < this.r || this.x > width - this.r){
            this.x = max(this.r, this.x);
            this.x = min(width - this.r, this.x);

            this.vx *= -this.bf;
            this.bf = max(0,this.bf - Ball.bf2);
            this.vy *= (1 - this.ff);
            this.ff = min(1,this.ff + Ball.ff2);
        }
        if (this.y < this.r || this.y > (height - this.r) ){
            this.y = max(this.r, this.y);
            this.y = min(height - this.r, this.y);

            this.vy *= -this.bf;
            this.bf = max(0,this.bf - Ball.bf2);
            this.vx *= (1 - this.ff);
            this.ff = min(1, this.ff + Ball.ff2);
        }
    }

    draw(){
        ellipse(this.x, this.y, 2*this.r, 2*this.r);
    }

    static update_col(){
        var num = Ball.balls.length;
        for (var i = 0; i < num; i++){
            for (var j = 0; j < num; j++){
                if (j == i) continue;
                
                var b1 = Ball.balls[i];
                var b2 = Ball.balls[j];
                if ((b1.x - b2.x)**2 + (b1.y - b2.y)**2 <= (b1.r + b2.r)**2){
                    console.log("Collision");
                    //v1fx stands for x component of final velocity of b1 
                    var v1fx = +(b1.momentum[0] + 2*b2.momentum[0] - b2.mass*b1.speed[0])/(b1.mass + b2.mass); 
                    var v1fy = +(b1.momentum[1] + 2*b2.momentum[1] - b2.mass*b1.speed[1])/(b1.mass + b2.mass);
                    var v2fx = -(v1fx + b1.speed[0] - b2.speed[0]);
                    var v2fy = -(v1fy + b1.speed[1] - b2.speed[1]);
                    
                    b1.speed = [v1fx, v1fy];
                    b2.speed = [v2fx, v2fy];
                }
            }
        }
    }    
}
Ball.gy =  -1;
Ball.gx =  0;
Ball.bf1 = .9; //controls how much speed the ball still has after bounce
Ball.bf2 = .05; //controls how much the bounce (bf1) decreases, bf1/bf2 gives how many bounces can happen
Ball.ff1 = 1/40;
Ball.ff2 = 1/40; //controls how much friction (ff1) increases
Ball.balls = [];



function setup(){
    createCanvas(windowWidth - 10, windowHeight - 20);
    noStroke();

    new Ball([100,100],[10,10], 20,1);
    new Ball([200,100],[10,-1], 20,10);
    new Ball([300,100],[10,10], 20,100);
    new Ball([400,100],[10,10], 20,1000);
    new Ball([500,100],[10,-1], 20,10000);
    new Ball([100,200],[100,100], 20,100000);
    //frameRate(10);
}

function draw(){
    background(255);
    
    for (var i = 0; i < Ball.balls.length; i++){
        var max_mass = max(Ball.balls.map(x => x.mass));
        var b = Ball.balls[i]
        var cl = log(b.mass)*255/log(max_mass);
        fill(255 - cl,0,0);
        noStroke();
        b.update();
        Ball.update_col();
        b.draw();

        stroke(0);
        line(0, 0, 0, height);
        line(0, 0, width, 0);
        line(width, 0, width, height);
        line(0, height, width, height);

    }
    //console.log("pos:",b1.pos, "\nspeed:",b1.speed);
    console.log("X:",Ball.balls.map(x => x.momentum[0]));
    console.log("Y:",Ball.balls.map(x => x.momentum[1]));
}