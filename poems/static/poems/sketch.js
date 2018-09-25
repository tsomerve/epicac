axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken' : document.querySelector('[name=csrfmiddlewaretoken]').value
}

let currentPoem = ''
let myFont
let graphics

var x
var y
var outsideRadius = 150
var insideRadius = 100

function preload() {
    myFont = loadFont('/static/AlexBrush-Regular.ttf')
    // secondFont = loadFont('/static/the_breakdown.ttf')
}

function setup() {
    background(204)
    x = width / 2
    y = height / 2
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
   
    let numPoints = int(map(mouseX, 0, width, 15, 150));
    let angle = 0;
    let angleStep = 180.0/numPoints;
    
    triangleShape = beginShape(TRIANGLE_STRIP); 
    for (let i = 0; i <= numPoints; i++) {
        let px = x + cos(radians(angle)) * outsideRadius;
        let py = y + sin(radians(angle)) * outsideRadius;
        angle += angleStep;
        vertex(px, py);
        px = x + cos(radians(angle)) * insideRadius;
        py = y + sin(radians(angle)) * insideRadius;
        vertex(px, py); 
        angle += angleStep;
    }
    endShape();
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
  

