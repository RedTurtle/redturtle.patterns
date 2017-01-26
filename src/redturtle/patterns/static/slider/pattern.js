define('redturtle-patterns-slider', [
  'jquery',
  'pat-base',
], function($, Base) {
  'use strict';
  debugger;
  var Slider = Base.extend({
    name: 'slider',
    trigger: '.pat-slider',
    parser: 'mockup',
    defaults: {

    },
    init: function() {
        alert('Faccio init');
    }
  });

  return Slider;
});
