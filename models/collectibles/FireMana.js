/**
 * Created by gattra on 1/8/2016.
 */

var FireMana = function (game, x, y) {
    Mana.call(this, game, x, y, 'test_mana');
    this.scale.setTo(.2,.2);
    this.game.add.existing(this);
};

FireMana.prototype = Object.create(Mana.prototype);
FireMana.prototype.constructor = FireMana;
