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
        initialize: function() {
            this.listenTo(this.collection, 'sync', this.render);
        },
        serialize: function() {
            var data = this.collection.toJSON();

            console.log(data[0]);
            
            // return {data: data};
            return data[0];
        }
    });

    return CityWeatherView;

});
