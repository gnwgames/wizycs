/**
 * Created by gattra on 1/11/2016.
 */

var Wizycs = Wizycs || {};

Wizycs.Testbed.prototype.update = function() {
    wzrd.collide(collision);
    wzrd.handleInput(keys);

    enemyGroup.forEachAlive(function(enemy) {
        enemy.collide(collision);
        if (wzrd.alive) {
            wzrd.overlap(enemy);
            enemyGroup.distanceFromPlayer(enemy, wzrd);
        } else { enemy.mode = MODE.PATROLING; }
    });

    warlckGroup.forEachAlive(function(warlck) {
        warlck.collide(collision);
        if (wzrd.alive) {
            wzrd.overlap(warlck);
            warlckGroup.distanceFromPlayer(warlck, wzrd);
        } else { warlck.mode = MODE.PATROLING; }
        playerPowersGroup.forEachAlive(function(power) {
            if ((Wizycs.game.physics.arcade.distanceBetween(power,warlck)<100) && (warlck.state !== Warlck.STATE.DODGING)) {
                warlck.dodgeOrBlockPower(power);
            }
        });
    });

    manaGroup.forEachAlive(function(mana) {
        Wizycs.game.physics.arcade.overlap(mana, wzrd, manaGroup.handleManaCollect);
        mana.collide(collision);
    });

    enemyGroup.forEachDead(function(enemy){
        enemy.dropMana();
        enemyGroup.remove(enemy);
    });

    warlckGroup.forEachDead(function(warlck){
        warlck.dropMana();
        warlckGroup.remove(warlck);
    });

    manaGroup.forEachDead(function(mana) {
        manaGroup.removeChild(mana);
    });

    //update text (i.e. mana count, life count)
    lifeCount.text = "Life Count: " + wzrd.lifeCount;
    manaCount.text = "Mana Count: " + wzrd.manaCount;
    if (wzrd.lifeCount < 30) { lifeCount.fill = 'red'; } else { lifeCount.fill = 'white'; }
    if (wzrd.manaCount <= 5) { manaCount.fill = 'red'; } else { manaCount.fill = 'white'; }
};