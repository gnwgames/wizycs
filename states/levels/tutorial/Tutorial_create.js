/**
 * Created by gattra on 1/11/2016.
 */
var Wizycs = Wizycs || {};

Wizycs.Tutorial.prototype.create = function() {
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.stage.backgroundColor = '#63D1F4';
    var map = this.game.add.tilemap('tutorial_map');
    map.addTilesetImage('clouds', 'clouds');
    map.addTilesetImage('terrain', 'terrain');
    map.addTilesetImage('collision_tiles', 'collision');
    var layer = map.createLayer('Background');
    this.collision = map.createLayer('Collision');
    this.collision.visible = false;

    // this value is seen in the json file for this tile map
    map.setCollision(22, true, this.collision);
    layer.resizeWorld();

    this.player = new Player(Wizycs.game, 50, 50);
    this.keys = Wizycs.game.input.keyboard.createCursorKeys();

    this.enemyGroup = new EnemyGroup(Wizycs.game);
    this.warlckGroup = new WarlckGroup(Wizycs.game);
    this.powersGroup = new PowerGroup(Wizycs.game);

    var hitGroups = [ this.enemyGroup, this.warlckGroup ];
    // Equip the flame power to the key D / Melee to W
    this.player.equip(Phaser.KeyCode.D, Flame.handleInput, hitGroups, this.collision, this.powersGroup);
    this.player.equip(Phaser.KeyCode.DOWN, Melee.handleInput, hitGroups, this.collision, this.powersGroup);

    this.lifeCountText = this.game.add.text(10,350, "Life Count: " + this.player.lifeCount, {'fill': 'white', fontSize: '14pt'});
    this.lifeCountText.fixedToCamera = true;
    this.lifeCountText.cameraOffset.setTo(10,425);

    this.manaCountText = this.game.add.text(10,400, "Mana Count: " + this.player.manaCount, {'fill': 'white', fontSize: '14pt'});
    this.manaCountText.fixedToCamera = true;
    this.manaCountText.cameraOffset.setTo(10,405);

    //Wizycs.game.state.add('Tutorial_update', Wizycs.Tutorial.update);
    //Wizycs.game.state.start('Tutorial_update');

    this.tutorialTextArray = [
        "Use to arrow keys to navigate.",
        "Use the 'Up Arrow' to jump. Press it again while in mid-air to double-jump.",
        "Press the 'Down Arrow' while falling to do a dive attack.",
        "Press the 'D Key' to shoot a spell at an enemy.",
        "When you kill an enemy, it will drop mana. Collect mana to recharge your mana count and heal yourself."
    ];

    this.tutorialText = this.game.add.text(50, 25, this.tutorialTextArray[0], {'fill': 'white', fontSize: '20pt'});
    this.tutorialText.fixedToCamera = true;
    this.tutorialText.cameraOffset(50, 25);
};
