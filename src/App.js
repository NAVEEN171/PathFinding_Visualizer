import "./App.css";
import { useState } from "react";
import { useEffect,useRef } from "react";
import RatInMaze from "./RatINMaze";
import Dropdown from "./Dropdown";
import astar from "./A-star";
import BidirectionalBFS from "./Bidirectional";
import dfs from "./DFS";
import Node from "./Node";
import bfs from "./bfs";
import Diks from "./Dikstra";
import Greedybfs from "./GreedyBFS";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import trimaze from './trimaze';
import DropDown2 from "./DropDown2";
import { stepConnectorClasses } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import wallmake from './Mazes';
//import staircase from "./staircase";
import randommaze from "./randommaze";
import perfectmaze from './perfectMaze'
import DropDown from "./Dropdown";
import { set } from "mongoose";

function App() {
  const [grid, setGrid] = useState([]);
  const [ratinmaze,setratinmaze]=useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [Startpos,setStartpos]=useState({i:10,j:29});
  const [changepos,setchangepos]=useState(false);
  const [changepos2,setchangepos2]=useState(false);
  const [Endpos,setEndpos]=useState({i:10,j:25});
  const [dis,setdis]=useState(false);
  const [diss,setdiss]=useState(false);
  const [size,setsize]=useState({i:25,j:25})
  let array=["Dijkstra","A* search","Greedy Best First Search","Depth First Search","Breadth First Search","Bidirectional BFS"];
  const dropref=useRef(null);
  const [weighton,setweighton]=useState(false);
 
  const [Ren,setRen]=useState(0);
  const [patherror,setpatherror]=useState(false);
  const [click,setClick]=useState(false);
  const [click2,setClick2]=useState(false);
  const [gridsize,setgridsize]=useState({i:0,j:0});
  const [click3,setClick3]=useState(false);
  const [algo,setalgo]=useState("");
  const [mazepattern,setmazepattern]=useState("");
  const [selection,setselection]=useState(false);
  const [mazeon,setmazeon]=useState(false);
  const [accelerate,setaccelerate]=useState("Fast");
  const [speed,setspeed]=useState(25);
  const [drop,setdrop]=useState(false);
  const [run,setrun]=useState(false);
 
  

  const [option,setOption]=useState("");
  const closeOthers = (currentClick) => {
    if (currentClick !== 1) setClick(false);
    if(!selection){
      if(currentClick!==2) setmazeon(false);
    }
   
    if (currentClick !== 3) setClick3(false);
  };

  
  
  
  let gridenable = false;
  let wall = true;
 

 

  useEffect(() => {
    let n;
    let m;
    let startIdx;
    let endIdx;
    
    if(ratinmaze){
       n=4;
       m=4;
       let height=Math.floor((window.innerHeight-220)/4);
       let width=Math.floor(window.innerWidth/4);
      
       if(height<width){
        setsize({i:height-8,j:height-8})
       }
       else{
        setsize({i:width-8,j:width-8})
       }
       
      startIdx=[0,0];
      endIdx=[3,3];
    }
    else{
      removewalls()
 
  
    if(window.innerWidth>900 ){
      m = Math.floor((window.innerWidth)/25)-3;
      n= Math.floor((window.innerHeight)/25)-7;
      setsize({i:25,j:25});
      setgridsize({i:n-1,j:m-1});
      }
      else if(window.innerWidth<900 && window.innerWidth>750){
        m = Math.floor((window.innerWidth)/25)-2;
        n= Math.floor((window.innerHeight)/25)-7;
        setsize({i:25,j:25})
        setgridsize({i:n-1,j:m-1});
      }
    else{
      m = Math.floor((window.innerWidth)/20)-2;
    n= Math.floor((window.innerHeight)/20)-8;
    setsize({i:20,j:20})
    setgridsize({i:n-1,j:m-1});
    }
   
    if(window.innerWidth<500){
      startIdx=[Math.floor(n/2),1];
      endIdx=[Math.floor(n/2),m-2]

    }
    else{
     startIdx = [Math.floor(n/2),Math.floor(m/3)];
     endIdx = [Math.floor(n/2),Math.floor(m/1.5)];
    }
    }
    setStartpos({i:startIdx[0],j:startIdx[1]});
    setEndpos({i:endIdx[0],j:endIdx[1]})
    
    let newGrid = [];
    for (let i = 0; i < n; i++) {
      let col = [];
      for (let j = 0; j < m; j++) {
        if (i === startIdx[0] && j === startIdx[1]) {
          col.push({
            startNode: true,
            prevNode:0,
            endNode: false,
            isDistance: 0,
            isCheck: 1e20,
            matt: 1,
            isWallCheck:1,
            isWeight: 0,
            mat: 0,
            isCummulative: 0,
            isendVisit: false,
            isVisited: false,
            isWall: false,
            i,
            j,
          });
        } else if (i === endIdx[0] && j === endIdx[1]) {
          col.push({
            startNode: false,
            isDistance: 0,
            prevNode:0,
            isCheck: 1e20,
            isCummulative: 1e20,
            isWallCheck: 1,
            isWeight: 0,
            mat: 0,
            isendVisit: false,
            matt: 1,
            endNode: true,
            isVisited: false,
            isWall: false,
            i,
            j,
          });
        } else {
          col.push({
            startNode: false,
            endNode: false,
            prevNode:0,
            isDistance: 0,
            mat: 0,
            matt: 1,
            isCummulative: 0,
            isWeight: 0,
            isCheck: 1e20,
            isWallCheck: 1,
            isVisited: false,
            isendVisit: false,
            isWall: false,
            i,
            j,
          });
        }
      }
      newGrid.push(col);
    }
    setGrid(newGrid);
   
    setRen(1);
  }, [ratinmaze]);
  let visitedNodesCleanup = null;
  let dfsAnimationCleanup = null;
  let animatecleanup = null;
 

  function handleMouseDown(i, j) {
   
  
    if ( document.getElementById('changeS').disabled || selection) {
     
      setIsMouseDown(false);
      return;
    }
   

    let newGrid = [...grid];

    
    if(changepos && !gridenable){
      if(i===Endpos.i && j===Endpos.j){
        return;
      }
      newGrid[Startpos.i][Startpos.j].startNode=false;
     newGrid[Startpos.i][Startpos.j].isWall=false;
     document.getElementById(`node-${Startpos.i}-${Startpos.j}`).style.backgroundImage="";

      document.getElementById(`node-${Startpos.i}-${Startpos.j}`).style.backgroundColor="";
       newGrid[i][j].startNode=true;
       newGrid[i][j].isWall=false;
       if(weighton){
      
        newGrid[Startpos.i][Startpos.j].isWeight=newGrid[i][j].isWeight;
        newGrid[i][j].isWeight=1;
  
      }
       
       setStartpos({i,j});

      setchangepos(false);

        

    }
   else if(changepos2 && !gridenable){
    if(i===Startpos.i && j===Startpos.j){
      return;
    }
      newGrid[Endpos.i][Endpos.j].endNode=false;
    newGrid[Endpos.i][Endpos.j].isWall=false;
    if(weighton){
      newGrid[Endpos.i][Endpos.j].isWeight=newGrid[i][j].isWeight;
      newGrid[i][j].isWeight=0;

    }
       newGrid[i][j].endNode=true;
       newGrid[i][j].isWall=false;
       newGrid[i][j].isWallCheck=1;
       setEndpos({i,j});
     setchangepos2(false)
       

        

    }
    
    else{
    newGrid[i][j].isWall = !newGrid[i][j].isWall;
    
    if(ratinmaze===true){
      
      let photo=document.getElementById(`node-${i}-${j}`);
  
      if(photo.style.backgroundImage===""){
      photo.style.backgroundImage="url('https://www.suburbanexterminating.com/wp-content/uploads/Suburban-Blog-Images-17.png')"
     
     photo.style.backgroundSize = `${size.i}px ${size.j}px`;
      }
      else{
        photo.style.backgroundImage=""
       
      }


    }
    if(ratinmaze===true){
    if (newGrid[i][j].isWallCheck) {
      newGrid[i][j].isWallCheck = 0;
    } else {
      newGrid[i][j].isWallCheck = 1;
    }
  }
  
  }
    setIsMouseDown(true);
    setGrid(newGrid);
  }
  function assignweights() {
    setweighton(true);
    let newGrid = [...grid];
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[0].length; j++) {
        if (newGrid[i][j] === newGrid[Endpos.i][Endpos.j]) continue;
        else if (newGrid[i][j] === newGrid[Startpos.i][Startpos.j]) {
          newGrid[i][j].isWeight = 1;
        } else {
         
          newGrid[i][j].isWeight = Math.floor(Math.random() * 10) + 1;
       
        }
      }
    }
    setGrid(newGrid);
  
  }

  function handleMouseOver(i, j) {
    if(ratinmaze===true){
      return;
    }
    
    if (isMouseDown) {
      
      let newGrid = [...grid];
 
      newGrid[i][j].isWall = !newGrid[i][j].isWall;
      if (newGrid[i][j].isWallCheck) {
        newGrid[i][j].isWallCheck = 0;
      } else {
        newGrid[i][j].isWallCheck = 1;
      }
      setGrid(newGrid);
    }

     
    }
  

  function handleMouseUp(i, j) {
   

    setIsMouseDown(false);
  }
  function animateVisitedNodes(visitedNodes) {
    
    let buttonaccess = document.getElementById("clearbutton");
    let startbutton = document.getElementById("startbutton");
    let clearpath = document.getElementById("clearpath");
    buttonaccess.disabled = true;
    startbutton.disabled = true;
    clearpath.disabled = true;
   
  
    let timeouts = [];
  

    for (let i = 0; i < visitedNodes.length; i++) {
      const visitedNodesTimeOut = setTimeout(() => {
        //comments for rat in maze , working in process
        if (visitedNodes[i].hasOwnProperty("mode")) {
          let node = document.getElementById(
            `node-${visitedNodes[i].element.i}-${visitedNodes[i].element.j}`
          );
          if (node.classList.contains("start-node")) return;
          if (node.classList.contains("end-node")) return;
          if (visitedNodes[i].mode === "A") {
            node.classList.add("visited-node-basic");
        

          } else if (visitedNodes[i].mode === "R") {
            node.classList.remove("visited-node-basic");
          }
        } else {
          let node = document.getElementById(
            `node-${visitedNodes[i].i}-${visitedNodes[i].j}`
          );
          if (node.classList.contains("start-node")) return;
          if (node.classList.contains("end-node")) return;
          // if(visitedNodes[i].mode==="A"){
          node.classList.add("visited-node");
         
          
          
          if(visitedNodes[i].i===0 || visitedNodes[i].j===0|| visitedNodes[i].i===gridsize.i || visitedNodes[i].j===gridsize.j){
            if(visitedNodes[i].i===0 && visitedNodes[i].j===0){
              
               node.classList.add("corner-1");
         
             
            }
            else if(visitedNodes[i].j===0 && visitedNodes[i].i===gridsize.i){
              
              node.classList.add("corner-2");
        
            }
            else if(visitedNodes[i].i===0 && visitedNodes[i].j===gridsize.j ){
            
              node.classList.add("corner-3");
        
            }
            else if(visitedNodes[i].i===gridsize.i && visitedNodes[i].j===gridsize.j ){
             
              node.classList.add("corner-4");
        
            }
            
            
            else if(visitedNodes[i].i===0 ){
                
                  setTimeout(()=>{
                    
                     
                       node.classList.add("visited-top")
                  },200)
               }
               else if(visitedNodes[i].j===0){
                setTimeout(()=>{
                    
                
                  node.classList.add("visited-left")
             },200)
               }
               else if(visitedNodes[i].i===gridsize.i){
                setTimeout(()=>{
                  
                  node.classList.add("visited-bottom")
             },200)
               }
               else if(visitedNodes[i].j===gridsize.j){
                setTimeout(()=>{
                    
                 
                  node.classList.add("visited-right")
             },200)
               }
          }
          //}
          // else if(visitedNodes[i]==="R"){
          // node.classList.remove("visited-node");
        }
      },speed * i);
      timeouts.push(visitedNodesTimeOut);
    }
   

    const cleanup = () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };

    visitedNodesCleanup = cleanup;

    return cleanup;
  }

  function animateDfs(path) {
    

   
    let timeouts = [];
    let lastelement = document.getElementById(
      `node-${path[path.length - 1].i}-${path[path.length - 1].j}`
    );

    for (let i = 0; i < path.length; i++) {
      const pathTimeOut = setTimeout(() => {
        let node = document.getElementById(`node-${path[i].i}-${path[i].j}`);
        if (node === lastelement) {
          let buttonaccess = document.getElementById("clearbutton");
          
          let clearpath = document.getElementById("clearpath");
          buttonaccess.disabled = false;
          
          clearpath.disabled = false;
          document.getElementById('clearbutton').classList.remove("red")
          document.getElementById('clearpath').classList.remove("red")
        

           
         
          
         let startnodes=document.getElementById(`node-${Startpos.i}-${Startpos.j}`)
         
          if(ratinmaze && startnodes){
            let imgg=startnodes.querySelector('img');
            if(imgg.src!==null){
              imgg.src="https://gifdb.com/images/high/jerry-mouse-deep-thinking-happy-aha-keehu6683epi5qx3.gif"
            }}

         
          let node = document.getElementById(`node-${Endpos.i}-${Endpos.j}`);
          if (node) {
           
            node.style.color = "red";
            startnodes.style.backgroundColor = "red";
          } else {
            node.style.color = "green";
          }
        }

        if (node.classList.contains("start-node")) return;
        if (node.classList.contains("end-node")) return;
        node.classList.add("is-path");
        if(!ratinmaze){
          if(path[i].i===0 || path[i].j===0|| path[i].i===gridsize.i || path[i].j===gridsize.j){
            if(path[i].i===0 && path[i].j===0){
             
              
               node.classList.add("corner-1");
         
             
            }
            else if(path[i].j===0 && path[i].i===gridsize.i){
            
             
              node.classList.add("corner-2");
        
            }
            else if(path[i].i===0 && path[i].j===gridsize.j ){
             
              node.classList.add("corner-3");
        
            }
            else if(path[i].i===gridsize.i && path[i].j===gridsize.j ){
             
              node.classList.add("corner-4");
        
            }
            
            
            else if(path[i].i===0 ){
                  setTimeout(()=>{
                   
                       node.classList.add("visited-top")
                  },200)
               }
               else if(path[i].j===0){
                setTimeout(()=>{
                
                  node.classList.add("visited-left")
             },200)
               }
               else if(path[i].i===gridsize.i){
                setTimeout(()=>{
                 
                  node.classList.add("visited-bottom")
             },200)
               }
               else if(path[i].j===gridsize.j){
                setTimeout(()=>{
                 
                  node.classList.add("visited-right")
             },200)
               }
        }
      }}, algo==="Bidirectional BFS"?20 * i +400:20*i);
      timeouts.push(pathTimeOut);
    }

    const cleanup = () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };

    dfsAnimationCleanup = cleanup;

    return cleanup;
  }
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if ((!e.target.closest('.drop-down') && mazeon)) {
        setmazeon(false);
      }
     
    
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [mazeon])
  function runbfs() {
    
    if(selection===true){
      return;
    }

    
    setdrop(true);
     setrun(true);
  
    gridenable = true;
    document.getElementById('changeS').disabled=true;
    document.getElementById('changeE').disabled=true;
    document.getElementById("ratt").disabled=true;
    document.getElementById("ratt").classList.add("rat-none")
    document.getElementById('changeS').classList.add("red");
    document.getElementById('changeE').classList.add("red");
    document.getElementById('startbutton').classList.add("red")
    document.getElementById('clearbutton').classList.add("red")
    document.getElementById('clearpath').classList.add("red")
    if(!ratinmaze){
    document.getElementById('mazesbutton').classList.add("red")
    }
   
   
    let visitedNodesCleanup = null;
    let dfsAnimationCleanup = null;
    let animatecleanup = null;
   
    if (visitedNodesCleanup) visitedNodesCleanup(); // Cleanup previous visitedNodes animation
    if (dfsAnimationCleanup) dfsAnimationCleanup();
    if (animatecleanup) clearTimeout(animatecleanup);
     let path;
     let visitedNodes;
  
     if(ratinmaze){
         
      
     
      [path,visitedNodes]=RatInMaze(grid,grid[Startpos.i][Startpos.j],grid[Endpos.i][Endpos.j])
    
      
       
     }
 else if(algo===array[0]){
     [path, visitedNodes] =Diks(grid, grid[Startpos.i][Startpos.j], grid[Endpos.i][Endpos.j]);
  } 
  else if(algo===array[1]){
    [path, visitedNodes] =astar(grid, grid[Startpos.i][Startpos.j], grid[Endpos.i][Endpos.j]);
 } 
 else if(algo===array[2]){
  [path, visitedNodes] =Greedybfs(grid, grid[Startpos.i][Startpos.j], grid[Endpos.i][Endpos.j]);
} 
else if(algo===array[4]){
  [path, visitedNodes] =bfs(grid, grid[Startpos.i][Startpos.j], grid[Endpos.i][Endpos.j]);

}
else if(algo===array[3]){
  [path, visitedNodes] =dfs(grid, grid[Startpos.i][Startpos.j], grid[Endpos.i][Endpos.j]);

}
else if(algo===array[5]){
  [path, visitedNodes] =BidirectionalBFS(grid, grid[Startpos.i][Startpos.j], grid[Endpos.i][Endpos.j]);

}


if(visitedNodes.length===0 ) {
  setpatherror(true);
  setTimeout(()=>{setpatherror(false)
  },1000);

    document.getElementById("clearbutton").classList.remove("red");
    document.getElementById("clearpath").classList.remove("red");
  
  return;
}

    animateVisitedNodes(visitedNodes);
    
    if (path.length !== 0) {
      const animateTimeout = setTimeout(() => {
        animateDfs(path);
      }, speed * visitedNodes.length);

      const cleanup = () => {
        clearTimeout(animateTimeout);
      };
      animatecleanup = cleanup;
      return cleanup;
    } else {
      let buttonaccess = document.getElementById("clearbutton");
    buttonaccess.disabled=false;
    document.getElementById("clearbutton").classList.remove("red")
   
    document.getElementById("clearpath").disabled=false;
    document.getElementById("clearpath").classList.remove("red")
    setTimeout(()=>{setpatherror(true)
      setTimeout(()=>{setpatherror(false)
      },1000);
      },speed * visitedNodes.length);
   
       
      return;
    }
  }
  function clearpath() {
    wall = false;
    removegrid();
  }
  useEffect(()=>{
   
   if(accelerate==="Fast"){
      setspeed(15);
    }
    else if(accelerate==="Medium"){
      setspeed(25);
    }
    else if(accelerate==="Slow"){
      setspeed(40)
    }
    
     
    
  },[accelerate,ratinmaze])


  useEffect(()=>{
        startMazes(mazepattern)
        
  },[mazepattern])
  let mazes=["random maze","prims maze","circular maze"]
  function startMazes(){
    if(run===true ){
      return;
    }
   
    let Makewalls;
    if(mazepattern!==""){
      let clean=document.getElementById("clearbutton")
       clean.disabled=true
    }
    
   
   
    if(mazepattern==="random maze"){
     
       Makewalls=randommaze(grid,grid[Startpos.i][Startpos.j],grid[Endpos.i][Endpos.j]);
       
       
    }  
   
    else if(mazepattern==="prims maze"){
      
     Makewalls=perfectmaze(grid,grid[Startpos.i][Startpos.j],grid[Endpos.i][Endpos.j]);
    }
    else if(mazepattern==="circular maze"){
      
      Makewalls=wallmake(grid,grid[Startpos.i][Startpos.j],grid[Endpos.i][Endpos.j]);
    }
    else{
      return;
    }
    
  
    
        for(let i=0;i<Makewalls.length;i++){
          const wallTimeout=setTimeout(()=>{
             let node=document.getElementById(`node-${Makewalls[i].i}-${Makewalls[i].j}`)
             if (node.classList.contains("start-node")){ 
              node.isWall=false;
              return
            };
             if (node.classList.contains("end-node")){ 
               node.isWall=false;
              return
            };
             node.classList.add("wall-node");
            },10*i)
          }
          if(mazepattern!==""){
          document.getElementById("mazesbutton").classList.add("red")
          document.getElementById("clearbutton").classList.add("red")
          document.getElementById("Timebutton").classList.add("red")
          document.getElementById("Algorithmsbutton").classList.add("red")
          

       setTimeout(()=>{setselection(false); 
        document.getElementById("clearbutton").classList.remove("red")
        document.getElementById("Timebutton").classList.remove("red")
        document.getElementById("Algorithmsbutton").classList.remove("red")
        
        
        document.getElementById("clearbutton").disabled=false;},10*Makewalls.length)
          }
         
        
      }

  let time=["Fast","Medium","Slow"]
  function removewalls(){
    let newGrid = [...grid];
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[0].length; j++) {
        if(document.getElementById(`node-${i}-${j}`).style.backgroundImage){
          document.getElementById(`node-${i}-${j}`).style.backgroundImage='';
        }
    if (newGrid[i][j].isWall) {
      newGrid[i][j].isWall = false;
      document
        .getElementById(`node-${i}-${j}`)
        .classList.remove("wall-node");
      
    }
    if(algo!==array[1] && algo!==array[2]){
     
    
    if (newGrid[i][j].isWeight ) {
      newGrid[i][j].isWeight = 0;
    }}}}
    setGrid(newGrid);
  }
  function removeweights(){
    let newGrid = [...grid];
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[0].length; j++) {
 
    
     
    
    if (newGrid[i][j].isWeight ) {
      newGrid[i][j].isWeight = 0;
    }}
    setGrid(newGrid);
  }

  }
  function removegrid() {
    if(selection){
      
      return;
    }
    
    
    setrun(false);
    
   
    gridenable = false;
    if (visitedNodesCleanup) visitedNodesCleanup(); // Cleanup previous visitedNodes animation
    if (dfsAnimationCleanup) dfsAnimationCleanup(); // Cleanup previous dfs animation
    if (animatecleanup) clearTimeout(animatecleanup);
    document.getElementById('changeS').disabled=false;
    document.getElementById('changeE').disabled=false;
    //if(ratinmaze){
    //  setratinmaze(false);
   // }
  

    let newGrid = [...grid];
    
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[0].length; j++) {
        if (wall === true) {
          if(!ratinmaze){
          document.getElementById("mazesbutton").classList.remove("red")}
          if (newGrid[i][j].isWallCheck === 0) {
            newGrid[i][j].isWallCheck = 1;
          }
          if (newGrid[i][j].isWeight) {
            newGrid[i][j].isWeight = 0;
          }
          if (newGrid[i][j].isWall) {
            newGrid[i][j].isWall = false;
            document
              .getElementById(`node-${i}-${j}`)
              .classList.remove("wall-node");
            wall = true;
          }
          if(document.getElementById(`node-${i}-${j}`).style.backgroundImage!==null){
            document.getElementById(`node-${i}-${j}`).style.backgroundImage=""; 

          
          }
          setweighton(false);
        }
       
        if(newGrid[i][j].isendVisit){
          newGrid[i][j].isendVisit=false;
        }
        if (newGrid[i][j].isVisited) {
         
        

          newGrid[i][j].isVisited = false;
          newGrid[i][j].isDistance = 0;
          newGrid[i][j].isCheck = 1e20;

          document
            .getElementById(`node-${i}-${j}`)
            .classList.remove("visited-node");
           
        }
        if(document.getElementById(`node-${i}-${j}`).classList.contains("corner-1")){
          document.getElementById(`node-${i}-${j}`).classList.remove("corner-1");
        }
        if(document.getElementById(`node-${i}-${j}`).classList.contains("corner-2")){
          document.getElementById(`node-${i}-${j}`).classList.remove("corner-2");
        }
        if(document.getElementById(`node-${i}-${j}`).classList.contains("corner-3")){
          document.getElementById(`node-${i}-${j}`).classList.remove("corner-3");
        }
        if(document.getElementById(`node-${i}-${j}`).classList.contains("corner-4")){
          document.getElementById(`node-${i}-${j}`).classList.remove("corner-4");
        }
        if(document.getElementById(`node-${i}-${j}`).classList.contains("visited-top")){
          document.getElementById(`node-${i}-${j}`).classList.remove("visited-top");
        }
        if(document.getElementById(`node-${i}-${j}`).classList.contains("visited-bottom")){
          document.getElementById(`node-${i}-${j}`).classList.remove("visited-bottom");
        }
        if(document.getElementById(`node-${i}-${j}`).classList.contains("visited-left")){
          document.getElementById(`node-${i}-${j}`).classList.remove("visited-left");
        }
        if(document.getElementById(`node-${i}-${j}`).classList.contains("visited-right")){
          document.getElementById(`node-${i}-${j}`).classList.remove("visited-right");
        }

        if (
          document
            .getElementById(`node-${i}-${j}`)
            .classList.contains("is-path")
        ) {
          document.getElementById(`node-${i}-${j}`).classList.remove("is-path");
          document.getElementById(`node-${Endpos.i}-${Endpos.j}`).style.color = "black";
          document.getElementById(`node-${Startpos.i}-${Startpos.j}`).style.backgroundColor =
            "rgb(19, 181, 178)";
        }
      }
      document.getElementById(`node-${Endpos.i}-${Endpos.j}`).style.color = "black";
      document.getElementById(`node-${Startpos.i}-${Startpos.j}`).style.backgroundColor =
        "rgb(19, 181, 178)";
     
      let startnodes = document.getElementById(`node-${Startpos.i}-${Startpos.j}`);
      if(ratinmaze){
        let imgg=startnodes.querySelector('img');
        if(imgg.src!==null){
          imgg.src="https://i.pinimg.com/originals/99/bf/53/99bf531ae638f180e4fff2c250632e55.gif"
        }}
      setdrop(false);
      setGrid(newGrid);
      setmazepattern("");
      document.getElementById("ratt").disabled=false;
      document.getElementById("ratt").classList.remove("rat-none")
       document.getElementById("startbutton").classList.remove("red")
       document.getElementById("changeS").classList.remove("red")
       document.getElementById("changeE").classList.remove("red")
       if(!ratinmaze){
       document.getElementById("mazesbutton").classList.remove("red")
      }
       let startbutton = document.getElementById("startbutton");
          startbutton.disabled = false;

             setdis(false);
      
      setdiss(false);
      
    }
  }
  
   
  return (
    <div className="App">
    <div className="navbar">
      <div className="path"><div className="pathtext">PATH FINDING VISUALIZER🚀</div></div>
      <div className="buttonwrapper">
                      
   {!ratinmaze &&  <div className="algos ">  <DropDown2 name="Algorithms" selection={selection} selected={algo} setSelected={setalgo} array={array} click={click} func={()=>{removeweights()}} setClick={setClick}closeOthers={() => closeOthers(1)} ></DropDown2></div>}
      <button
        className="startbutton made"
        id="startbutton"
        onClick={() => {
          if(algo!=="" || ratinmaze){
            runbfs();
          }
        
         
        }}
      >
         {algo==="Dijkstra"?"Visualize dijkstra!":algo==="A* search"?"Visualize A*!":algo==="Greedy Best First Search"?"Visualize Greedy BFS":algo==="Depth First Search"?"Visualize DFS":algo==="Breadth First Search"?"Visualize BFS":algo==="Bidirectional BFS"?"Visualize "+algo:algo==="Rat In Maze"?"Visualize "+algo:"Pick an Algorithm!"}
      </button>
      <button
        className="buttons made"
        id="clearbutton"
        disabled={false}
        onClick={() => {
          removegrid();
        }}
      >
        clear
      </button>
      <button
        className="buttons made"
        id="clearpath"
        
        onClick={() => {
          clearpath();
        }}
      >
        clearpath
      </button>
    {(algo===array[2] || algo===array[1]) && <button
        className="buttons made"
        id="assignweigh"
        onClick={() => {
          assignweights();
        }}
      >
        weights
      </button>}
     {!ratinmaze && (
  <div className="drop-down" onClick={()=>{
  if(run===false && diss===false){
    closeOthers(2);
    setmazeon((prev)=>!prev)}}}>
    <button className="butt made" id="mazesbutton">
      Mazes <span>&#9660;</span>
    </button>
    {(mazeon && diss===false)&& <div id="dropp" className="drop-down-menu active">
      {mazes.map((maze) => (
        <div key={maze} onClick={()=>{setdiss(true);removewalls();setselection(true);setmazepattern(maze)}}>{maze}</div>
      ))}
    </div>}
  </div>
)}
       <div className="speeds">
      <DropDown2 name="Time"  selected={accelerate} selection={selection} setSelected={setaccelerate} array={time} drop={drop} func={()=>{}}  click={click3}setClick={setClick3} closeOthers={() => closeOthers(3)}/>
      </div>
      </div>
      </div>
      <div className="buttons-wrapper">
        <button className="changeS" id="changeS" disabled={false} onClick={()=>{
          if(gridenable===false){
             if(changepos2===true){
              setchangepos2(false);
              setchangepos(true);
             }
             else{
             setchangepos(true)
             }
          
        }}}>Change StartNode</button>
       
        
        <button className="changeE" id="changeE"disabled={false} onClick={()=>{
         if(gridenable===false){
          if(changepos===true){
            setchangepos(false)
          } 
          setchangepos2(true)}}}>change EndNode</button>
      </div>
   
     
    {!ratinmaze  && <div className="optionswrapper">
        <div className="item">
        < DoubleArrowIcon className="arrow"   style={{backgroundColor:"rgb(19, 181, 178)",color:"white" }}/>:StartNode

        </div>
        <div className="item">
        <FmdGoodIcon className="finish" style={{backgroundColor:"white"}}/>:FinishNode

        </div>
        <div className="item">
        <div className="box"></div>:UnvisitedNode

        </div>
       
        <div className="item">
        <div className="box visited-node" ></div>:VisitedNode
       
        </div>
         
        <div className="item">
        <div className="box is-path" style={{border:"none"}}></div>:Path

        </div>
        <div className="item">
        <div className="box wall-node" ></div>:Wall

        </div>
      </div>}
      { patherror && <div className="pathwrapper"> 
      <div className="patherror show">
        PATH NOT FOUND !
      </div></div>}
      
    
      <div className="gridwrapper">
      <div className="grid">
        {grid.map((row, i) => (
          <div key={`row-${i}`} className="row">
            {row.map((col, j) => (
              <div key={`cell-${i}-${j}`}>
                <Node
             
                  mouseuphandler={handleMouseUp}
                  ratinmaze={ratinmaze}
                  size={size}
                  mousedownhandler={handleMouseDown}
                  mouseoverhandler={handleMouseOver}
                  properties={{
                    startNode: col.startNode,
                    endNode: col.endNode,
                    isWall: col.isWall,
                    mat: col.mat,
                    isWeight: col.isWeight,
                    i,
                    j,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      </div>
      <div className="wrapper">
      <button className="rat" id="ratt" disabled={false}onClick={()=>{
        if(ratinmaze===false){
          setalgo("Rat In Maze")
        setratinmaze(true);
      }
      else if(ratinmaze===true){
        setalgo("")
        document.getElementById(`node-${Startpos.i}-${Startpos.j}`).style.backgroundColor="";
        setratinmaze(false)
      }
      
    }}>{ratinmaze?"Back":"Rat In Maze"}</button>
      </div>
    </div>
  );
}

export default App;
