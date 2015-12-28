/**
 * Created by gattra on 12/23/2015.
 */

var GameHandler = {};

GameHandler.RespawnPlayer = function(player) {
    player.parent.removeChild(player);
    createNewPlayer();
};

function createNewPlayer() {
    wzrd = new Player(game, 0, 0);
}
