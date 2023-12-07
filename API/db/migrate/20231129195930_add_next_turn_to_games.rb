class AddNextTurnToGames < ActiveRecord::Migration[7.1]
  def change
    add_column :games, :nextTurn, :string, :default => 'X'
  end
end
