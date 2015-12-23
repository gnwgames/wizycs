/**
 * Created by gattra on 12/22/2015.
 */
'use strict';
var STATE =
{
    STANDING : 0,
    JUMPING : 1,
    FLYING: 2,
    DIVING : 3
};

var Player = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'chars')
    this.game.physics.arcade.enable(this)
    this.game.add.existing(this)
    this.frame = 10
    this.animations.add('left', [21,22,23,22], 5, true)
    this.animations.add('right', [33,34,35,34], 5, true)
    this.body.gravity.y = 500
    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true
    this.power = {}
    this.game.camera.follow(this)
    this.jumpCount = 0;
    this.state = STATE.STANDING;

};

Player.prototype = Object.create(Phaser.Sprite.prototype)
Player.prototype.constructor = Player

Player.prototype.equip = function(key, handler) {
  var obj = this;
  this.power[key] = game.input.keyboard.addKey(key)
  this.power[key].onDown.add(function() {
    handler(obj)
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
    this.body.velocity.y = -220;
};

Player.prototype.fly = function () {
    // flame.visible = true
    // flame.position.x = wzrd.position.x - 15
    // flame.position.y = wzrd.position.y + 13
    // flame.play('fire')
    this.body.velocity.y = -100;
};

Player.prototype.st = function () {
    this.animations.stop();
    this.frame = 10;
    this.body.velocity.x = 0;
};

Player.prototype.collide = function (obj) {
    this.game.physics.arcade.collide(this, obj);
};

Player.prototype.overlap = function(obj) {
    this.game.physics.arcade.overlap(this, obj, CollisionHandler.PlayerCollision);
};

Player.prototype.handleInput = function (keys) {
    if((this.body.onFloor() || this.body.touching.down)) {
        this.state = STATE.STANDING;
    }

    //the actions below (but before the switch statement) happen regardless of the player's state
    if (keys.left.isDown) {
        this.l()
    } else if (keys.right.isDown) {
        this.r()
    } else {
        this.st()
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {this.fly(); this.state = STATE.FLYING}

    switch (this.state)
    {
        case STATE.STANDING:
            if (keys.up.isDown) {
                this.jumpCount = 0;
                this.jump();
                this.state = STATE.JUMPING;
            }
            break;

        case STATE.JUMPING:
            var upKey = keys.up;
            upKey.onDown.add(function() {
                if (this.jumpCount < 2) { this.jump(); }
            }, this);
            break;

        case STATE.FLYING:
            if (keys.down.isDown) {
                this.body.velocity.y = -(this.body.velocity.y + 50);
                this.state = STATE.DIVING;
            }
            break;

        case STATE.DIVING:
            //dive attack, jack
            break;
    }

};