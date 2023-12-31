
export default function bfs(grid, startNode, endNode) {
  let visitedNodes = [];
  let queue = [startNode];
  let path = [];
  let predecessors = {};
 

  // Initialize the startNode as visited
  startNode.isVisited = true;
  endNode.isWall=false;
 

  while (queue.length > 0) {
    let currentNode = queue.shift();
    visitedNodes.push(currentNode);
   

    if (currentNode.i === endNode.i && currentNode.j === endNode.j) {
      let current = endNode;
      while (current !== startNode) {
        path.unshift(current);
        current = predecessors[`${current.i}-${current.j}`];
      }
      path.unshift(startNode);
      break;
    }

    let neighbors = getNeighbors(grid, currentNode);
    
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (neighbor.isWall || neighbor.isVisited) continue;

      neighbor.isVisited = true;
      
      queue.push(neighbor);

      predecessors[`${neighbor.i}-${neighbor.j}`] = currentNode;
    }
  }
  return [path,visitedNodes];
}

function getNeighbors(grid, currentNode) {
  let neighbors = [];
  let { i, j } = currentNode;
 

  if (j > 0 && !grid[i][j - 1].isVisited) neighbors.push(grid[i][j - 1]);
  if (i > 0 && !grid[i - 1][j].isVisited) neighbors.push(grid[i - 1][j]);
  if (j < grid[0].length-1 && !grid[i][j + 1].isVisited) neighbors.push(grid[i][j + 1]);
  if (i < grid.length-1 && !grid[i + 1][j].isVisited) neighbors.push(grid[i + 1][j]);
   
  return neighbors;
}

