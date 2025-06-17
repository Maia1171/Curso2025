let seedY = 0;
let stage = 0;
let growHeight = 10;
let fruits = [];
let basket = { x: 260, y: 330, w: 80, h: 45 };

function setup() {
  createCanvas(600, 400);
  frameRate(30);
}

function draw() {
  background(220);

  // Desenha o solo
  fill(150, 80, 40);
  rect(0, 350, width, 50);

  // Desenha a cesta
  drawBasket();

  if (stage === 0) {
    // Semente caindo
    drawSeed(seedY);
    seedY += 2;
    if (seedY >= 340) {
      stage = 1;
    }
  } else if (stage === 1) {
    // Broto crescendo
    drawStem(growHeight);
    growHeight += 2;
    if (growHeight >= 100) {
      stage = 2;
    }
  } else if (stage === 2) {
    // Planta madura com frutas
    drawStem(100);
    drawLeaves();
    if (frameCount % 30 === 0 && fruits.length < 5) {
      fruits.push({ x: 300, y: 250, falling: true });
    }
    drawFruits();
  }
}

function drawSeed(y) {
  fill(150, 75, 0);
  ellipse(300, y, 10, 15);
}

function drawStem(h) {
  stroke(34, 139, 34);
  strokeWeight(4);
  line(300, 350, 300, 350 - h);
  noStroke();
}

function drawLeaves() {
  fill(34, 139, 34);
  ellipse(290, 250, 20, 10);
  ellipse(310, 250, 20, 10);
}

function drawFruits() {
  fill(255, 0, 0);
  for (let f of fruits) {
    if (f.falling) {
      f.y += 3;
      if (f.y >= basket.y - 10 && f.x > basket.x && f.x < basket.x + basket.w) {
        f.falling = false;
        f.y = basket.y - 5;
      }
    }
    ellipse(f.x, f.y, 12, 12);
  }
}

function drawBasket() {
  fill(160, 82, 45);
  rect(basket.x, basket.y, basket.w, basket.h, 10);
}