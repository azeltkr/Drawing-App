function FloodFillTool() {
  this.icon = "assets/fill.jpg";
  this.name = "floodfilltool";

  this.draw = function () {};

  this.mousePressed = function () {
    if (!colourP || !colourP.selectedColour) {
      console.error("No selected color in ColourPalette.");
      return;
    }

    if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height) {
      return;
    }

    let fillColor = colorToRGBA(colourP.selectedColour);
    let seed = createVector(floor(mouseX), floor(mouseY));

    floodFill(seed, fillColor);
  };

  function floodFill(seed, fillColor) {
    loadPixels();

    let seedColor = getColorAt(seed);

    if (!arrayEquals(seedColor, fillColor)) {
      let queue = [seed];

      while (queue.length) {
        let current = queue.shift();
        let currentColor = getColorAt(current);

        if (!arrayEquals(currentColor, seedColor)) {
          continue;
        }

        setColorAt(current, fillColor);
        queue.push(...getNeighbors(current));
      }

      updatePixels();
    }
  }

  function getColorAt(v) {
    let index = 4 * (width * v.y + v.x);
    return [
      pixels[index],
      pixels[index + 1],
      pixels[index + 2],
      pixels[index + 3],
    ];
  }

  function setColorAt(v, color) {
    let index = 4 * (width * v.y + v.x);
    pixels[index] = color[0];
    pixels[index + 1] = color[1];
    pixels[index + 2] = color[2];
    pixels[index + 3] = color[3];
  }

  function getNeighbors(v) {
    let { x, y } = v;
    let neighbors = [];
    if (x > 0) neighbors.push(createVector(x - 1, y));
    if (x < width - 1) neighbors.push(createVector(x + 1, y));
    if (y > 0) neighbors.push(createVector(x, y - 1));
    if (y < height - 1) neighbors.push(createVector(x, y + 1));
    return neighbors;
  }

  function arrayEquals(a, b) {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  }

  function colorToRGBA(colorString) {
    let c = color(colorString);
    return [red(c), green(c), blue(c), alpha(c)];
  }
}
