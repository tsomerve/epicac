const button = document.querySelector('#generate')
const poem = document.querySelector('#poem')

button.addEventListener('click', () => {
    axios.get('/generate')
    .then((response) => {
        poem.innerText = response.data.poem
    })
})

function setup() {
    const canvas = createCanvas(500, 500)
    canvas.parent('canvas')
    button = createButton("Is this Poetry?");

    background(120, 50, 255);
}

function mousePressed() {
    background(random(200));

}