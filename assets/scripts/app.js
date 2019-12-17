$(document).ready(function() {
//date display for the heading.
$('#currentDay').text(moment().format('dddd MMMM Do'));

var schedule;
//load schedule from LS
getScheduleFromLS();

//load schedule from LS
function getScheduleFromLS() {
  if (localStorage.getItem("schedule") === null) {
    schedule = [];
  } else {
    schedule = JSON.parse(localStorage.getItem("schedule"));
  }
  $.each(schedule, function (index, item) {
  $(`#${item.time}`).children('.description').append(item.plan);
})}

function storeInLS(plan) {
    if (localStorage.getItem("schedule") === null) {
      schedule = [];
    } else {
      schedule = JSON.parse(localStorage.getItem("schedule"))
    }
    //add game to list
    schedule.push(plan);
    //set back in LS
    localStorage.setItem("schedule", JSON.stringify(schedule));
 }

function colorizor() {
    var timeOfDay = moment().hour();
    console.log(timeOfDay);

    $.each(schedule, function (index, item) {
        var timeSlot = index + 9
        console.log(schedule);
        
        if ((timeOfDay > timeSlot)) {
            $(`#${item.time}`).children('.description').addClass('past');
        } else if (timeOfDay < timeSlot) {
            $(`#${item.time}`).children('description').attr('.future');
        } else {
            ;
        }
})};


colorizor();
$('.saveBtn').on('click', function() {
    var scheduleItem  = {
        'plan' : $(this).siblings('.description').val(),
        'time' : $(this).parent().attr('id') //this is the hour itself
    }
    storeInLS(scheduleItem); 
})

})