node-named-require
==================

Extends the capabilities of the built in require functionality of Node.js to allow name-spacing of the cache entries

```js
var namedRequire = require('node-named-require');
var thing1 = namedRequire('thing', '1');
var thing2 = namedRequire('thing', '2');
```