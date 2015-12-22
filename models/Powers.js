/**
 * Created by gattra on 12/22/2015.
 */

Powers = {};

Powers.Fireball = function (game) {

    Phaser.Group.call(this, game, game.world, 'Fireball', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 10; i++) {
        this.add(new SpellInstance(game, 'flame'), true);
    }

    return this;

};

Powers.CastSpell = function(x, y, angle, direction, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);

};

Powers.Fire = function (direction) {

    if (this.game.time.time < this.nextFire) {
        return;
    }

    var x = wzrd.position.x+15;
    var y = wzrd.position.y -15;
    var bulletSpeed = 150;

    this.getFirstExists(false).CastSpell(x, y, 0, direction, bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;

};
