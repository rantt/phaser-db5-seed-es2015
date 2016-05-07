import BootState from './states/BootState';
import LoadState from './states/LoadState';
import MenuState from './states/MenuState';
import PlayState from './states/PlayState';

class Game extends Phaser.Game {
  constructor() {
    let width = 800;
    let height = 600;

    super(width, height, Phaser.AUTO, 'game', null);
    this.state.add('BootState', BootState, false);
    this.state.add('LoadState', LoadState, false);
    this.state.add('MenuState', MenuState, false);
    this.state.add('PlayState', PlayState, false);
    this.state.start('BootState');
  }
}

new Game();

