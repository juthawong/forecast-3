/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/cloudRainSun.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudRainSunIconTemplate
) {

    'use strict';

    var CloudRainSunIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudRainSunIconTemplate)
    });

    return CloudRainSunIconView;

});
