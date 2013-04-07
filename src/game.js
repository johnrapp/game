var LEVEL_CANVAS = 0, ENTITY_CANVAS = 1;
var canvases = [], level;
$(document).ready(function() {
	init(1900, 1000);
	var levelWidth = new Vector(2300, 1400);
	canvases.push(createCanvas(levelWidth.x, levelWidth.y, 'gameCanvas', 'levelCanvas'));
	canvases.push(createCanvas(width, height, 'gameCanvas', 'entityCanvas'));
	level = new Level(levelWidth.x, levelWidth.y);
});

function startGame() {
	level.prepare();
}

function update(delta) {
	level.update(delta);
};

function render() {
	level.render(canvases);
};