// I wrap all my JS code inside the .ready method to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(document).ready(function () {
  var todayEl = $("#currentDay");
  var saveBtnEl = $(".saveBtn");
  var mainEl = $("main");
  var descriptionEl = $("textarea");




  // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?

  saveBtnEl.on("click", function (event) { 
    var userInput = event.currentTarget.previousSibling.previousSibling.value;
    var hourSaved = event.currentTarget.parentNode.getAttribute("id");
    console.log(hourSaved)

    if (userInput === " ") {
      
    } else {
      var infoSaved = [{time: hourSaved, todo: userInput}]
      localStorage.setItem("user event", JSON.stringify(infoSaved));
    }
  });


  // This function applies the past, present, or future class to each time block by comparing the id to the current hour. 

  function applyTimeClass() {
    var timeIdEl = $(".time-block");
    var timeNow = dayjs().format("HH");
    for (i = 0; i < timeIdEl.length; i++) {
      hourFromId = timeIdEl[i].getAttribute("id").slice(-2)
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
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // To display the current date and time in the header of the page.
  var now = dayjs().format("dddd") + " " + dayjs().format("MMMM D, YYYY");
  var time = dayjs().format("HH:mm");
  todayEl.text("Today is " + now + ". The time is " + time);
});


