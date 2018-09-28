axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken' : document.querySelector('[name=csrfmiddlewaretoken]').value
}

let currentPoem = ''
let myFont

const fonts = [
    '/static/AlexBrush-Regular.ttf',
    '/static/the_breakdown.ttf'
]

function preload() {
    myFont = loadFont(random(fonts))
}

function setup() {
    background(204)

    const poem = document.querySelector('#poem')
    if(poem) {
        currentPoem = poem.innerText
    }
    const canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent('canvas')
    noStroke()
    rectMode(CENTER)
}

function draw() {
    background(color(155, 75, 100))
    textSize(40)
    textStyle(ITALIC)
    textAlign(CENTER)
    textFont(myFont) 
    if(currentPoem === '') {
        fill(color(255, 255, 255, 128))
        textSize(100)
        text('Create a poem!', windowWidth / 2, windowHeight / 4)
    } else {
        fill(245);
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