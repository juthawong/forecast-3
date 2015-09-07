/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/cloudMoon.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudMoonIconTemplate
) {

    'use strict';

    var CloudMoonIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudMoonIconTemplate)
    });

    return CloudMoonIconView;

});
