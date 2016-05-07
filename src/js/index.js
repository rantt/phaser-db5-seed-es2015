// import loadstate from './load'
// import menustate from './menu'
// import playstate from './play'
// import gamestate from './game'

import BootState from './states/BootState';
import LoadState from './states/LoadState';
import MenuState from './states/MenuState';
import PlayState from './states/PlayState';


class Game extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO, 'game', null);
    this.state.add('BootState', BootState, false);
    this.state.add('LoadState', LoadState, false);
    this.state.add('MenuState', MenuState, false);
    this.state.add('PlayState', PlayState, false);
    this.state.start('BootState');
  }
}

new Game();

