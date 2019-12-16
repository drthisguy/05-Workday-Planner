$(document).ready(function() {

//load schedule from LS
function getSchedule() {
  var schedule;
  if (localStorage.getItem("schedule") === null) {
    schedule = [];
  } else {
    schedule = JSON.parse(localStorage.getItem("schedule"));
  }
console.log(schedule);

    // $.each(schedule, function()

  $.each(schedule, function (index, value) {
//   $(`.description`).append(value.plan);
  $(`#${value.time}`).children('.description').append(value.plan);
  console.log($(`#${value.time}`).children('.description'));
  
        
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

getSchedule();

$('.saveBtn').on('click', function() {
    var scheduleItem  = {
        'plan' : $(this).siblings('.description').val(),
        'time' : $(this).parent().attr('id') //this is the hour itself
    }

  
    storeInLS(scheduleItem);

    console.log(scheduleItem);
    
})
$('#currentDay').text(moment().format('dddd MMMM Do'));

})