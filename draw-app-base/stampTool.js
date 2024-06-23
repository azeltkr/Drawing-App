function StampTool() {
  // Set icon and name for the object
  this.icon = "assets/stamptool.jpg";
  this.name = "stamptool";

  // Variables for images and UI elements
  var cat, dog;
  var imageSelector, sizeSlider, rotationSlider;
  var selectedImage;
  var flipCheckbox;

  // Rotation angle variable
  var rotationAngle = 0;

  // Setup function to load images
  this.setup = function () {
    cat = loadImage("./assets/cat.png");
    dog = loadImage("./assets/dog.png");
    console.log("in stamp tool setup");
  };
  this.setup(); // Call setup when object is created

  // Empty draw function
  this.draw = function () {};

  // Function to unselect the tool
  this.unselectTool = function () {
    console.log("stamp tool is unselected");
    // Clear the options when unselecting the tool
    select("#options").html("");
  };

  // Function to populate options when tool is selected
  this.populateOptions = function () {
    console.log("stamp tool is selected");

    // Create a dropdown menu for image selection
    imageSelector = createSelect();
    imageSelector.parent("#options");
    imageSelector.option("Cat");
    imageSelector.option("Dog");
    imageSelector.changed(this.mySelectEvent);
    selectedImage = cat; // Default selected image

    // Create a container for the size slider and its label
    var sizeContainer = createDiv();
    sizeContainer.parent("#options");
    sizeContainer.style("display", "flex");
    sizeContainer.style("align-items", "center");

    // Label for size slider
    var sizeLabel = createElement("label", "Size: ");
    sizeLabel.parent(sizeContainer);
    sizeLabel.style("margin-right", "10px"); // Adds  margin between label and slider

    // Create a slider for size adjustment
    sizeSlider = createSlider(50, 200, 100);
    sizeSlider.parent(sizeContainer);
    sizeSlider.style("width", "100px");

    //Create a container for the rotation slider and display
    var rotationContainer = createDiv();
    rotationContainer.parent("#options");
    rotationContainer.style("display", "flex");
    rotationContainer.style("align-items", "center");

    //Label for rotation slider
    var rotationLabel = createElement("label", "Rotation: ");
    rotationLabel.parent(rotationContainer);
    rotationLabel.style("margin-right", "10px"); // Adds  margin between label and slider

    //Create a slider for  rotation adjustment
    rotationSlider = createSlider(0, 360, 0);
    rotationSlider.parent(rotationContainer);
    rotationSlider.style("width", "100px");

    //Display element for rotation value
    var rotationValue = createElement("span", rotationSlider.value() + "°");
    rotationValue.parent(rotationContainer);
    rotationValue.style("margin-left", "10px");

    // Event listener for rotation slider
    rotationAngle = 0; // Resets rotationAngle to zero when switch out to other tools
    rotationSlider.input(function () {
      rotationAngle = rotationSlider.value();
      var degrees = rotationSlider.value() + "°"; //Adds degrees symbole
      rotationValue.html(degrees); //Update the displayed value w degrees symbol
    });

    // Create checkbox for flip option
    flipCheckbox = createCheckbox("Flip Horizontally", false);
    flipCheckbox.parent("#options");
  };

  // Event handler for image selection
  this.mySelectEvent = function () {
    var imageSelected = imageSelector.value();
    if (imageSelected == "Cat") {
      selectedImage = cat;
    } else if (imageSelected == "Dog") {
      selectedImage = dog;
    }
  };

  // FUnction to handle mouse press event (stamp placement)
  this.mousePressed = function () {
    if (!mouseOnCanvas(canvas)) {
      return;
    }
    var stampSize = sizeSlider.value();
    var stampX = mouseX - stampSize + stampSize / 2;
    var stampY = mouseY - stampSize + stampSize / 2;

    push();
    translate(stampX, stampY);
    rotate(radians(rotationAngle));

    if (flipCheckbox.checked()) {
      scale(-1, 1); // Flip horizontally
    }
    image(selectedImage, -stampSize / 2, -stampSize / 2, stampSize, stampSize);
    pop();
  };
}
