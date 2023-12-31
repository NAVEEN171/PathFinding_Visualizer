export default function randommaze(grid,startNode,endNode){
               let row=grid.length;
               let nodes=[];
               let col=grid[0].length;
               let choice=Math.floor(Math.random()*3);
               if(choice===0){
                for(let i=0;i<row;i++){
                    for(let j=0;j<col;j++){
                        if(Math.random()<0.3){
                            grid[i][j].isWall=true;
                            nodes.push(grid[i][j]);
                        }
                    }
                   }

               }
               else if(choice===1){
               for(let i=0;i<row;i++){
                for(let j=0;j<col;j=j+2){
                    if(Math.random()<0.8){
                        grid[i][j].isWall=true;
                        nodes.push(grid[i][j]);
                    }
                }
               }
            }
            else{
                for(let i=0;i<row;i=i+2){
                    for(let j=0;j<col;j++){
                        if(Math.random()<0.8){
                            grid[i][j].isWall=true;
                            nodes.push(grid[i][j]);
                        }
                    }
                   }  
            }
               return nodes;
}