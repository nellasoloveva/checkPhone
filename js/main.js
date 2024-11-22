let box = document.getElementById('boxAnimat');
let target = document.getElementById('target');
let scoreDisplay = document.getElementById('score');
let score = 0;
let letStart = document.getElementById('letStart');
let al = document.getElementById('al');
let content = document.getElementById('contentNone');
let text = document.getElementById('text');
let button = document.getElementById('button');
let startGame = document.getElementById('startGame');
let time = 40;
let firework = document.getElementById('firework');
let firework1 = document.getElementById('firework1');
let firework2 = document.getElementById('firework2');
let firework3 = document.getElementById('firework3');

box.tabIndex = 0;
document.body.style.overflow = "hidden";

function moveTarget() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const x = Math.random() * (windowWidth - target.offsetWidth);
    const y = Math.random() * (windowHeight - target.offsetHeight);

    target.style.left = x + "px";
    target.style.top = y + "px";
}

function checkCollision() {
    const rectBox = box.getBoundingClientRect();
    const rectTarget = target.getBoundingClientRect();

    return !(
        rectBox.right < rectTarget.left ||
        rectBox.left > rectTarget.right || 
        rectBox.bottom < rectTarget.top ||
        rectBox.top > rectTarget.bottom
    );
}


function aye() {
    let count = time;
    let counter = setInterval(timer, 1000); 

    function timer() {
        count = count-1;
        if (count <= 0) {
            clearInterval(counter);
            if (score >= 15) {
                al.className = 'over';
                content.className = 'content';
                text.className = 'text';
                button.className = 'button';

                text.textContent = 'Вы набрали 15 очков за ' + time + ' секунд! В следуйщем уровне у вас будет ' + (time - 5) + 'секунд';
                button.textContent = 'Следующий уровень';

                button.onclick = function() {
                    time = time - 5;
                    if (time > 15) {
                    al.className = 'al';
                    content.className = 'contentNone';
                    score = 0;
                    
                    aye();
                    }
                    else if (time <= 15) {
                        text.textContent = 'вы прошли игру';
                        button.textContent = 'играть заного';
                        firework.className = 'firework';
                        firework1.className = 'firework1';
                        firework2.className = 'firework2';
                        firework3.className = 'firework3';
                        button.onclick = function() {
                            location.reload();
                        }
                    }
                }
            }
            else if (score < 15) {
                al.className = 'over';
                content.className = 'content';
                text.className = 'text';
                button.className = 'button';

                text.textContent = 'вы проиграли';
                button.textContent = 'заного';

                button.onclick =  function() { 
                    location.reload();
                }
            }
        }
        letStart.innerHTML = 'Осталось: ' + count + ' секунд';
    }

    
}

startGame.onclick = function() {
    aye();
}

document.addEventListener("keydown", function (event) {
    const directions = {
        "ArrowRight": 'right',
        "ArrowLeft": 'left',
        "ArrowUp": 'up',
        "ArrowDown": 'down'
    };

    if (directions[event.code]) {
        moveBox(directions[event.code]);
    }
});

function moveBox(direction) {
    let rectElem = box.getBoundingClientRect();
    let x = rectElem.x + window.scrollX;
    let y = rectElem.y + window.scrollY;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    switch (direction) {
        case 'right':
            x += box.offsetWidth;
            break;
        case 'left':
            x -= box.offsetWidth;
            break;
        case 'up':
            y -= box.offsetHeight;
            break;
        case 'down':
            y += box.offsetHeight;
            break;
    }

    // Ограничение движения по границам окна
    x = Math.max(0, Math.min(x, windowWidth - box.offsetWidth));
    y = Math.max(0, Math.min(y, windowHeight - box.offsetHeight));

    box.style.position = "absolute"; // Убедитесь, что позиция установлена
    box.style.left = x + "px";
    box.style.top = y + "px";

    if (checkCollision()) {
        score++;
        scoreDisplay.textContent = "Счет: " + score;
        moveTarget(); 
    }
}

// Обработчики событий для кнопок
document.getElementById("up").addEventListener("click", function() {
    moveBox('up');
});
document.getElementById("down").addEventListener("click", function() {
    moveBox('down');
});
document.getElementById("left").addEventListener("click", function() {
    moveBox('left');
});
document.getElementById("right").addEventListener("click", function() {
    moveBox('right');
});

// Инициализация целевого объекта
moveTarget();
