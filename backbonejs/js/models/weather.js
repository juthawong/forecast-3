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

    var WeatherModel = Backbone.Model.extend({
        baseUrl: config.apiUrl + 'weather',
        url: config.apiUrl + 'weather',
        defaults: {
            // ...
        },
        initialize: function() {
            console.log('initialize model');
        },
        getTemp: function(format) {
            var main,
                temp;

            main = this.get('main');
            if (main) {
                temp = main .temp;
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

    // Cocktail.mixin(WeatherModel, hateoas);
    Cocktail.mixin(WeatherModel);

    return WeatherModel;
});
