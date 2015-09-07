/*global define */

define([
    'config',
    'backbone',
    'cocktail',
    
    'extensions/collection-query',
    'extensions/hateoas',

    'models/weather'
], function(
    config,
    Backbone,
    Cocktail,
    
    collectionQuery,
    hateoas,
    
    WeatherModel
) {

    'use strict';

    var WeatherCollection = Backbone.Collection.extend({
        baseUrl: config.apiUrl + 'weather',
        // baseUrl: 'http://api.openweathermap.org/data/2.5/' + '/weather?q=Krakow&units=metric',
        model: WeatherModel
    });

    // Cocktail.mixin(WeatherCollection, hateoas, collectionQuery);
    Cocktail.mixin(WeatherCollection, hateoas, collectionQuery);

    return WeatherCollection;

});
