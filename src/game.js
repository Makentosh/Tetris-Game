export default class Game {

  static points = {
    '1': 40, '2': 100, '3': 300, '4': 1200
  };

  constructor() {
    this.reset();
  }

  get level() {
    return Math.floor(this.lines * 0.1);
  }


  movePieceLeft() {
    this.activePiece.x -= 1;

    if ( this.hasCollision() ) {
      this.activePiece.x += 1;
    }
  }

  getState() {
    // Створюємо копію ігрового поля
    const playField = this.playField.map(row => [...row]);

    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for ( let y = 0; y < blocks.length; y++ ) {
      for ( let x = 0; x < blocks[y].length; x++ ) {
        if ( blocks[y][x] ) {
          const targetY = pieceY + y;
          const targetX = pieceX + x;

          // Перевірка, чи координати в межах ігрового поля
          if ( targetY >= 0 && targetY < playField.length && targetX >= 0 && targetX < playField[0].length ) {
            playField[targetY][targetX] = blocks[y][x];
          }
        }
      }
    }

    return {
      level: this.level,
      score: this.score,
      lines: this.lines,
      nextPiece: this.nextPiece,
      playField,
      isGameOver: this.tapOut,
    };
  }

  reset() {
    this.score = 0;
    this.lines = 0;
    this.tapOut = false;
    this.playField = this.createPlayField();
    this.activePiece = this.createPiece();
    this.nextPiece = this.createPiece();
  }

  createPlayField() {
    const playField = [];

    for ( let y = 0; y < 20; y++ ) {
      playField[y] = [];
      for ( let x = 0; x < 10; x++ ) {
        playField[y][x] = 0;
      }
    }

    return playField;
  }

  createPiece() {
    const index = Math.floor(Math.random() * 7);
    const type = 'IJLOSTZ'[index];
    const piece = {};

    switch ( type ) {
      case 'I':
        piece.blocks = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
        break;
      case 'J':
        piece.blocks = [[0, 0, 0], [2, 2, 2], [0, 0, 2]];
        break;
      case 'L':
        piece.blocks = [[0, 0, 0], [3, 3, 3], [3, 0, 0],];
        break;
      case 'O':
        piece.blocks = [[0, 0, 0, 0], [0, 4, 4, 0], [0, 4, 4, 0], [0, 0, 0, 0]];
        break;
      case 'S':
        piece.blocks = [[0, 0, 0], [0, 5, 5], [5, 5, 0]];
        break;
      case 'T':
        piece.blocks = [[0, 0, 0], [6, 6, 6], [0, 6, 0]];
        break;
      case 'Z':
        piece.blocks = [[0, 0, 0], [7, 7, 0], [0, 7, 7],];
        break;
      default:
        throw new Error('Невідомий тип фігури');
    }

    piece.x = Math.floor(( 10 - piece.blocks[0].length ) / 2);
    piece.y = -1; // Опускаємо початкову позицію трохи нижче

    return piece;
  }


  movePieceRight() {
    this.activePiece.x += 1;

    if ( this.hasCollision() ) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    if (this.tapOut) return;

    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece(); // Фіксуємо фігуру
      const clearedLines = this.clearLines(); // Очищаємо лінії
      this.updateScore(clearedLines); // Оновлюємо рахунок
      const previousLevel = this.level; // Зберігаємо поточний рівень
      this.updatePieces(); // Оновлюємо фігури

      // Якщо рівень змінився, оновлюємо швидкість
      if (this.level > previousLevel) {
        this.updateSpeed();
      }

      if (this.tapOut) {
        console.log('Гра завершена!');
      }
    }
  }

  rotatePiece() {

    this.rotateBlocks();

    if ( this.hasCollision() ) {
      this.rotateBlocks(false);
    }

  }

  rotateBlocks(clockwise = true) {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;
    const x = Math.floor(length / 2);
    const y = length - 1;

    for ( let i = 0; i < x; i++ ) {
      for ( let j = i; j < y - i; j++ ) {
        const temp = blocks[i][j];

        if ( clockwise ) {
          blocks[i][j] = blocks[y - j][i];
          blocks[y - j][i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[j][y - i];
          blocks[j][y - i] = temp;
        } else {
          blocks[i][j] = blocks[j][y - i];
          blocks[j][y - i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[y - j][i];
          blocks[y - j][i] = temp;
        }

      }
    }
  }

  hasCollision() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for ( let y = 0; y < blocks.length; y++ ) {
      for ( let x = 0; x < blocks[y].length; x++ ) {
        if ( blocks[y][x] && ( // Перевірка виходу за межі поля
          this.playField[pieceY + y] === undefined || this.playField[pieceY + y][pieceX + x] === undefined || // Перевірка зіткнення з іншими блоками
          this.playField[pieceY + y][pieceX + x] ) ) {
          return true;
        }
      }
    }

    return false;
  }

  lockPiece() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for ( let y = 0; y < blocks.length; y++ ) {
      for ( let x = 0; x < blocks[y].length; x++ ) {
        if ( blocks[y][x] ) {
          this.playField[pieceY + y][pieceX + x] = blocks[y][x];
        }

      }
    }
  }

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();

    // Перевірка, чи нова фігура викликає зіткнення
    if ( this.hasCollision() ) {
      this.tapOut = true; // Завершення гри, якщо немає місця для нової фігури
    }
  }

  clearLines() {
    let lines = [];
    const rows = 20;
    const columns = 10;

    for ( let y = rows - 1; y >= 0; y-- ) {
      let numberOfBlocks = 0;

      for ( let x = 0; x < columns; x++ ) {
        if ( this.playField[y][x] ) {
          numberOfBlocks += 1;
        }
      }

      if ( numberOfBlocks === 0 ) {
        break;
      } else if ( numberOfBlocks < columns ) {
        continue;
      } else if ( numberOfBlocks === columns ) {
        lines.unshift(y);
      }
    }

    for ( let index of lines ) {
      this.playField.splice(index, 1);
      this.playField.unshift(new Array(columns).fill(0));
    }

    return lines.length;
  }

  updateScore(clearedLines) {
    if ( clearedLines > 0 ) {
      this.score += Game.points[clearedLines] * ( this.level + 1 );
      this.lines += clearedLines;
    }
  }

}
