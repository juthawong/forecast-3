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
        // baseUrl: config.apiUrl + '/weather?q=London,uk',
        baseUrl: 'http://api.openweathermap.org/data/2.5/' + '/weather?q=Krakow&units=metric',
        defaults: {
            description: 'this is default description',
            today: function() {
                var date = new Date();

                return date.toJSON().substr(0, 10);
            }
        }
    });

    Cocktail.mixin(WeatherModel, hateoas);

    return WeatherModel;
});
