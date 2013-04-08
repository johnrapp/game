var Shotgun = Weapon.extend({
	init: function(owner) {
		this.bulletAmount = 20;
		this._super(owner, 0.5, 50);
		this.spread = .4;
	},
	fire: function(level, angle) {
		this._super(level, angle);
		for(var i = 0; i < this.bulletAmount; i++) {
			var spreadAngle = this.applyDirectionNoise(angle, this.spread);
			level.addEntity(this.generateBullet(Math.cos(spreadAngle), Math.sin(spreadAngle)));
		}
		this.applyRecoil(Math.cos(angle), Math.sin(angle));
	},
	generateBullet: function(xd, yd) {
		return new ShotgunBullet(this.owner.pos.x, this.owner.pos.y, xd, yd);
	}
});