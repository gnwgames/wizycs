/**
 * Created by gattra on 12/23/2015.
 */

var PowerInputHandler = {};

PowerInputHandler.HandleMeleeInput = function(char) {
    if (char.body.velocity.x >= 0) {
        var thwack = new Melee(char.game, char.position.x, char.position.y - 16);
        thwack.overlap(Melee.hitGroups);
        thwack.strike('right');
    } else if (char.body.velocity.x < 0) {
        var flame = new Flame(char.game, char.position.x - 20, char.position.y - 16);
        flame.overlap(Flame.hitGroups);
        flame.shoot('left');
    }
    /* optional dive attack
     else if (char.state = STATE.DIVING) {
     var flame = new Flame(char.game, char.position.x - 20, char.position.y + 30);
     flame.overlap(Flame.hitGroups);
     flame.shoot('down');
     }
     */
};

PowerInputHandler.HandleFlameInput = function(char) {
    if (char.body.velocity.x >= 0) {
        var flame = new Flame(char.game, char.position.x, char.position.y - 16);
        flame.overlap(Flame.hitGroups);
        flame.shoot('right');
    } else if (char.body.velocity.x < 0) {
        var flame = new Flame(char.game, char.position.x - 20, char.position.y - 16);
        flame.overlap(Flame.hitGroups);
        flame.shoot('left');
    }
    /* optional dive attack
     else if (char.state = STATE.DIVING) {
     var flame = new Flame(char.game, char.position.x - 20, char.position.y + 30);
     flame.overlap(Flame.hitGroups);
     flame.shoot('down');
     }
     */
};