var dir = 'res/'
var sources = ['player.png'], images = [];

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

var SpriteSheet = function(image, sw, sh) {
	var image = image;
	var sw = sw;
	var sh = sh;
	this.lenght = image.width / sw;
	this.height = image.height / sh;
	this.sprites = [];
	for(var x = 0; x < this.lenght; x++) {
		this.sprites[x] = [];
		for(var y = 0; y < this.height / sh; y++) {
			this.sprites[x][y] = new Sprite(image, x * sw, y * sh, sw, sh);
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