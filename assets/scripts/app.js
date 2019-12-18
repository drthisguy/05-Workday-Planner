$(document).ready(function() {
//date display for the heading.
$('#currentDay').text(moment().format('dddd MMMM Do'));

//load schedule from LS and color code time slots.
getScheduleFromLS();
colorizor();

//load schedule from LS
function getScheduleFromLS() {
    $('.description').empty();
  if (localStorage.getItem("schedule") === null) {
    var schedule = [];
  } else {
    schedule = JSON.parse(localStorage.getItem("schedule"));
  }
  $.each(schedule, function (index, item) {
  $(`#${item.time}`).children('.description').append(item.plan);
})}

function storeInLS(plan) {
    
if (localStorage.getItem("schedule") === null) {
    //add new item to the schedule
    var newSchedule = [plan];
} else {
    newSchedule = JSON.parse(localStorage.getItem("schedule"))

//check for and remove existing text from LS before replacing it. 
for (var i = 0; i < newSchedule.length; i++) {
    if (newSchedule[i].time === plan.time) {
        newSchedule.splice(i, 1);  //remove & replace
    }    
}
    newSchedule.push(plan);
}
//set back in LS
localStorage.setItem("schedule", JSON.stringify(newSchedule));    
}

function colorizor() {
    var timeOfDay = moment().hour();
    var timeSlots = [9,10,11,12,13,14,15,16,17];

    $.each(timeSlots, function (index, slot) {

    var hrNum = slot < 13 ? slot : slot - 12;

    if ((timeOfDay > slot)) {
        $('#hour-'+hrNum).children('.description').addClass('past');
    } else if (timeOfDay < slot) {
        $('#hour-'+hrNum).children('.description').addClass('future');
    } else {
        $('#hour-'+hrNum).children('.description').addClass('present');
    }
})};



$('.saveBtn').on('click', function() {
    var scheduleItem  = {
        'plan' : $(this).siblings('.description').val(),
        'time' : $(this).parent().attr('id') //this is the hour itself
    }
    storeInLS(scheduleItem); 
})

})