function FloodFillTool() {
  //Set icon and name for the tool
  this.icon = "assets/fill.jpg";
  this.name = "floodfilltool";

  //Function to handle the mpuse press event (trigger flood fill)
  this.mousePressed = function () {
    if (mouseOnCanvas(canvas)) {
      floodFill(mouseX, mouseY, colourP.selectedColour);
    }
  };

  this.draw = function () {};

  //Flood fill algorithm
  function floodFill(x, y, fillColour) {
    let targetColour = get(x, y);

    if (coloursMatch(targetColour, fillColour)) {
      return; //Checks if colour of canvas where mouse is on matches the current selected colour from the palette (exit early)
    }

    let pixelStack = [[x, y]];
    while (pixelStack.length > 0) {
      let newPos = pixelStack.pop();
      let x = newPos[0];
      let y = newPos[1];

      let currentColour = get(x, y);
      if (coloursMatch(currentColour, targetColour)) {
        set(x, y, fillColour);

        pixelStack.push([x + 1, y]); //fill to the east
        pixelStack.push([x - 1, y]); //fill to the west
        pixelStack.push([x, y + 1]); //fill to the south
        pixelStack.push([x, y - 1]); //fill to the north
      }
    }
    updatePixels(); //Apply flood fill changes to the canvas display
  }

  //helper function to compare colours
  function coloursMatch(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }

  //helper function to check if the mouse pointer is within canvas
  function mouseOnCanvas(canvas) {
    return (
      mouseX >= 0 &&
      mouseX <= canvas.width &&
      mouseY >= 0 &&
      mouseY <= canvas.height
    );
  }
}
