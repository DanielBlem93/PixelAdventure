// const mainTheme = new Audio('src/assets/audio/mainTheme.mp3')
// mainTheme.volume = 0.3


let start = false
let started = false
let gameOver = false
let mute = false

function startGame() {
    btn = document.getElementById('start-btn')
    btn.style.display = 'none'
    setTimeout(() => {
        start = true
    }, 300);

    if (!mute) {

        mainTheme.play()
    }

}

function changeSound() {
    let soundOn = document.getElementById('soundOn')
    let soundOff = document.getElementById('mute')
    if (mute) {
        mainTheme.volume = 0.3
        soundOff.style.display = 'none'
        soundOn.style.display = 'unset'

    } else {
        mainTheme.volume = 0
        soundOff.style.display = 'unset'
        soundOn.style.display = 'none'

    }
    mute = !mute
}

function setCollisionDimensions(instance, width, height) {
    instance.body.setSize(width, height, true)

}

function setTrapBodyCenter(trap, centerX, centerY) {

    // Berechne den Offset, um den zentralen Punkt zu setzen
    let offsetX = centerX - trap.width;
    let offsetY = centerY - trap.height;

    // Setze den Offset des Kollisionsbereichs
    trap.body.setOffset(centerX, centerY);
}