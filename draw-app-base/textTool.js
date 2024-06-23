function TextTool() {
  // Set icon and name for the tool
  this.icon = "assets/text.jpg";
  this.name = "texttool";

  // Text properties
  var textContent = "";
  var textSizeSlider;
  var textRotationSlider;

  // Coordinates for stamping text
  var stampX = 100; // Default position for stamping text
  var stampY = 100;
  var stampTextFlag = false; // Flag to control stamping on mouse click

  // Method to handle mouse press event (for stamping text)
  this.mousePressed = function () {
    if (mouseOnCanvas(canvas)) {
      // Stamp text only if there's content
      if (textContent) {
        stampX = mouseX; // Set stamp position to current mouse position
        stampY = mouseY;
        stampTextFlag = true; // Set flag to true to stamp text
      }
    }
  };

  // Draw method to render text on canvas (stamped once)
  this.draw = function () {
    if (stampTextFlag) {
      push();
      translate(stampX, stampY); // Position text at stamp coordinates
      rotate(radians(textRotationSlider.value())); // Rotate text based on slider
      scale(textSizeSlider.value() / 10); // Scale text size based on slider

      fill(colourP.selectedColour); // Fill with colorpalette color
      textSize(20); // Fixed size for drawing the text

      // Draw the text with fill applied
      text(textContent, 0, 0); // Draw the text at (0, 0) relative to translate

      pop(); // Restore transformation matrix

      // Reset flag after stamping text
      stampTextFlag = false;
    }
  };

  // Method to populate options for text tool in GUI
  this.populateOptions = function () {
    console.log("Text tool selected");

    // Clear existing options
    select("#options").html("");

    // Container for options
    var optionsContainer = createDiv();
    optionsContainer.parent("#options");

    // Text input field
    var inputLabel = createElement("label", "Text:");
    inputLabel.style("margin-right", "10px");
    inputLabel.parent(optionsContainer);
    var inputField = createInput(textContent, "text");
    inputField.parent(optionsContainer);
    inputField.input(function () {
      textContent = this.value();
    });

    // Slider for text size
    var sizeContainer = createDiv();
    sizeContainer.parent(optionsContainer);
    var sizeLabel = createElement("label", "Text Size:");
    sizeLabel.style("margin-right", "10px");
    sizeLabel.parent(sizeContainer);
    textSizeSlider = createSlider(5, 50, 20); // Range and default value
    textSizeSlider.parent(sizeContainer);

    // Slider for text rotation
    var rotationContainer = createDiv();
    rotationContainer.parent(optionsContainer);
    var rotationLabel = createElement("label", "Text Rotation:");
    rotationLabel.style("margin-right", "10px");
    rotationLabel.parent(rotationContainer);
    textRotationSlider = createSlider(0, 360, 0); // Range and default value
    textRotationSlider.parent(rotationContainer);

    // Display element for rotation value
    var rotationValue = createElement("span", textRotationSlider.value() + "°");
    rotationValue.parent(rotationContainer);
    rotationValue.style("margin-left", "10px");

    // Event listener for rotation slider
    textRotationSlider.input(function () {
      var degrees = textRotationSlider.value() + "°"; // Adds degrees symbol
      rotationValue.html(degrees); // Update the displayed value with degrees symbol
    });
  };

  // Method to unselect the text tool
  this.unselectTool = function () {
    console.log("Text tool unselected");
    select("#options").html(""); // Clear options when unselected
  };

  // Helper function to check if mouse pointer is within canvas
  function mouseOnCanvas(canvas) {
    return (
      mouseX >= 0 &&
      mouseX <= canvas.width &&
      mouseY >= 0 &&
      mouseY <= canvas.height
    );
  }
}
