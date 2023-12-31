export default function perfectmaze(grid,startNode,endNode){
      let visited=[...grid];
      let frontier=[];
      let row=grid.length;
      let col=grid[0].length;
      for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
            grid[i][j].isWall=true;
        }
      }
      let random=Math.floor(Math.random()*row);
     
      let random1=Math.floor(Math.random()*col);
      
     
      grid[random][random1].isVisited=true;
      frontier.push(grid[random][random1]);
    while(frontier.length>0){
    
            let select=Math.floor(Math.random()*frontier.length);
            let currentNode=frontier[select];
            if(currentNode.prevNode){
                let prevNode=currentNode.prevNode;
                 let x=currentNode.i-prevNode.i;
                 let y=currentNode.j-prevNode.j;
                 if(x===2){
                     grid[prevNode.i+1][prevNode.j].isWall=false;
                     visited = visited.map(row => row.filter(node => node !== grid[prevNode.i + 1][prevNode.j]));


                 }
                 else if(x===-2){
                    grid[prevNode.i-1][prevNode.j].isWall=false;
                  //  visited.splice(visited.indexOf( grid[prevNode.i-1][prevNode.j]), 1);
                    visited = visited.map(row => row.filter(node => node !== grid[prevNode.i - 1][prevNode.j]));


                 }
                 else if(y===2){
                    grid[prevNode.i][prevNode.j+1].isWall=false;
                  //  visited.splice(visited.indexOf( grid[prevNode.i][prevNode.j+1]), 1);
                  visited = visited.map(row => row.filter(node => node !== grid[prevNode.i ][prevNode.j+1]));

                 }
                 else if(y===-2){
                    grid[prevNode.i][prevNode.j-1].isWall=false;
                  //  visited.splice(visited.indexOf(grid[prevNode.i][prevNode.j-1]), 1);
                    visited = visited.map(row => row.filter(node => node !== grid[prevNode.i ][prevNode.j-1]));


                 }
            }
            currentNode.isWall=false;
        
            visited = visited.map(row => row.filter(node => node !== currentNode));

           
           
            frontier=frontier.filter(item=>item!==currentNode);
            let neigh=getNeighbors(grid,currentNode)
        
    
   
     for(let i=0;i<neigh.length;i++){
        let neighbour=neigh[i];
        if(neighbour.isVisited===true) continue;
        neighbour.isVisited=true;
        neighbour.prevNode=currentNode;
        frontier.push(neighbour);
     }
    
}

visited=visited.flat()
startNode.isVisited=false;
endNode.isVisited=false;
startNode.isWall=false;
endNode.isWall=false;
for(let i=0;i<grid.length;i++){
    for(let j=0;j<grid[0].length;j++){
        grid[i][j].isVisited=false;
    
    }
}
return visited;
}

function getNeighbors(grid, currentNode) {
    let neighbors = [];
    let { i, j } = currentNode;
   
  
    if (j > 1 && !grid[i][j - 2].isVisited) neighbors.push(grid[i][j - 2]);
    if (i > 1 && !grid[i - 2][j].isVisited) neighbors.push(grid[i - 2][j]);
    if (j < grid[0].length-2 && !grid[i][j + 2].isVisited) neighbors.push(grid[i][j + 2]);
    if (i < grid.length-2 && !grid[i + 2][j].isVisited) neighbors.push(grid[i + 2][j]);
     
    return neighbors;
  }