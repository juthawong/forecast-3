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
        dayTime: null,
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
        setDayTime: function() {
            // basically weather icon delivers this info as 10d or 10n
            if (this.dayTime == null) {
                if (this.now >= this.model.getTime('sunrise') && this.now < this.model.getTime('sunset')) {
                    this.dayTime = 'day';
                }
                if (this.now < this.model.getTime('sunrise') || this.now >= this.model.getTime('sunset')) {
                    this.dayTime = 'night';
                }
            }
        },
        setBackground: function() {
            console.log(this.icon);
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
            this.setDayTime();
            this.setBackground();
        }
    });

    return CityWeatherView;

});
