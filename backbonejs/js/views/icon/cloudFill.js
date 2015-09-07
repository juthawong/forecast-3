/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/cloudFill.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudFillIconTemplate
) {

    'use strict';

    var CloudFillIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudFillIconTemplate)
    });

    return CloudFillIconView;

});
