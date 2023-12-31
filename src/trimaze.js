export default function createMazes(grid, startNode, endNode) {
    const mazes = [];
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [
      [0, -2], // Up
      [2, 0],  // Right
      [0, 2],  // Down
      [-2, 0], // Left
    ];
  
    function isCellValid(row, col, maze) {
      return row >= 0 && row < rows && col >= 0 && col < cols && maze[row][col] === 0;
    }
  
    function carvePath(row, col, maze) {
      maze[row][col] = 1; // Mark the current cell as part of the path
  
      const neighbors = directions
        .map(([dr, dc]) => [row + dr, col + dc])
        .filter(([r, c]) => isCellValid(r, c, maze));
  
      if (neighbors.length > 0) {
        const [nextRow, nextCol] = neighbors[Math.floor(Math.random() * neighbors.length)];
  
        const wallRow = row + (nextRow - row) / 2;
        const wallCol = col + (nextCol - col) / 2;
  
        maze[wallRow][wallCol] = 1; // Carve a path to the next cell
        carvePath(nextRow, nextCol, maze); // Recursively carve the next path
      }
    }
  
    for (let i = 0; i < 5; i++) { // Adjust the number of mazes as needed
      const maze = Array.from({ length: rows }, () => Array(cols).fill(0));
  
      // Set start and end nodes as open
      
  
      carvePath(0, 0, maze); // Start carving from the top-left corner
      mazes.unshift(maze);
    }
  
    return mazes;
  }
  

  