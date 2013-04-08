var Weapon = Class.extend({
	init: function(owner, maxShootDelay, recoil) {
		this.owner = owner;
		this.maxShootDelay = maxShootDelay;
		this.shootDelay = 0;
		this.recoil = recoil;
	},
	update: function(delta) {
		this.shootDelay -= delta;
		this.reloadDelay -= delta;
	},
	readyToFire: function() {
		return this.shootDelay <= 0;
	},
	fire: function(level, angle) {
		this.shootDelay = this.maxShootDelay;
	},
	getBulletDirection: function(level) {
		return Math.atan2(mouse.y - this.owner.pos.y + level.yScroll, mouse.x - (this.owner.pos.x + level.xScroll));
	},
	applyDirectionNoise: function(angle, strenght) {
		return angle + (Math.random() * 2 - 1) * strenght;
	},
	applyRecoil: function(xd, yd) {
		this.owner.xBump -= xd * this.recoil;
		this.owner.yBump -= yd * this.recoil;
	},
	generateBullet: function(xd, yd) {
		return new Bullet(this.owner.pos.x, this.owner.pos.y, xd, yd);
	}
});