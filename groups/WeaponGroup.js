/**
 * Created by gattra on 12/28/15.
 */

var WeaponGroup = function(game) {
    Phaser.Group.call(this, game);
};

WeaponGroup.prototype = Object.create(Phaser.Group.prototype);
WeaponGroup.prototype.constructor = WeaponGroup;


WeaponGroup.prototype.addWeapons = function(weapons) {
    for (var i=0;i<weapons.length;i++) {
        if (weapons[i]) {
            this.add(weapons[i]);
        }
    }
};
