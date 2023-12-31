import "./node.css"
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
const Node=(props)=>{
    const start=<svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px"><path d="M472-480 288-664l88-88 272 272-272 272-88-88 184-184Z"/></svg>;
    const starticon=< DoubleArrowIcon style={{color:'white'}} />;
    const end=<svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M479.769-18Q384-18 300-54t-146.5-98.5Q91-215 55-299.231t-36-180Q19-575 55-659t98.357-146.526q62.357-62.527 146.655-99Q384.31-941 480.155-941t180.054 36.474q84.208 36.473 146.5 99Q869-743 905-658.769t36 180Q941-383 905-299t-98.5 146.5Q744-90 659.769-54t-180 36ZM480-129q146 0 248.5-102T831-479q0-146-102.5-248.5T480-830q-146 0-248.5 102.5T129-479q0 146 102.5 248T480-129Zm.118-64Q361-193 277.5-276.382q-83.5-83.383-83.5-202.5Q194-598 277.382-681.5q83.383-83.5 202.5-83.5Q599-765 682.5-681.618q83.5 83.383 83.5 202.5Q766-360 682.618-276.5q-83.383 83.5-202.5 83.5Zm-.251-111Q552-304 603.5-355.367q51.5-51.368 51.5-123.5Q655-551 603.633-603t-123.5-52Q408-655 356.5-603T305-478.867q0 72.132 51.367 123.5Q407.735-304 479.867-304Zm-.017-65q-45.85 0-78.35-32-32.5-32-32.5-77.85 0-45.849 32.65-78.5Q434.301-590 480.15-590q45.85 0 78.35 32.65 32.5 32.651 32.5 78.5Q591-433 558.35-401q-32.651 32-78.5 32Z"/></svg>;
    const endicon=<FmdGoodIcon/>;
    const jerry="https://i.pinimg.com/originals/99/bf/53/99bf531ae638f180e4fff2c250632e55.gif"
    const cheese="https://t3.ftcdn.net/jpg/01/31/61/44/360_F_131614470_DKYpaK6xVOBo4ElxwdqAREZUMxbYT6hX.jpg";
    const className = props.properties.startNode
    ? "node start-node"
    : props.properties.endNode
    ? "node end-node"
    : props.properties.isWall && props.ratinmaze===true
    ? "node wall-node-basic"
    : props.properties.isWall && props.ratinmaze===false
    ? "node wall-node"
    : "node";   
    return(
        <div className={className} style={props.size?{height:`${props.size.i}px`,width:`${props.size.j}px`}:null}
        id={`node-${props.properties.i}-${props.properties.j}`}
        key={`node-${props.properties.i}-${props.properties.j}`}
     
      
        onMouseDown={()=>props.mousedownhandler(props.properties.i,props.properties.j)}
        onMouseUp={()=>props.mouseuphandler(props.properties.i,props.properties.j)}
        onMouseOver={()=>props.mouseoverhandler(props.properties.i,props.properties.j)}>
    {(props.properties.startNode && props.ratinmaze===true)?<img src={jerry} style={{ height: `${props.size.i}px`, width: `${props.size.j}px` }}/>:(props.properties.endNode && props.ratinmaze===true)?<img src={cheese} style={{ height: `${props.size.i}px`, width: `${props.size.j}px` }}/>:props.properties.startNode?starticon:props.properties.endNode?endicon:null}
    {props.properties.isWeight>0 && props.properties.isWall===false && props.properties.startNode!==true?`${props.properties.isWeight}`:null}
    </div>
    );
  
}
export default Node;