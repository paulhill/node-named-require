node-named-require
==================

Extends the capabilities of the built in require functionality of Node.js to allow name-spacing of the cache entries

```js
var namedRequire = require('node-named-require');
var thing1 = namedRequire('thing', '1');
var thing2 = namedRequire('thing', '2');
```

## Why would I want to do this?

Because you require 2 (or more) distinct instances of a module and the module is not written it in such a way as to allow creation of new instances.
So you are stuck with a singleton because of the require cache.
That's where node-named-require comes in handy.
Use namedRequire to create as many name-spaced entries in the require cache as your little heart desires.
You just include the module as normal in your dependencies and then use namedRequire to pull name-spaced instances into the require cache.
Subsequent calls to namedRequire with the same parameters will retrieve the correct named instance from the cache as you would expect.