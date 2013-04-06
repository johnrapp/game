var Level = Class.extend({
	init: function(w, h) {
		this.width = w;
		this.height = h;
		this.entities = [];

		this.canvas = $(canvases[LEVEL_CANVAS]);
		this.context = canvases[LEVEL_CANVAS].getContext('2d');
		this.entityContext = canvases[ENTITY_CANVAS].getContext('2d');
		this.xScroll = (width - this.width) / 2;
		this.yScroll = (height - this.height) / 2;
		this.canvas.css('left', this.xScroll + 'px');
		this.canvas.css('top', this.yScroll + 'px');
	},
	prepare: function() {
		this.player = this.addEntity(new Player(this.width / 2, this.height / 2));

		var amount = 0;
		var distance = 300;
		for(var i = 0; i < amount; i ++) {
			var angle = i * ((Math.PI * 2) / amount);
			this.addEntity(new HostileMob(this.player.pos.x + Math.cos(angle) * distance, this.player.pos.y + Math.sin(angle) * distance));
		}
		
		this.addEntity(new Entity(this.width / 2, this.height, this.width, 0, TEAM_NEUTRAL));
		this.addEntity(new Entity(this.width, this.height / 2, 0, this.height, TEAM_NEUTRAL));
		this.addEntity(new Entity(this.width / 2, 0, this.width, 0, TEAM_NEUTRAL));
		this.addEntity(new Entity(0, this.height / 2, 0, this.height, TEAM_NEUTRAL));

		var round = false;
		var amount = 10;
		for(var x = 0; x < amount; x++) {
			round = !round;
			for(var y = 0; y < amount; y++) {
				round = !round;
				var color = round ? '#444' : '#555';
				rect(this.context, Math.floor(x * (this.width / amount)), Math.floor(y * (this.height / amount)),
					(this.width / amount), (this.height / amount), color);
			}
		}
	},
	addEntity: function(entity) {
		this.entities.push(entity);
		return entity;
	},
	getEntities: function() {
		return this.entities;
	},
	removeEntity: function(index) {
		this.entities.splice(index, 1);
	},
	getClipBBs: function(e) {
		var result = [];
		for(var index in this.entities) {
			var ee = this.entities[index];
			if (ee != e && ee.collidesWith(e))
				result.push(ee.getBB());
		}
		return result;
	},
	update: function(delta) {
		var remove = [];
		for (var i in this.entities) {
			var entity = this.entities[i];
			if(entity.removed) { remove.push(i); continue; }
			entity.update(this, delta);
		};

		for (var i in remove) {
			this.removeEntity(remove[i]);
		};
	},
	scroll: function(xa, ya) {
		this.xScroll += xa;
		this.yScroll += ya;
		if(this.xScroll > 0)
			this.xScroll = 0;
		if(this.xScroll < width - this.width)
			this.xScroll = width - this.width;
		if(this.yScroll > 0)
			this.yScroll = 0;
		if(this.yScroll < height - this.height)
			this.yScroll = height - this.height;

		this.canvas.css('left', this.xScroll + 'px');
		this.canvas.css('top', this.yScroll + 'px');
	},
	render: function() {
		clear(this.entityContext);
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].render(this.entityContext, this);
		}
	}
});