var LEVEL_CANVAS = 0, ENTITY_CANVAS = 1;
var canvases = [], level;
$(document).ready(function() {
	init(1900, 1000);
	var levelWidth = 2300;
	var levelHeight = 1400;
	level = new Level(levelWidth, levelHeight);
	canvases.push(createCanvas(levelWidth, levelHeight, 'gameCanvas', 'levelCanvas'));
	canvases.push(createCanvas(width, height, 'gameCanvas', 'entityCanvas'));
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