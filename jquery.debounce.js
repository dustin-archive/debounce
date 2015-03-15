// Debounce - 1.0.0
// March 15, 2015
// The MIT License (MIT)
// Copyright (c) 2015 Dustin Dowell
// http://github.com/dustindowell22/debounce
// =============================================


(function($) {
  $.fn.debounce = function(events, fun, delay) {

    // Store object
    var $this = $(this);

    // Set data for first call
    $this.data('lastFire', 0).data('fireOnce', 1);

    // Debounce
    function debounce() {
      var now = new Date().getTime(),
          last = $this.data('lastFire'),
          later = last + delay,
          until = now - later;

      // Fire events when allowed
      if(now > later) {
        fun.call();
        $this.data('lastFire', now);
      }
      else if($this.data('fireOnce') === 1) { // Fire one final event ASAP
        $this.data('fireOnce', 0);
        setTimeout(function() {
          fun.call();
          $this.data('lastFire', now).data('fireOnce', 1);
        }, Math.abs(until));
      }
    }

    // Filter events with debounce
    $this.on(events, debounce);
  };
})($);
