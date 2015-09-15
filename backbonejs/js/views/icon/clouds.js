/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/clouds.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudsIconTemplate
) {

    'use strict';

    var CloudsIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudsIconTemplate)
    });

    return CloudsIconView;

});
