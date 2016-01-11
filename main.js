var Wizycs = Wizycs || {};

Wizycs.game = new Phaser.Game(600,450, Phaser.AUTO, 'Wizycs');

Wizycs.game.state.add('Boot', Wizycs.Boot);
Wizycs.game.state.add('Preload', Wizycs.Preload);
Wizycs.game.state.add('Menu', Wizycs.Menu);
Wizycs.game.state.add('Tutorial', Wizycs.Tutorial);

//start game
Wizycs.game.state.start('Boot');