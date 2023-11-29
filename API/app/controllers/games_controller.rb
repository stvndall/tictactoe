class GamesController < ApplicationController
  before_action :set_game, only: %i[ show update destroy ]
  # GET /games
  def index
    max_return = 10
    in_progress = Game.all.where("winner = '' or winner IS NULL").limit(max_return)
    completed = Game.all.where("winner != '' and winner IS NOT NULL").limit(max_return - in_progress.length)

    # reduce into 2 groups one where winner in blank and one where winner is set
    split = {
      inProgress: in_progress,
      completed: completed
    }
    render json: split
  end

  # GET /games/1
  def show
    render json: @game
  end

  # PATCH /games/1/2/2

  def update_board
    set_game
    value = @game.board[params[:x].to_i][params[:y].to_i]
    if value != ''
      render json: { error: "Invalid move" }, status: :conflict
      return
    end
    if @game.winner != nil
      render json: { error: "Game is over" }, status: :forbidden
      return
    end
    @game.board[params[:x].to_i][params[:y].to_i] = params[:player]
    @game.nextTurn = @game.nextTurn == 'X' ? 'O' : 'X'
    maybe_winner =  determine_if_winner @game.board
    if maybe_winner != nil
      if maybe_winner == 'X'
        @game.winner = @game.playerX
      else
        @game.winner = @game.playerO
      end
    end
    @game.save
    render json: @game

  end

  # POST /games
  def create
    @game = Game.new(new_game)

    if @game.save
      render json: @game, status: :created, location: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /games/1
  def update
    update_with= params.require(:game).permit(:playerO)
    if @game.playerO != nil
      render json: {error: "Game already has two players"}, status: :conflict
      return
    end
    if @game.update(update_with)
      render json: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # DELETE /games/1
  def destroy
    @game.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_game
    @game = Game.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def new_game
    params.require(:game).permit(:name, :playerX)
  end

  def player_params
    params.require(:player)
  end

  def determine_if_winner(board)
    # check rows
    board.each do |row|
      if row.uniq.length == 1 && row.uniq[0] != ''
        return row.uniq[0]
      end
    end
    # check columns
    board.transpose.each do |col|
      if col.uniq.length == 1 && col.uniq[0] != ''
        return col.uniq[0]
      end
    end
    # check diagonals
    if board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != ''
      return board[1][1]
    end
    if board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1] != ''
      return board[1][1]
    end
    nil
  end
end
