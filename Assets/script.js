$(document).ready(function() {

  // Declaration and assignment code
  var hourSlots, timeSlots, row, col1, col8, textarea, saveCol1, icon;
  // current hour in 0-23 format
  var currentHour = moment().hour();
  var hours = [];

  // loading current day and date
  $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

  // generating HTML - rows and columns (hour time slots, textareas, save buttons)
  for (i = 0; i < 15; i++) {
    row = $("<div>");
    row.addClass("row");
    // row.addClass("time-block");
    $(".container").append(row);
    
    col1 = $("<div>");
    col1.addClass("col-sm-1");
    col1.addClass("hour");
    row.append(col1);

    col8 = $("<div>");
    col8.addClass("col-sm-8");
    row.append(col8);

    textarea = $("<textarea>");
    textarea.addClass("description");
    textarea.attr("rows", "1");
    col8.append(textarea);

    saveCol1 = $("<div>");
    saveCol1.addClass("col-sm-1");
    saveCol1.addClass("saveBtn");
    row.append(saveCol1);
    icon = $("<i>");
    icon.addClass("far");
    icon.addClass("fa-save");
    saveCol1.append(icon);
  }
  // adding a dashed bottom border on the last row
  var hourLast = $(".hour").last();
  hourLast.addClass(" hour-last"); 

  // getting some elements into arrays...
  hourSlots = $(".hour");
  timeSlots = $(".col-sm-8");
  
  // ...filling an array of display hours...
  for (var h = 7; h < 22; h++) {  
    var timeSlot = moment().hour(h).format("hA");
    hours.push(timeSlot);
  }
  // ...and filling in the schedule time slots based on the array
  for (j = 0; j < 15; j++) {
    hourSlots[j].innerHTML = hours[j];
  }

  // making time comparisons to assign classes
  for (var l = 7; l < 22; l++) {  
    // each hour is parsed into a number 0-23
    var newHour = parseInt(moment().hour(l).format("HH"));
    // assigning .past/.present/.future classes 
    if (currentHour > newHour) {
      $(timeSlots[l-7]).addClass("past");
    } else if (currentHour == newHour) {
      $(timeSlots[l-7]).addClass("present");
    } else if (currentHour < newHour) {
      $(timeSlots[l-7]).addClass("future");
    }
  }

  // list of tasks saved in local storage, if any
  var itemList = JSON.parse(localStorage.getItem("Scheduled Items")) || "[]";

  // loading saved tasks into the schedule 
  if (itemList !== "[]") {
    for (m = 0; m < itemList.length; m++) {
      for (n = 0; n < hourSlots.length; n++) {
        if (itemList[m].Time === hourSlots[n].innerHTML) {
          $(hourSlots[n]).parent(".row").children(".col-sm-8").children(".description").val(itemList[m].Task);
        }
      }
    }
  }

  //saving the input
  $(".saveBtn").on("click", function() {
    var getInput = $(this).parent(".row").children(".col-sm-8").children(".description").val();
    var thisHour = $(this).parent(".row").children(".hour").text();
    var schedItem = {Time: thisHour, Task: getInput};
    itemList = localStorage.getItem("Scheduled Items") || "[]"; 
    itemList = [...JSON.parse(itemList), schedItem];
    localStorage.setItem("Scheduled Items", JSON.stringify(itemList)); 
  });        
  
});