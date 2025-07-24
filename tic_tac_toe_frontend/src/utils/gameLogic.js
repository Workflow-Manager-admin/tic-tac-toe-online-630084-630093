// Calculate winning combinations
export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// AI move calculation using minimax algorithm
export const getAIMove = (squares) => {
  // Find empty squares
  const emptySquares = squares.reduce((acc, square, index) => {
    if (!square) acc.push(index);
    return acc;
  }, []);

  // For now, just pick a random empty square
  // This will be enhanced with minimax algorithm later
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};

// Check if game is a draw
export const isDraw = (squares) => {
  return squares.every(square => square !== null) && !calculateWinner(squares);
};
