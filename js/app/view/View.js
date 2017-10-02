class View {
    constructor(elemento){
      this._elemento = elemento;
    }
    template(string){
        document.querySelector(this._elemento).innerHTML = string;
    }
    chartCanvas(data){
        //create chartjs

        for(let i = 0,len = data.length; i < len; i++){
            let ctx = document.getElementById("myChart_"+i).getContext("2d");
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data[i].price_history.map((a) => { return a.month; }),
                    datasets: [{
                        label: '',
                        data: data[i].price_history.map((a) => { return a.value; }),
                        backgroundColor: [
                            'rgba(245, 123, 24, 0.7)',
                            'rgba(245, 123, 24, 0.7)',
                            'rgba(245, 123, 24, 0.7)',
                            'rgba(245, 123, 24, 0.7)',
                            'rgba(245, 123, 24, 0.7)',
                            'rgba(245, 123, 24, 0.7)',
                            'rgba(245, 123, 24, 0.7)'
                        ],
                        borderColor: [
                            'rgba(245, 123, 25, 1)',
                            'rgba(245, 123, 25, 1)',
                            'rgba(245, 123, 25, 1)',
                            'rgba(245, 123, 25, 1)',
                            'rgba(245, 123, 25, 1)',
                            'rgba(245, 123, 25, 1)',
                            'rgba(245, 123, 25, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }

        //PRICE HISTORY
        $('.btn_price_history').on('click',function(){
            let parentHotels = $(this).closest('.hotel-info');

            parentHotels.find('.hotel-desc,.hotel-stars').slideToggle();
            parentHotels.find('.modal-price').fadeIn();
        });
        $('.back-hotels-info').on('click',function(){
            let parentHotels = $(this).closest('.hotel-info');

            parentHotels.find('.modal-price').fadeOut();
            parentHotels.find('.hotel-desc,.hotel-stars').slideToggle();
        });
    }
}
  