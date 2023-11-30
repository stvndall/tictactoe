module BoardHelper

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
