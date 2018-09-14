const button = document.querySelector('#generate')
const poem = document.querySelector('#poem')
let poems

button.addEventListener('click', () => {
    axios.get('/generate')
    .then((response) => {
        poem.innerText = response.data.poem
    })
})
function preload() {
    return loadJSON('/generate');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#12243E');
    noStroke();
    poems = preload()
    console.log(poems)
  }

function draw() {
    if(poems.poem) {
        text(poems.poem, 10, 10, 500, 80);
        fill(50);
        rect(100, 100, 500, 50);
    }
}
  