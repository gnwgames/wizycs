/**
 * Created by gattra on 12/28/15.
 */

var Melee = function (game, x, y) {
    Power.call(this, game, x, y, 'stave_diving');
    this.game.add.existing(this);
    this.hitGroups = null;
};

Melee.handleInput = function (char, hitGroup) {
    if ((char.state !== STATE.STANDING) && (char.state !== STATE.FLYING)) {
        var staff = new Melee(game, 0, 0);
        staff.scale.set(.60, .60);
        // Tweak anchor position to correctly align over player
        staff.anchor.setTo(.07, -0.4);
        char.equippedWeapon = char.addChild(staff);
        char.body.velocity.y = 600;
    }
};

Melee.prototype = Object.create(Power.prototype);
Melee.prototype.constructor = Melee;

Melee.prototype.sheath = function(player) {
    console.log('killing');
    this.kill();
    player.equippedWeapon = null;
};

Melee.prototype.update = function () {
    this.game.physics.arcade.overlap(this.hitGroups, this)
};
