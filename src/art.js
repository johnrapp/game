var dir = 'res/'
var sources = ['player.png', 'zombie.png'], images = [];

var Art = new function() {
	this.imagesLoaded = function() {
		this.player = new createSheet(images[0], 50, 50);
		this.zombie = new createSheet(images[1], 50, 50);
	}
}

var playerImage, zombieImage;
function everythingLoaded() {
	Art.imagesLoaded();
	start();
}

$(document).ready(function() {
	for(var i in sources) {
		var image = new Image();
		image.src = dir + sources[i];
		image.onload = imageLoaded;
		images.push(image);
	}
});


var loadedImages = 0;
var imageLoaded = function() {
	if(++loadedImages >= images.length) {
		everythingLoaded();
	}
}

function createSheet(image, sw, sh) {
	var sprites = [];
	// y and x order inverted. Feels better considering how the spritesheets are drawn
	for(var y = 0; y < image.height / sh; y++) {
		sprites[y] = [];
		for(var x = 0; x < image.width / sw; x++) {
			sprites[y][x] = new Sprite(image, x * sw, y * sh, sw, sh);;
		}
	}
	return sprites;
}

var spriteSheet = function() {
	this[0] = 4;
};
spriteSheet.prototype = new Array;

//alert((new spriteSheet())[0]);

var Sprite = function(image, x, y, w ,h) {
	this.draw = function(ctx, dx, dy) {
		ctx.drawImage(image, x, y, w, h, dx, dy, w, h);
	}
}