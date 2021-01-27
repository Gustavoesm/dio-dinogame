const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let colision = false;
let enemySize = 100;
const space = 32, jumpSpeed = 15, moveSpeed = 15, jumpHeight = 200;


function handleKeyUp(event){
    if (event.keyCode === space) {
        if (!isJumping) {
            jump();
        }
    }
} 

function reposition(position) {
    dino.style.bottom = position + 'px';
}

function jump(){

    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= jumpHeight) {
            clearInterval(upInterval);

            // falling
            let downInterval = setInterval(() => {
                if (position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= jumpSpeed;
                    reposition(position);
                }
            }, 20)
        }else{
            // jumping
            position += jumpSpeed;
            reposition(position);
        }
    }, 20)
}

function spawnCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1300;
    let rngSpawnTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        
        if (cactusPosition < -enemySize) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < enemySize-10 && position < enemySize-10){
            // game o ver
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">You\'re dead sir / ma\'am.</h1>';
            colision = true;
        }else{
            cactusPosition -= moveSpeed;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

	// stops cactus from spawning after game ends
    !colision ? setTimeout(spawnCactus, rngSpawnTime): null;
}

document.addEventListener('keyup', handleKeyUp)
spawnCactus();