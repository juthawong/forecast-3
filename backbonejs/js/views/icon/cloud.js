/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/cloud.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudIconTemplate
) {

    'use strict';

    var CloudIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudIconTemplate)
    });

    return CloudIconView;

});
