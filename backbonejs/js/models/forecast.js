/*global define */

define([
    'config',
    'underscore',
    'backbone',
    'cocktail',

    'extensions/hateoas'
], function(
    config,
    _,
    Backbone,
    Cocktail,

    hateoas
) {

    'use strict';

    var ForecastModel = Backbone.Model.extend({
        // baseUrl: config.apiUrl + 'forecast/city',
        url: config.apiUrl + 'forecast/city',
        defaults: {
            // ...
        },
        initialize: function() {
            console.log('initialize model');
        },
        getWeatherIconCode: function(weather) {
            if (weather) {
                return weather[0].icon;
            } else {
                this.model.weather[0].icon;
            }
        },
        getTemp: function(format, weather) {
            var main,
                temp;

            if (weather) {
                main = weather.main;
            } else {
                main = this.get('main');
            }
            if (main) {
                temp = main.temp;
            }

            if (format === 'round') {
                return Math.round(temp);
            }

            return temp;
        },
        getTime: function(period) {
            var sys

            sys = this.get('sys');
            if (period === 'dt') {
                return new Date(this.get('dt') * 1000);
            }
            if (sys) {
                if (period === 'sunrise') {
                    return new Date(sys.sunrise * 1000);
                }
                if (period === 'sunset') {
                    return new Date(sys.sunset * 1000);
                }
            }
        }
    });

    // Cocktail.mixin(ForecastModel, hateoas);
    Cocktail.mixin(ForecastModel);

    return ForecastModel;
});
