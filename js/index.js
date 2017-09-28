$(document).ready(function(){
    //HEADER MAX HEIGHT
    let windowHeight = $(window).height();
    $('.header-hero').height(windowHeight);

    // CALENDAR CONFIGURATION === FUNCTIONS
    const selectedDate = { firstDay: null, lastDay: null, month: new Date().getMonth() };
    const loadCalendar = (optDays) => {//LOAD CALENDAR
        $('#calendarIO').calendarIO({ 
            nav: true, 
            selectable: true, 
            firstDay: optDays.firstDay, 
            lastDay: optDays.lastDay,
            month: optDays.month
        },function(data){
            console.log(data);
        });
    };
    const closeWindowCalendar = () => {//CLOSE WINDOW CALENDAR WHEN WAS CHOSE
        $('.calendar-window').hide();
        $('#calendar_checkin').remove();
        $('#calendar_checkout').remove();
    };
    const calendarWindow = (conf,callback) => {// CHECKIN & CHECKOUT WINDOW
        conf.btn.on('click',function(){
            $('.calendar-window').fadeIn().append('<div id="'+conf.calendar+'"></div>');
            $('#'+conf.calendar).calendarIO({ nav: true, selectable: true },function(data){
                if(callback){
                    callback(data);
                }
            });
            
        })
    }


    loadCalendar(selectedDate);//INIT CALENDAR

    //EVENTS
    $('.close-wd').on('click',function(){//CLICK TO CLOSE WINDOW CALENDAR
        closeWindowCalendar();
    });
    calendarWindow({ //CHECKIN
        btn: $('#check_in'),
        calendar: 'calendar_checkin'
    },function(data){
        const td = $('#calendar_checkin').find('.data-calendarIO');
        td.on('click',function(){
            selectedDate.firstDay = Number($($(this).find('span')[1]).attr('data-day'));
            selectedDate.month = data.month;
            loadCalendar(selectedDate);
            closeWindowCalendar();

            if(!isNaN(selectedDate.firstDay)){
                $('#check_in').html(`${data.getMonth().name}<strong> ${selectedDate.firstDay} </strong>, ${data.year}`);
            }else{
                $('#check_in').html('Chose a date');
            }
        });
    });

    calendarWindow({ //CHECKOUT
        btn: $('#check_out'),
        calendar: 'calendar_checkout'
    },function(data){
        const td = $('#calendar_checkout').find('.data-calendarIO');
        td.on('click',function(){
            selectedDate.lastDay = Number($($(this).find('span')[1]).attr('data-day'));
            selectedDate.month = data.month;
            loadCalendar(selectedDate);
            closeWindowCalendar();

            if(!isNaN(selectedDate.lastDay)){
                $('#check_out').html(`${data.getMonth().name}<strong> ${selectedDate.lastDay} </strong>, ${data.year}`);
            }else{
                $('#check_out').html('Chose a date');
            }
        })
    });
});