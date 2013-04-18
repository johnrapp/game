var Player = Mob.extend({
	init: function(x, y) {
		this._super(x, y, 40, 40, TEAM_PLAYER, 200, 1000, 1000);
		this.weapon = new Rifle(this);
		this.legRotation = 0;
		this.moving = false;
		this.spriteWidth = 50;
		this.spriteHeight = 50;
	},
	update: function(level, delta) {
		this._super(level, delta);
		var xa = 0;
		var ya = 0;
		var speed = this.speed;
		this.moving = false;
		if(keyDown(W)) ya++;
		if(keyDown(A)) xa--;
		if(keyDown(S)) ya--;
		if(keyDown(D)) xa++;
		if (keyDown(SHIFT))	speed *= 1.5;
		if(xa != 0 || ya != 0) {
			var sqrt = Math.sqrt(xa * xa + ya * ya);
			this.xd += xa * (speed / sqrt);
			this.yd += ya * (speed / sqrt);
			this.moving = true;
		}
		this.legRotation = Math.atan2(this.xd, this.yd);
		if (this.freezeTime > 0) {
			this.move(level, this.xBump, this.yBump, delta);
		} else {
			this.move(level, this.xd + this.xBump, this.yd + this.yBump, delta);
		}
		this.xd *= 0.4;
		this.yd *= 0.4;
		this.xBump *= 0.8;
		this.yBump *= 0.8;
		if(keyDown(NUM1) && !(this.weapon instanceof Rifle)) {
			this.weapon = new Rifle(this);
		} else if(keyDown(NUM2) && !(this.weapon instanceof Shotgun)) {
			this.weapon = new Shotgun(this);
		}

		this.rotation = Math.atan2(mouse.y - this.pos.y + level.yScroll, mouse.x - (this.pos.x + level.xScroll));
		this.weapon.update(delta);
		if(mousedown && this.weapon.readyToFire()) {
			this.weapon.fire(level, this.rotation);
		}
	},
	render : function(ctx, level) {
		var render = this.renderPos(this.pos, level);
		ctx.save(); 
		ctx.translate(this.pos.x + level.xScroll, level.height - this.pos.y + level.yScroll);
		//rect(ctx, -this.pos.w / 2, -this.pos.h / 2, render.w, render.h, alphaColor(255, 0, 0, .3));
		ctx.rotate(this.legRotation);
		if(this.moving) {
			Art.player[0][Math.floor(this.ticks / 10) % Art.player[0].length].draw(ctx, -this.spriteWidth / 2, -this.spriteHeight / 2);
		}
		ctx.rotate(-this.rotation - this.legRotation);
		Art.player[1][0].draw(ctx, -this.spriteWidth / 2, -this.spriteHeight / 2);
		ctx.restore();
	},
	finalMove: function(level, xa, ya) {
		this._super(level, xa, ya);
		var scroll = false, maxDist = 150;
		if(xa != 0) {
			var halfWidth = width / 2;
			var dist = halfWidth - this.pos.x - level.xScroll;
			var scrollLeft = -dist > (halfWidth - maxDist);
			var scrollRight = dist > (halfWidth - maxDist);
			if(scrollLeft || scrollRight) {
				scroll = true;
				if((scrollLeft && xa < 0) || (scrollRight && xa > 0))
					xa = 0;
			}
		}
		if(ya != 0) {
			var halfHeight = height / 2;
			var dist = halfHeight - level.height + this.pos.y - level.yScroll;
			var scrollDown = dist > (halfHeight - maxDist);
			var scrollUp = -dist > (halfHeight - maxDist);
			if(scrollUp || scrollDown) {
				scroll = true;
				if((scrollDown && ya < 0) || (scrollUp && ya > 0))
					ya = 0;
			}
		}
		if(scroll) level.scroll(-xa, ya);
	},
	collide: function(other, xa, ya) {
		this._super(other, xa, ya);
	},
	hurt: function(source, damage) {
		if(!(source instanceof HostileMob && this.hurtTime > 0)) {
			this.health -= damage;
			debug(this.health);
			if (this.health <= 0)
				this.die();
			var dist = source.pos.dist(this.pos);
			this.xBump += (this.pos.x - source.pos.x) / dist * source.knockback;
			this.yBump += (this.pos.y - source.pos.y) / dist * source.knockback;
			this.freezeTime = this.damageFreezeTime;
			this.hurtTime = this.damageHurtTime;
		}
	}
});