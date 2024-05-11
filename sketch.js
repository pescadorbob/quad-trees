let qt;
function setup() {
  createCanvas(400,400);

  let boundary = new Rectangle(200,200,200,200)
  qt = new QuadTree(boundary,4);
  
  for (let i = 0; i < 30; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x, y);
    qt.insert(p);
  }
  
  
}
let range = new Rectangle(250,280,120,75);
function draw(){
  background(0);
  show(qt);
  if(mouseIsPressed){
    range = new Rectangle(mouseX,mouseY,120,75);
  }
  drawRange(range);
  highlightPoints(range);
}
function highlightPoints(range){
  let points = qt.query(range);
  for(let p of points){
    strokeWeight(3);
    stroke(255,0,0);
    point(p.x,p.y);
  }

}
function drawRange(r){
  stroke(0,255,0);
  strokeWeight(3);
  rectMode(CENTER);
  rect(r.x,r.y,r.w,r.h);
}
function show(qt){
  stroke(255);
  noFill();
  strokeWeight(1);
  rectMode(CENTER);
  let x = qt.boundary.x;
  let y = qt.boundary.y;
  let w = qt.boundary.w;
  let h = qt.boundary.h;

  rect(x,y,w*2,h*2);
  if(qt.isDivided){
    show(qt.ne);
    show(qt.nw);
    show(qt.sw);
    show(qt.se);
  } else {
    for(let p of qt.points){
      strokeWeight(2);
      point(p.x,p.y);
    }
  }
  
  

}

