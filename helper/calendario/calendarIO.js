/*
    @Autor  : Douglas Julião
    @github : https://github.com/dougjuliao
*/
(function( $ ) {
    $.fn.calendarIO = function() {
          const _THIS = this;

          const isLeap = (year) => { // Leap year
             return year % 4 == 0 ? true : false; 
          };
          const getMonth = (month,year) => {
            let d = [{ max: 31, name: 'January' },
                    { max: (isLeap(year)) ? 29 : 28, name: 'February' },
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
            return d[month];
          };
          const creatHTML = (opt) => {
              let firstDay = new Date(opt.year, opt.month, 1);
              let startingDay = firstDay.getDay();
              let monthLength = getMonth(opt.month,opt.year);

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
                            <h2>${monthLength.name} / ${opt.year}</h2>
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
          };
        $(_THIS).html(creatHTML({
            month: new Date().getMonth(),
            year:  new Date().getFullYear()
        }));
    };
})( jQuery );