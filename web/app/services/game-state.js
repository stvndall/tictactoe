import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

const tupleCheck = (tuple) => (tuple[0] === tuple[1]) === tuple[2];
const rules = [
  (arr) => [arr[0][0], arr[1][0], arr[2][0]],
  (arr) => [arr[0][1], arr[1][1], arr[2][1]],
  (arr) => [arr[0][2], arr[1][2], arr[2][2]],
  (arr) => [arr[0][0], arr[1][1], arr[2][2]],
  (arr) => [arr[0][2], arr[1][1], arr[2][0]],
  (arr) => [arr[0][0], arr[0][1], arr[0][2]],
  (arr) => [arr[1][0], arr[1][1], arr[1][2]],
  (arr) => [arr[2][0], arr[2][1], arr[2][2]],
];
export default class GameStateService extends Service {
  startNew() {
    this.board = A(
      [
        ['x', 'x', 'x'],
        ['x', 'x', 'x'],
        ['x', 'x', 'x'],
      ].map((row, rowIndex) =>
        A(
          row.map((ownedBy, colIndex) => ({
            ownedBy: ownedBy,
            claim: this.takeTurn.bind(this, rowIndex, colIndex),
          })),
        ),
      ),
    );
  }

  _checkForWin() {
    const winningTuple = rules.map((rule) => rule(this.board)).find(tupleCheck);
    if (winningTuple) {
      this.winner = winningTuple[0];
    }
  }

  @tracked board = A([]);
  @tracked nameX = 'John';
  @tracked nameO = 'Jane';

  winner = null;

  takeTurn(row, col, ownedBy) {
    const tmp = this.board;
    console.log(tmp);
    tmp[row][col].ownedBy = ownedBy;
    this.board = tmp;
    this._checkForWin();
  }

  gameOver() {
    return this.winner !== null;
  }
}
