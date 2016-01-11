/**
 * Created by gattra on 1/11/2016.
 */

var Wizycs = Wizycs || {};

Wizycs.Boot = function() {};

Wizycs.Boot.prototype = {
    preload: function() {},
    create: function() {
       this.state.start('Preload');
    },
    update: function() {}
};