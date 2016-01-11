/**
 * Created by gattra on 1/11/2016.
 */
/*
var Wizycs = Wizycs || {};

Wizycs.Tutorial.prototype.preload = {
    preload: function () {
        Wizycs.game.load.script('Tutorial_create.js', './states/levels/tutorial/Tutorial_create.js');
        Wizycs.game.load.script('Tutorial_update.js', './states/levels/tutorial/Tutorial_update.js');
    },
    create: function () {
        Wizycs.game.state.add('Tutorial_create', Wizycs.Tutorial.create);
        Wizycs.game.state.start('Tutorial_create');
    }
};
*/

var Wizycs = Wizycs || {};

Wizycs.Tutorial.prototype.preload = function() {
    this.load.tilemap('tutorial_map', './assets/maps/tutorialMap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('clouds', './assets/maps/clouds.jpg');
    this.load.image('terrain', './assets/maps/sprite_sheet (4).png');
    this.load.image('collision', './assets/maps/collision_tiles.jpg');
};