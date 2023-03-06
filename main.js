// set up the canvas and context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// set up the initial state of the game
var snake = [{x: 10, y: 10}];
var food = {x: 15, y: 15};
var direction = "right";
var score = 0;
var gameover = false;

// set up the key listener to change direction of the snake
document.addEventListener("keydown", function(event) {
	if (event.keyCode === 37 && direction !== "right") {
		direction = "left";
	}
	else if (event.keyCode === 38 && direction !== "down") {
		direction = "up";
	}
	else if (event.keyCode === 39 && direction !== "left") {
		direction = "right";
	}
	else if (event.keyCode === 40 && direction !== "up") {
		direction = "down";
	}
});

// function to move the snake and check for collision with the walls or itself
function moveSnake() {
	var head = {x: snake[0].x, y: snake[0].y};
	if (direction === "right") {
		head.x++;
	}
	else if (direction === "left") {
		head.x--;
	}
	else if (direction === "up") {
		head.y--;
	}
	else if (direction === "down") {
		head.y++;
	}
	if (head.x === food.x && head.y === food.y) {
		snake.unshift(head);
		food = {x: Math.floor(Math.random() * canvas.width/10), y: Math.floor(Math.random() * canvas.height/10)};
		score++;
	}
	else {
		snake.pop();
		snake.unshift(head);
	}
	if (head.x < 0 || head.x >= canvas.width/10 || head.y < 0 || head.y >= canvas.height/10) {
		gameover = true;
	}
	for (var i = 1; i < snake.length; i++) {
		if (snake[i].x === head.x && snake[i].y === head.y) {
			gameover = true;
		}
	}
}

// function to draw the snake and food on the canvas
function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < snake.length; i++) {
		context.fillStyle = "green";
		context.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
	}
	context.fillStyle = "red";
	context.fillRect(food.x * 10, food.y * 10, 10, 10);
	context.fillStyle = "black";
	context.font = "20px Arial";
	context.fillText("Score: " + score, 10, 30);
}

// main game loop
function gameLoop() {
	moveSnake();
	draw();
	if (!gameover) {
		setTimeout(gameLoop, 100);
	}
	else {
		context.clearRect(0, 0, canvas.width
