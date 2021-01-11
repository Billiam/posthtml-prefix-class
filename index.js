'use strict';

var minimatch = require('minimatch');
var objectAssign = require('object-assign');

module.exports = function (options) {
    options = objectAssign({}, {
        ignore: [],
        prefix: '',
        only: ''
    }, options);

    if (typeof options.ignore == 'string') {
        options.ignore = [options.ignore];
    }

    var findByClass = function(tree, className) {
        var foundNode;

        tree.walk(function (node) {
            if (foundNode) {
                return node;
            }

            var attrs = node.attrs || false;
            var classNames = attrs.class && attrs.class.trim().split(/\s+/g);

            if (classNames && classNames.find(function(name) { return name === className })) {
                foundNode = node;
            }
            return node
        })

        return foundNode;
    }

    return function posthtmlPrefixClass(tree) {
        var treeWalk = tree.walk.bind(tree)

        if (options.only) {
            var childNode = findByClass(tree, options.only)
            if (childNode) {
                treeWalk = tree.walk.bind(childNode.content);
            } else {
                return tree;
            }
        }
        treeWalk(function (node) {
            var attrs = node.attrs || false;
            var classNames = attrs.class && attrs.class.trim().split(/\s+/g);

            if (!classNames) {
                return node;
            }

            node.attrs.class = classNames.map(function (className) {
                var shouldBeIgnored = options.ignore.some(function (pattern) {
                    return minimatch(className, pattern);
                });

                if (!shouldBeIgnored) {
                    className = options.prefix + className;
                }

                return className;
            }).join(' ');

            return node;
        });

        return tree;
    };
};
