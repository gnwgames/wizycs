/**
 * Created by gattra on 12/23/2015.
 */

var Melee = function (game, x, y) {
    Power.call(this, game, x, y, 'stave');
    // this.animations.add('rightStrike', [32,33,34,35,36,37,38,39], 10, true);
    // this.animations.add('downStrike', [48,49,50,51,52,53,54,55], 10, true);
    // this.animations.add('upStrike', [48,49,50,51,52,53,54,55], 10, true);
    this.hitGroups = null;
    this.game.add.existing(this);
};

Melee.handleInput = function (char) {
    if (char.body.velocity.x >= 0) {
        var thwack = new Melee(char.game, char.position.x, char.position.y - 16);
        thwack.overlap(Melee.hitGroups);
        thwack.strike('right');
    } else if (char.body.velocity.x < 0) {
        var flame = new Flame(char.game, char.position.x - 20, char.position.y - 16);
        flame.overlap(Flame.hitGroups);
        flame.shoot('left');
    }
    /* optional dive attack
     else if (char.state = STATE.DIVING) {
     var flame = new Flame(char.game, char.position.x - 20, char.position.y + 30);
     flame.overlap(Flame.hitGroups);
     flame.shoot('down');
     }
     */
};

Melee.prototype = Object.create(Power.prototype);
Melee.prototype.constructor = Melee;

Melee.prototype.strike = function (dir) {
    if (dir === 'left') {

        //this.animations.play('leftStrike')
    } else if (dir === 'right') {
        this.frame = 0;
        this.body.velocity.x = 300;
    } else if (dir === 'down') {

        //this.animations.play('downStrike');
    } else if (dir === 'up') {

        //this.animations.play('upStrike');
    }
};

Melee.prototype.update = function () {
    this.game.physics.arcade.overlap(Melee.hitGroups, this, CollisionHandler.PowerCollision)
};