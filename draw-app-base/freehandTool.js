function FreehandTool() {
  // Set icon and name for the object
  this.icon = "assets/freehand.jpg";
  this.name = "freehand";

  // Store previous mouse coordinates
  var previousMouseX = -1;
  var previousMouseY = -1;

  // Slider for stroke weight
  var strokeWeightSlider;

  // Draw function to handle drawing lines
  this.draw = function () {
    if (!mouseOnCanvas(canvas)) {
      return;
    }

    // Set stroke weight based on slider value
    strokeWeight(strokeWeightSlider.value());

    if (mouseIsPressed) {
      if (previousMouseX === -1) {
        // First click, initialize previous position
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      } else {
        // Draw a line from previous position to current position
        line(previousMouseX, previousMouseY, mouseX, mouseY);
        // Update previous position to current position
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
    } else {
      // Reset previous position when mouse is released
      previousMouseX = -1;
      previousMouseY = -1;
    }
  };

  // Method called when this tool is selected
  this.populateOptions = function () {
    console.log("Freehand tool selected");

    // Create a container for the slider and label
    var sliderContainer = createDiv();
    sliderContainer.parent("#options");

    // Label for stroke weight slider
    var sliderLabel = createElement("label", "Stroke Weight: ");
    sliderLabel.parent(sliderContainer);

    // Create the slider for stroke weight adjustment
    strokeWeightSlider = createSlider(1, 10, 1); // Adjust range and default value as needed
    strokeWeightSlider.parent(sliderContainer);
  };

  // Method called when this tool is unselected
  this.unselectTool = function () {
    console.log("Freehand tool unselected");
    // Clear the options when unselecting the tool
    select("#options").html("");
  };

  // Helper function to check if mouse is within canvas boundaries
  function mouseOnCanvas(canvas) {
    return (
      mouseX >= 0 &&
      mouseX <= canvas.width &&
      mouseY >= 0 &&
      mouseY <= canvas.height
    );
  }
}
