const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const box = 2;
        let snake = [{ x: 8 * box, y: 8 * box }];
        let direction = 'RIGHT';
        let food = {
            x: Math.floor(Math.random() * 190) * box,
            y: Math.floor(Math.random() * 190) * box
        };
        let score = 0;

        document.addEventListener('keydown', changeDirection);

        function changeDirection(event) {
            if (event.keyCode === 37 && direction !== 'RIGHT') {
                direction = 'LEFT';
            } else if (event.keyCode === 38 && direction !== 'DOWN') {
                direction = 'UP';
            } else if (event.keyCode === 39 && direction !== 'LEFT') {
                direction = 'RIGHT';
            } else if (event.keyCode === 40 && direction !== 'UP') {
                direction = 'DOWN';
            }
        }

        function draw() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i === 0) ? 'green' : 'white';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }

            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, box, box);

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if (direction === 'LEFT') snakeX -= box;
            if (direction === 'UP') snakeY -= box;
            if (direction === 'RIGHT') snakeX += box;
            if (direction === 'DOWN') snakeY += box;

            if (snakeX === food.x && snakeY === food.y) {
                score++;
                food = {
                    x: Math.floor(Math.random() * 19) * box,
                    y: Math.floor(Math.random() * 19) * box
                };
            } else {
                snake.pop();
            }

            let newHead = { x: snakeX, y: snakeY };

            if (
                snakeX < 0 || snakeY < 0 ||
                snakeX >= canvas.width || snakeY >= canvas.height ||
                collision(newHead, snake)
            ) {
                clearInterval(game);
                alert('Game Over! Your score is ' + score);
            }

            snake.unshift(newHead);
        }

        function collision(head, snakeArray) {
            for (let i = 0; i < snakeArray.length; i++) {
                if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
                    return true;
                }
            }
            return false;
        }

        let game = setInterval(draw, 100);
