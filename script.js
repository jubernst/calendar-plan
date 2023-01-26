// Get the current time
var now = dayjs();

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add listener to save buttons that saves input to local storage on click
  var saveBtn = $(".saveBtn");
  saveBtn.on("click", function (event) {
    event.preventDefault();

    // Get the time block containing the button that was clicked
    var timeBlock = $(this.closest(".time-block"));

    // Get the text entered in the textarea
    var input = timeBlock.children("textarea").val();
    var blockId = timeBlock.attr("id");

    // Save the input to local storage under the id name
    localStorage.setItem(blockId, input);
  });

  // Loop through each time block
  var container = $(".container-fluid");
  for (var i = 0; i < container.children().length; i++) {
    var currentBlock = $(container.children().eq(i));
    var timeId = currentBlock.attr("id");
    var blockHour = dayjs().hour(timeId.split("-")[1]);

    // Check the current hour against the hour of the block
    // and set the time class accordingly
    if (now.isBefore(blockHour, "hour")) {
      currentBlock.addClass("future");
    } else if (now.isSame(blockHour, "hour")) {
      currentBlock.addClass("present");
    } else {
      currentBlock.addClass("past");
    }

    // If there is input saved for this block in localStorage, set that input as the text
    var savedInput = localStorage.getItem(timeId);
    if (savedInput != null) {
      currentBlock.children("textarea").val(savedInput);
    } else {
      // If nothing has been saved, set the text to be empty
      currentBlock.children("textarea").val("");
    }
  }

  // Display the current date in the header of the page.
  var currentDay = now.format("dddd, MMMM D");
  $("#currentDay").text(currentDay);
});
