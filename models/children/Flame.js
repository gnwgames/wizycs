/**
 * Created by gattra on 12/23/2015.
 */
var Flame = function (game, x, y) {
    Power.call(this, game, x, y, 'flame');
    this.animations.add('leftFire', [0,1,2,3,4,5,6,7], 10, true);
    this.animations.add('rightFire', [32,33,34,35,36,37,38,39], 10, true);
    this.animations.add('downFire', [48,49,50,51,52,53,54,55], 10, true);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.game.add.existing(this);

    this.hitGroups = null;
};

Flame.handleInput = function (char) {
    if (char.body.velocity.x >= 0) {
        var flame = new Flame(char.game, char.position.x, char.position.y - 16);
        flame.overlap(Flame.hitGroups);
        flame.shoot('right');
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

Flame.prototype = Object.create(Power.prototype);
Flame.prototype.constructor = Flame;

Flame.prototype.shoot = function (dir) {
    if (dir === 'left') {
        this.body.velocity.x = -300;
        this.animations.play('leftFire')
    } else if (dir === 'right') {
        this.body.velocity.x = 300;
        this.animations.play('rightFire')
    } else if (dir === 'down') {
        this.body.velocity.y = 300;
        this.animations.play('downFire');
    }
};

Flame.prototype.update = function () {
    this.game.physics.arcade.overlap(Flame.hitGroups, this, this.hitTarget)
};

Flame.prototype.hitTarget = function(power, obj) {
    power.kill();
    if (obj instanceof PikaEnemy) {
        obj.lifeCount -= 1;
    }
    if (obj.lifeCount === 0) {
        obj.kill();
    }
};


