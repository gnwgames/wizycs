/**
 * Created by gattra on 1/11/2016.
 */
var Wizycs = Wizycs || {};

Wizycs.Tutorial.prototype.create = function() {
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.stage.backgroundColor = '#63D1F4';
    map = this.game.add.tilemap('gregtest');
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

    lifeCount = this.game.add.text(10,350, "Life Count: " + wzrd.lifeCount, {'fill': 'white', fontSize: '14pt'});
    lifeCount.fixedToCamera = true;
    lifeCount.cameraOffset.setTo(10,425);

    manaCount = this.game.add.text(10,400, "Mana Count: " + wzrd.manaCount, {'fill': 'white', fontSize: '14pt'});
    manaCount.fixedToCamera = true;
    manaCount.cameraOffset.setTo(10,405);

    //Wizycs.game.state.add('Tutorial_update', Wizycs.Tutorial.update);
    //Wizycs.game.state.start('Tutorial_update');
};

function createObjects() {
    keys = Wizycs.game.input.keyboard.createCursorKeys();
    wzrd = new Player(Wizycs.game, 50, 50);

    var mana = [];
    var testMana = new FireMana(Wizycs.game, 100, 100);
    mana.push(testMana);

    manaGroup = new ManaGroup(Wizycs.game);
    manaGroup.addMana(mana);

    var pikas = [];
    //pika = new PikaEnemy(game, 450, 350, 150, Enemy.ATTACK_TYPE.PURSUE, Flame);
    pika = new PikaEnemy(Wizycs.game, 450, 350, 150, null, Flame, null, null);
    pikas.push(pika);

    var warlcks = [];
    var warlck = new BasicWarlck(Wizycs.game, 1250, 350, 150);
    warlcks.push(warlck);

    enemyGroup = new EnemyGroup(Wizycs.game);
    enemyGroup.addEnemies(pikas);

    warlckGroup = new WarlckGroup(Wizycs.game);
    warlckGroup.addWarlcks(warlcks);

    playerPowersGroup = new PowerGroup(Wizycs.game);
}

function integrateObjects() {
    //Flame.hitGroups = enemyGroup;
    // Melee.hitGroups = enemyGroup;
    var hitGroups = [ enemyGroup, warlckGroup ];
    // Equip the flame power to the key D / Melee to W
    wzrd.equip(Phaser.KeyCode.D, Flame.handleInput, hitGroups);
    wzrd.equip(Phaser.KeyCode.DOWN, Melee.handleInput, hitGroups);

}