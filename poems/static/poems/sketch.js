axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken' : document.querySelector('[name=csrfmiddlewaretoken]').value
}

let currentPoem = ''
let myFont

const fonts = [
    '/static/AlexBrush-Regular.ttf',
    '/static/the_breakdown.ttf',
    '/static/Charmonman-Regular.ttf',
    '/static/GreatVibes-Regular.ttf',
    '/static/KaushanScript-Regular.ttf',
]

function preload() {
    myFont = loadFont(random(fonts))
}

class Particle {
    constructor (x, y) {
        this.x = x
        this.y = y
        this.xVel = Math.random() 
        this.yVel = Math.random() 
        
        this.angle = Math.random() * 100
        this.time = 0
        this.willDie = (Math.random() * 100)
        
        this.colors = [random(0, 255), random(0, 255), random(0, 255)]
    }

    update() {
        this.x += this.xVel
        this.y += this.yVel
        
        this.time++
        this.angle += 0.1
    }
    
    render() {
        noStroke()
        
        const opacity = map(this.time, this.willDie, 150, 150, 225)
        fill(color(this.colors[0], this.colors[1], this.colors[2], opacity))
        ellipse(this.x, this.y, this.time, this.time)
    }
}

class Button {
    constructor (x, y, width, height, text) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.text = text
    }
    render() {
        rect(this.x, this.y, this.width, this.height, 20)
        stroke(255, 204, 0)
        strokeWeight(3)
        fill(color('magenta'))
        textSize(40)
        text(this.text, this.x, this.y)
    }
    isClicked(callback) {
        if (mouseX >= (this.x) - (this.width / 2) && mouseX <= (this.x) + (this.width / 2) &&
            mouseY >= (this.y) - (this.height / 2) && mouseY <= (this.y) + (this.height / 2))
        {
            callback.call(this)
        }
    }
}

const particles = []
let button

function setup() {
    background(204)
    
    const poem = document.querySelector('#poem')
    if(poem) {
        currentPoem = poem.innerText
    } else {
        loadJSON('/generate', (poems) => {
            currentPoem = poems.poem
        })
    }
    
    const canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent('canvas')
    noStroke()
    rectMode(CENTER)

    button = new Button(windowWidth / 2, windowHeight / 1.33, 200, 50, "Save Poem")


}

function draw() {
    background(color(155, 75, 100))

    if(frameCount % 50 == 0) {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle(random(0, windowWidth), random(0, windowHeight)))
        }
    }
    for (let i = 0; i < particles.length; i++) {
        if (particles[i].time < particles[i].willDie) {
            particles[i].update()
            particles[i].render()
        } else {
            particles.splice(i, 1)
        }
    }
    
    textSize(40)
    textStyle(ITALIC)
    textAlign(CENTER)
    textFont(myFont) 
    if(currentPoem === '') {
        fill(color(255, 255, 255, 128))
        textSize(100)
        text('Is this Poetry?', windowWidth / 2, windowHeight / 4)
    } else {
        fill(245);
        text(currentPoem, windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2)
    }
    
    button.render()
}


function mousePressed() {
    button.isClicked(function() {
        axios.post('/save', {
            poem: currentPoem,
        })
        .then(() => {
            this.text = "Saved!"
        })
    })
}