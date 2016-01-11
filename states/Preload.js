/**
 * Created by gattra on 1/11/2016.
 */

var Wizycs = Wizycs || {};

Wizycs.Preload = function() {};

Wizycs.Preload.prototype = {
    preload: function() {
        /*
         LOAD SCRIPTS
         */
        this.load.script('EnemyGroup.js', './models/groups/EnemyGroup.js');
        this.load.script('EnemyGroup.js', './models/groups/WarlckGroup.js');
        this.load.script('EnemyGroup.js', './models/groups/PowerGroup.js');
        this.load.script('ManaGroup.js', './models/groups/ManaGroup.js');
        this.load.script('Flame.js', './models/powers/Flame.js');
        this.load.script('Pika.js', './models/enemies/Pika.js');
        this.load.script('Melee.js', './models/powers/Melee.js');
        this.load.script('Enemy.js', './models/enemies/Enemy.js');
        this.load.script('Player.js', './models/players/Player.js');
        this.load.script('Power.js', './models/powers/Power.js');
        this.load.script('Warlck.js', './models/warlcks/Warlck.js');
        this.load.script('BasicWarlck.js', './models/warlcks/BasicWarlck.js');
        this.load.script('Mana.js', './models/collectibles/Mana.js');
        this.load.script('FireMana.js', './models/collectibles/FireMana.js');
        this.load.script('Boot.js', './states/Boot.js');
        this.load.script('Preload.js', './states/Preload.js');
        this.load.script('Menu.js', './states/Menu.js');


        /*
         LOAD ASSETS
         */
        this.load.spritesheet('flame', './assets/sprites/fireball.png', 64,64);
        this.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32);
        this.load.spritesheet('pika', './assets/sprites/pika.jpg', 16,24);
        this.load.spritesheet('stave_equipped', './assets/sprites/stave.png', 55,55);
        this.load.spritesheet('stave_diving', './assets/sprites/stave_straight.png', 55,55);
        this.load.spritesheet('test_mana', './assets/sprites/manatest.png', 100, 100);
        this.load.tilemap('gregtest', './assets/maps/gregtestmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('tutorial_map', './assets/maps/tutorialMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('clouds', './assets/maps/clouds.jpg');
        this.load.image('terrain', './assets/maps/sprite_sheet (4).png');
        this.load.image('collision', './assets/maps/collision_tiles.jpg');
    },
    create: function() {
        this.state.start('Menu');
    },
    update: function() {}
};