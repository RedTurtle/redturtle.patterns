define('redturtle-patterns-slider', [
  'jquery',
  'pat-base',
  'slick.min'
//  '++resource++redturtle-patterns-libraries/slick/slick.min'
], function($, Base) {
  'use strict';

  var Slider = Base.extend({
    name: 'slider',
    trigger: '.pat-slider',
    parser: 'mockup',
    defaults: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    },
    init: function() {
        var that = this;
        that.$el.slick(that.defaults);
    }
  });

  return Slider;
});
