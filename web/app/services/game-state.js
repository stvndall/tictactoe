import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

const tupleCheck = (tuple) =>
  tuple[0] !== '' && tuple[0] === tuple[1] && tuple[1] === tuple[2];
const rules = [
  (arr) => [arr[0][0].ownedBy, arr[1][0].ownedBy, arr[2][0].ownedBy],
  (arr) => [arr[0][1].ownedBy, arr[1][1].ownedBy, arr[2][1].ownedBy],
  (arr) => [arr[0][2].ownedBy, arr[1][2].ownedBy, arr[2][2].ownedBy],
  (arr) => [arr[0][0].ownedBy, arr[1][1].ownedBy, arr[2][2].ownedBy],
  (arr) => [arr[0][2].ownedBy, arr[1][1].ownedBy, arr[2][0].ownedBy],
  (arr) => [arr[0][0].ownedBy, arr[0][1].ownedBy, arr[0][2].ownedBy],
  (arr) => [arr[1][0].ownedBy, arr[1][1].ownedBy, arr[1][2].ownedBy],
  (arr) => [arr[2][0].ownedBy, arr[2][1].ownedBy, arr[2][2].ownedBy],
];

class CellReference {
  constructor(claimedBy, claimFn) {
    this.ownedBy = claimedBy;
    this.isClaimed = claimedBy !== '';
    this.claim = claimFn;
  }

  @tracked ownedBy;
  @tracked isClaimed;
  claim;
}

export default class GameStateService extends Service {
  startNew() {
    this.board = this.generateCleanBoard();
    this.turnCount = 0;
    this.winner = '';
    this.gameOver = false;
  }

  generateCleanBoard() {
    return A(
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ].map((row, rowIndex) => {
        return A(
          row.map((ownedBy, colIndex) => {
            return new CellReference(
              ownedBy,
              this.takeTurn.bind(this, rowIndex, colIndex),
            );
          }),
        );
      }),
    );
  }

  mutateIfGameOver() {
    const winningTuple = rules.map((rule) => rule(this.board)).find(tupleCheck);
    if (winningTuple) {
      this.winner = winningTuple[0];
      this.gameOver = true;
    } else if (this.turnCount === 9) {
      this.gameOver = true;
      this.isDraw = true;
    }
  }

  getCellReference(row, col) {
    return this.board[row][col];
  }

  @tracked board = this.generateCleanBoard();
  @tracked nameX = 'Player X';
  @tracked nameO = 'Played O';
  @tracked winner = null;
  @tracked nextTurn = 'O';
  @tracked turnCount = 0;
  @tracked gameOver = false;
  @tracked isDraw = false;

  _flipTurn() {
    this.nextTurn = this.nextTurn === 'X' ? 'O' : 'X';
  }

  takeTurn(row, col) {
    this.board[row][col].ownedBy = this.nextTurn;
    this.board[row][col].isClaimed = true;
    this._flipTurn();
    this.mutateIfGameOver();
  }
}
