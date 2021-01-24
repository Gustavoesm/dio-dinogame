const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let colision = false;
const space = 32, jumpSpeed = 10, moveSpeed = 10;


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
        if (position >= 150) {
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
    let cactusPosition = 1000;
    let rngSpawnTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < 50 && position < 50){
            // game o ver
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">You\'re dead sir / ma\'am.</h1>';
            colision = true;
        }else{
            cactusPosition -= moveSpeed;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    !colision ? setTimeout(spawnCactus, rngSpawnTime): null;
}

document.addEventListener('keyup', handleKeyUp)
spawnCactus();