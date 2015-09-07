/*global define */

define(['underscore'], function(_) {

    'use strict';

    var QueryManager = function(options) {
        this.init(options);
        this.needsUpdate = false;
    };

    // inherit from Backbone Events
    QueryManager.prototype = {};

    QueryManager.prototype.init = function(options) {
        this.options = options || {};
        this.options.paramsToOmit = this.options.paramsToOmit || []; 
        this.lastQueryParams = {}; // query params passed from url

        if(this.options.isPaginated) {
            this.lastQueryParams.page = '0';
        }
    };

    QueryManager.prototype.reset = function() {
        this.init(this.options);
        this.needsUpdate = true;
    };

    // update query params
    // take new params, compare with old if anything changed, merge changes and fetch dependent collection (results)
    QueryManager.prototype.update = function(params) {

        var changed = false,
            lastMergedObj    = _.extend({}, this.lastQueryParams),
            currentMergedObj = _.extend({}, this.lastQueryParams, params),

            isPaginated = this.options.isPaginated;

        // was there a reset recently? if so, always assume change
        if(this.needsUpdate) {
            changed = true;
            this.needsUpdate = false;
        }

        // has page changed at some point?
        if(isPaginated && lastMergedObj.page !== currentMergedObj.page) {
            changed = true;
        }
        else if(!_.isEqual( // did any parameters except page changed since last time?
            _.omit(lastMergedObj, 'page'),
            _.omit(currentMergedObj, 'page')
        )) {
            changed = true;

            // reset page back to 0 upon other params change
            if(isPaginated) {
                params.page = '0';
            }
        }

        // handle [name.id] vs [name] keys
        this.resolveNestedKeys(this.lastQueryParams, params);

        // if anything changed, fetch dependent collection (results)
        if(changed) {
            _.extend(this.lastQueryParams, params);
            var queryObj = _.omit(this.getMergedQueryObj(), this.options.paramsToOmit)
            this.options.collection.setQueryObj(queryObj);
            this.options.collection.fetch();
        }

    };

    QueryManager.prototype.getMergedQueryObj = function() {
        return _.extend({}, this.lastQueryParams);
    };

    QueryManager.prototype.resolveNestedKeys = function(last, current) {
        var idKey = '.id';
        Object.keys(last).forEach(function(keyName) {
            // [name] was null, but now [name.id] is something -> delete both
            if(last[keyName] === null && current[keyName + idKey]) {
                delete current[keyName];
                delete last[keyName + idKey];
            }

            // [name.id] was something, but now [name] is null -> delete both
            if(keyName.indexOf(idKey) === keyName.length - idKey.length && 
               current[keyName.replace(idKey, '')] === null) {
                delete last[keyName];
                delete current[keyName.replace(idKey, '')];
            }
        });
    };

    return QueryManager;

});
