class Snake{
    constructor(pos, dir){
        this.pos = pos
        this.dir = dir;
        this.body = [[this.x,this.y]];
        this.alive = true;
    }

    get pos(){return [this.x,this.y]}
    set pos(xy){
        this.x = xy[0];
        this.y = xy[1];
    }

    update(){
        this.x += this.dir[0];
        this.y += this.dir[1];

        if ((this.x >= bmax[0]) || (this.x < 0)
        ||  (this.y >= bmax[1]) || (this.y < 0)){
            this.alive = false;
            console.log("HIT WALL");
        }
    }

    draw(){
        rect(this.x*bscale, this.y*bscale, bscale, bscale);
    }
}

function setup(){
    createCanvas(windowWidth - 10, windowHeight - 20);
    bscale = 50;
    bmax = [width/bscale | 0, height/bscale | 0];
    s = new Snake([1,1], [0,1]);
    frameRate(10); 
}

function draw(){
    if (s.alive){
        background(0);
        s.draw();
        s.update();
    }
    
    stroke(0,0,255);
    for (var i = 0; i <= bmax[0]; i++){
        line(i*bscale, 0, i*bscale, height);
    }
        
    for (var i = 0; i <= bmax[1]; i++){
      line(0, i*bscale, width, i*bscale);
    }
}

function keyPressed(){
    if (keyCode === RIGHT_ARROW)      s.dir = [+1, 0];
    else if (keyCode === LEFT_ARROW)  s.dir = [-1, 0];
    else if (keyCode === DOWN_ARROW)  s.dir = [ 0,+1];
    else if (keyCode === UP_ARROW)    s.dir = [ 0,-1];
}