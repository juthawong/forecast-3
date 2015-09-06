/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/city-weather.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cityWeatherTemplate
) {

    'use strict';

    var CityWeatherView = Backbone.Layout.extend({
        template: Handlebars.compile(cityWeatherTemplate),
        now: new Date(),
        events: {
            'submit form': function() {
                this.searchCity();
                return false;
            }
        },
        initialize: function(options) {
            this.listenTo(this.model, 'sync', this.render);

            // $(document).on('keyup', this.keyup.bind(this));

            // console.log(this.model.getTime('dt'));

            
        },
        searchCity: function() {
            console.log('searchCity func');

            // this.model.clear();
            this.trigger('search', this);
        },
        changeBackground: function() {
            if (this.now > this.model.getTime('sunrise') && this.now < this.model.getTime('sunset')) {
                $('body').removeClass('night clear-sky-night').addClass('day clear-sky-day');
                console.log('day from view');
            } else {
                $('body').removeClass('day clear-sky-day').addClass('night clear-sky-night');
                console.log('night from view');
            }
        },
        /*keyup: function(event) {
            // enter
            if (event.keyCode === 13) {
                var city = $('#city-name').val();

                this.trigger('search', function() {
                    // 
                });

            }

            return false;
        },*/
        serialize: function() {
            var data = this.model.toJSON();

            console.log('serialize view');

            // console.log(data[0]);
            data.temp = this.model.getTemp('round');

            // window['now'] = this.model.getTime('dt');
            // window['sunrise'] = this.model.getTime('sunrise');
            // window['sunset'] = this.model.getTime('sunset');

            data.sunrise = this.model.getTime('sunrise');
            data.sunset = this.model.getTime('sunset');
            
            // return {data: data};
            return data;
        },
        afterRender: function () {
            console.log("After render");
            // set right background
            this.changeBackground();
        }
    });

    return CityWeatherView;

});
