/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/cloudSnow.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudSnowIconTemplate
) {

    'use strict';

    var CloudSnowIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudSnowIconTemplate)
    });

    return CloudSnowIconView;

});
