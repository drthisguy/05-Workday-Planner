$(document).ready(function () {
    //date display for the heading.
    $('#currentDay').text(moment().format('dddd MMMM Do'));

    //load schedule from LS and color code time slots.
    getScheduleFromLS();
    colorizor();

    //load schedule from LS
    function getScheduleFromLS() {
        var schedule;
        if (localStorage.getItem("schedule") === null) {
            schedule = [];
        } else {
            schedule = JSON.parse(localStorage.getItem("schedule"));
        }
        $.each(schedule, function (index, item) {
            //populate each slot.
            $('#' + item.time).children('.description').append(item.plan);
            //get clear btns for populated time slots. 
            if (item.plan !== '') {
                clearPlan($('#' + item.time).children('.hour'));
            }
        });
    }

    //store schedule in LS
    function storeScheduleInLS(plan) {
        var newSchedule;
        if (localStorage.getItem("schedule") === null) {
            //add new item to the schedule
            newSchedule = [plan];
        } else {
            newSchedule = JSON.parse(localStorage.getItem("schedule"));

            //check for and remove existing text from LS before replacing it. 
            for (var i = 0; i < newSchedule.length; i++) {
                if (newSchedule[i].time === plan.time) {
                    newSchedule.splice(i, 1);
                }
            }
            newSchedule.push(plan);
        }
        //set back in LS
        localStorage.setItem("schedule", JSON.stringify(newSchedule));
    }

    //color the time slots
    function colorizor() {
        var timeOfDay = moment().hour();
        var timeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];

        $.each(timeSlots, function (index, slot) {

            var hrNum = slot < 13 ? slot : slot - 12;

            if ((timeOfDay > slot)) {
                $('#hour-' + hrNum).children('.description').addClass('past');
            } else if (timeOfDay < slot) {
                $('#hour-' + hrNum).children('.description').addClass('future');
            } else {
                $('#hour-' + hrNum).children('.description').addClass('present');
            }
        });
    }

    //create and handle 'cancel plan' buttons
    function clearPlan(domElement) {
        //clear any existing btn
        $(domElement).children('.clear').remove();

        //create element
        var clearBtn = $('<button>');
        clearBtn.addClass('clear');
        clearBtn.text('Cancel Plan');
        domElement.append(clearBtn);

        //add event listener
        $('.clear').on('click', function (event) {
            $(this).parent('.hour').siblings('.description').empty();
            $(this).parent('.hour').siblings('.saveBtn').click(); //re-save
            event.preventDefault();
            location.reload();                                   
        });
    }

    //save new item event
    $('.saveBtn').on('click', function () {
        var scheduleItem = {
            plan: $(this).siblings('.description').val().trim(),
            time: $(this).parent().attr('id') //this is the hour itself
        };
        var container = $(this).siblings('.hour');

        storeScheduleInLS(scheduleItem);
        clearPlan(container);
    });

});