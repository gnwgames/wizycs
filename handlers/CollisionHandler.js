/**
 * Created by gattra on 12/22/15.
 */

var CollisionHandler = {};

CollisionHandler.PlayerCollision = function(player, obj)
{
    if (obj instanceof Enemy) {
        if ( obj.body.touching.up )
        {
            player.body.velocity.y = -200;
            obj.kill();
        }
        else
        {
            //Animate death - blinking sprite, which disappears and then reappears at 0,0
            player.kill();
        }
    }
};

CollisionHandler.PowerCollision = function(power, obj)
{
    if (obj instanceof Enemy) {
        power.kill();
        obj.kill();
    }
};