class CreateGames < ActiveRecord::Migration[7.1]
  def change
    create_table :games do |t|
      t.string :name
      t.string :playerX
      t.string :playerO
      t.string :winner
      t.string "board", :array => true, :null => false, default:[['','',''],['','',''],['','','']]
      t.timestamps
    end
  end
end
