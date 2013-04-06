var Shotgun = Weapon.extend({
	init: function(owner) {
		this.bulletAmount = 20;
		this._super(owner, 0.5, 50);
		this.spread = .4;
	},
	fire: function(level) {
		this._super(level);
		var angle = this.getBulletDirection(level);
		for(var i = 0; i < this.bulletAmount; i++) {
			level.addEntity(this.generateBullet(Math.cos(this.applyDirectionNoise(angle, this.spread)),
			 Math.sin(this.applyDirectionNoise(angle, this.spread))));
		}
		this.applyRecoil(Math.cos(angle), Math.sin(angle));
	},
	generateBullet: function(xd, yd) {
		return new ShotgunBullet(this.owner.pos.x, this.owner.pos.y, xd, yd);
	}
});