window.addEventListener('DOMContentLoaded', () => {


    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)
    const grid = $('.grid')
    let squares = Array.from($$('.grid div'))
    const scoreDisplay = $('#score')
    const startBtn = $('#start-btn')
    var score = 0
    const width = 10
    const colors = [
        '#d27d6b', '#af6f9e', '#59439f', '#54a7c5', '#b9c49a'
    ]
    // ************ Tetromino block
    const lTetromino = [
        [1, width + 1, width*2+1, 2],
        [width, width + 1, width + 2, width*2 + 2],
        [1, width + 1, width*2 + 1, width*2],
        [width, width*2, width*2 + 1, width*2 + 2]
    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
      ];
    
      const tTetromino = [
        [1, width, width + 1, width + 2],
        [width + 2, 1, width + 1, width * 2 + 1],
        [width*2 + 1, width + 2, width + 1, width],
        [width, width*2 + 1, width + 1, 1]
      ];
    
      const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
      ];
    
      const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
      ];
      const theTetrominos = [ lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
      let currentPosition = 4
      let currentRotation = 0

// Random make tetromino
    var random = Math.floor(Math.random()*theTetrominos.length)
      let current = theTetrominos[random][currentRotation]
      if(current == theTetrominos[0][currentRotation]){

      }

// Draw tetromino
function draw(){
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
    })
};

function undraw(){
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
    })
}

// Make the tetromino move downn  every second
timerID = setInterval(moveDown, 500)

// set function moveDown
function moveDown(){
    undraw()
    currentPosition += width;
    draw()
    freeze()
}

// freeze function
// when the tetromino down to floor
function freeze(){
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        
// start a new tetromino
        currentPosition = 4
        currentRotation = 0
        random = Math.floor(Math.random()*theTetrominos.length)
        current = theTetrominos[random][currentRotation]
        draw()
        addScore()
        gameOver()

    }
}

// control tetromino
window.addEventListener('keydown', (e) => {
    const isAtLeft = current.some(index => (currentPosition + index) % width === 0)
    const isAtRight = current.some(index => (currentPosition + index + 1) % width === 0 )
   
    const blockLeft = current.some(index => squares[currentPosition + index + width - 1].classList.contains('taken'))
    const blockRight = current.some(index => squares[currentPosition + index + width + 1].classList.contains('taken'))
// move tetromino to left
    if(e.key == 'ArrowLeft' && !isAtLeft && !blockLeft){
        undraw()
        currentPosition -= 1
        draw()
    }

// move tetromino to right
    if(e.key == 'ArrowRight' && !isAtRight && !blockRight){
            undraw()
            currentPosition += 1
            draw()
        }

// move tetromino down
    if(e.key == 'ArrowDown'){
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

// move tetromino up
    if (e.key == 'ArrowUp'){
        undraw()
        currentRotation++
        if(currentRotation ===4) {
            currentRotation = 0
        }
        current = theTetrominos[random][currentRotation]
        draw()
    }
    })

// when press start/pause button

startBtn.onclick = function(){
    if (timerID){
        clearInterval(timerID)
        timerID = null

    }
    else {
        timerID = setInterval(moveDown,500)
    }
}

// add score/////////

function addScore(){
    for (let i = 0 ; i < 199 ; i += width){
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
        if(row.every(index => squares[index].classList.contains('taken'))) {
            score +=10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
              squares[index].classList.remove('taken')
              squares[index].classList.remove('tetromino')
              squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
          }
        

    }
}
// Game over 
const notify = document.createElement('h2')
 notify.innerHTML = 'Game Over'

 function gameOver(){
     if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
         scoreDisplay.innerHTML = score
         $('.nextTetri').appendChild(notify)
         clearInterval(timerID)
     }
 }

})
const audio = document.querySelector('#audio');
window.onload = function(){
    audio.play()
}