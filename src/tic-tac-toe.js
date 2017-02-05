class TicTacToe {
    constructor() {
      this.fieldSize = 3;
      this.field = new Array(this.fieldSize * this.fieldSize).fill(null);
      this.currentPlayer = 'x';
    }

    getCurrentPlayerSymbol() {
      return this.currentPlayer;
    }

    nextTurn(rowIndex, colIndex) {
      if(!this.getFieldValue(rowIndex, colIndex)) {
        this.field[rowIndex * this.fieldSize + colIndex] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer == 'x' ? 'o' : 'x';
      }

      let rows = [];
      let cols = [];
      let mainDiag = [];
      let secondDiag = [];
      for(let i=0; i<this.fieldSize;i++) {
        rows.push(this.field.slice(i * this.fieldSize, (i + 1) * this.fieldSize))
        cols.push(this.field.filter((e, index) => (index - i) % this.fieldSize == 0));
        mainDiag.push(this.field[i * this.fieldSize + i]);
      	secondDiag.push(this.field[(i + 1) * (this.fieldSize - 1)])
      }
      this.winner = [mainDiag, secondDiag, ...rows, ...cols].reduce((acc, line) => {
        return acc || (
          line.every(item => item == 'x')
          ? 'x'
          : (line.every(item => item == 'o') ? 'o' : null)
        )
      }, null);
    }

    isFinished() {
      return !!this.getWinner() || this.noMoreTurns();
    }

    getWinner() {
      return this.winner
    }

    noMoreTurns() {
      return !this.field.includes(null);
    }

    isDraw() {
      return this.noMoreTurns() && !this.getWinner();
    }

    getFieldValue(rowIndex, colIndex) {
      return this.field[rowIndex * this.fieldSize + colIndex];
    }

    toString() {
      return this.field.reduce((acc, item, index) => {
        return acc + (index % 3 == 0 ? '\n' : '') + (item ? item : '_');
      }, '')
    }
}

module.exports = TicTacToe;
