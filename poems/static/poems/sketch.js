let currentPoem = ''

function setup() {
    createCanvas(windowWidth, windowHeight)
    noStroke()
    rectMode(CENTER)
}

function draw() {
    background(color(255, 120, 120))
    textSize(40)
    textAlign(CENTER)
    if(currentPoem === '') {
        fill(color(255, 255, 255, 128))
        text('Create a poem!', windowWidth / 2, windowHeight / 2)
    } else {
        fill(255);
        text(currentPoem, windowWidth / 2, windowHeight / 2, 700, windowHeight / 2)
    }
}

function mousePressed() {
    loadJSON('/generate', (poems) => {
        currentPoem = poems.poem
    })
}
  