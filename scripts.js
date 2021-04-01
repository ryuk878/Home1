const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hue = 0;


const edge = 70;
let drawing = false; 
const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

})

class Root {
    constructor(x, y, color, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
    }
    draw() {
        this.speedX += (Math.random() - 0.5) / 1;
        this.speedY += (Math.random() - 0.5) / 1;
        this.x += this.speedX;
        this.y += this.speedY;

        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        const radius = (-distance / edge +1) * edge / 10; 
        if (radius > 0) {
            requestAnimationFrame(this.draw.bind(this));
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.color; 
            ctx.fill(); 
            ctx.strokeStyle = 'hsl(' + hue + ', 100%, 70%)';
            ctx.stroke();
        }
    }
}

function brachOut() {
    if (drawing === true) {
    const centerX = mouse.x;
    const centerY = mouse.y;
    for (let i = 0; i < 2 ; i++){
    const root = new Root(mouse.x, mouse.y, hue++, centerX, centerY); 
    root.draw();
    }
}
}
window.addEventListener('resize', function(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

})

window.addEventListener('mousemove', function(){

    brachOut(); 
});

window.addEventListener('mousedown', function(onclick) {
    drawing = true ;
    
    

}); 

window.addEventListener('mouseup', function(){ 
    drawing = false; 


});

function generateRandomColor()
{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
    
}

