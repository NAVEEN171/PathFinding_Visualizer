let gridset=new Set();
export default function Dikstra(grid,startNode,endNode){
   
  
   let visitedNodes = [];   
    let path = [];
    let predecessors = {};
    startNode.isVisited = true;
    endNode.isWall=false;
    
    startNode.isDistance=0;
    startNode.isCheck=0;
   
    gridset.add({ isDistance: startNode.isDistance, node: startNode });
  
    
   
    
   
  
    while(gridset.size!==0){
       
        let valuesIterator = gridset.values();
        let currentNodeSet = valuesIterator.next().value;
        
        let currentNode = currentNodeSet.node;
        let isDistance = currentNodeSet.isDistance;
       
       
        
       
     
        
        removeObject({isDistance:isDistance,node:currentNode});
       
       
        
        

       if (currentNode.i === endNode.i && currentNode.j === endNode.j) {
            // Reconstruct the shortest path using predecessors
            let current = endNode;
            gridset.clear();
            while (current !== startNode) {
              path.unshift(current);
              current = predecessors[`${current.i}-${current.j}`];
            }
            path.unshift(startNode);
            break;
          }
          let neighbors = getNeighbors(grid, currentNode,endNode);
    
          for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
      
            if (neighbor.isWall || neighbor.isVisited) continue;
      
            neighbor.isVisited = true;
            visitedNodes.push(neighbor)
           
            
      
        
            let tentativeDistance = neighbor.isDistance;
            
            
            if (!neighbor.isDistance || tentativeDistance < neighbor.isCheck) {
                
                neighbor.isCheck=tentativeDistance;
                predecessors[`${neighbor.i}-${neighbor.j}`] = currentNode;

                gridset.add({isDistance:neighbor.isDistance,node:neighbor})
                
            }
         
          }
        }
        return [path,visitedNodes];


    }
    function getNeighbors(grid, currentNode, endNode) {
        let neighbors = [];
        let { i, j } = currentNode;
    
        if (j > 0 && !grid[i][j - 1].isVisited) {
            
            
            grid[i][j -1].isDistance = currentNode.isDistance + grid[i][j-1].isWeight;
                neighbors.push(grid[i][j - 1]);
            
        }
    
        if (i > 0 && !grid[i - 1][j].isVisited) {
            grid[i-1][j ].isDistance= currentNode.isDistance + grid[i-1][j].isWeight;
                neighbors.push(grid[i - 1][j]);
            
        }
    
        if (j < grid[0].length - 1 && !grid[i][j + 1].isVisited) {
           
                grid[i][j + 1].isDistance = currentNode.isDistance + grid[i][j+1].isWeight;
                neighbors.push(grid[i][j + 1]);
            
        }
    
        if (i < grid.length - 1 && !grid[i + 1][j].isVisited) {
            
                grid[i + 1][j].isDistance = currentNode.isDistance + grid[i+1][j].isWeight;
                neighbors.push(grid[i + 1][j]);
            
        }
    
        return neighbors;
    }
    
    function removeObject(targetObject) {
        gridset.forEach(setElement => {
          if (compareSets(setElement, targetObject)) {
            gridset.delete(setElement);
          }
        });
      }
      
      // Function to compare two sets for equality
      function compareSets(set1, set2) {
        if (set1.isDistance !== set2.isDistance) {
          return false;
        }
      
        // Deep comparison of the 'node' property
        if (!compareObjects(set1.node, set2.node)) {
          return false;
        }
      
        return true;
      }
      
      // Function to deep compare two objects
      function compareObjects(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
      
        if (keys1.length !== keys2.length) {
          return false;
        }
      
        for (const key of keys1) {
          const val1 = obj1[key];
          const val2 = obj2[key];
      
          if (typeof val1 === 'object' && typeof val2 === 'object') {
            // Recursive comparison for nested objects
            if (!compareObjects(val1, val2)) {
              return false;
            }
          } else if (val1 !== val2) {
            return false;
          }
        }
      
        return true;
      }
      
    
