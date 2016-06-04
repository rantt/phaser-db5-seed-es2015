import Boot from './states/Boot';
import Load from './states/Load';
import Menu from './states/Menu';
import Play from './states/Play';

class Game extends Phaser.Game {
  constructor() {
    let width = 800;
    let height = 600;

    super(width, height, Phaser, 'game', null);
    this.state.add('Boot', Boot, false);
    this.state.add('Load', Load, false);
    this.state.add('Menu', Menu, false);
    this.state.add('Play', Play, false);
    this.state.start('Boot');
  }
}

new Game();

