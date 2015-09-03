console.log('main logic is ready...');

(function($){
  // Object declarations goes here
  $(document).ready(function () {
    // Start application code goes here
    var now = new Date();

    // datetime background
    if (now.getHours() > 6 && now.getHours() < 20) {
      $('body').addClass('clear-sky-day');
    } else {
      $('body').addClass('clear-sky-night');
    }
  });
})(jQuery);