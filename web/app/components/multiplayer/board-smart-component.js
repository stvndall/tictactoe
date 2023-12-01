import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';
import { A } from '@ember/array';

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

export default class BoardSmartComponent extends Component {
  gameId = this.args.gameId;
  player = this.args.player;
  @tracked board = [];
  @tracked playerX = '';
  @tracked playerO = '';
  @tracked nextTurn = '';
  @tracked winner = '';
  @tracked firstLoadComplete = false;

  checkingTask = task({ restartable: true }, async () => {
    while (true) {
      const response = await fetch(`/games/${this.gameId}`).then((response) =>
        response.json(),
      );
      this.playerX = response.playerX;
      this.playerO = response.playerO;
      this.winner = response.winner;
      this.nextTurn = response.nextTurn;
      if (this.firstLoadComplete) {
        for (let r = 0; r < response.board.length; r++) {
          for (let c = 0; c < r.length; c++) {
            if (this.board[r][c].ownedBy !== response.board[r][c]) {
              this.board[r][c].ownedBy = response.board[r][c];
            }
          }
        }
      } else {
        this.board = A(
          response.board.map((row, rowIndex) => {
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
      if (response.winner && response.winner !== '') {
        break;
      }
      await timeout(1000);
    }
  });

  constructor() {
    super(...arguments);
  }

  @action
  async mountedBoard(el) {
    this.checkingTask.perform();
  }

  @action
  async takeTurn(row, col) {
    if (this.nextTurn !== this.player) {
      alert("It's not your turn!");
      return;
    }
    await fetch(`/games/${this.gameId}/${row}/${col}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player: this.player }),
    });
  }
}
