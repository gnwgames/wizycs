/**
 * Created by gattra on 1/11/2016.
 */

/*
var Wizycs = Wizycs || {};

Wizycs.Tutorial = function() {};

Wizycs.Tutorial.prototype = {
    preload: function() {
        Wizycs.game.load.script('Tutorial_preload.js', './states/levels/tutorial/Tutorial_preload.js');
    },
    create: function() {
        Wizycs.game.state.add('Tutorial_preload', Wizycs.Tutorial.preload);
        Wizycs.game.state.start('Tutorial_preload');
    },
    update: function() {}
};
*/
var Wizycs = Wizycs || {};

var map, layer, terrain, keys, wzrd, collision, flame, pika, enemyGroup, weaponGroup, warlckGroup, playerPowersGroup, manaGroup;
var lifeCount, manaCount;

Wizycs.Tutorial = function() {};

Wizycs.Tutorial.prototype = {
    preload: function() { this.preload(); },
    create: function() { this.create(); },
    update: function() { this.update(); }
};
