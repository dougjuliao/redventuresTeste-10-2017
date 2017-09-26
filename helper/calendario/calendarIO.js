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
            let d = new Array(12); // day
            d[0]  = { max: 31, name: 'January' };
            d[1]  = { max: (isLeap(year)) ? 29 : 28, name: 'February' };
            d[2]  = { max: 31, name: 'March' };
            d[3]  = { max: 30, name: 'April' };
            d[4]  = { max: 31, name: 'May' };
            d[5]  = { max: 30, name: 'June' };
            d[6]  = { max: 31, name: 'July' };
            d[7]  = { max: 31, name: 'August' };
            d[8]  = { max: 30, name: 'September' };
            d[9]  = { max: 31, name: 'October' };
            d[10] = { max: 30, name: 'November' };
            d[11] = { max: 31, name: 'December' };
            return d[month];
          };
    };
})( jQuery );