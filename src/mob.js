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
		ctx.save(); 
		ctx.translate(this.pos.x + level.xScroll, level.height - this.pos.y + level.yScroll);
		ctx.rotate(Math.PI / 2 - this.rotation);
		this.getSprite().draw(ctx, -this.pos.w / 2, -this.pos.h / 2);
		if(this.hurtTime > 0) {
			ctx.globalCompositeOperation = 'source-atop';
			rect(ctx, -this.pos.w / 2, -this.pos.h / 2, this.pos.w, this.pos.h, alphaColor(255, 0, 0, this.hurtTime / this.damageHurtTime));
		}
		ctx.restore();
	},
	getSprite: function() {
	}
});