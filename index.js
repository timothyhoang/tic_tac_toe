const playerSymbolMap = {
  1: 'X',
  2: 'O',
};

const rowToIndexMap = {
  1: 0,
  2: 1,
  3: 2,
};

const colToIndexMap = {
  A: 0,
  B: 1,
  C: 2,
};

class TicTacToe {
  constructor() {
    this.board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
    
    this.currentPlayer = 1;

    process.stdin.setEncoding('utf8');
    
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk !== null && this.isValidMove(chunk)) {
        this.board[rowToIndexMap[chunk[0]]][colToIndexMap[chunk[1]]] = playerSymbolMap[this.currentPlayer];
        this.currentPlayer = (this.currentPlayer === 1) ? 2 : 1;
      }
      this.printBoard();
      this.promptPlayerInput();
    });

    process.stdin.on('end', () => {
      process.stdout.write('end');
    });
  }

  printBoard() {
    console.log('  A  B  C');
    for (let i = 0; i < this.board.length; i += 1) {
      console.log(`${i + 1} ${this.board[i].join('  ')}`);
    }
  }

  promptPlayerInput() {
    console.log(`Player ${this.currentPlayer}, type your move: (ex. 1A)`);
  }

  isValidFormat(move) {
    return move.length === 2 && rowToIndexMap[move[0]] !== undefined && colToIndexMap[move[1]] !== undefined;
  }

  isValidPosition(move) {
    return !this.board[rowToIndexMap[move[0]]][colToIndexMap[move[1]]];
  }

  isValidMove(move) {
    console.log(this.isValidFormat(move), this.isValidPosition(move));
    return this.isValidFormat(move) && this.isValidPosition(move);
  }
}

new TicTacToe();