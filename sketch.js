let qt;
function setup() {
  createCanvas(400,400);

  let boundary = new Rectangle(200,200,200,200)
  qt = new QuadTree(boundary,4);
  

  for(let i=0;i<500;i++){
    let p = new Point(random(boundary.w*2),random(boundary.h*2));
    qt.insert(p);
  }
  
  
} 
function draw(){
  if(mouseIsPressed){
    let m = new Point(mouseX,mouseY);
    qt.insert(m);
  }
  background(0);
  show(qt);
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

