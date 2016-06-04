class Load extends Phaser.State {

  preload() {
    let center = {x: this.game.world.centerX, y: this.game.world.centerY};
    let loadingText = this.game.add.bitmapText(center.x/2, center.y/2, 'minecraftia', 'Loading...', 30).anchor.setTo(0.5);
    let preloading = this.game.add.sprite(center.x/2-64, center.y/2+50, 'loading');
    this.game.load.setPreloadSprite(preloading);
    this.game.load.image('twitter', 'assets/images/twitter.png');
  }

  create() {
    this.game.state.start('Menu');
  }

}

export default Load;
