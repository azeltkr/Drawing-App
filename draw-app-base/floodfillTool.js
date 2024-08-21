function FloodFillTool() {
  this.icon = "assets/fill.jpg";
  this.name = "floodfilltool";

  this.draw = function () {};

  //Handle mouse press events
  this.mousePressed = function () {
    //Ensure there is a valid color selected in the colour palette
    if (!colourP || !colourP.selectedColour) {
      console.error("No selected color in ColourPalette.");
      return;
    }
    //Checks if the mouse is within canvas boundaries
    if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height) {
      return;
    }
    //Converts selected color to R,G,B,A format
    let fillColor = colorToRGBA(colourP.selectedColour);
    //Create a vector for the starting point (seed) of the flood fill
    let seed = createVector(floor(mouseX), floor(mouseY));

    //Perform flood fill algorithm
    floodFill(seed, fillColor);
  };

  //Flood fill algorithm
  function floodFill(seed, fillColor) {
    loadPixels(); //Loads pixel data into pixels[] array

    //Get the color of the seed pixel
    let seedColor = getColorAt(seed);

    //If the fill color is the same as the seed color, do nothing
    if (!arrayEquals(seedColor, fillColor)) {
      let queue = [seed]; //Start the queue with the seed pixel

      //Process pixels in the queue
      while (queue.length) {
        let current = queue.shift(); //Get the next pixel from the queue
        let currentColor = getColorAt(current); //Get the color of the current pixel

        //If the current pixel's color does not match the seed color, skip it
        if (!arrayEquals(currentColor, seedColor)) {
          continue;
        }

        //Set the current pixel to the fill color
        setColorAt(current, fillColor);
        //Add neighboring pixels to the queue
        queue.push(...getNeighbors(current));
      }

      updatePixels(); //Update the canvas with the new pixel data
    }
  }

  //Retrieves the R,G,B,A color of a specific pixel
  function getColorAt(v) {
    let index = 4 * (width * v.y + v.x); //Calculate the index in the Pixels arraty
    return [
      pixels[index], //Red
      pixels[index + 1], //Green
      pixels[index + 2], //Blue
      pixels[index + 3], //Alpha
    ];
  }

  //Sets the R,G,B,A color of a specific pixel
  function setColorAt(v, color) {
    let index = 4 * (width * v.y + v.x);
    pixels[index] = color[0];
    pixels[index + 1] = color[1];
    pixels[index + 2] = color[2];
    pixels[index + 3] = color[3];
  }

  //Retrieves the neighboring pixels of a given pixel
  function getNeighbors(v) {
    let { x, y } = v;
    let neighbors = [];
    //Checks each neighbor and adds if within canvas
    if (x > 0) neighbors.push(createVector(x - 1, y));
    if (x < width - 1) neighbors.push(createVector(x + 1, y));
    if (y > 0) neighbors.push(createVector(x, y - 1));
    if (y < height - 1) neighbors.push(createVector(x, y + 1));
    return neighbors;
  }

  //Compares to arrays to check if they are equal
  function arrayEquals(a, b) {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  }

  //Converts a color string to an R,G,B,A array
  function colorToRGBA(colorString) {
    let c = color(colorString);
    return [red(c), green(c), blue(c), alpha(c)];
  }
}
