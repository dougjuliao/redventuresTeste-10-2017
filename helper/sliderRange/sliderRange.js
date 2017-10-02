/*
    código encontrado  no seguinte link: 
    https://stackoverflow.com/questions/4753946/html5-slider-with-two-inputs-possible#answer-44384948

*/
    
function addSeperator(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

function rangeInputChangeEventHandler(e){
    var rangeGroup = $(this).attr('name'),
        minBtn = $('.min'),
        maxBtn = $('.max'),
        range_min = $('.range_min'),
        range_max = $('.range_max'),
        minVal = parseInt($(minBtn).val()),
        maxVal = parseInt($(maxBtn).val()),
        origin = $('.rangeslider');

    if(origin === 'min' && minVal > maxVal-5){
        $(minBtn).val(maxVal-5);
    }
    var minVal = parseInt($(minBtn).val());
    $(range_min).html('$ '+addSeperator(minVal));


    if(origin === 'max' && maxVal-5 < minVal){
        $(maxBtn).val(5+ minVal);
    }
    var maxVal = parseInt($(maxBtn).val());
    $(range_max).html('$ '+addSeperator(maxVal));
    $('#filderRange').val(`{ "min":${addSeperator(minVal)}, "max": ${addSeperator(maxVal)}}`).trigger('change');
}