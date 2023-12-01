import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { service } from '@ember/service';

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
  @service('api_helper') API;
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
      const response = await this.API.fetchGameState(this.gameId);
      this.updateGameState(response);
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

  updateGameState(newGameState) {
    this.playerX = newGameState.playerX;
    this.playerO = newGameState.playerO;
    this.winner = newGameState.winner;
    this.nextTurn = newGameState.nextTurn;
    if (this.firstLoadComplete) {
      for (let r = 0; r < newGameState.board.length; r++) {
        for (let c = 0; c < r.length; c++) {
          if (this.board[r][c].ownedBy !== newGameState.board[r][c]) {
            this.board[r][c].ownedBy = newGameState.board[r][c];
          }
        }
      }
    } else {
      this.board = A(
        newGameState.board.map((row, rowIndex) => {
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
  }

  @action
  async takeTurn(row, col) {
    if (this.nextTurn !== this.player) {
      alert("It's not your turn!");
      return;
    }
    const gameState = await this.API.tryClaim(
      this.gameId,
      row,
      col,
      this.player,
    );
    this.updateGameState(gameState);
  }
}
