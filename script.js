console.log("Running");
let inDirec = { x: 0, y: 0 };
const EatingFood = new Audio('music/food.mp3');
const gameOver = new Audio('music/gameover.mp3');
// snake should be an array 
let snakeArr = [
    { x: 13, y: 15 }
];
// food shouldn't be an array
food = { x: 13, y: 12 };
// Snake speed should also be initialized in the beginning
let speed = 19;
let score = 0;
let lastPaintTime = 0;


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        // no function will call
        return;
    }
    // window.requestAnimationFrame(main);
    lastPaintTime = ctime;
    gameEngine();
}

//Function if snake will collide
function isCollide(snake) {
    // if it collides with itself
    for (i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }
    // if it collides with wall of container
    if (snake[0].x >= 19 || snake[0].x <= 0 || snake[0].y >= 19 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    //updating the snake array and food

    if (isCollide(snakeArr)) {
        gameOver.play();
        inDirec = { x: 0, y: 0 };
        alert("Game Over! press any key to continue");
        snakeArr = [{ x: 10, y: 10 }];
        // food = { x: 3, y: 5 };
        score = 0;
    }

    // if he eats food, increment the score and regenrate the food
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        EatingFood.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            two.innerHTML = 'HiScore : ' + hiscoreval;
        }
        one.innerHTML = 'Score: ' + score;
        snakeArr.unshift({ x: snakeArr[0].x + inDirec.x, y: snakeArr[0].y + inDirec.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inDirec.x;
    snakeArr[0].y += inDirec.y;

    //displaying the snake
    container.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; //y is for row
        snakeElement.style.gridColumnStart = e.x; // x is for column
        // also we have to add all these styling in the class so it will display
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');

        }
        container.appendChild(snakeElement);
    });

    // displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; //y is for row
    foodElement.style.gridColumnStart = food.x; // x is for column
    foodElement.classList.add('food');
    container.appendChild(foodElement);
}

// MAIN LOGIC OF GAME
// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    two.innerHTML = "HiScore: " + hiscore;
}



//Function to control snake
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // Start the game
    // moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inDirec.x = 0;
            inDirec.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inDirec.x = 0;
            inDirec.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inDirec.x = -1;
            inDirec.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inDirec.x = 1;
            inDirec.y = 0;
            break;
        default:
            break;
    }

});


