var width, height;
var container;
var W = 87, A = 65, S = 83, D = 68,
	UP = 38, LEFT = 37, DOWN = 40, RIGHT = 39,
	SHIFT = 16,
	NUM0 = 48, NUM1 = 49, NUM2 = 50, NUM3 = 51, NUM4 = 52, NUM5 = 53, NUM6 = 54, NUM7 = 55, NUM8 = 56, NUM9 = 57;

function init(w, h) {
	width = w;
	height = h;
	container = $('#container');
	container.width(width).height(height);
	then = Date.now();
	setInterval(game, 1000 / 120);
}

var totalHeight = 0;
var count = -1;
function createCanvas(w, h, className, id) {
	count++;
	var canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	canvas.className += className;
	canvas.setAttribute("id", id);
	canvas.style.zIndex = count + 50;
	canvas.style.top = -totalHeight;
	totalHeight += h;
	container.append(canvas);
	return canvas;
}

var then;
function game() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	$('#fps').text(1000 / delta);
};

function debug(text) {
	$('#debug').text(text);
}

var keyboard = [];
$(document).keydown(function onKeyDown(evt) {
	keyboard[evt.keyCode] = true;
});
$(document).keyup(function onKeyUp(evt) {
	keyboard[evt.keyCode] = false;
});

var mousedown = false;
$(document).mousedown(function onMouseDown() {
	mousedown = true;
});
$(document).mouseup(function onMouseDown() {
	mousedown = false;
});

function keyDown(key) {
	return keyboard[key];
}

function keyUp(key) {
	return !keyboard[key];
}

function circle(ctx, x, y, r, c) {
	ctx.fillStyle = c;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

function rect(ctx, x, y, w, h, c) {
	ctx.fillStyle = c;
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

function clear(ctx, x, y, w, h) {
	ctx.clearRect(x,y,w,h);
}

function clear(ctx) {
	ctx.clearRect(0, 0, width, height);
}

function randomInt(maxValue) {
	return Math.floor(Math.random() * (maxValue + 1));
}

function randomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function alphaColor(r, g, b, a) {
	return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}