var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
// console.log(c);
// c.fillRect takes four values(x,y,width, height);
// c.fillStyle = "rgba(255, 0 , 0, 0.5)";
// c.fillRect(100,100,100,100);
// c.fillStyle = "rgba(0, 0 , 255, 0.5)";
// c.fillRect(400,100,100,100);
// c.fillStyle = "rgba(0, 255 , 0, 0.5)";
// c.fillRect(300,300,100,100);

// // line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300,100);
// c.lineTo(400, 300);
// c.strokeStyle = "#f23d3a";
// c.stroke()

// // arc / circle
// // c.beginPath();
// // // c.arc(x,y,radius, start anage & end angle);
// // c.arc(300, 300, 40, 0, Math.PI * 2, false);
// // c.strokeStyle = "green";
// // c.stroke();

// // multiple circle creation
// for(var i = 0; i < 30; i++){
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
// 	c.beginPath();
// 	var color = [1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
// 	color.sort((a,b) => 0.5 - Math.random());
// 	// c.arc(x,y,radius, start anage & end angle);
// 	c.arc(x, y, 40, 0, Math.PI * 2, false);
// 	c.strokeStyle = `${"#" + color.join("").slice(0,6)}`;
// 	c.stroke();
// }

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 10;
// var dy = (Math.random() - 0.5) * 10;
// var radius = 40;

// function animate(){
// 	requestAnimationFrame(animate);
// 	// clearing the rectange so it will not drow multiple circle
// 	c.clearRect(0,0, innerWidth, innerHeight);

// 	c.beginPath();
// 	c.arc(x, y, radius, 0, Math.PI * 2, false);
// 	c.strokeStyle = "green";
// 	c.stroke();
// 	c.fill();
// 	if(x + radius > innerWidth || x - radius < 0){
// 		dx = -dx;
// 	}
// 	x += dx;
// 	y += dy;
// 	if(y + radius > innerHeight || y - radius < 0){
// 		dy = -dy;
// 	}		
// }

// animate();
var mouse = {
	x: undefined,
	y: undefined
}
var maxRadius = 40;
// var minRadius = 2;
// var colorArray = [1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
var colorArray = ["red", "green", "blue", "tomato", "dodgerblue"]

function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.drow = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
		// c.strokeStyle = "blue";
		// for(var i = 0; i < colorArray.length; i++){
		// 	colorArray.sort((a,b)=> 0.5 - Math.random());
		// }
		// c.fillStyle = `${"#" + colorArray.sort((a,b)=> 0.5 - Math.random()).join("").slice(0,6)}`;
		// c.fillStyle = `${"#" + colorArray.join("").slice(0,6)}`;
		c.fillStyle = this.color;
		// c.stroke();
		c.fill();
	}

	this.update = function(){
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy

		// mouse move ictivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y -this.y < 50 && mouse.y - this.y > -50){
			if(this.radius < maxRadius){
				this.radius += 1;
			}
		}else if (this.radius > this.minRadius){
			this.radius -= 1;
		}

		this.drow();
	}
}

var circleArray = [];
function init(){
	circleArray = [];
for(var i = 0; i < 2000; i++){
		// var radius = 40;
		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 10;
		var dy = (Math.random() - 0.5) * 10;
		circleArray.push(new Circle(x,y,dx,dy,radius));
	}
}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}
}
animate();
init();

window.addEventListener("mousemove", (e) =>{
	mouse.x = e.x;
	mouse.y = e.y;
})

window.addEventListener("resize", (e) => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})

