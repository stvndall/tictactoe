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
    @game.board[params[:x].to_i][params[:y].to_i] = params[:player]
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
    if @game.update(new_game)
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
    params.require(:game).permit(:playerX)
  end

  def player_params
    params.require(:player)
  end
end
