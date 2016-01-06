/**
 * Created by gattra on 1/3/16.
 */

/**
 * Created by gattra on 12/23/2015.
 */

var WarlckGroup = function(game) {
    Phaser.Group.call(this, game);
};

WarlckGroup.prototype = Object.create(Phaser.Group.prototype);
WarlckGroup.prototype.constructor = WarlckGroup;

WarlckGroup.prototype.addEnemies = function(warlcks) {
    for (var i=0;i<warlcks.length;i++) {
        if (warlcks[i]) {
            this.add(warlcks[i]);
        }
    }
};

WarlckGroup.prototype.distanceFromPlayer = function(warlck, player) {
    if (!player.alive) {
        warlck.lastDir = 'right';
        warlck.mode = MODE.PATROLING;
    }
    else if (game.physics.arcade.distanceBetween(warlck,player) < warlck.detectRange) {
        warlck.pursuePlayer(player);
    } else {
        if (warlck.mode === MODE.ATTACKING || warlck.mode === MODE.PURSUING) {
            if (warlck.body.velocity.x < 0) { warlck.lastDir = 'left'; } else { warlck.lastDir = 'right'; }
            warlck.origin = { x : warlck.position.x, y : warlck.position.y };
        }
        warlck.mode = MODE.PATROLING;
    }
};