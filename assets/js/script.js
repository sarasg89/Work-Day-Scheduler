// I wrap all my JS code inside the .ready method to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(document).ready(function () {
  var todayEl = $("#currentDay");
  var saveBtnEl = $(".saveBtn");
  var mainEl = $("main");
  var timeIdEl = $(".time-block");

  // This an event listener for the save button. When the button is clicked, the user's input is saved into a variable. Both the user's input and the time of that text block are saved to local storage.
  saveBtnEl.on("click", function (event) {
    // <i> clicked -> <button> -> <textarea> -> value entered by user
    var userInput = event.currentTarget.previousSibling.previousSibling.value;
    // <button> clicked -> parent <div> -> id
    var hourSaved = event.currentTarget.parentNode.getAttribute("id");
    // This if statement allows new data to be added to the existing "user schedule" objet in local storage. Without these 4 lines of code, any time the save button is clicked, it deletes the previous data.
    var infoSaved = []
    var alreadyInStorage = localStorage.getItem("user schedule")
    if (alreadyInStorage !== null) {
      infoSaved = JSON.parse(alreadyInStorage);
    }

    
    infoSaved.push({ time: hourSaved, todo: userInput });
    localStorage.setItem("user schedule", JSON.stringify(infoSaved));

  });



  // This function applies the past, present, or future class to each time block by comparing the id to the current hour. 
  function applyTimeClass() {
    // Using the dayjs() format, the variable is equal to the first 2 digits of the current time in 24 hour format
    var timeNow = dayjs().format("HH");

    // This for loop will iterate through all instances of timeIdEl, because this variable contains an array
    for (i = 0; i < timeIdEl.length; i++) {
      // For the id "hour-xx" we use the .slice method to retrieve the last 2 characters
      var hourFromId = timeIdEl[i].getAttribute("id").slice(-2)

      // Based on the current time, different classes are applied to display if that time block is in the past (grey), present (red) or future (green)
      // The classes already applied in HTML must NOT be overwritten, otherwise the Bootstrap styling won't render correctly
      if (hourFromId < timeNow) {
        oldClass = timeIdEl[i].children[1].getAttribute("class");
        newClass = oldClass + " past"
        timeIdEl[i].children[1].setAttribute("class", newClass);
      } else if (hourFromId === timeNow) {
        oldClass = timeIdEl[i].children[1].getAttribute("class");
        newClass = oldClass + " present"
        timeIdEl[i].children[1].setAttribute("class", newClass);
      } else {
        oldClass = timeIdEl[i].children[1].getAttribute("class");
        newClass = oldClass + " future"
        timeIdEl[i].children[1].setAttribute("class", newClass);
      }
    };
  };



  // This function is being called below and will run as soon as the page loads. It will look for any information already saved in local storage and display it in the correct time slots
  function init() {
    // Calling the function to apply the past, present and future classes
    applyTimeClass();

    // Retrieve any saved information from local storage
    var alreadySaved = localStorage.getItem("user schedule")
    if (alreadySaved !== null) {
      alreadySaved = JSON.parse(alreadySaved);
    } else {
      return;
    };

    // This for loop will iterate through all instances of timeIdEl, because this variable contains an array
    for (i = 0; i < timeIdEl.length; i++) {
      var hourFromId = timeIdEl[i].getAttribute("id");
      // For every object saved in local storage, retrieve the time and the todo item
      for (j = 0; j < alreadySaved.length; j++) {
        var timeSaved = alreadySaved[j].time;
        var todoSaved = alreadySaved[j].todo;
        if (hourFromId === timeSaved) {
          timeIdEl[i].children[1].value = todoSaved;
        }
      };
    };
  };

  init();


  // To display the current date and time in the header of the page.
  var now = dayjs().format("dddd") + " " + dayjs().format("MMMM D, YYYY");
  var time = dayjs().format("HH:mm");
  todayEl.text("Today is " + now + ". The time is " + time);

});




