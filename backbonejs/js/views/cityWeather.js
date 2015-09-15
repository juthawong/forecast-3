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
        // dayTime: null,
        icon: null,
        events: {
            'submit form': function() {
                this.searchCity();
                return false;
            }
        },
        initialize: function(options) {
            this.listenTo(this.model, 'sync', this.render);            
        },
        searchCity: function() {
            this.trigger('search', this);
        },
        setBackground: function() {
            if (this.icon) {
                var classNames = [];

                classNames.push('weather');
                classNames.push(this.icon[2] === 'd' ? 'day' : 'night');
                classNames.push('bg-' + this.icon);

                $('body').attr('class', classNames.join(' '));
            }
        },
        serialize: function() {
            var data = this.model.toJSON();

            data.temp = this.model.getTemp('round');
            data.sunrise = this.model.getTime('sunrise');
            data.sunset = this.model.getTime('sunset');

            data.dayTime = this.dayTime;

            if (this.model) {
                this.icon = this.model.getWeatherIconCode(this.model.weather);
            }
            
            return data;
        },
        afterRender: function () {
            // this.setDayTime();
            this.setBackground();
        }
    });

    return CityWeatherView;

});
