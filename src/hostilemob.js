var HostileMob = Mob.extend({
	init: function(x, y) {
		this._super(x, y, 15, 15, TEAM_HOSTILE, 80, 10, 1000);
		this.xa = Math.random() * 2 - 1;
		this.ya = Math.random() * 2 - 1;
		this.damage = 1;
	},
	update: function(level, delta) {
		this._super(level, delta);
		var angle = Math.atan2(level.player.pos.y - this.pos.y, level.player.pos.x - this.pos.x);
		this.xd += Math.cos(angle) * this.speed, this.yd += Math.sin(angle) * this.speed;
		if (this.freezeTime > 0) {
            this.move(level, this.xBump, this.yBump, delta);
        } else {
            this.move(level, this.xd + this.xBump, this.yd + this.yBump, delta);
        }
        this.xd *= 0.4;
        this.yd *= 0.4;
        this.xBump *= 0.8;
        this.yBump *= 0.8;
        this.move(level, this.xd, this.yd, delta);
        this.xd *= 0.4;
        this.yd *= 0.4;
	},
	collide : function(other, xa, ya) {
		this._super(other, xa, ya);
		if(other instanceof Player)
			other.hurt(this, this.damage);
	}
});