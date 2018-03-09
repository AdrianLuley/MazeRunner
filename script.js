const map = [
    "CCWWWWWC",
    "WWW   WC",
    "WOSB  WC",
    "WWW BOWC",
    "WOWWB WC",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];
let playerTop = 140;
var playerLeft = 140; // Cordinates of Players starting position //
var cell;
let mapDiv = document.getElementById("container");
var row;
var column;
let posX = 2;
let posY = 2;
let playerPos = false;
const cellSize = 70;
var crates = []; // array for pushing crates //




// Creates the key listener for Arrow Up, Dow, Left, Right //
// posY and posX are starting and limiters for the grid(posY < 9-- means 9th character in the y axis)
// The map is in (Y,X) order but I am using (X,Y) order here //
function movePlayer(changeX, changeY) {
    posY += changeY;
    posX += changeX;

    playerTop += cellSize * changeY;
    playerLeft += cellSize * changeX;
    document.getElementById("player").style.top = playerTop + "px";
    document.getElementById("player").style.left = playerLeft + "px";
}
function moveBanana(changeX, changeY) {
    
}


document.addEventListener("keydown", (event) => {
   let keyName = event.key;
    //moveBoxUp is used to tell if the cell is a " " , "C", "B", or "O //"
    let movePlayerUp = map[posY - 1][posX];
    let movePlayerDown = map[posY + 1][posX];
    let movePlayerRight = map[posY][posX + 1];
    let movePlayerLeft = map[posY][posX - 1];
   
    let moveBananaUp = map[posY - 2][posX];
    let moveBananaDown = map[posY + 2][posX];
    let moveBananaRight = map[posY][posX + 2];
    let moveBananaLeft = map[posY][posX - 2];

    if (keyName === "ArrowUp") {
        if (posY < 9 && posY > 0) {
            if (" SO".includes(movePlayerUp)) {
                movePlayer(0, -1);

            } 
        }
    }
    if (keyName === "ArrowDown") {
      
        if (posY < 9 && posY > 0) {
            if (" SO".includes(movePlayerDown)) {
                movePlayer(0, 1);
            }
        }
    }
    if (keyName === "ArrowRight") {
        if (posX < 9 && posX >= 0) {
            if (" SO".includes(movePlayerRight)) {
                movePlayer(1, 0);
            } else if ("BX".includes(movePlayerRight) && " ".includes(moveBananaRight)) {
                console.log(moveBananaRight);
            }
        }
    }
    if (keyName === "ArrowLeft") {
        if (posX < 9 && posX >= 0) {
            if (" SO".includes(movePlayerLeft)) {
                movePlayer(-1, 0);
            }
        }
    }

})
// Creates rows the columns and adds bricks as a background for all "W" //
for (let x = 0; x < map.length; x++) {
    let newMap = map[x];
    let row = document.createElement("div");
    row.classList.add("row");
 

    for (y = 0; y < newMap.length; y++) {
      
        let column = document.createElement("div");
        column.classList.add("column");
        row.appendChild(column);
        if (newMap[y] == "W") {
            column.style.backgroundImage = "url('bricks2.jpg')";

        } else if (newMap[y] === "C") {
            column.style.backgroundImage = "url('DKBarrel.jpg')";
        } else if (newMap[y] == "O") {
            column.style.backgroundColor = "red";
            column.style.borderRadius = "50%";
        } else if ("BX".includes(newMap[y])) {
            var banana = document.createElement("div");
            banana.style.backgroundImage = "url('Banana.jpg')";
            banana.classList.add("Banana", "column");
            banana.style.position = "absolute";
            banana.style.left = (y*70) + "px";
            banana.style.top = (x*70) + "px";
            row.appendChild(banana);
        } else if (newMap[y] !== "W") {
            column.style.backgroundColor = "green";

        }
    }

    // appends row(the maze) to the HTML Div //
    mapDiv.appendChild(row);

}