/**
 * Created by gattra on 1/3/16.
 */

var BasicWarlck = function (game, x, y, range, attackRange, fireRate) {
    Warlck.call(this, game, x, y, 'chars');
    this.animations.add('walkRight', [72, 73, 74, 73], 10, true);
    this.animations.add('walkLeft', [60, 61, 62, 61], 10, true);
    this.origin = { x : x, y : y };
    this.game.add.existing(this);
    this.body.gravity.y = 550;
    this.body.velocity.y = 0;
    this.patrolRange = range || 150;
    this.attackRange = attackRange || 250;
    this.power = Flame;
    this.fireRate = fireRate || 1;
    this.state = Warlck.STATE.NEUTRAL;
    this.curDir = 'stop';
    this.lastStopped = 0;
    this.lastDir = 'right';
    // when the player runs into enemy, he cannot move the enemy
    this.body.immovable = true;
    this.instanceType = 'Warlck';
    this.lifeCount = 3;
    this.jumpCount = 0;
    this.mode = MODE.PATROLING;
    this.lastFired = 0;
};


BasicWarlck.prototype = Object.create(Enemy.prototype);
BasicWarlck.prototype.constructor = BasicWarlck;


BasicWarlck.prototype.st = function () {
    this.animations.stop();
    this.body.velocity.x = 0;
};

BasicWarlck.prototype.jump = function(velocityY, velocityX) {
    this.body.velocity.y = velocityY;
    this.body.velocity.x = velocityX;
};

BasicWarlck.prototype.update = function () {
    if((this.body.onFloor() || this.body.touching.down)) {
        this.state = Warlck.STATE.STANDING;
    }

    if((this.body.blocked.left || this.body.blocked.right)) {
        this.jump(-160, 200);
    }

    if (this.mode === MODE.ATTACKING) {
        //do nothing
    } else if (this.mode === MODE.PATROLING) {
        switch (this.curDir){
            case 'left':
                this.animations.play('walkLeft');
                var distanceTraveled = this.calculateDistanceFromOriginX(this.origin.x);
                if (distanceTraveled >= this.patrolRange) { this.lastStopped = (new Date().getTime()/1000); this.curDir = 'stop'; break; }
                this.body.velocity.x = -70;
                break;
            case 'right':
                this.animations.play('walkRight');
                var distanceTraveled = this.calculateDistanceFromOriginX(this.origin.x);
                if (distanceTraveled <= 1) { this.lastStopped = (new Date().getTime()/1000); this.curDir = 'stop'; break; }
                this.body.velocity.x = 70;
                break;
            case 'stop':
                this.animations.stop();
                this.body.velocity.x = 0;
                this.frame = 49;
                if (this.lastStopped+1 < (new Date().getTime()/1000)) {
                    if (this.lastDir === 'right') {
                        this.curDir = 'left';
                        this.lastDir = 'left';
                    } else {
                        this.curDir = 'right';
                        this.lastDir = 'right';
                    }
                }
                break;
        }
    }
};

// if (distanceTraveled === this.patrolRange) { this.lastStopped = (new Date().getTime()/1000); this.state = 'stop'; break; }

BasicWarlck.prototype.calculateDistanceFromOriginX = function (originX) {
    var currentX = this.position.x;
    var absoluteDistance = Math.abs(currentX-originX);
    return absoluteDistance;
};

BasicWarlck.prototype.engagePlayer = function(player, distance) {
    var xDistance = Math.abs(player.position.x - this.position.x);
    if (distance > 100) { this.pursuePlayer(player); }
    else if ((player.position.y === this.position.y) && (xDistance < 50)) { this.meleeAttack(player); }
    else { this.powerAttack(player); }
};

BasicWarlck.prototype.pursuePlayer = function (player) {
    this.mode = MODE.PURSUING;
    var playerPosition = player.position;
    var warlckPosition = this.position;
    console.log(this.state);
    switch (this.state) {
        case Warlck.STATE.STANDING:
            if (warlckPosition.x < playerPosition.x - 50)
            {
                this.animations.play('walkRight');
                this.body.velocity.x = 120;
            }
            else if (warlckPosition.x > playerPosition.x + 50) {
                this.animations.play('walkLeft');
                this.body.velocity.x = -120;
            }
            else {
                this.body.velocity.x = 0;
                this.frame = 49;
            }

            if (warlckPosition.y < playerPosition.y) {
                    this.fall();
            } else if ((warlckPosition.y > playerPosition.y) && (Math.abs(warlckPosition.x - playerPosition.x) < 100)) {
                    this.fly();
            }
            break;

        case Warlck.STATE.FLYING:
            if (warlckPosition.x < playerPosition.x - 50)
            {
                this.animations.play('walkRight');
                this.body.velocity.x = 120;
            }
            else if (warlckPosition.x > playerPosition.x + 50) {
                this.animations.play('walkLeft');
                this.body.velocity.x = -120;
            }
            else {
                this.body.velocity.x = 0;
                this.frame = 49;
            }

            if (warlckPosition.y < playerPosition.y) {
                this.fall();
            }
            break;

        case Warlck.STATE.FALLING:
            var distance = game.physics.arcade.distanceBetween(this, collision);
            console.log(distance);
            /*
            if ((player.state = STATE.STANDING) && (warlckPosition.y > playerPosition.y)) {}
            else if (warlckPosition.y > playerPosition.y) {
                this.fly();
                this.state = Warlck.STATE.FLYING;
            }*/
            break;
    }

};

BasicWarlck.prototype.fly = function() {
    this.state = Warlck.STATE.FLYING;
    this.body.velocity.y = -100;
};

BasicWarlck.prototype.fall = function() {
    this.state = Warlck.STATE.FALLING;
    this.body.velocity.y = 100;
};

BasicWarlck.prototype.meleeAttack = function(player) {
    //animate stick thwack

    //tween forward 50
    var x = player.position.x;
    var melee = game.add.tween(this);
    melee.to({ x: x }, 100,  Phaser.Easing.Default);
    melee.onComplete.add(updateState, this, player);
    melee.start();
};

BasicWarlck.prototype.powerAttack = function(player) {
    this.mode = MODE.ATTACKING;
    this.animations.stop();
    this.body.velocity.x = 0;

    //get location of pika enemy
    var warlckPositionX, warlckPositionY;
    warlckPositionX = this.position.x;
    warlckPositionY = this.position.y;

    //get location of player
    var playerPositionX;
    playerPositionX = player.position.x;

    //compare locations
    var xOffset, shootDir;
    if (playerPositionX < warlckPositionX) { xOffset = -30; shootDir = 'left'; this.frame = 61; }
    else { xOffset = 0; shootDir = 'right'; this.frame = 73; }

    //check lastFired to see if ready to fire again
    var currentTime = new Date().getTime() / 1000;
    if (currentTime > this.lastFired + this.fireRate) {
        this.lastFired = currentTime;
        var power;
        if (this.power === Flame) {
            power = new Flame(this.game, warlckPositionX + xOffset, warlckPositionY - 16);
            power.hitGroups = [ player ];
            power.collideGroups = collision;
            power.shoot(shootDir);

            if (player.alive) {
                game.physics.arcade.moveToObject(power, player, 300);
            }
        }
    }
};

BasicWarlck.prototype.dodgeOrBlockPower = function(power) {
    var yDif = Math.abs(power.position.y - this.position.y);
    if (yDif > 16) {
        this.blockPower(power);
    } else {
        this.dodgePower(power);
    }
};

BasicWarlck.prototype.dodgePower = function(power) {
    this.state = Warlck.STATE.DODGING;
    this.body.velocity.x = 0;
    var y = power.position.y + -80;
    var dodge = game.add.tween(this);
    dodge.to({ y: y }, 100,  Phaser.Easing.Default);
    dodge.onComplete.add(updateState, this, power);
    dodge.start();
};

BasicWarlck.prototype.blockPower = function(power) {
    power.shoot('up');
};

function updateState(warlck) {
    //warlck.curDir = 'left';
    //warlck.lastDir = 'left';
}
