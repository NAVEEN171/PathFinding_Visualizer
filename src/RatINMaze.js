

export default function RatInMaze(grid, startNode, endNode) {
    endNode.isWallCheck=1;
    let visitedNodes=[];
    endNode.isWall=false;
   function solvee(starti, startj, endi, endj, move, grid) {
    let ans = [];

    let row = grid.length;
    let col = grid[0].length;

    if (starti === endi && startj === endj) {
        ans.push(move);
        return ans;
    }

    if (starti + 1 < row && !grid[starti + 1][startj].isVisited && grid[starti + 1][startj].isWallCheck === 1) {
        grid[starti][startj].isVisited =true;
        visitedNodes.push({element:grid[starti][startj],mode:"A"});

    
        ans = ans.concat(solvee(starti + 1, startj, endi, endj, move + "D", grid));
        grid[starti][startj].isVisited = false;
    
       visitedNodes.push({element:grid[starti][startj],mode:"R"});

    }

    if (startj - 1 >= 0 && !grid[starti][startj - 1].isVisited && grid[starti][startj - 1].isWallCheck === 1) {
        grid[starti][startj].isVisited = true;
        visitedNodes.push({element:grid[starti][startj],mode:"A"});
        ans = ans.concat(solvee(starti, startj - 1, endi, endj, move + "L", grid));
        grid[starti][startj].isVisited = false;
        visitedNodes.push({element:grid[starti][startj],mode:"R"})
    }

    if (startj + 1 < col && !grid[starti][startj + 1].isVisited && grid[starti][startj + 1].isWallCheck === 1) {
        grid[starti][startj].isVisited = true;
        visitedNodes.push({element:grid[starti][startj],mode:"A"});

        ans = ans.concat(solvee(starti, startj + 1, endi, endj, move + "R", grid));
        grid[starti][startj].isVisited = false;
        visitedNodes.push({element:grid[starti][startj],mode:"R"});

    }

    if (starti - 1 >= 0 && !grid[starti - 1][startj].isVisited && grid[starti - 1][startj].isWallCheck === 1) {
        grid[starti][startj].isVisited = true;
        visitedNodes.push({element:grid[starti][startj],mode:"A"});

        ans = ans.concat(solvee(starti - 1, startj, endi, endj, move + "U", grid));
        grid[starti][startj].isVisited = false;
        visitedNodes.push({element:grid[starti][startj],mode:"R"});

    }
    
    return ans;
}

    let ans = solvee(startNode.i, startNode.j, endNode.i, endNode.j, "", grid);

    let path=[];
    if(ans.length!==0){
        let max=ans[0].length;
        
    for(let i=1;i<ans.length;i++){
            if(ans[i].length<max){
                   max=ans[i].length;
            } 
    }
  
     ans=ans.filter(destination=>destination.length===max);

    let pathend;
    if(ans.length>0){
        pathend=ans[Math.floor(Math.random()*ans.length)]
    }
    let currentNode=startNode;
    for(let m=0;m<pathend.length;m++){
             if(pathend[m]==="L"){
                path.push(grid[currentNode.i][currentNode.j-1]);
                currentNode=grid[currentNode.i][currentNode.j-1];
             } 
             else if(pathend[m]==="R"){
                path.push(grid[currentNode.i][currentNode.j+1]);
                currentNode=grid[currentNode.i][currentNode.j+1];
             }  
             else if(pathend[m]==="U"){
                path.push(grid[currentNode.i-1][currentNode.j])
                currentNode=grid[currentNode.i-1][currentNode.j];
             }
             else if(pathend[m]==="D"){
                path.push(grid[currentNode.i+1][currentNode.j])
                currentNode=grid[currentNode.i+1][currentNode.j];
             }

    }
    //let Nodes=[...new Set(visitedNodes)];
    
    return [path,visitedNodes];

    

}
return [[],[]];
}

