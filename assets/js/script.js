// I wrap all my JS code inside the .ready method to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(document).ready(function () {
  var todayEl = $("#currentDay");
  var saveBtnEl = $(".saveBtn");
  var mainEl = $("main");
  var descriptionEl = $("textarea");

  // This an event listener for the save button. When the button is clicked, the user's input is saved into a variable. Both the user's input and the time of that text block are saved to local storage.

  saveBtnEl.on("click", function (event) { 
    // <i> clicked -> <button> -> <textarea> -> value entered by user
    var userInput = event.currentTarget.previousSibling.previousSibling.value;
    // <button> clicked -> parent <div> -> id
    var hourSaved = event.currentTarget.parentNode.getAttribute("id");
    console.log(hourSaved);

    if (userInput === " ") {
      return;
    } else {
      var infoSaved = [{time: hourSaved, todo: userInput}]
      localStorage.setItem("user event", JSON.stringify(infoSaved));
    }
  });


  // This function applies the past, present, or future class to each time block by comparing the id to the current hour. 

  function applyTimeClass() {
    // This variable uses JQUERY to select every element with a class of time-block, returning an array
    var timeIdEl = $(".time-block");
    // Using the dayjs() format, the variable is equal to the first 2 digits of the current time in 24 hour format
    var timeNow = dayjs().format("HH");

    // This for loop will iterate through all instances of timeIdEl, because this variable contains an array
    for (i = 0; i < timeIdEl.length; i++) {
      // For the id "hour-xx" we use the .slice method to retrieve the last 2 characters
      hourFromId = timeIdEl[i].getAttribute("id").slice(-2)

      // Based on the current time, different classes are applied to display if that time block is in the past (grey), present (red) or future (green)
      // The classes already applied in HTML must NOT be overwritten, otherwise the Bootstrap styling won't render correctly
      if (hourFromId < timeNow) {
        oldClass = descriptionEl[i].getAttribute("class");
        newClass = oldClass + " past"
        descriptionEl[i].setAttribute("class", newClass);
      } else if (hourFromId === timeNow) {
        oldClass = descriptionEl[i].getAttribute("class");
        newClass = oldClass + " present"
        descriptionEl[i].setAttribute("class", newClass);
      } else {
        oldClass = descriptionEl[i].getAttribute("class");
        newClass = oldClass + " future"
        descriptionEl[i].setAttribute("class", newClass);
      }
    };
  };

  applyTimeClass();


  //
  // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?

  // This function is being called below and will run as soon as the page loads. It will look for any information already saved in local storage and display it in the correct time slots
  function init( {



  })



  // To display the current date and time in the header of the page.
  var now = dayjs().format("dddd") + " " + dayjs().format("MMMM D, YYYY");
  var time = dayjs().format("HH:mm");
  todayEl.text("Today is " + now + ". The time is " + time);
});


