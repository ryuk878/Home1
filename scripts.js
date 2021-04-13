const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;

// edge = grootte van penceel
const edge = 40;
let drawing = false;
const mouse = {
  x: null,
  y: null,
};
// muis besturing
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
// richting van particles
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
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    // invullen van kleuren
    const radius = ((-distance / edge + 1) * edge) / 10;
    if (radius > 0) {
      requestAnimationFrame(this.draw.bind(this));
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = "hsl(" + hue + ", 100%, 70%)";
      ctx.stroke();
    }
  }
}
// aantal particles hoe hoger de for loop hoe meer "stekels/particles + kleuren hue++  zorgt voor random kleuren uit particle / hue+= 0.2 zorgt voor snelheid vann de random kleuren"
function branchOut() {
  if (drawing === true) {
    const centerX = mouse.x;
    const centerY = mouse.y;
    for (let i = 0; i < 2; i++) {
      const root = new Root(mouse.x, mouse.y, (hue += 0.2), centerX, centerY);
      root.draw();
    }
  }
}

// knoppen functies
window.addEventListener("mousemove", function () {
  branchOut();
});

window.addEventListener("mousedown", function () {
  if (event.button === 0) {
    drawing = true;
  }
});
window.addEventListener("mouseup", function () {
  drawing = false;
});

window.addEventListener("load", (event) => {
  alert("Klik op je linker muisknop om te tekenen!");
  alert("Gebruik je rechter muisknop om je afbeelding op te slaan");
});
