/*global define */

define([
    'config',
    'underscore',
    'backbone'
], function(
    config,
    _,
    Backbone
) {

    'use strict';

    var ForecastModel = Backbone.Model.extend({
        url: config.apiUrl + 'forecast/city',
        getWeatherIconCode: function(weather) {
            if (weather) {
                return weather[0].icon;
            } else {
                return this.model.weather[0].icon;
            }
        }
    });

    return ForecastModel;
});
