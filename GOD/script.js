// varible and conditions
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouse = false;
ctx.lineJoin = "round";
ctx.lineCap = "round";
var positionX, positionY;

//Element retrival
var brush = document.getElementById("brush"); //Brush
var eraser = document.getElementById("erase"); //Eraser
var color = document.getElementById("myColor"); //Color
var size = document.getElementById("myRange"); //size
var reset = document.getElementById("reset"); //reset
var saveLink = document.getElementById("saveLink");//savelink

// 2. Brush
function getCoordinates(canvas,e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

function brushDraw(canvas, positionX, positionY) {
    if(mouse) {
        ctx.lineTo(positionX, positionY)
        ctx.stroke();
        canvas.style.cursor = "pointer";
    }
}

function brushDown(e){
    mouse = true;   
    var coordinates = getCoordinates(canvas, e);
    canvas.style.cursor = "pointer";
    positionX = coordinates.x;
    positionY = coordinates.y;
    ctx.beginPath();
    ctx.moveTo(positionX, positionY);
    ctx.lineTo(positionX, positionY);
    ctx.stroke;
}

function brushMove(e){
    var coordinates = getCoordinates(canvas, e);
    positionX = coordinates.x;
    positionY = coordinates.y;
    brushDraw(canvas, positionX, positionY);
    
}

function brushUp(){
    mouse = false;
	canvas.style.cursor = "default";
}

function brushClick() {
      var brushColor = document.getElementById("myColor")
      ctx.strokeStyle = brushColor.value;
      brush.style.border = "2px solid red";
      eraser.style.border = "none";
      canvas.addEventListener("mousedown", brushDown, false);
      canvas.addEventListener("mousemove", brushMove, false);
      canvas.addEventListener("mouseup", brushUp, false);
}


// 3. Eraser

function eraserClick() {
	ctx.strokeStyle = "white";
	eraser.style.border = "2px solid red";
	brush.style.border = "none";
	
	canvas.addEventListener("mousedown", brushDown, false);
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}

// 4. Color conditions
var myColor = color.value;
ctx.strokeStyle = myColor;
color.addEventListener("change", colorChange);

function colorChange() {
	myColor = color.value;
	ctx.strokeStyle = myColor;
}


// 5. Size
function sizeChange() {
	mySize = size.value;
	ctx.lineWidth = mySize;
}

// 6. Reset
function resetClick(){
    window.location.reload();
}

// 7. Save 
function saveClick() {
	var data = canvas.toDataURL(); 
	console.log(data);
	saveLink.href = data;
	saveLink.download = "myImage.png";
}
//Event Listeners for tools
   
brush.addEventListener("click", brushClick);
eraser.addEventListener("click", eraserClick);
color.addEventListener("change", colorChange);
size.addEventListener("change", sizeChange); 
reset.addEventListener("click", resetClick); 
saveLink.addEventListener("click", saveClick);
