/**
 * Created by gattra on 12/22/15.
 */

var CollisionHandler = {};

CollisionHandler.PlayerCollision = function(player, obj)
{
    if (obj instanceof Enemy) {
        CombatHandler.HandleEncounter(player, obj);
    }
};

CollisionHandler.PowerCollision = function(power, obj)
{
    if (obj instanceof Power) {
        console.log('here');
        CombatHandler.HandlePowerAttack(power, obj);
    }
};