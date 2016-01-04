'use strict'

var map, layer, terrain, keys, wzrd, collision, flame, pika, enemyGroup, weaponGroup, warlckGroup;

// Game instantiation
var game = new Phaser.Game(600,450, Phaser.AUTO, 'Wizycs', {
  preload: preload,
  create: create,
  update: update
});

function preload() {
  // I load all my scripts in the html file
  // sort of superstition, because of errors before
  preloadScripts();
  preloadAssets();
}

function create() {
  game.physics.startSystem(Phaser.Physics.Arcade);
  game.stage.backgroundColor = '#63D1F4';
  map = game.add.tilemap('gregtest');
  map.addTilesetImage('clouds', 'clouds');
  map.addTilesetImage('terrain', 'terrain');
    map.addTilesetImage('collision', 'collision');
  layer = map.createLayer('Background');
  terrain = map.createLayer('Terrain');
    collision = map.createLayer('Collision');
    collision.visible = false;

  // this value is seen in the json file for this tile map
  map.setCollision(22, true, collision);
  layer.resizeWorld();
    terrain.resizeWorld();
  createObjects();
  integrateObjects();
}

function createObjects() {
    keys = game.input.keyboard.createCursorKeys();
    wzrd = new Player(game, 0, 0);

    var pikas = [];
    //pika = new PikaEnemy(game, 450, 350, 150, Enemy.ATTACK_TYPE.PURSUE, Flame);
    pika = new PikaEnemy(game, 450, 350, 150, null, Flame, null, null);
    pikas.push(pika);

    var warlcks = [];
    var warlck = new BasicWarlck(game, 450, 350, 150);
    warlcks.push(warlck);

    enemyGroup = new EnemyGroup(game);
    enemyGroup.addEnemies(pikas);

    warlckGroup = new WarlckGroup(game);
    warlckGroup.addEnemies(warlcks);

}

function integrateObjects() {
   //Flame.hitGroups = enemyGroup;
   // Melee.hitGroups = enemyGroup;

    // Equip the flame power to the key D / Melee to W
    wzrd.equip(Phaser.KeyCode.D, Flame.handleInput, enemyGroup);
    wzrd.equip(Phaser.KeyCode.DOWN, Melee.handleInput, enemyGroup);
/*
    enemyGroup.forEachAlive(function(enemy) {
        game.time.events.loop(Phaser.Timer.SECOND, function() {enemy.updateState()}, this);
    });
*/
}

function update() {
    wzrd.collide(collision);
    wzrd.handleInput(keys);

    enemyGroup.forEachAlive(function(enemy) {
        enemy.collide(collision);
        if (wzrd.alive) {
            wzrd.overlap(enemy);
            enemyGroup.distanceFromPlayer(enemy, wzrd);
        }
    });

    warlckGroup.forEachAlive(function(warlck) {
        warlck.collide(collision);
        if (wzrd.alive) {
            wzrd.overlap(warlck);
            warlckGroup.distanceFromPlayer(warlck, wzrd);
        }
    });

  // somehow restart the level or respawn the player when it dies
  //if (!wzrd.alive) {
  //  GameHandler.RespawnPlayer(wzrd);
  //}
}

var preloadScripts = function() {
    game.load.script('EnemyGroup.js', './models/groups/EnemyGroup.js');
    game.load.script('EnemyGroup.js', './models/groups/WarlckGroup.js');
    game.load.script('Flame.js', './models/powers/Flame.js');
    game.load.script('Pika.js', './models/enemies/Pika.js');
    game.load.script('Melee.js', './models/powers/Melee.js');
    game.load.script('Enemy.js', './models/enemies/Enemy.js');
    game.load.script('Player.js', './models/players/Player.js');
    game.load.script('Power.js', './models/powers/Power.js');
    game.load.script('Power.js', './models/warlcks/Warlck.js');
    game.load.script('Power.js', './models/warlcks/BasicWarlck.js');
};

var preloadAssets = function() {

    game.load.spritesheet('flame', './assets/sprites/fireball.png', 64,64);
    game.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32);
    game.load.spritesheet('pika', './assets/sprites/pika.jpg', 16,24);
    game.load.spritesheet('stave_equipped', './assets/sprites/stave.png', 55,55);
    game.load.spritesheet('stave_diving', './assets/sprites/stave_straight.png', 55,55);
    game.load.script('GameHandler.js', './handlers/GameHandler.js');
    game.load.tilemap('gregtest', './assets/maps/gregtestmap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('clouds', './assets/maps/clouds.jpg');
    game.load.image('terrain', './assets/maps/sprite_sheet (4).png');
    game.load.image('collision', './assets/maps/collision_tiles.jpg');
};
