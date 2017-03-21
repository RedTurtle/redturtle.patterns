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
        if (next.length > 0){
            var url = next.attr('href');
            this._loadElements(that, url);
            $('.timeline nav').hide();
        }
    },
    _loadElements: function(that, url) {
        var loader = $("<div class='timeline-loader'><i class='fa fa-ellipsis-h' aria-hidden='true'></i><a href='" + url + "' class='load-timeline'>Carica aggiornamenti successivi</a></div>");
        loader.find('a').on('click', that._load);
        loader.insertBefore(that.$el.find('nav'));
        return   
    },
    _load: function(ev) {
        ev.preventDefault();
        $('')
        var that = this,
            url = $(this).attr('href');
        $.ajax({
            url: url,
            dataType: 'html',
            success: function(data){
                var html = $.mockup.utils.parseBodyTag(data);
                var newpage = $(_.find($(html), function(obj) {
                        return $(obj).attr('id') === 'column-wrapper'
                        })
                    )
                    .find('#content-core .timeline');
                var pagination = newpage.find('nav').remove();
                var url = pagination.find('li.next a').attr('href');
                newpage.find('>*').insertBefore($('.timeline-loader'));
                if (url === undefined){
                    $('.timeline .timeline-loader').remove();
                }
                else{
                    $('.timeline .load-timeline').attr('href', url)
                }
            },
            error: function(){
                $('.timeline .timeline-loader').remove();
                var error = $("<div class='loader-error'>Impossibile caricare nuove informazioni</div>");
                error.insertBefore($('.timeline nav'));
            }
        });
    }
  });
  return Timeline;;
