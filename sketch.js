let qt;
function setup() {
  createCanvas(400,400);

  let boundary = new Rectangle(200,200,200,200)
  qt = new QuadTree(boundary,4);
  
  for (let i = 0; i < 500; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x, y);
    qt.insert(p);
  }
  
  
}
let searchRange = new Rectangle(250,280,60,35);
function draw(){
  background(0);
  if(mouseIsPressed){
    searchRange = new Rectangle(mouseX,mouseY,searchRange.w,searchRange.h);
  }
  highlightIntersections(searchRange);
  show(qt);
  drawSearchRange(searchRange);
  highlightSearchPoints(searchRange);
}
function highlightSearchPoints(range){
  let trees = [];
  qt.queryTrees(range,trees);
  for(let tree of trees){
    if(!tree.isDivided){
      for(let p of tree.points){
        if(range.contains(p)){
          stroke(255,0,0);
          strokeWeight(3);

          point(p.x,p.y);
        }
      }
    }
  }
}
function highlightIntersections(range){
  let rectangles = [];
  qt.queryTrees(range,rectangles);
  for(let tree of rectangles){
    let r = tree.boundary;
    strokeWeight(6);
    stroke(150,150,0);
    rectMode(CENTER);
    noFill();
    // the train guy used width and height that are half. 
    rect(r.x,r.y,2*r.w,2*r.h);
  }

}
function drawSearchRange(r){
  stroke(0,255,0);
  strokeWeight(3);
  rectMode(CENTER);
  rect(r.x,r.y,2*r.w,2*r.h);
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

  // the train guy used a width and height that was half the width and height
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

