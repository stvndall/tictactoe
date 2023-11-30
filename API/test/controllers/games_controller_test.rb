require "test_helper"

class GamesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @game = games(:complete_not_started)
  end

  test "should get index" do
    get games_url, as: :json
    assert_response :success
  end

  test "should create game" do
    assert_difference("Game.count") do
      post games_url, params: { game: { name:"game", playerX:"test Player" } }, as: :json
    end

    assert_response :created
  end

  test "should show game" do
    get game_url(@game), as: :json
    assert_response :success
  end

  test "should update game" do
    game = games(:created_not_joined)
    patch game_url(game), params: { playerO:"Another Player" }, as: :json
    assert_response :success
  end

  test "should return conflict if another player has already joined the game" do
    patch game_url(@game), params: { playerO:"Another Player" }, as: :json
    assert_response :conflict
  end

  test "should destroy game" do
    assert_difference("Game.count", -1) do
      delete game_url(@game), as: :json
    end

    assert_response :no_content
  end

end
