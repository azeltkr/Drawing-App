function EraserTool() {
  // Set icon and name for the object
  this.icon = "assets/eraser.jpg";
  this.name = "erasertool";

  // Variables to store the previous mouse coordinates
  var previousMouseX = -1;
  var previousMouseY = -1;

  // Variable to hold the slider for eraser size
  var eraserSlider;

  // Populate options when tool is selected
  this.populateOptions = function () {
    console.log("eraser tool is selected");

    // Create a container for eraser size slider and label
    var eraserContainer = createDiv();
    eraserContainer.parent("#options");
    eraserContainer.style("display", "flex");
    eraserContainer.style("align-items", "center");

    // Label for eraser slider
    var eraserLabel = createElement("label", "Eraser Size: ");
    eraserLabel.parent(eraserContainer);
    eraserLabel.style("margin-right", "10px");

    // Create a slider for size adjustment
    eraserSlider = createSlider(10, 100, 20);
    eraserSlider.parent(eraserContainer);
    eraserSlider.style("width", "100px");
  };

  // Function to unselect the tool
  this.unselectTool = function () {
    console.log("eraser tool is unselected");
    // Clear the options when unselecting the tool
    select("#options").html("");
  };

  // Draw function for continuous erasing
  this.draw = function () {
    if (mouseIsPressed && mouseOnCanvas(canvas)) {
      erase(mouseX, mouseY, eraserSlider.value());
    }
  };

  // Custom erasing function
  function erase(x, y, size) {
    fill(255); // Assuming the background is white
    noStroke();
    ellipse(x, y, size, size);
  }

  //Helper functions to check if mouse pointer is within the canvas boundary
  function mouseOnCanvas(canvas) {
    return (
      mouseX >= 0 &&
      mouseX <= canvas.width &&
      mouseY >= 0 &&
      mouseY <= canvas.height
    );
  }
}
