/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/game.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);
    this.reset();
  }
  return _createClass(Game, [{
    key: "level",
    get: function get() {
      return Math.floor(this.lines * 0.1);
    }
  }, {
    key: "movePieceLeft",
    value: function movePieceLeft() {
      this.activePiece.x -= 1;
      if (this.hasCollision()) {
        this.activePiece.x += 1;
      }
    }
  }, {
    key: "getState",
    value: function getState() {
      // Створюємо копію ігрового поля
      var playField = this.playField.map(function (row) {
        return _toConsumableArray(row);
      });
      var _this$activePiece = this.activePiece,
        pieceY = _this$activePiece.y,
        pieceX = _this$activePiece.x,
        blocks = _this$activePiece.blocks;
      for (var y = 0; y < blocks.length; y++) {
        for (var x = 0; x < blocks[y].length; x++) {
          if (blocks[y][x]) {
            var targetY = pieceY + y;
            var targetX = pieceX + x;

            // Перевірка, чи координати в межах ігрового поля
            if (targetY >= 0 && targetY < playField.length && targetX >= 0 && targetX < playField[0].length) {
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
        playField: playField,
        isGameOver: this.tapOut
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      this.score = 0;
      this.lines = 0;
      this.tapOut = false;
      this.playField = this.createPlayField();
      this.activePiece = this.createPiece();
      this.nextPiece = this.createPiece();
    }
  }, {
    key: "createPlayField",
    value: function createPlayField() {
      var playField = [];
      for (var y = 0; y < 20; y++) {
        playField[y] = [];
        for (var x = 0; x < 10; x++) {
          playField[y][x] = 0;
        }
      }
      return playField;
    }
  }, {
    key: "createPiece",
    value: function createPiece() {
      var index = Math.floor(Math.random() * 7);
      var type = 'IJLOSTZ'[index];
      var piece = {};
      switch (type) {
        case 'I':
          piece.blocks = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
          break;
        case 'J':
          piece.blocks = [[0, 0, 0], [2, 2, 2], [0, 0, 2]];
          break;
        case 'L':
          piece.blocks = [[0, 0, 0], [3, 3, 3], [3, 0, 0]];
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
          piece.blocks = [[0, 0, 0], [7, 7, 0], [0, 7, 7]];
          break;
        default:
          throw new Error('Невідомий тип фігури');
      }
      piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
      piece.y = -1; // Опускаємо початкову позицію трохи нижче

      return piece;
    }
  }, {
    key: "movePieceRight",
    value: function movePieceRight() {
      this.activePiece.x += 1;
      if (this.hasCollision()) {
        this.activePiece.x -= 1;
      }
    }
  }, {
    key: "movePieceDown",
    value: function movePieceDown() {
      if (this.tapOut) return;
      this.activePiece.y += 1;
      if (this.hasCollision()) {
        this.activePiece.y -= 1;
        this.lockPiece(); // Фіксуємо фігуру
        var clearedLines = this.clearLines(); // Очищаємо лінії
        this.updateScore(clearedLines); // Оновлюємо рахунок
        var previousLevel = this.level; // Зберігаємо поточний рівень
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
  }, {
    key: "rotatePiece",
    value: function rotatePiece() {
      this.rotateBlocks();
      if (this.hasCollision()) {
        this.rotateBlocks(false);
      }
    }
  }, {
    key: "rotateBlocks",
    value: function rotateBlocks() {
      var clockwise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var blocks = this.activePiece.blocks;
      var length = blocks.length;
      var x = Math.floor(length / 2);
      var y = length - 1;
      for (var i = 0; i < x; i++) {
        for (var j = i; j < y - i; j++) {
          var temp = blocks[i][j];
          if (clockwise) {
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
  }, {
    key: "hasCollision",
    value: function hasCollision() {
      var _this$activePiece2 = this.activePiece,
        pieceY = _this$activePiece2.y,
        pieceX = _this$activePiece2.x,
        blocks = _this$activePiece2.blocks;
      for (var y = 0; y < blocks.length; y++) {
        for (var x = 0; x < blocks[y].length; x++) {
          if (blocks[y][x] && (
          // Перевірка виходу за межі поля
          this.playField[pieceY + y] === undefined || this.playField[pieceY + y][pieceX + x] === undefined ||
          // Перевірка зіткнення з іншими блоками
          this.playField[pieceY + y][pieceX + x])) {
            return true;
          }
        }
      }
      return false;
    }
  }, {
    key: "lockPiece",
    value: function lockPiece() {
      var _this$activePiece3 = this.activePiece,
        pieceY = _this$activePiece3.y,
        pieceX = _this$activePiece3.x,
        blocks = _this$activePiece3.blocks;
      for (var y = 0; y < blocks.length; y++) {
        for (var x = 0; x < blocks[y].length; x++) {
          if (blocks[y][x]) {
            this.playField[pieceY + y][pieceX + x] = blocks[y][x];
          }
        }
      }
    }
  }, {
    key: "updatePieces",
    value: function updatePieces() {
      this.activePiece = this.nextPiece;
      this.nextPiece = this.createPiece();

      // Перевірка, чи нова фігура викликає зіткнення
      if (this.hasCollision()) {
        this.tapOut = true; // Завершення гри, якщо немає місця для нової фігури
      }
    }
  }, {
    key: "clearLines",
    value: function clearLines() {
      var lines = [];
      var rows = 20;
      var columns = 10;
      for (var y = rows - 1; y >= 0; y--) {
        var numberOfBlocks = 0;
        for (var x = 0; x < columns; x++) {
          if (this.playField[y][x]) {
            numberOfBlocks += 1;
          }
        }
        if (numberOfBlocks === 0) {
          break;
        } else if (numberOfBlocks < columns) {
          continue;
        } else if (numberOfBlocks === columns) {
          lines.unshift(y);
        }
      }
      for (var _i = 0, _lines = lines; _i < _lines.length; _i++) {
        var index = _lines[_i];
        this.playField.splice(index, 1);
        this.playField.unshift(new Array(columns).fill(0));
      }
      return lines.length;
    }
  }, {
    key: "updateScore",
    value: function updateScore(clearedLines) {
      if (clearedLines > 0) {
        this.score += Game.points[clearedLines] * (this.level + 1);
        this.lines += clearedLines;
      }
    }
  }]);
}();
_defineProperty(Game, "points", {
  '1': 40,
  '2': 100,
  '3': 300,
  '4': 1200
});

;// ./src/view.js
function view_typeof(o) { "@babel/helpers - typeof"; return view_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, view_typeof(o); }
function view_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function view_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, view_toPropertyKey(o.key), o); } }
function view_createClass(e, r, t) { return r && view_defineProperties(e.prototype, r), t && view_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function view_defineProperty(e, r, t) { return (r = view_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function view_toPropertyKey(t) { var i = view_toPrimitive(t, "string"); return "symbol" == view_typeof(i) ? i : i + ""; }
function view_toPrimitive(t, r) { if ("object" != view_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != view_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var View = /*#__PURE__*/function () {
  function View(element, width, height, rows, columns) {
    view_classCallCheck(this, View);
    this.element = element;
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.playfieldBorderWidth = 4;
    this.playfieldX = this.playfieldBorderWidth;
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldWidth = this.width * 2 / 3;
    this.playfieldHeight = this.height;
    this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
    this.playfieldInnerHight = this.playfieldHeight - this.playfieldBorderWidth * 2;
    this.blockWidth = this.playfieldInnerWidth / columns;
    this.blockHeight = this.playfieldInnerHight / rows;
    this.panelX = this.playfieldWidth + 10;
    this.panelY = 0;
    this.panelWidth = this.width / 3;
    this.panelHeight = this.height;
    this.element.appendChild(this.canvas);
  }
  return view_createClass(View, [{
    key: "renderMainScreen",
    value: function renderMainScreen(state) {
      this.clearScreen();
      this.renderPlayField(state);
      this.renderPanel(state);
    }
  }, {
    key: "renderStartScreen",
    value: function renderStartScreen() {
      this.context.fillStyle = 'white';
      this.context.font = '18px "Press Start 2P"';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText('Press Enter to Start', this.width / 2, this.height / 2);
    }
  }, {
    key: "renderPauseScreen",
    value: function renderPauseScreen() {
      this.context.fillStyle = 'rgba(0,0,0, 0.75)';
      this.context.fillRect(0, 0, this.width, this.height);
      this.context.fillStyle = 'white';
      this.context.font = '18px "Press Start 2P"';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText('Press Enter to Resume', this.width / 2, this.height / 2);
    }
  }, {
    key: "renderEndScreen",
    value: function renderEndScreen(_ref) {
      var score = _ref.score;
      this.clearScreen();
      this.context.fillStyle = 'rgba(0,0,0, 0.75)';
      this.context.fillRect(0, 0, this.width, this.height);
      this.context.fillStyle = 'white';
      this.context.font = '18px "Press Start 2P"';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText('Game Over', this.width / 2, this.height / 2 - 48);
      this.context.fillText("Score: ".concat(score), this.width / 2, this.height / 2);
      this.context.fillText('Press ENTER to Restart:', this.width / 2, this.height / 2 + 48);
    }
  }, {
    key: "clearScreen",
    value: function clearScreen() {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  }, {
    key: "renderPlayField",
    value: function renderPlayField(_ref2) {
      var playField = _ref2.playField;
      for (var y = 0; y < playField.length; y++) {
        var line = playField[y];
        for (var x = 0; x < line.length; x++) {
          var block = line[x];
          if (block) {
            this.renderBlock(this.playfieldX + x * this.blockWidth, this.playfieldY + y * this.blockHeight, this.blockWidth, this.blockHeight, View.colors[block]);
          }
        }
      }
      this.context.strokeStyle = 'white';
      this.context.lineWidth = this.playfieldBorderWidth;
      this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }
  }, {
    key: "renderPanel",
    value: function renderPanel(_ref3) {
      var level = _ref3.level,
        score = _ref3.score,
        lines = _ref3.lines,
        nextPiece = _ref3.nextPiece;
      this.context.textAlign = 'start';
      this.context.textBaseline = 'top';
      this.context.fillStyle = 'white';
      this.context.font = '14px "Press Start 2P"';
      this.context.fillText("Score: ".concat(score), this.panelX, this.panelY + 0);
      this.context.fillText("Lines: ".concat(lines), this.panelX, this.panelY + 24);
      this.context.fillText("Level: ".concat(level), this.panelX, this.panelY + 48);
      this.context.fillText('Next:', this.panelX, this.panelY + 96);
      for (var y = 0; y < nextPiece.blocks.length; y++) {
        for (var x = 0; y < nextPiece.blocks[y]; x++) {
          var block = nextPiece.blocks[y][x];
          if (block) {
            this.renderBlock(this.panelX + x * this.blockWidth * 0.5, this.panelY + 100 + y * this.blockHeight * 0.5, this.blockWidth * 0.5, this.blockHeight * 0.5, View.colors[blocks]);
          }
        }
      }
    }
  }, {
    key: "renderBlock",
    value: function renderBlock(x, y, width, height, color) {
      this.context.fillStyle = color;
      this.context.strokeStyle = 'black';
      this.context.lineWidth = 2;
      this.context.fillRect(x, y, width, height);
      this.context.strokeRect(x, y, width, height);
    }
  }]);
}();
view_defineProperty(View, "colors", {
  '1': 'cyan',
  '2': 'blue',
  '3': 'orange',
  '4': 'yellow',
  '5': 'green',
  '6': 'purple',
  '7': 'red'
});

;// ./src/controller.js
function controller_typeof(o) { "@babel/helpers - typeof"; return controller_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, controller_typeof(o); }
function controller_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function controller_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, controller_toPropertyKey(o.key), o); } }
function controller_createClass(e, r, t) { return r && controller_defineProperties(e.prototype, r), t && controller_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function controller_toPropertyKey(t) { var i = controller_toPrimitive(t, "string"); return "symbol" == controller_typeof(i) ? i : i + ""; }
function controller_toPrimitive(t, r) { if ("object" != controller_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != controller_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BUTTONS = {
  enter: 13,
  left: 37,
  upRotate: 38,
  right: 39,
  down: 40
};
var Controller = /*#__PURE__*/function () {
  function Controller(game, view) {
    controller_classCallCheck(this, Controller);
    this.game = game;
    this.view = view;
    this.isPlaying = false;
    this.intervalId = null;
    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.view.renderStartScreen();
  }
  return controller_createClass(Controller, [{
    key: "update",
    value: function update() {
      this.game.movePieceDown();
      this.updateView();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.isPlaying = false;
      this.stopTimer();
      this.updateView();
    }
  }, {
    key: "play",
    value: function play() {
      this.isPlaying = true;
      this.startTimer();
      this.updateView();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.game.reset();
      this.play();
    }
  }, {
    key: "updateView",
    value: function updateView() {
      var state = this.game.getState();
      if (state.isGameOver) {
        this.view.renderEndScreen(state);
      } else if (!this.isPlaying) {
        this.view.renderPauseScreen();
      } else {
        this.view.renderMainScreen(state);
      }
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      var _this = this;
      var speed = 1000 - this.game.getState().level * 100;
      if (!this.intervalId) {
        this.intervalId = setInterval(function () {
          _this.update();
        }, speed > 0 ? speed : 100);
      }
    }
  }, {
    key: "stopTimer",
    value: function stopTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(event) {
      var state = this.game.getState();
      event.preventDefault();
      switch (event.keyCode) {
        case BUTTONS.enter:
          if (state.isGameOver) {
            this.reset();
          } else if (this.isPlaying) {
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
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      switch (event.keyCode) {
        case BUTTONS.down:
          this.startTimer();
          break;
      }
    }
  }]);
}();

;// ./index.js



var root = document.querySelector('.game');
var game = new Game();
var view = new View(root, 480, 640, 20, 10);
var controller = new Controller(game, view);
window.game = game;
window.view = view;
window.controller = controller;
/******/ })()
;