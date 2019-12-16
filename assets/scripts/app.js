$(document).ready(function() {
//date display for the heading.
$('#currentDay').text(moment().format('dddd MMMM Do'));

//load schedule from LS
getScheduleFromLS();

//load schedule from LS
function getScheduleFromLS() {
  var schedule;
  if (localStorage.getItem("schedule") === null) {
    schedule = [];
  } else {
    schedule = JSON.parse(localStorage.getItem("schedule"));
  }
console.log(schedule);

  $.each(schedule, function (index, item) {
  $(`#${item.time}`).children('.description').append(item.plan);
        
})}

function storeInLS(plan) {
    var schedule;
    if (localStorage.getItem("schedule") === null) {
      schedule = [];
    } else {
      schedule = JSON.parse(localStorage.getItem("schedule"))
    }
    //add game to list
    schedule.push(plan);
    //set back in LS
    localStorage.setItem("schedule", JSON.stringify(schedule));

 };

$('.saveBtn').on('click', function() {
    var scheduleItem  = {
        'plan' : $(this).siblings('.description').val(),
        'time' : $(this).parent().attr('id') //this is the hour itself
    }
    storeInLS(scheduleItem);

    console.log(scheduleItem);
    
})

})