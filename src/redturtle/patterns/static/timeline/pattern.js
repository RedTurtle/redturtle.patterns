define('redturtle-patterns-timeline', [
  'jquery',
  'pat-base',
  'pat-logger',
  'mockup-utils',
  'underscore'
], function($, Base, logger, utils, _) {
  'use strict';

  var log = logger.getLogger('pat-timeline');
  /**
  Stupid but works
  *
  */
  $.mockup = {}
  $.mockup.utils = utils;
  var Timeline = Base.extend({
    name: 'timeline',
    trigger: '.pat-timeline',
    parser: 'mockup',
    defaults: {
    },
    init: function() {
        var that = this,
            timeline = that.$el,
            next = timeline.find('li.next a');
        this._setDate(that);
        if (next.length > 0){
            var url = next.attr('href');
            this._loadElements(that, url);
            $('.timeline nav').hide();
        }
    },
    _setDate: function(that) {
        //
        var tags = $('.timeline .monthyear');
        $(tags[0]).attr('hidden', false);
        var lasttag = $(tags[0]).text();
        if (tags.length > 1){
            for (var i = 1; i < tags.length; i++){
                if ($(tags[i]).text() !== lasttag){
                    $(tags[i]).attr('hidden', false);
                    lasttag = $(tags[i]).text();
                }
            }
        }
    },
    _loadElements: function(that, url) {
        var loader = $("<div class='timeline-loader'><a href='" + url + "' class='load-timeline'>Carica altri elementi</a></div>");
        loader.find('a').on('click', {context: that}, that._load);
        loader.insertBefore(that.$el.find('nav'));
    },
    _load: function(ev) {
        ev.preventDefault();
        var that = ev.data.context,
            url = $(this).attr('href');
        $.ajax({
            url: url,
            dataType: 'html',
            context: that,
            success: function(data){
                var html, newpage, pagination, url, selector;
                html = $.mockup.utils.parseBodyTag(data);
                selector = this.$el.attr('data-timeline-selector');
                newpage = $(_.find($(html), function(obj) {
                    return $(obj).attr('id') === 'column-wrapper'
                    })
                )
                .find(selector);
                pagination = newpage.find('nav').remove();
                url = pagination.find('li.next a').attr('href');
                newpage.find('div.timeline-item.timeline-item-base').insertBefore($('.timeline-loader'));
                if (url === undefined){
                    $('.timeline .timeline-loader').remove();
                }
                else{
                    $('.timeline .load-timeline').attr('href', url)
                }
                this._setDate(this);
            },
            error: function(){
                $('.timeline .timeline-loader').remove();
                var error = $("<div class='loader-error'>Impossibile caricare nuove informazioni</div>");
                error.insertBefore($('.timeline nav'));
            }
        });
    }
  });
  return Timeline;
});
