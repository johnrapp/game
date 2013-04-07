var TEAM_PLAYER = 0;
var TEAM_HOSTILE = 1;
var TEAM_NEUTRAL = 2;
var Entity = Class.extend({
	init: function(x, y, w, h, team) {
		this.pos = new Vector(x, y, w, h);
		this.team = team;
		this.ticks = 0;
		this.removed = false;
		this.xd = 0;
		this.yd = 0;
	},
	update: function(level, delta) {
		this.ticks++;
	},
	render: function(ctx, level) {
		var render = this.renderPos(this.pos, level);
		rect(ctx, render.x, render.y, this.pos.w, this.pos.h, '#222');
	},
	renderPos: function(pos, level) {
		return new Vector(pos.left() + level.xScroll, level.height - pos.y - pos.h / 2 + level.yScroll, pos.w, pos.h);
	},
	getBB: function() {
		return new BB(this, this.pos.left(), this.pos.top(), this.pos.right(), this.pos.bottom());
	},
	remove: function() {
		this.removed = true;
	},
	move: function(level, xd, yd, delta) {
		var bbs = level.getClipBBs(this);
		moved = false;
		moved |= this.partMove(level, bbs, xd, 0, delta);
		moved |= this.partMove(level, bbs, 0, yd, delta);
		return moved;
	},
	partMove: function(level, bbs, xa, ya, delta) {
		var oxa = xa;
		var oya = ya;
		xa *= delta;
		ya *= delta;
		var from = this.getBB();
		var closest = null;
		for (var i in bbs) {
			var to = bbs[i];
			if (from.intersects(to))
				continue;
			if (xa != 0) {
				if (to.y0 >= from.y1 || to.y1 <= from.y0)
					continue;
				if (xa > 0) {
					var xrd = to.x0 - from.x1;
					if (xrd >= 0 && xa > xrd) {
						closest = to;
							xa = xrd;
						if (xa < 0)
							xa = 0;
					}
				} else if (xa < 0) {
					var xld = to.x1 - from.x0;
					if (xld <= 0 && xa < xld) {
						closest = to;
							xa = xld;
						if (xa > 0)
							xa = 0;
					}
				}
			}

			if (ya != 0) {
				if (to.x0 >= from.x1 || to.x1 <= from.x0)
					continue;
				if (ya > 0) {
					var yrd = to.y0 - from.y1;
					if (yrd >= 0 && ya > yrd) {
						closest = to;
							ya = yrd;
						if (ya < 0)
							ya = 0;
					}
				} else if (ya < 0) {
					var yld = to.y1 - from.y0;
					if (yld <= 0 && ya < yld) {
						closest = to;
						ya = yld;
						if (ya > 0)
							ya = 0;
					}
				}
			}
		}
		if (closest != null && closest.owner != null) {
			if (this.collidesWith(closest.owner)) {
				this.collide(closest.owner, -oxa, -oya);
				closest.owner.collide(this, oxa, oya);
			}
		}
		if (xa != 0 || ya != 0) {
			this.finalMove(level, xa, ya);
			return true;
		}
		return false;
	},
	finalMove: function(level, xa, ya) {
		this.pos.x += xa;
		this.pos.y += ya;
	},
	collidesWith: function(other) {
		return other.team != this.team;
	},
	isEnemyOf: function(other) {
		return this.team != other.team && other.team != TEAM_NEUTRAL;
	},
	collide: function(other, xa, ya) {
		this.xd += xa * 0.4;
		this.yd += ya * 0.4;
	}
});

function BB(owner, x0, y0, x1, y1) {
	this.owner = owner;
	this.x0 = x0;
	this.y0 = y0;
	this.x1 = x1;
	this.y1 = y1;

	this.intersects = function(bb) {
		if (bb.x0 >= x1 || bb.y0 >= y1 || bb.x1 <= x0 || bb.y1 <= y0)
			return false;
		return true;
	}
}