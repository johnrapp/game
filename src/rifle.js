var Rifle = Weapon.extend({
	init: function(owner) {
		this._super(owner, 0.1, 20);
	},
	fire: function(level, angle) {
		this._super(level, angle);
		angle = this.applyDirectionNoise(angle, .01);
		var xd = Math.cos(angle);
		var yd = Math.sin(angle);
		level.addEntity(this.generateBullet(xd, yd));
		this.applyRecoil(xd, yd);
	},
	generateBullet: function(xd, yd) {
		return new RifleBullet(this.owner.pos.x, this.owner.pos.y, xd, yd);
	}
});