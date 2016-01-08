/**
 * Created by gattra on 1/8/2016.
 */

var ManaGroup = function(game) {
    Phaser.Group.call(this, game);
};

ManaGroup.prototype = Object.create(Phaser.Group.prototype);
ManaGroup.prototype.constructor = ManaGroup;

ManaGroup.prototype.addMana = function(mana) {
    for (var i=0;i<mana.length;i++) {
        if (mana[i]) {
            this.add(mana[i]);
        }
    }
};

ManaGroup.prototype.handleManaCollect = function(mana, player) {
    mana.kill();
    player.manaCount += 10;
    if (player.lifeCount + 10 < 100) { player.lifeCount += 10; }
    else { player.lifeCount = 100; }
};