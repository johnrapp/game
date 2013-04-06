var LEVEL_CANVAS = 0, ENTITY_CANVAS = 1;
var canvases = [], level;
$(document).ready(function() {
	init(900, 600);
	var levelWidth = new Vector(1200, 1200);
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