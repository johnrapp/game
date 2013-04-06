var Player = Mob.extend({
	init: function(x, y) {
		this._super(x, y, 24, 24, TEAM_PLAYER, 200, 10, 1000);
		this.weapon = new Rifle(this);
	},
	update: function(level, delta) {
		this._super(level, delta);
		var xa = 0;
		var ya = 0;
		var speed = this.speed;
		if(keyDown(W)) ya++;
		if(keyDown(A)) xa--;
		if(keyDown(S)) ya--;
		if(keyDown(D)) xa++;
		if (keyDown(SHIFT))	speed *= 1.5;
		if(xa != 0 || ya != 0) {
			var sqrt = Math.sqrt(xa * xa + ya * ya);
			this.xd += xa * (speed / sqrt);
			this.yd += ya * (speed / sqrt);
		}
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

		this.weapon.update(delta);
		if(mousedown && this.weapon.readyToFire()) {
			this.weapon.fire(level);
		}
	},
	finalMove: function(level, xa, ya) {
		this._super(level, xa, ya);
		var maxDist = 100;
		var scroll = false;
		if(xa != 0) {
			var scrollLeft = (width / 2 - this.pos.x + level.xScroll) > maxDist;
			var scrollRight = (width / 2  - level.width - this.pos.x + level.xScroll) > maxDist;
			if(scrollLeft || scrollRight) {
				scroll = true;
				if((scrollLeft && xa < 0) || (scrollRight && xa > 0))
					xa = 0;
			}
			
		}
		if(ya != 0) {
			var scrollUp = (level.height - maxDist - this.pos.y + level.yScroll) >= maxDist;
			var scrollDown = (this.pos.y - maxDist + level.yScroll) >= maxDist;
			if(scrollUp || scrollDown) {
				scroll = true;
				if((scrollDown && ya < 0) || (scrollUp && ya > 0))
					ya = 0;
			}
		}
		if(scroll)
			level.scroll(-xa, ya);
	},
	collide: function(other, xa, ya) {
		this._super(other, xa, ya);
	},
	hurt: function(source, damage) {
		if(!(source instanceof HostileMob && this.hurtTime > 0)) {
			this.health -= damage;
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