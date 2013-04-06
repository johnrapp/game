var LEVEL_CANVAS = 0, ENTITY_CANVAS = 1;
var canvases = [], level;
$(document).ready(function() {
	init(600, 600);
	var levelWidth = new Vector(900, 900);
	canvases.push(createCanvas(levelWidth.x, levelWidth.y, 'gameCanvas', 'levelCanvas'));
	canvases.push(createCanvas(width, height, 'gameCanvas', 'entityCanvas'));
	level = new Level(levelWidth.x, levelWidth.y);
	level.prepare();
});

function update(delta) {
	level.update(delta);
};

function render() {
	level.render(canvases);
};

var mouse = new Vector(0,0,0,0);
$(document).mousemove(function onMouseMove(e) {
	mouse.x = (e.layerX || e.layerX == 0) ? e.layerX : e.offsetX;
	mouse.y = level.height - (e.layerX ? e.layerY : e.offsetY);
});