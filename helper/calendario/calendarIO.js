/*
    @Autor  : Douglas Julião
    @github : https://github.com/dougjuliao
*/
(function( $ ) {
    /*
        @conf.month = Number Month;
        @conf.year = Number fullYear;
        @conf.nav = Boolean;
        @conf.selectable = Boolean;
        @conf.firstDay = Number;
        @conf.lastDay = Number;

        callback = getDay clicked;
    */
    $.fn.calendarIO = function(conf = {},callback) {
        const _THIS = this;
        const CalendarIO = {
            id: $(_THIS),
            month: conf.month || new Date().getMonth(),
            year:  conf.year  || new Date().getFullYear(),
            firstDay: conf.firstDay,
            lastDay: conf.lastDay,
            firstMonth: conf.firstMonth,
            lastMonth: conf.lastMonth,
            isLeap: () => { // Is leapyear ?
                return CalendarIO.year % 4 == 0 ? true : false;  
            },
            getMonth: () => { // GetMonth and max day.length
                const th = CalendarIO;

                let d = [{ max: 31, name: 'January' },
                        { max: (th.isLeap(th.year)) ? 29 : 28, name: 'February' },
                        { max: 31, name: 'March' },
                        { max: 30, name: 'April' },
                        { max: 31, name: 'May' },
                        { max: 30, name: 'June' },
                        { max: 31, name: 'July' },
                        { max: 31, name: 'August' },
                        { max: 30, name: 'September' },
                        { max: 31, name: 'October' },
                        { max: 30, name: 'November' },
                        { max: 31, name: 'December' }];
                return d[th.month];
            },
            creatHTML: () => { // DrawHTML calendarIO
                const th = CalendarIO;

                let firstDay = new Date(th.year, th.month, 1);
                let startingDay = firstDay.getDay();
                let monthLength = th.getMonth(th.month,th.year);
  
                let trs = '<tr>';
                let daysCounter = 1;
  
                    for (var k = 0; k < 5; k++) {
                        for (var j = 0; j <= 6; j++) {
                            trs += '<td class="data-calendarIO"><span></span>';
                                if (daysCounter <= monthLength.max && (k > 0 || j >= startingDay)) { 
                                    trs += '<span data-day="'+daysCounter+'">'+daysCounter+'</span>';
                                    daysCounter++;
                                }
                            trs += '</td>';
                        }
                        if (daysCounter > monthLength.max) {
                            break;
                        } else {
                            trs += '</tr><tr>';
                        }
                    }
                    return `<div class="header-cio">
                            <div class="monthyear-cio">
                                <h2>${monthLength.name} / ${th.year}</h2>
                                <div class="nav-cio" style="display:none;">
                                    <img class="prev-next-cio prev-cio" src="img/arrow-back.svg">
                                    <img class="prev-next-cio next-cio" src="img/arrow-next.svg">
                                </div>
                            </div>
                            <table cellspadding="0" cellspacing="0" class="days-cio">
                                <tr> 
                                    <td>S</td> <td>M</td> <td>T</td> <td>W</td> <td>T</td> <td>F</td> <td>S</td> 
                                </tr>
                            </table>
                        </div>
                        <div class="body-cio">
                            <table cellspadding="0" cellspacing="0" class="days-cio">
                                ${trs}
                            </table>
                        </div>`;
            },
            addMonthYear: (prevNext) => {
                const th = CalendarIO;

                if(prevNext){
                    if(th.month <= 12 && th.month >= -1){
                        th.month += prevNext; 
                    }
                    if(th.month == 12){
                        th.month = 0;
                        th.year += prevNext; 
                    } 
                    if(th.month == -1){
                        th.month = 11;
                        th.year += prevNext; 
                    } 
                }
                th.id.html(th.creatHTML({
                    month: th.month,
                    year:  th.year
                }));
                CalendarIO.actions();
            },
            actions: () => {
                const th = CalendarIO;

                if(callback){
                    callback(CalendarIO);
                }
                // if(conf.month || conf.year){
                //     th.addMonthYear();
                // }
                if(conf.nav){
                    th.id.find('.nav-cio').fadeIn();
                    const prev = th.id.find('.prev-cio');
                    const next = th.id.find('.next-cio');

                    prev.on('click',function(){ CalendarIO.addMonthYear(-1); });
                    next.on('click',function(){ CalendarIO.addMonthYear(1); });
                    
                }
                if(conf.selectable){
                    const tdCalendar = th.id.find('.data-calendarIO');

                    tdCalendar.on('click',function(){
                        let spanNum = $($(this).find('span')[1]);
                        $(_THIS).find('.data-calendarIO').removeClass('active active-range-first active-range-last active-range');
                        $(this).addClass('active');
                        if(conf.control){
                            if(conf.control = 'first'){
                                th.firstDay = spanNum.attr('data-day');
                            }else if(conf.control = 'second'){
                                th.lastDay = spanNum.attr('data-day');
                            }
                        }
                    });
                    const paintActive = (first,last,count,paintWhite) => {
                        const firstSpan = tdCalendar.find('span[data-day='+first+']');
                        const lastSpan = tdCalendar.find('span[data-day='+last+']');
                        
                        firstSpan.parent().addClass('active active-range-first');
                        lastSpan.parent().addClass(`active active-range${paintWhite ? '-last': ''}`);

                        for(var i = first+count; i < last; i++){
                            tdCalendar.find('span[data-day='+i+']').parent().addClass('active active-range');
                        }
                    };

                    if(th.firstDay !== null && th.lastDay !== null){
                        if(th.firstMonth == th.lastMonth && th.firstMonth == th.month && th.lastMonth == th.month){
                            if(th.firstDay < th.lastDay){
                                paintActive(th.firstDay,th.lastDay,1,true);
                            }
                        }else if(th.firstMonth < th.lastMonth){
                            if(th.month == th.firstMonth){
                                paintActive(th.firstDay,th.getMonth().max,1);
                            }else if(th.month == th.lastMonth){
                                paintActive(1,th.lastDay,0,true);
                            }else if(th.month < th.lastMonth && th.month > th.firstMonth){
                                paintActive(1,th.getMonth().max,0);
                            }
                        }
                    }
                }
            }
        };
        // init calendar
        CalendarIO.addMonthYear();

        // Selectors
        const id =  CalendarIO.id;
        id.addClass('calendarIO');

    };
})( jQuery );