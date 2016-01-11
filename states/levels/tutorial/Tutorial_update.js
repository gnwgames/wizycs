/**
 * Created by gattra on 1/11/2016.
 */

var Wizycs = Wizycs || {};

Wizycs.Tutorial.prototype.update = function() {
    this.player.collide(this.collision);
    this.player.handleInput(this.keys);

    //update text (i.e. mana count, life count)
    this.lifeCountText.text = "Life Count: " + this.player.lifeCount;
    this.manaCountText.text = "Mana Count: " + this.player.manaCount;
    if (this.player.lifeCount < 30) { this.lifeCountText.fill = 'red'; } else { this.lifeCountText.fill = 'white'; }
    if (this.player.manaCount <= 5) { this.manaCountText.fill = 'red'; } else { this.manaCountText.fill = 'white'; }
};
