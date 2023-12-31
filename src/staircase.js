import {useState} from 'react';


export default function staircase(grid,startNode,endNode){
                let nodes=[];
                let row=grid.length;
                
                let col=grid[0].length;
                let j=0;
                for(let i=row-1;i>0;i--){
                       if(j>row-1 && grid[i][j+1]===null){
                        break;
                       }
                        grid[i][j].isWall=true;
                        nodes.push(grid[i][j]);
                        j++;
                    
                }
                 j=row-1;
                 console.log(row)
                 console.log(col)
            

               
                for(let i=0;i<row;i++){
                    if(grid[i][row]===null ) break;
                    if(j>col-1 && grid[i][j+1]===null ){
                        break;
                    }
                    grid[i][j].isWall=true;
                    nodes.push(grid[i][j]);
                    j++;
                }
            
           /*     let randomInteger = Math.floor(Math.random()*(row));
                console.log("error")
                console.log(randomInteger)
                console.log(nodes[randomInteger])
                nodes[randomInteger].isWall=false;

               nodes.splice(randomInteger,1)
            if(col>16){
                randomInteger = Math.floor(Math.random()*(row))+(row-3); 
                console.log("error")
                console.log(randomInteger)
                console.log(nodes[randomInteger])


               
            
               nodes[randomInteger].isWall=false;
              
             //  randomInteger = Math.floor(Math.random()*((row+col)-2)); nodes[randomInteger].isWall=false;
               nodes.splice(randomInteger,1)
            }*/
               
                console.log(nodes)
                return nodes;
}