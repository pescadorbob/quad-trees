let qt;
function setup() {
  createCanvas(400,400);

  let boundary = new Rectangle(200,200,200,200)
  qt = new QuadTree(boundary,4);
  

  for(let i=0;i<100;i++){
    let p = new Point(random(boundary.w*2),random(boundary.h*2));
    qt.insert(p);
  }
  
  
} 
function draw(){
  background(0);
  strokeWeight(1);
  rectMode(CENTER);
  show(qt);
}
function show(qt){
  stroke(255);
  noFill();
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
  }

}

