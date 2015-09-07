/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/cloudFog.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudFogIconTemplate
) {

    'use strict';

    var CloudFogIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudFogIconTemplate)
    });

    return CloudFogIconView;

});
