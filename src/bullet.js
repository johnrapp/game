var Bullet = Mob.extend({
	init: function(x, y, w, h, speed, health, knockback, xd, yd, damage, color) {
		this._super(x, y, w, h, TEAM_PLAYER, speed, health, knockback);
		this.xd = xd * this.speed;
		this.yd = yd * this.speed;
		this.damage = damage;
		this.color = color;
	},
	update: function(level, delta) {
		this._super(level, delta);
		this.health -= delta;
		if(this.health <= 0 )
			this.die();
		this.move(level, this.xd, this.yd, delta);
	},
	render: function(ctx, level) {
		circle(ctx, this.pos.x + level.xScroll, level.height - this.pos.y + level.yScroll, this.pos.w , this.color);
	},
	collide: function(other, xa, ya) {
		if(this.isEnemyOf(other)) {
			other.hurt(this, this.damage);
			this.die();
		} else {
			this.xd += xa * 2;
			this.yd += ya * 2;
		}
	}
});
