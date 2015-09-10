/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/city-forecast.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cityForecastTemplate
) {

    'use strict';

    var CityForecastView = Backbone.Layout.extend({
        template: Handlebars.compile(cityForecastTemplate),
        now: new Date(),
        dayTime: null,
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
            if (this.dayTime) {
                if (this.dayTime == 'day') {
                    $('body').attr('class', 'day bg-' + this.model.getWeatherIconCode());
                }
                if (this.dayTime == 'night') {
                    $('body').attr('class', 'night bg-' + this.model.getWeatherIconCode());
                }
            }
        },
        serialize: function() {
            var data = this.model.toJSON();

            if (this.model.get('list')) {
                data['forecast'] = {};
                _.each(this.model.get('list'), function(weather) {
                    var parts = weather.dt_txt.split(' ');

                    // console.log(typeof parts[1]);

                    if (data['forecast'][parts[0]]) {
                        data['forecast'][parts[0]][parts[1]] = weather;
                    } else {
                        data['forecast'][parts[0]] = {};
                        data['forecast'][parts[0]][parts[1]] = weather;
                    }
                });
            }
            console.log(data['forecast']);

            data.temp = this.model.getTemp('round');
            data.sunrise = this.model.getTime('sunrise');
            data.sunset = this.model.getTime('sunset');

            data.dayTime = this.dayTime;
            
            return data;
        },
        afterRender: function () {
            this.setDayTime();
            this.setBackground();
        }
    });

    return CityForecastView;

});
