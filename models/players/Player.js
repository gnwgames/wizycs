/**
 * Created by gattra on 12/22/2015.
 */
'use strict';
var STATE =
{
    STANDING : 0,
    JUMPING : 1,
    FLYING : 2,
    FALLING : 3,
    DIVING : 4,
    INJURED : 5
};

var Player = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'chars');
    this.game.physics.arcade.enable(this);
    this.game.add.existing(this);
    this.frame = 10;
    this.animations.add('left', [21,22,23,22], 5, true);
    this.animations.add('right', [33,34,35,34], 5, true);
    this.animations.add('blink', [59,10], 8, true);
    this.body.gravity.y = 500;
    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.power = {};
    this.game.camera.follow(this);
    this.jumpCount = 0;
    this.state = STATE.STANDING;
    this.equippedWeapon = null;
    this.lifeCount = 100;
    this.manaCount = 10;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.equip = function(key, handler, hitGroups, collision, powersGroup) {
    var obj = this;
    this.power[key] = Wizycs.game.input.keyboard.addKey(key);
    this.power[key].onDown.add(function() {
        handler(obj, hitGroups, collision, powersGroup)
    })
};

Player.prototype.l = function() {
    this.animations.play('left');
    this.body.velocity.x = -150;
};

Player.prototype.r = function () {
    this.animations.play('right');
    this.body.velocity.x = 150
};

Player.prototype.jump = function () {
    this.jumpCount += 1;
    this.body.velocity.y = -280;

    /*
     if (keys.down.isDown) {
        this.body.velocity.y = -600;
        this.state = STATE.DIVING;
     } else if (keys.up.isDown) {
        this.jumpCount += 1;
        this.body.velocity.y = -220;
     }
     */
};

Player.prototype.fly = function () {
    this.body.velocity.y = -100;
};

Player.prototype.st = function () {
    this.animations.stop();
    this.frame = 10;
    this.body.velocity.x = 0;
};

Player.prototype.collide = function (obj) {
    this.game.physics.arcade.collide(this, obj, collidePlayer);
};

Player.prototype.overlap = function(obj) {
    this.game.physics.arcade.overlap(this, obj, collidePlayer);
};

Player.prototype.update = function () {
    if((this.body.onFloor() || this.body.touching.down)) {
        this.state = STATE.STANDING;
    }
    return this.state;
};

Player.prototype.handleInput = function (keys) {

    if (this.state === STATE.INJURED) {
        return;
    }

    else {
        //the actions below (but before the switch statement) happen regardless of the player's state
        if (keys.left.isDown) {
            this.l()
        } else if (keys.right.isDown) {
            this.r()
        } else {
            this.st()
        }
        if (Wizycs.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.fly();
            this.state = STATE.FLYING
        }

        switch (this.state) {
            case STATE.STANDING:
                if (keys.up.isDown) {
                    this.jumpCount = 0;
                    this.jump();
                    this.state = STATE.JUMPING;
                }
                break;

            case STATE.JUMPING:
                var upKey = keys.up;
                upKey.onDown.add(function () {
                    if (this.jumpCount < 2) {
                        this.jump();
                    }
                    else {
                        this.state = STATE.FALLING;
                    }
                }, this);
                if (keys.down.isDown) {
                    this.state = STATE.DIVING;
                }
                break;

            case STATE.FLYING:
                if ((keys.down.isDown) && (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
                    this.body.velocity.y = -(this.body.velocity.y * 2);
                }
                break;

            case STATE.FALLING:
                if (keys.down.isDown) {
                    this.state = STATE.DIVING;
                }
                break;

            case STATE.DIVING:
                //dive attack, jack
                break;
        }
    }
};

function collidePlayer(player, obj) {
    if (obj.instanceType === 'Enemy') {
        if ((obj.body.touching.up) && (player.equippedWeapon)) {
            player.body.velocity.y = -200;
            player.equippedWeapon.kill();
            player.equippedWeapon = null;
            obj.lifeCount -= 3;

        }
        else if (obj.body.touching.up) {
            player.body.velocity.y = -200;
        }
        else {
            //Animate death - blinking sprite, which disappears and then reappears at 0,0
            var dir;
            if (obj.body.touching.left || obj.body.touching.down) { dir = 'left'; }
            else { dir = 'right'; }
            player.animateInjury(dir);
            player.lifeCount -= 1;
        }
    }
    else if (obj.instanceType === 'Warlck') {
        if ((obj.body.touching.up) && (player.equippedWeapon)) {
            player.body.velocity.y = -200;
            player.equippedWeapon.kill();
            player.equippedWeapon = null;
            obj.lifeCount -= 2;
        }
        else if (obj.body.touching.up) {
            player.body.velocity.y = -200;
        }
        else {
            //Animate death - blinking sprite, which disappears and then reappears at 0,0
            var dir;
            if (obj.body.touching.left || obj.body.touching.down) { dir = 'left'; }
            else { dir = 'right'; }
            player.animateInjury(dir);
            player.lifeCount -= 2;
        }
    }
    else if (player.equippedWeapon) {
        player.equippedWeapon.kill();
        player.equippedWeapon = null;
    }

    if (player.lifeCount < 0) { player.kill() }
    if (obj.lifeCount < 0) { obj.kill(); }
}

Player.prototype.animateInjury = function(dir) {
    this.state = STATE.INJURED;
    this.animations.play('blink');
    if (dir === 'left') { this.body.velocity.x = 200; }
    if (dir === 'right') { this.body.velocity.x = -200; }
    this.body.velocity.y = -150;
};