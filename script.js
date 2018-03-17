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
].map(function (row) {
    return row.split("");
});
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
var targetCoordinates = [];

// var boxcorrdinates =[]
// use .push([x,y]) of storage location
// then make an array of the banana corrdinates
//use .sort()to have the same order for both arrays, and then use .toString() to then compare //
// targetCorrdiantes.sort().toString() === bananaCorrdiantes.sort().toString() //




// Creates the key listener for Arrow Up, Dow, Left, Right //
// posY and posX are starting and limiters for the grid(posY < 9-- means 9th character in the y axis)
// The map is in (Y,X) order but I am using (X,Y) order here //
function movePlayer(changeX, changeY) {
    map[posY][posX] = " "

    posY += changeY;
    posX += changeX;

    map[posY][posX] = "S"
    playerTop += cellSize * changeY;
    playerLeft += cellSize * changeX;
    document.getElementById("player").style.top = playerTop + "px";
    document.getElementById("player").style.left = playerLeft + "px";
    console.log("Win?", checkForWin());
    if (checkForWin()) {
        alert("You Have Won!!! Good Job!!")
        window.setInterval(checkForWin, 2000);
 }
}
// Moves the Bananana (or boxes"B") //
function moveBanana(changeY, changeX, banana) {

    // var coordinates = banana.id.split("")
    var bananaY = parseInt(banana.dataset.y);
    var bananaX = parseInt(banana.dataset.x);

    map[bananaX][bananaY] = " ";
    map[bananaX + changeX][bananaY + changeY] = "B";

    banana.id = (bananaY + changeY).toString() + (bananaX + changeX).toString();
    banana.dataset.x = bananaX + changeX;
    banana.dataset.y = bananaY + changeY;

    var bananaTop = banana.offsetTop + (cellSize * changeX);
    var bananaLeft = banana.offsetLeft + (cellSize * changeY);
    banana.style.top = bananaTop + "px";
    banana.style.left = bananaLeft + "px";
}


document.addEventListener("keydown", (event) => {
    let keyName = event.key;
    //moveBoxUp is used to tell if the cell is a " " , "C", "B", or "O //"
    let movePlayerUp = map[posY - 1][posX];
    let movePlayerDown = map[posY + 1][posX];
    let movePlayerRight = map[posY][posX + 1];
    let movePlayerLeft = map[posY][posX - 1];



    if (keyName === "ArrowUp") {
        if (posY < 8 && posY >= 0) {
            if (" SO".includes(movePlayerUp)) {
                movePlayer(0, -1);
                //checks 2 cells in whatever direction and find the coordinates and puts them together, also checks if theres an empty space after said box //
            } else if ("BX".includes(movePlayerUp)) {
                let moveBananaUp = map[posY - 2][posX];

                if (" OX".includes(moveBananaUp)) {
                    var bananaId = posX + (posY - 1).toString();

                    var bananaDiv = document.getElementById(bananaId);
                    moveBanana(0, -1, bananaDiv);
                    movePlayer(0, -1);
                }
            }
        }
    }
    if (keyName === "ArrowDown") {

        if (posY < 8 && posY >= 0) {
            if (" SO".includes(movePlayerDown)) {
                movePlayer(0, 1);
            } else if ("BX".includes(movePlayerDown)) {

                let moveBananaDown = map[posY + 2][posX];

                if (" OX".includes(moveBananaDown)) {
                    var bananaId = posX + (posY + 1).toString();

                    var bananaDiv = document.getElementById(bananaId);
                    moveBanana(0, 1, bananaDiv);
                    movePlayer(0, 1);

                }
            }
        }
    }
    if (keyName === "ArrowRight") {
        if (posX < 7 && posX >= 0) {

            if (" SO".includes(movePlayerRight)) {
                movePlayer(1, 0);
            } else if ("BX".includes(movePlayerRight)) {

                let moveBananaRight = map[posY][posX + 2];

                if (" OX".includes(moveBananaRight)) {
                    var bananaId = (posX + 1).toString() + posY;

                    var bananaDiv = document.getElementById(bananaId);
                    moveBanana(1, 0, bananaDiv);
                    movePlayer(1, 0);

                }
            }
        }
    }
    if (keyName === "ArrowLeft") {
        if (posX < 7 && posX >= 0) {
            if (" SO".includes(movePlayerLeft)) {
                movePlayer(-1, 0);
            } else if ("BX".includes(movePlayerLeft)) {

                let moveBananaLeft = map[posY][posX - 2];
                if (" OX".includes(moveBananaLeft)) {
                    var bananaId = (posX - 1).toString() + posY;

                    var bananaDiv = document.getElementById(bananaId);
                    moveBanana(-1, 0, bananaDiv);
                    movePlayer(-1, 0);
                }
            }
        }
    }


})


// Creates rows the columns and adds bricks as a background for all "W" //
for (let x = 0; x < map.length; x++) {
    var newMap = map[x];
    let row = document.createElement("div");
    row.classList.add("row");


    for (let y = 0; y < newMap.length; y++) {

        let column = document.createElement("div");
        column.classList.add("column");
        row.appendChild(column);
        if (newMap[y] == "W") {
            column.style.backgroundImage = "url('bricks2.jpg')";

        } else if (newMap[y] === "C") {
            column.style.backgroundImage = "url('DKBarrel.jpg')";
        } else if (newMap[y] == "O") {
            // horzontail is first then vertical //
            targetCoordinates.push([x, y]);
            column.style.backgroundColor = "red";
            column.style.borderRadius = "50%";

        } else if ("BX".includes(newMap[y])) {
            if (newMap[y] === "X") {
                targetCoordinates.push([x, y]);
            }
            var banana = document.createElement("div");
            banana.id = y.toString() + x.toString();
            banana.dataset.x = x;
            banana.dataset.y = y
            banana.style.backgroundImage = "url('Banana.jpg')";
            banana.classList.add("banana", "column");
            banana.style.position = "absolute";
            banana.style.left = (y * 70) + "px";
            banana.style.top = (x * 70) + "px";
            column.style.backgroundColor = "green";
            row.appendChild(banana);
        } else if (newMap[y] !== "W") {
            column.style.backgroundColor = "green";

        }
    }

    // appends row(the maze) to the HTML Div //
    mapDiv.appendChild(row);

}

console.log(targetCoordinates);

function checkForWin() {
    const bananaCoordinates = []
    const bananaElements = document.querySelectorAll(".banana")

    for (let bananaElement of bananaElements) {
        bananaCoordinates.push([ bananaElement.dataset.x, bananaElement.dataset.y ])
    }

    const bananas = bananaCoordinates.sort().toString()
    const targets = targetCoordinates.sort().toString();
    console.log("bananas:", bananas)
    console.log("targets:", targets)
    return bananas === targets
    // find all bananas
    // derive x and y indexes from ids and push
    // then when done, compare the sorted stringified version of this coordinates array to the 
    //    sorted stringified version of the targetCoordinates array


}