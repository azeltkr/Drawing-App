function StampTool() {
  this.icon = "assets/stamptool.jpg";
  this.name = "stamptool";

  var cat, dog;
  var imageSelector, sizeSlider, rotationSlider;
  var selectedImage;
  var flipCheckbox;
  var rotationAngle = 0;
  var uploadButton;
  var customImage = null; // Variable to store the custom image

  this.setup = function () {
    cat = loadImage("./assets/cat.png");
    dog = loadImage("./assets/dog.png");
    console.log("in stamp tool setup");
  };
  this.setup();

  this.draw = function () {};

  this.unselectTool = function () {
    console.log("stamp tool is unselected");
    select("#options").html("");
  };

  this.populateOptions = function () {
    console.log("stamp tool is selected");
    createImageSelector();
    createSizeSlider();
    createRotationSlider();
    createFlipCheckbox();
    createUploadButton();
  };

  function createImageSelector() {
    imageSelector = createSelect();
    imageSelector.parent("#options");
    imageSelector.option("Cat");
    imageSelector.option("Dog");
    imageSelector.option("Custom Image");
    imageSelector.changed(mySelectEvent);
    selectedImage = cat; // Default selected image
  }

  function createSizeSlider() {
    var sizeContainer = createDiv();
    sizeContainer.parent("#options");
    sizeContainer.style("display", "flex");
    sizeContainer.style("align-items", "center");

    var sizeLabel = createElement("label", "Size: ");
    sizeLabel.parent(sizeContainer);
    sizeLabel.style("margin-right", "10px");

    sizeSlider = createSlider(50, 200, 100);
    sizeSlider.parent(sizeContainer);
    sizeSlider.style("width", "100px");
  }

  function createRotationSlider() {
    var rotationContainer = createDiv();
    rotationContainer.parent("#options");
    rotationContainer.style("display", "flex");
    rotationContainer.style("align-items", "center");

    var rotationLabel = createElement("label", "Rotation: ");
    rotationLabel.parent(rotationContainer);
    rotationLabel.style("margin-right", "10px");

    rotationSlider = createSlider(0, 360, 0);
    rotationSlider.parent(rotationContainer);
    rotationSlider.style("width", "100px");

    var rotationValue = createElement("span", rotationSlider.value() + "°");
    rotationValue.parent(rotationContainer);
    rotationValue.style("margin-left", "10px");

    rotationAngle = 0;
    rotationSlider.input(function () {
      rotationAngle = rotationSlider.value();
      rotationValue.html(rotationSlider.value() + "°");
    });
  }

  function createFlipCheckbox() {
    flipCheckbox = createCheckbox("Flip Horizontally", false);
    flipCheckbox.parent("#options");
  }

  function createUploadButton() {
    uploadButton = createFileInput(handleFile);
    uploadButton.parent("#options");
    uploadButton.attribute("accept", "image/png");
    uploadButton.hide();
  }

  function handleFile(file) {
    if (file.type === "image") {
      customImage = loadImage(file.data, function (img) {
        console.log("Image loaded");
        customImage = img;
        selectedImage = customImage; // Set selectedImage to customImage once it is loaded
      });
    } else {
      console.log("Not an image file!");
    }
  }

  function mySelectEvent() {
    var imageSelected = imageSelector.value();
    if (imageSelected == "Cat") {
      selectedImage = cat;
      uploadButton.hide();
    } else if (imageSelected == "Dog") {
      selectedImage = dog;
      uploadButton.hide();
    } else if (imageSelected == "Custom Image") {
      uploadButton.show();
      if (customImage) {
        selectedImage = customImage; // Restore the custom image if it exists (saves the current selected image)
      }
    }
  }

  this.mousePressed = function () {
    if (!mouseOnCanvas(canvas)) return;

    var stampSize = sizeSlider.value();
    var stampX = mouseX - stampSize + stampSize / 2;
    var stampY = mouseY - stampSize + stampSize / 2;

    push();
    translate(stampX, stampY);
    rotate(radians(rotationAngle));
    if (flipCheckbox.checked()) scale(-1, 1);
    image(selectedImage, -stampSize / 2, -stampSize / 2, stampSize, stampSize);
    pop();
  };
}
