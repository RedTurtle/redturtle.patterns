define('/opt/comunemodena.comnet/components/plone/src/redturtle.patterns/src/redturtle/patterns/static/slider/pattern.js',[
  'jquery',
  'pat-base',
], function($, Base) {
  'use strict';

  var Slider = Base.extend({
    name: 'slider',
    trigger: '.pat-slider',
    parser: 'mockup',
    defaults: {

    },
    init: function() {
      that.$el.append(' <span>Exercise 6 was here</span>');
    }
  });

  return Pattern;
});

