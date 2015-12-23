/**
 * Created by gattra on 12/22/15.
 */

var CollisionHandler = {};

CollisionHandler.OverlapObject = function(player, obj)
{
    if (obj instanceof Enemy) {
        CombatHandler.HandleEncounter(player, obj);
    }
};