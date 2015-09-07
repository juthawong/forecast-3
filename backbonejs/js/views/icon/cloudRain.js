/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/cloudRain.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudRainIconTemplate
) {

    'use strict';

    var CloudRainIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudRainIconTemplate)
    });

    return CloudRainIconView;

});
