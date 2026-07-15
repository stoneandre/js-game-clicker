const screens = document.querySelectorAll('.screen')
const startBtn = document.getElementById('start')
// console.log(screens);
const timeList = document.querySelector('ul')
const timeEl = document.getElementById('time')
const board = document.getElementById('board')


let time = 0
let interval = 0
const colors = ['red', 'green', 'yellow', 'purple', 'pink', 'blue']
let score = 0


startBtn.addEventListener('click', (event) => {
    console.log(event);
    event.preventDefault()
    screens[0].classList.add('up')
    // document.body.style.transform = 'translateY(-100vh)'
})

timeList.addEventListener('click', (event) => {
    // console.dir(event.target);
    // console.log(event.target.classList.contains('time'));
    if (event.target.classList.contains('time')) {
        // console.log(event.target.dataset.time);
        time = event.target.dataset.time
        screens[1].classList.add('up')
        timeEl.textContent = time < 10 ? `0${time}:00` : `${time}:00`;
        startGame()
    }
})


function startGame() {
    interval = setInterval(degreaseTime, 1000)
    // console.log(interval);
    createRandomCircle()

}
function degreaseTime() {
    if (time === 0) {
        finishGame()
        return
    }
    let current = --time
    // console.log(curent);
    timeEl.textContent = current < 10 ? `0${current}:00` : `${current}:00`;
}
function finishGame() {
    clearInterval(interval)
    console.log(timeEl.parentNode);
    timeEl.parentNode.className = 'hide'
    board.innerHTML =
        `<h1>Гру закінчено.<br>Ваш рахунок: <span>${score}</span></h1>`
    if (score >= 10) {
        board.querySelector('span').classList.add('success')
    } else {
        board.querySelector('span').classList.add('base')
    }
    const btn = document.createElement('button')
    btn.textContent = 'Грати наново'
    btn.style.border = '2px solid red'
    btn.style.padding = '16px'
    btn.style.marginTop = '20px'
    btn.style.textTransform = 'uppercase'
    btn.style.borderRadius = '10px'





    board.appendChild(btn)

    btn.addEventListener('click', () => {
        window.location.reload()

    })
}

function createRandomCircle() {
    console.log('ok');
    const circle = document.createElement('div')
    circle.className = 'circle'

    const size = getRandomInteger(30, 70)
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`

    const setSizesOfBoard = board.getBoundingClientRect()
    console.log(setSizesOfBoard);
    const { width, height } = setSizesOfBoard
    console.log(width, height);

    const x = getRandomInteger(size, width - size * 2)
    const y = getRandomInteger(size, height - size * 2)
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`

    const randomIndex = getRandomInteger(0, colors.length - 1)
    circle.style.backgroundColor = colors[randomIndex]
    // circle.style.opacity = `${(randomIndex+5)/10}`  // прозорість 












    board.appendChild(circle)
}

board.addEventListener('click', (event) => {
    console.dir(event.target.classList.contains('circle'));
    if (event.target.classList.contains('circle')) {
        score++
        console.log(score);
        event.target.remove()

        createRandomCircle()

    }

})

function getRandomInteger(min, max) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    return random
}