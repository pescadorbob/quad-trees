class Point {
  constructor(x, y, data) {
    this.x = x;
    this.y = y;
    this.data = data;
  }
}

// The Rectangle is centered and the width
// is from the center to the edge, top, right, left or bottom.

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
let DEFAULT_CAPACITY = 4;
class QuadTree {
  constructor(boundary, n = DEFAULT_CAPACITY) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.nw = null;
    this.ne = null;
    this.se = null;
    this.sw = null;
    this.isDivided = false;
  }
  within(p) {
    if (p.x < this.boundary.x + this.boundary.w && p.x > this.boundary.x - this.boundary.w &&
      p.y < this.boundary.y + this.boundary.h && p.y > this.boundary.y - this.boundary.h) {
      return true;
    }
    return false;
  }
  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    this.nw = new QuadTree(new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2));
    this.ne = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2));
    this.se = new QuadTree(new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2));
    this.sw = new QuadTree(new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2));
    this.points.forEach(p => {
      if (this.nw.within(p)) this.nw.insert(p);
      else if (this.ne.within(p)) this.ne.insert(p);
      else if (this.se.within(p)) this.se.insert(p);
      else if (this.sw.within(p)) this.sw.insert(p);
      else console.log("Error: p is not within any boundary");
    });

    this.points = null;
  }

  insert(point) {
    if (!this.within(point)) return;
    if (this.points && this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      if (!this.isDivided) {
        this.subdivide();
        this.isDivided = true;
      }
      if (this.nw.within(point)) this.nw.insert(point);
      else if (this.ne.within(point)) this.ne.insert(point);
      else if (this.se.within(point)) this.se.insert(point);
      else if (this.sw.within(point)) this.sw.insert(point);
      else console.log("Error: p is not within any boundary");
    }
  }
  query(range){
    let found = [];
    if(!this.isDivided){
      found = found.concat(this.points);
    } else {
      let sections = [this.nw,this.ne,this.se,this.sw];
      sections.forEach(quad => {
        let points = quad.query(range);
        points.forEach(p=>{
          found.push(p);
        })
      });
    }
    return found;
  }


}
