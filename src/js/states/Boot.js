class Boot extends Phaser.State {
  preload() {
    this.game.stage.backgroundColor = '#000';
    this.game.load.image('loading', 'assets/images/loading.png');
    this.game.load.image('title', 'assets/images/title.png');
    this.game.load.image('instructions', 'assets/images/instructions.png');
    this.game.load.bitmapFont('minecraftia', 'assets/fonts/font.png', 'assets/fonts/font.xml');
  }

  create() {
    this.game.state.start('Load');
  }


}

export default Boot;
