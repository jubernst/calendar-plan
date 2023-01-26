var now = dayjs();
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var saveBtn = $(".saveBtn");
  saveBtn.on("click", function (event) {
    event.preventDefault();

    // Get the time block containing the button that was clicked
    var timeBlock = $(this.closest(".time-block"));
    var blockId = timeBlock.attr("id");

    // Get the text entered in the textarea
    var input = timeBlock.children("textarea").val();

    // Save the input to local storage under the id name
    localStorage.setItem(blockId, input);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var container = $(".container-fluid");
  // Set the class of each time block
  for (var i = 0; i < container.children().length; i++) {
    var currentBlock = container.children().eq(i);
    var blockHour = dayjs().hour(currentBlock.attr("id").split("-")[1]);

    // Check if the current hour is earlier than the hour of the block
    if (now.isBefore(blockHour, "hour")) {
      currentBlock.addClass("future");
    } else if (now.isSame(blockHour, "hour")) {
      currentBlock.addClass("present");
    } else {
      currentBlock.addClass("past");
    }
  }
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  var currentDay = now.format("dddd, MMMM D");
  $("#currentDay").text(currentDay);
});
