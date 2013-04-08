var dir = 'res/'
var sources = ['player.png', 'zombie.png'], images = [];
var PLAYER_IMAGE = 0, ZOMBIE_IMAGE = 1;

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
		start();
	}
}

var Spritesheet = function(image, sw, sh) {
	var image = image;
	var sw = sw;
	var sh = sh;
	this.length = image.width / sw;
	this.height = image.height / sh;
	this.getSprite = function(x, y) {
		return new Sprite(image, x * sw, y * sh, sw, sh);
	}
	// y and x order inverted. Feels better considering how the spritesheets are drawn
	this.sprites = [];
	for(var y = 0; y < this.height; y++) {
		this.sprites[y] = [];
		for(var x = 0; x < this.length; x++) {
			this.sprites[y][x] = this.getSprite(x, y);
		}
	}
}

var Sprite = function(image, x, y, w ,h) {
	var image = image;
	var x = x;
	var y = y;
	var w = w;
	var h = h;
	this.draw = function(ctx, dx, dy) {
		ctx.drawImage(image, x, y, w, h, dx, dy, w, h);
	}
}