/**
 * Created by gattra on 1/11/2016.
 */

var Wizycs = Wizycs || {};

Wizycs.Menu = function() {};

Wizycs.Menu.prototype = {
    create: function() {
        this.game.add.text(this.game.width/2.5,this.game.height/2.5, "WIZYCS", {'fill': 'white', fontSize: '24pt'});
        this.game.add.text(this.game.width/3.2,this.game.height/2, "(click anywhere to begin)", {'fill': 'white', fontSize: '14pt'});
    },
    update: function() {
        if(this.game.input.activePointer.justPressed()) {
            this.game.state.start('Tutorial');
        }
    }
};