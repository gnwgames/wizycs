/**
 * Created by gattra on 12/22/15.
 */

var CollisionHandler = {};

CollisionHandler.PlayerCollision = function(player, obj)
{
    if (obj.instanceType === 'Enemy') {
        if ((obj.body.touching.up) && (player.state === STATE.DIVING))
        {
            player.body.velocity.y = -200;
            obj.kill();

        } else if (obj.body.touching.up) {
            player.body.velocity.y = -200;
        }
        else
        {
            //Animate death - blinking sprite, which disappears and then reappears at 0,0
            player.kill()
        }
    }
};

CollisionHandler.PowerCollision = function(power, obj)
{
    if (obj.instanceType === 'Enemy') {
        power.kill();

        //Animate obj kill - blinking sprite, which disappears
        damageObject(obj);
    }
};

function damageObject(obj) {
    obj.lifeCount -= 1;

    if (obj.lifeCount === 0) {
        obj.kill();
    }
}