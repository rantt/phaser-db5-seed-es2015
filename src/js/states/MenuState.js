class MenuState extends Phaser.State {
  create() {
    let center = {x: this.game.world.centerX, y: this.game.world.centerY};

    let title = this.game.add.sprite(center.x,center.y-100,'title');
    title.anchor.setTo(0.5,0.5);

    let instructions = this.game.add.sprite(center.x+200,200,'instructions');
    instructions.scale.x = 0.5;
    instructions.scale.y = 0.5;

    // Start Message

    var clickText = this.game.add.bitmapText(center.x, center.y+50, 'minecraftia', '~click to start~', 24).anchor.setTo(0.5); 
  }

  update() {
    if (this.game.input.activePointer.isDown){
      this.game.state.start('PlayState');
    }
  }


}

export default MenuState;
