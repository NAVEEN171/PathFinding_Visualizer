let queue = [];
export default function Astar(grid, startNode, endNode) {
 
    queue.length=0;
    endNode.isWall=false;
    
  let path = [];
  let predecessors = {};
  let visitedNodes = [];
  let star=Math.floor(Math.abs(endNode.i-startNode.i)+Math.abs(endNode.j-startNode.j))
  queue.push({ node: startNode, heuristic: star});
  startNode.isVisited=true;

  

  while (queue.length > 0) {
    let currentNode = queue.shift();
 
    visitedNodes.push(currentNode.node);

    if (currentNode.node.i === endNode.i && currentNode.node.j === endNode.j) {
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
      let cost = 1; // Default cost
      
      let manhattan = Math.abs(endNode.i - neighbor.i) + Math.abs(endNode.j - neighbor.j);
      neighbor.isCummulative=neighbor.isWeight+currentNode.node.isCummulative;
    manhattan=manhattan+neighbor.isCummulative;
    
      queue.push({ node: neighbor, heuristic: manhattan });
      

      predecessors[`${neighbor.i}-${neighbor.j}`] = currentNode.node;
      
    }
    sortelements();
    
   
    
  }
  
  return [path, visitedNodes];
}

function getNeighbors(grid, currentNode) {
  let neighbors = [];
  let { i, j } = currentNode.node;

  if (j > 0 && !grid[i][j - 1].isVisited) {
    
    neighbors.push(grid[i][j - 1])};
  if (i > 0 && !grid[i - 1][j].isVisited) neighbors.push(grid[i - 1][j]);
  if (j < grid[0].length - 1 && !grid[i][j + 1].isVisited) neighbors.push(grid[i][j + 1]);
  if (i < grid.length - 1 && !grid[i + 1][j].isVisited) neighbors.push(grid[i + 1][j]);

  return neighbors;
}

function sortelements() {
  queue.sort((a, b) => {
    return a.heuristic - b.heuristic;
  });
}
