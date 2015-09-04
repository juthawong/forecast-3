/*global define */

define([], function() {

    'use strict';
 
    var _url = function() {
        var self = this.getLinksByRel('self')[0],
            id = this.get('id');

        // link obtained from hypermedia
        if(self && self.href) {
            return self.href;
        }
        // no link, but id present
        else if(id) {
            return this.baseUrl + '/' + id;
        }
        // no id, but belongs to a collection
        else if(this.collection) {
            return this.collection.url();
        }

        // last resort, hardcoded url property
        return this.baseUrl;
    };

	return {
        initialize: function() {
            this.meta =  {
                links: [],
                page: []
            };

            this.on('sync', function(modelOrCollection, response, options) {
                var xhr = options.xhr,
                    locationHeader,
                    link;

                if(xhr.status === 201 && (locationHeader = xhr.getResponseHeader('Location'))) {
                    link = {
                        rel: 'self',
                        href: locationHeader
                    };

                    modelOrCollection.setLink(link);
                    modelOrCollection.set('id', ~~this.extractIdFromLink(link)); // id needs to be set, otherwise backbone thinks it's unsaved model
                }
            });
        },

        extractIdFromLink: function(link) {
            try {
                // last number is probably an id
                return link.href.match(/[0-9]+$/)[0] || '';
            }
            catch(e) {
                // ...or not
                return '';
            }
        },
        
        parse: function(data) {

            if(data && this.meta) {
                this.meta.links = data.links;
                delete data.links;

                this.meta.page = data.page || [];
                delete data.page;
                
                if(Array.isArray(data.content)) {
                    return data.content;
                }
                else if(Array.isArray(data.list)) {
                    return data.list.map(function(item) {
                        return {
                            name: item
                        };
                    });
                }
            }

            return data;
        },

        getLinksByRel: function(rel) {
            return this.meta.links.filter(function(link) {
                return link.rel === rel;
            });
        },

        setLink: function(link) {
            this.meta.links.unshift(link);
        },

        // expose both url and urlRoot because we don't want models to use collection url when updating
        url: _url,
        urlRoot: _url
	};

});
