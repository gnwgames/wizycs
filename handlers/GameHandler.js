/**
 * Created by gattra on 12/23/2015.
 */

//thinking this file will handle the Pause, Restart, Continue and other Menu options
//as well as Respawn the player or End the game if the player dies too many times, etc.

var GameHandler = {};

GameHandler.RespawnPlayer = function(player) {
    player.parent.removeChild(player);
    createNewPlayer();
};

function createNewPlayer() {
    wzrd = new Player(game, 0, 0);
}
