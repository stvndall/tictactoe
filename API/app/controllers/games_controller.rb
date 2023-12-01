class GamesController < ApplicationController
  before_action :set_game, only: %i[ show update destroy ]
  # GET /games
  def index
    Rails.logger.debug "fetching all games"
    max_return = 10
    in_progress = Game.all.where("winner = '' or winner IS NULL").limit(max_return).order("updated_at DESC")
    completed = Game.all.where("winner != '' and winner IS NOT NULL").limit(max_return - in_progress.length).order("updated_at DESC")
    Rails.logger.debug "returning #{in_progress.length} in progress games and #{completed.length} completed games"
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
    Rails.logger.debug "attempting to update board #{@id}"
    row = params[:x].to_i
    col = params[:y].to_i
    value = @game.board[row][col]
    if value != ''
      Rails.logger.debug "attempted to update a board value that was already claimed - #{@id} #{row} #{col} current value #{value} "
      render json: { error: "Invalid move" }, status: :conflict
      return
    end
    if @game.winner != nil
      Rails.logger.debug "attempted to update a board that was already won - #{@id}"
      render json: { error: "Game is over" }, status: :forbidden
      return
    end
    @game.board[row][col] = params[:player]
    @game.nextTurn = @game.nextTurn == 'X' ? 'O' : 'X'
    maybe_winner = helpers.determine_if_winner @game.board
    Rails.logger.debug "maybe winner #{maybe_winner}"
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
    Rails.logger.debug "creating a new game"
    @game = Game.new(new_game)

    if @game.save
      render json: @game, status: :created, location: @game
    else
      Rails.logger.error "failed to create a new game: #{@game.errors}"
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /games/1
  def update
    Rails.logger.debug "Someone is trying to join game #{@id}"
    update_with = params.require(:game).permit(:playerO)
    if @game.playerO != nil
      render json: { error: "Game already has two players" }, status: :conflict
      return
    end
    if @game.update(update_with)
      render json: @game
    else
      Rails.logger.error "failed to join a game #{@id} : #{@game.errors}"
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
    @id = params[:id]
    @game = Game.find(@id)
  end

  # Only allow a list of trusted parameters through.
  def new_game
    params.require(:game).permit(:name, :playerX)
  end

  def player_params
    params.require(:player)
  end

end
