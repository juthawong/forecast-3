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

    var WeatherModel = Backbone.Model.extend({
        url: config.apiUrl + 'weather'
    });

    return WeatherModel;
});
