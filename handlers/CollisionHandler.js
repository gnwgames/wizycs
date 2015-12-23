/**
 * Created by gattra on 12/22/15.
 */

var CollisionHandler = {};

CollisionHandler.PlayerCollision = function(player, obj)
{
    if (obj instanceof Enemy) {
        if ( enemy.body.touching.up )
        {
            //Call a jump function or something here...
            player.body.velocity.y = -200;
            //Maybe put the enemy into a different group so it doesn't collide with the player anymore...
            enemy.kill();
        }
        else
        {
            //You would probably want something a little more than this...
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