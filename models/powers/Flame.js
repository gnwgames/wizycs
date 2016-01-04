/**
 * Created by gattra on 12/23/2015.
 */
var Flame = function (game, x, y) {
    Power.call(this, game, x, y, 'flame');
    this.animations.add('leftFire', [0,1,2,3,4,5,6,7], 10, true);
    this.animations.add('rightFire', [32,33,34,35,36,37,38,39], 10, true);
    this.animations.add('downFire', [48,49,50,51,52,53,54,55], 10, true);
    this.scale.setTo(.8,.8);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.game.add.existing(this);
    this.hitGroups = null;
};

Flame.handleInput = function (char, hitGroup) {
    if (char.body.velocity.x >= 0) {
        var flame = new Flame(char.game, char.position.x-10, char.position.y - 16);
        //flame.overlap(hitGroup);
        flame.hitGroups = hitGroup;
        flame.collideGroups = collision;
        flame.shoot('right');
    } else if (char.body.velocity.x < 0) {
        var flame = new Flame(char.game, char.position.x - 35, char.position.y - 16);
        //flame.overlap(hitGroup);
        flame.hitGroups = hitGroup;
        flame.collideGroups = collision;
        flame.shoot('left');
    }
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
    this.game.physics.arcade.overlap(this.hitGroups, this, this.hitTarget);
    this.game.physics.arcade.collide(this.collideGroups, this, this.collideTarget);
};

Flame.prototype.hitTarget = function(obj1, obj2) {
    //have to run this if statement because for some reason, when the player fires an object, the parameters are flipped
    //so when a pika fires and object, the player is killed and not the flame
    var power, obj;
    if (obj1 instanceof Flame) {
        power = obj1;
        obj = obj2;
    } else {
        power = obj2;
        obj = obj1;
    }

    console.log(obj.lifeCount);

    power.kill();
    obj.lifeCount -= 1;
    if (obj.lifeCount === 0) {
        obj.kill();
    }
};

Flame.prototype.collideTarget = function(obj1, obj2) {
    var power;
    if (obj1 instanceof Flame) {
        power = obj1;
    } else {
        power = obj2;
    }

    power.kill();
};


