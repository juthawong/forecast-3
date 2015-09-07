/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/cloudSun.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudSunIconTemplate
) {

    'use strict';

    var CloudSunIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudSunIconTemplate)
    });

    return CloudSunIconView;

});
