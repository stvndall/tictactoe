class AddIsDrawToGames < ActiveRecord::Migration[7.1]
  def change
    add_column :games, :is_draw, :boolean, null: true
  end
end
