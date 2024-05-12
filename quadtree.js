(()=>{var l=(e,s)=>()=>(s||e((s={exports:{}}).exports,s),s.exports);var d=l((b,y)=>{var o=class{constructor(s,i,t){this.x=s,this.y=i,this.data=t}},r=class{constructor(s,i,t,h){this.x=s,this.y=i,this.w=t,this.h=h,this.left=s-t,this.right=s+t,this.top=i-h,this.bottom=i+h}intersects(s){return!(this.right<s.left||this.left>s.right||this.top>s.bottom||this.bottom<s.top)}contains(s){return this.left<=s.x&&s.x<=this.right&&this.top<=s.y&&s.y<=this.bottom}},w=4,u=class e{constructor(s,i=w){this.boundary=s,this.capacity=i,this.points=[],this.nw=null,this.ne=null,this.se=null,this.sw=null,this.isDivided=!1}within(s){return s.x<this.boundary.x+this.boundary.w&&s.x>this.boundary.x-this.boundary.w&&s.y<this.boundary.y+this.boundary.h&&s.y>this.boundary.y-this.boundary.h}subdivide(){let s=this.boundary.x,i=this.boundary.y,t=this.boundary.w,h=this.boundary.h;this.nw=new e(new r(s-t/2,i+h/2,t/2,h/2)),this.ne=new e(new r(s+t/2,i+h/2,t/2,h/2)),this.se=new e(new r(s+t/2,i-h/2,t/2,h/2)),this.sw=new e(new r(s-t/2,i-h/2,t/2,h/2)),this.points.forEach(n=>{this.nw.within(n)?this.nw.insert(n):this.ne.within(n)?this.ne.insert(n):this.se.within(n)?this.se.insert(n):this.sw.within(n)?this.sw.insert(n):console.log("Error: p is not within any boundary")}),this.points=null}insert(s){this.within(s)&&(this.points&&this.points.length<this.capacity?this.points.push(s):(this.isDivided||(this.subdivide(),this.isDivided=!0),this.nw.within(s)?this.nw.insert(s):this.ne.within(s)?this.ne.insert(s):this.se.within(s)?this.se.insert(s):this.sw.within(s)?this.sw.insert(s):console.log("Error: p is not within any boundary")))}within(s){return s.x<this.boundary.x+this.boundary.w&&s.x>this.boundary.x-this.boundary.w&&s.y<this.boundary.y+this.boundary.h&&s.y>this.boundary.y-this.boundary.h}queryTrees(s,i){if(this.boundary.intersects(s))i.push(this);else return;this.isDivided&&[this.nw,this.ne,this.se,this.sw].forEach(h=>{h.queryTrees(s,i)})}};typeof y<"u"&&(y.exports={Point:o,Rectangle:r,QuadTree:u})});d();})();
