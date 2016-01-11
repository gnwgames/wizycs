/**
 * Created by gattra on 12/23/2015.
 */
var Flame = function (game, x, y) {
    Power.call(this, game, x, y, 'flame');
    this.animations.add('leftFire', [0,1,2,3,4,5,6,7], 10, true);
    this.animations.add('rightFire', [32,33,34,35,36,37,38,39], 10, true);
    this.animations.add('upFire', [16,17,18,19,20,21,22,23], 10, true);
    this.scale.setTo(.8,.8);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.game.add.existing(this);
    this.hitGroups = null;
};

Flame.handleInput = function (char, hitGroups, collision, powersGroup) {
    if (char.manaCount === 0) { return; }
    else { char.manaCount -= 1; }
    if (char.body.velocity.x >= 0) {
        var flame = new Flame(char.game, char.position.x-10, char.position.y - 16);
        //flame.overlap(hitGroup);
        flame.hitGroups = hitGroups;
        flame.collideGroups = collision;
        powersGroup.add(flame);
        flame.shoot('right');
    } else if (char.body.velocity.x < 0) {
        var flame = new Flame(char.game, char.position.x - 35, char.position.y - 16);
        //flame.overlap(hitGroup);
        flame.hitGroups = hitGroups;
        flame.collideGroups = collision;
        powersGroup.add(flame);
        flame.shoot('left');
    }
};

Flame.prototype = Object.create(Power.prototype);
Flame.prototype.constructor = Flame;

Flame.prototype.shoot = function (dir) {
    if (dir === 'left') {
        this.body.velocity.x = -400;
        this.animations.play('leftFire')
    } else if (dir === 'right') {
        this.body.velocity.x = 400;
        this.animations.play('rightFire')
    } else if (dir === 'up') {
        this.body.velocity.y = -400;
        this.animations.play('upFire');
    }
};

Flame.prototype.update = function () {
    if (!this.alive) { this.parent.removeChild(this); }
    for (var i=0; i<this.hitGroups.length;i++) {
        this.game.physics.arcade.overlap(this.hitGroups[i], this, this.hitTarget);
    }
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

    var dir;
    if (obj.body.touching.left || obj.body.touching.down) { dir = 'left'; }
    else { dir = 'right'; }

    power.kill();
    power.parent.removeChild(power);
    obj.animateInjury(dir);
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
    power.parent.removeChild(power);
};


