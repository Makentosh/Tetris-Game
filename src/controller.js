const BUTTONS = {
  enter: 13,
  left: 37,
  upRotate: 38,
  right: 39,
  down: 40
};

export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.isPlaying = false;
    this.intervalId = null;


    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.view.renderStartScreen();
  }

  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  play() {
    this.isPlaying = true;
    this.startTimer();
    this.updateView();
  }

  reset() {
    this.game.reset();
    this.play();
  }

  updateView() {
    const state = this.game.getState();
    if ( state.isGameOver ) {
      this.view.renderEndScreen(state);
    } else if ( !this.isPlaying ) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(state);
    }
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;

    if ( !this.intervalId ) {
      this.intervalId = setInterval(() => {
        this.update();
      }, speed > 0 ? speed : 100);
    }
  }

  stopTimer() {
    if ( this.intervalId ) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  handleKeydown(event) {
    const state = this.game.getState();
    event.preventDefault();

    switch ( event.keyCode ) {
      case BUTTONS.enter:
        if ( state.isGameOver ) {
          this.reset();
        } else if ( this.isPlaying ) {
          this.pause();
        } else {
          this.play();
        }
        break;
      case BUTTONS.left:
        this.game.movePieceLeft();
        this.updateView();
        break;
      case BUTTONS.upRotate:
        this.game.rotatePiece();
        this.updateView();
        break;
      case BUTTONS.right:
        this.game.movePieceRight();
        this.updateView();
        break;
      case BUTTONS.down:
        this.stopTimer();
        this.game.movePieceDown();
        this.updateView();
        break;
    }
  }

  handleKeyUp(event) {
    switch ( event.keyCode ) {
      case BUTTONS.down:
        this.startTimer();
        break;
    }
  }
}
