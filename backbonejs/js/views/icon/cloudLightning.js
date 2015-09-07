/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/cloudLightning.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudLightningIconTemplate
) {

    'use strict';

    var CloudLightningIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudLightningIconTemplate)
    });

    return CloudLightningIconView;

});
