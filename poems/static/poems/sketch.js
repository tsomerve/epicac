axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken' : document.querySelector('[name=csrfmiddlewaretoken]').value
}

let currentPoem = ''

function setup() {
    createCanvas(windowWidth, windowHeight)
    noStroke()
    rectMode(CENTER)
}

function draw() {
    background(color(155, 75, 100))
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
        axios.post('/save', {
            poem: currentPoem,
        })
        .then(() => console.log('It worked!'))
    })
}
  