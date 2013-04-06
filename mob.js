var Mob = Entity.extend({
	init: function(x, y, w, h, team, speed, maxHealth, knockback) {
		this._super(x, y, w, h, team);
		this.speed = speed;
		this.maxHealth = maxHealth;
		this.health = maxHealth;
		this.knockback = knockback;
		this.xBump = 0;
		this.yBump = 0;

		this.freezeTime = 0;
		this.hurtTime = 0;
		this.damageHurtTime = 0.2;
		this.damageFreezeTime = 0.2;
	},
	update: function(level, delta) {
		this._super(level, delta);
		this.freezeTime -= delta;
		this.hurtTime -= delta;
	},
	hurt: function(source, damage) {
		this.health -= damage;
		if (this.health <= 0)
			this.die();
		if(source instanceof Mob) {
			var dist = source.pos.dist(this.pos);
			this.xBump += (this.pos.x - source.pos.x) / dist * source.knockback;
			this.yBump += (this.pos.y - source.pos.y) / dist * source.knockback;
			this.freezeTime = this.damageFreezeTime;
			this.hurtTime = this.damageHurtTime;
		}
	},
	die: function() {
		this.remove();
	},
	render: function(ctx, level) {
		if(this.hurtTime <= 0) {
			this._super(ctx, level);
		} else {
			var modif = 4;
			var perc = (this.hurtTime / this.damageHurtTime);
			var render = this.renderPos(new Vector(this.pos.x, this.pos.y, this.pos.w + perc * modif, this.pos.h + perc * modif), level);
			rect(ctx, render.x, render.y, render.w, render.h, '#222');
			rect(ctx, render.x, render.y, render.w, render.h, alphaColor(255, 0, 0, perc));
			return render;
		}
	}
});