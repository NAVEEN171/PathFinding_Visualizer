
export default function BiDirectional(grid, startNode, endNode) {
 
 let startvisitedNodes = [];
    let visitedNodes=[];
    let endvisitedNodes=[];
    let startqueue = [startNode];
    let endqueue=[endNode];
    let path = [];
    let startpredecessors = {};
    let endpredecessors={};
    endNode.isWall=false;
    startNode.isWall=false;
    
   
  
  
    startNode.isVisited = true;
    endNode.isendVisit=true;
    
   
  
    while (startqueue.length > 0 && endqueue.length>0) {
      let currentNode = startqueue.shift();
      let currentNode2=endqueue.shift();
      currentNode.isVisited=true;
      currentNode2.isVisited=true;
     



      visitedNodes.push(currentNode);
      visitedNodes.push(currentNode2);
      
     
   
   
      if (isMeetingPoint(currentNode,endvisitedNodes)) {
       

        let Meetingpoint=currentNode;
        let current=currentNode;
        while (current !==startNode) {
          path.unshift(current);
          current = startpredecessors[`${current.i}-${current.j}`];
        }
         current=Meetingpoint;
         path.push(Meetingpoint);
         while(current!==endNode){
            path.push(current);
            current = endpredecessors[`${current.i}-${current.j}`];
         }
        
        
        break;
      }
  
      let neighbors = getNeighbors(grid, currentNode);
      let neighbors2=getNeighbors2(grid,currentNode2);
      
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
  
        if (neighbor.isWall || neighbor.isVisited) continue;
  
    
        neighbor.isVisited = true;
        
        startqueue.push(neighbor);
     startvisitedNodes.push(neighbor)
  
      
        startpredecessors[`${neighbor.i}-${neighbor.j}`] = currentNode;
      }
      for (let i = 0; i < neighbors2.length; i++) {
        let neighbor = neighbors2[i];
  
        if (neighbor.isWall || neighbor.isendVisit) continue;
  
      
        neighbor.isendVisit = true;
        
        endqueue.push(neighbor);
       endvisitedNodes.push(neighbor)
  
        
        endpredecessors[`${neighbor.i}-${neighbor.j}`] = currentNode2;
      }
    }
    return [path,visitedNodes];
  }
  
  function getNeighbors(grid, currentNode) {
    let neighbors = [];
    let { i, j } = currentNode;
   
  
    if (j > 0 && !grid[i][j - 1].isVisited) neighbors.push(grid[i][j - 1]);
    if (i > 0 && !grid[i - 1][j].isVisited) neighbors.push(grid[i - 1][j]);
    if (j < grid[0].length - 1 && !grid[i][j + 1].isVisited) neighbors.push(grid[i][j + 1]);
    if (i < grid.length - 1 && !grid[i + 1][j].isVisited) neighbors.push(grid[i + 1][j]);
     
    return neighbors;
  }
  function getNeighbors2(grid, currentNode) {
    let neighbors = [];
    let { i, j } = currentNode;
   
  
    if (j > 0 && !grid[i][j - 1].isendVisit) neighbors.push(grid[i][j - 1]);
    if (i > 0 && !grid[i - 1][j].isendVisit) neighbors.push(grid[i - 1][j]);
    if (j < grid[0].length - 1 && !grid[i][j + 1].isendVisit) neighbors.push(grid[i][j + 1]);
    if (i < grid.length - 1 && !grid[i + 1][j].isendVisit) neighbors.push(grid[i + 1][j]);
     
    return neighbors;
  }
  function isMeetingPoint(node, endVisitedNodes) {
    return endVisitedNodes.some(endNode => endNode.i === node.i && endNode.j === node.j);
  }
  