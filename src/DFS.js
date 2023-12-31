export default function dfs(grid, startNode,endNode) {
  
  let visitedNodes= [];
  let visitedNodes2=[];
  
  
  visitedNodes.push(startNode);
  endNode.isWall=false;
  
  let path = [];
 
  while (visitedNodes.length > 0) {
    let currentNode = visitedNodes.pop();
    if(currentNode!==startNode && currentNode.isVisited===true){
      continue;
    } 
    currentNode.isVisited=true;
    
    if (currentNode.i === endNode.i && currentNode.j === endNode.j) {
     
      return [path, visitedNodes2];
    }
   
    path.push(currentNode);
    visitedNodes2.push(currentNode)
   
    let neighbors = getNeighbors(grid, currentNode);
   

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor=neighbors[i];
      if (neighbor.isWall) continue;
      if (neighbor.isVisited) continue;
      
     visitedNodes.push(neighbor);
    }
  }

  return [];
}

function getNeighbors(grid, currentNode) {
  let neighbors = [];
  let { i, j } = currentNode;
/*  if (i > 0 && !grid[i - 1][j].isVisited) neighbors.push(grid[i - 1][j]);
  if (i < grid.length - 1 && !grid[i + 1][j].isVisited) neighbors.push(grid[i + 1][j]);

  if (j > 0 && !grid[i][j - 1].isVisited) neighbors.push(grid[i][j - 1]);
  
  if (j < grid[0].length - 1 && !grid[i][j + 1].isVisited) neighbors.push(grid[i][j + 1]);

*/  
if (j > 0 && !grid[i][j - 1].isVisited) neighbors.push(grid[i][j - 1]);
if (j < grid[0].length - 1 && !grid[i][j + 1].isVisited) neighbors.push(grid[i][j + 1]);
if (i > 0 && !grid[i - 1][j].isVisited) neighbors.push(grid[i - 1][j]);
if (i < grid.length - 1 && !grid[i + 1][j].isVisited) neighbors.push(grid[i + 1][j]);

 

  return neighbors;
}





