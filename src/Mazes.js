export default function Mazes(grid, startNode, endNode) {
    const mazes = [];
    const rows = grid.length-2;
    const cols = grid[0].length-2;
    let gapSize;let circleSpacing;let circles;
    console.log(rows,cols)
    if(rows+2>19 && cols+2>19){
    
        gapSize = 2;
        circleSpacing =3; 
        circles=3 
    }
    
 
 
    else{
        gapSize=1;
        circleSpacing=2;
        circles=2; 
    }
    
        // Adjust the spacing between circles

    // Function to check if a cell is within an open circular maze with a gap
    function isInOpenCircularMaze(x, y, centerX, centerY, radius, gapSize, openingAngle) {
        const distanceToCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const angle = Math.atan2(y - centerY, x - centerX);

        // Check if within radius and not in the opening angle
        return distanceToCenter >= radius && distanceToCenter <= radius + gapSize && Math.abs(angle - openingAngle) > 0.2;
    }
    
    // Iterate through concentric circles
    for (let circle = 0; circle < circles; circle++) { // Adjust the number of circles if needed
        // Calculate center and radius for each circle
        const centerX = Math.floor(cols / 2);
        const centerY = Math.floor(rows / 2);
        const radius = circle * (1 + circleSpacing) + 1; // Adjust the radius calculation
       
        // Define an opening angle for each circle (in radians)
        const openingAngle = Math.PI / (circle+1); // 90 degrees (adjust as needed)
      

        // Output the nodes that form the open circular maze
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (isInOpenCircularMaze(j, i, centerX, centerY, radius, gapSize, openingAngle)) {
                    // Add the node to the maze
                    grid[i][j].isWall=true;
                    mazes.unshift(grid[i][j]);
                }
            }
        }
    }
    return mazes;
}
