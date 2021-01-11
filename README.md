# posthtml-prefix-class

[![Build Status](https://travis-ci.org/stevenbenisek/posthtml-prefix-class.svg)](https://travis-ci.org/stevenbenisek/posthtml-prefix-class)

[PostHTML](https://github.com/posthtml/posthtml) plugin to prefix class names.

## Installation

```shell
npm install --save-dev posthtml-prefix-class
```

## Usage

```js
var posthtml = require('posthtml');
var posthtmlPrefixClass = require('posthtml-prefix-class');

posthtml()
    .use(posthtmlPrefixClass({
        prefix: 'prefix-',
        ignore: ['selector-2'],
        only: ['parent-classname']
    }))
    .process(
        '<div class="selector-1"><div class="selector-2"></div></div>'
    )
    .then(function (output) {
        console.log(output.html);
        // <div class="prefix-selector-1"><div class="selector-2"></div></div>
    });
```

## Options

### `prefix`

Type: `String`  
Default: `''`

The string used to prefix class names.

### `ignore`

Type: `Array|String`  
Default: `[]`

A class name, or an array of class names, to be excluded from prefixing.
**Accepts any glob expression supported by [minimatch](https://github.com/isaacs/minimatch).**

### `only`

Type: `String`  
Default: `''`


A class to be included when prefixing. If present, any nodes below the first node matching
this class will be considered for prefixing.

```js
var posthtml = require('posthtml');
var posthtmlPrefixClass = require('posthtml-prefix-class');

posthtml()
    .use(posthtmlPrefixClass({
        prefix: 'prefix-',
        ignore: ['selector-*'],
        only: 'selector-2'
    }))
    .process(
        '<div="parent"></div><div class="selector-1"><div class="selector-2"><div class="myname">/div></div></div>'
    )
    .then(function (output) {
        console.log(output.html);
        // <div class="parent"></div><div class="selector-1"><div class="selector-2"><div class="prefix-myname"></div></div></div>
    });
```

## Testing

```shell
npm test
```
