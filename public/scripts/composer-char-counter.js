$(document).ready(function() {
    $('#tweet-text').on("input", function(event) {
        const counter = $(this).closest('form').find('.counter');
        counter.text(140-this.value.length);
        if(this.value.length > 140) {
            counter.addClass('red');
        }
        if(this.value.length <= 140) {
            counter.removeClass('red');
        }  
        
    })
});