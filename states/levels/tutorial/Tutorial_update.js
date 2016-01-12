/**
 * Created by gattra on 1/11/2016.
 */

var Wizycs = Wizycs || {};


Wizycs.Tutorial.prototype.update = function() {
    var player = this.player;
    var enemyGroup = this.enemyGroup;
    var collision = this.collision;
    var manaGroup = this.manaGroup;
    var tutorialTextArray = this.tutorialTextArray;
    var tutorialText = this.tutorialText;

    this.manageTutorialText(this.tutorialText.text, this.tutorialTextArray);

    player.collide(collision);
    player.handleInput(this.keys);

    this.manaGroup.forEachAlive(function(mana) {
        Wizycs.game.physics.arcade.overlap(mana, player, manaGroup.handleManaCollect);
        mana.collide(collision);
    });

    enemyGroup.forEachAlive(function(enemy) {
        enemy.collide(collision);
        if (player.alive) {
            player.overlap(enemy);
            enemyGroup.distanceFromPlayer(enemy, player);
        } else { enemy.mode = MODE.PATROLING; }
    });

    enemyGroup.forEachDead(function(enemy){
        enemy.dropMana(manaGroup);
        enemyGroup.remove(enemy);
    });

    manaGroup.forEachDead(function(mana) {
        if (tutorialText.text === tutorialTextArray[4]) {
            tutorialText.text = tutorialTextArray[5];
        }
        manaGroup.removeChild(mana);
    });

    //update text (i.e. mana count, life count)
    this.lifeCountText.text = "Life Count: " + player.lifeCount;
    this.manaCountText.text = "Mana Count: " + player.manaCount;
    if (player.lifeCount < 30) { this.lifeCountText.fill = 'red'; } else { this.lifeCountText.fill = 'white'; }
    if (player.manaCount <= 5) { this.manaCountText.fill = 'red'; } else { this.manaCountText.fill = 'white'; }
};

Wizycs.Tutorial.prototype.manageTutorialText = function(text, textArray) {

    switch (text) {
        case textArray[0]:
            if (this.keys.left.isDown || this.keys.right.isDown) {
                this.tutorialText.text = this.tutorialTextArray[1];
            }
            break;
        case textArray[1]:
            if (this.keys.up.isDown) {
                this.tutorialText.text = this.tutorialTextArray[2];
            }
            break;
        case textArray[2]:
            if (this.player.state === STATE.FALLING && this.keys.down.isDown) {
                this.tutorialText.text = this.tutorialTextArray[3];
                var pikas = [];
                var pika = new PikaEnemy(Wizycs.game, 350, 50, 150, null, Flame, null, null);
                pikas.push(pika);
                this.enemyGroup.addEnemies(pikas);
            }
            break;
        case textArray[3]:
            if (Wizycs.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
                this.tutorialText.text = this.tutorialTextArray[4];
            }
            break;
        case textArray[5]:
            if(this.game.input.activePointer.justPressed()) {
                //this.game.state.start('Tutorial');
                this.game.state.start('Testbed');
            }
            break;
    }
};