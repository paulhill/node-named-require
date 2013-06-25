/*
	Helper module used to circumvent the require cache and load a new instance of a module at a namespace
 */

function namedRequire(id, name) {
	// ensure base module is loaded into cache
	var baseModule = require(id);
	// resolve base cache id
	var baseId = require.resolve(id);
	// check cache for named module
	var namedId = namespaceId(baseId, name);
	var namedModule = require.cache[namedId];
	if (namedModule) {
		return namedModule;
	}
	// hold reference to base cache entry
	var baseCacheEntries = getCacheEntries(require.cache, baseId);
	// delete base cache entry
	deleteCacheEntries(require.cache, baseCacheEntries);
	// load an new module into cache
	namedModule = require(id);
	// hold reference to named cache entry
	var namedCacheEntries = getCacheEntries(require.cache, baseId);
	// namespace cache entry
	namedCacheEntries = namespaceCacheEntries(namedCacheEntries, name);
	// set base and named cache entries to the appropriate keys in the cache
	addCacheEntries(require.cache, baseCacheEntries);
	addCacheEntries(require.cache, namedCacheEntries);
	return namedModule;
}

function namespaceId(id, name) {
	return id + ':' + name;
}

function getCacheEntries(cache, id) {
	var cacheEntries = [];
	var cacheEntry = cache[id];
	if (typeof cacheEntry === 'undefined') {
		return cacheEntries;
	}
	cacheEntries.push(cacheEntry);
	var children = cacheEntry.children;
	for (var i = 0; i < children.length; i++) {
		var childId = children[i].id;
		cacheEntries = cacheEntries.concat(getCacheEntries(cache, childId));
	}
	return cacheEntries;
}

function namespaceCacheEntries(cacheEntries, namespace) {
	var namespacedCacheEntries = [];
	for (var i = 0; i < cacheEntries.length; i++) {
		var cacheEntry = cacheEntries[i];
		cacheEntry.id = namespaceId(cacheEntry.id, namespace);
		namespacedCacheEntries.push(cacheEntry);
	}
	return namespacedCacheEntries;
}

function deleteCacheEntries(cache, cacheEntries) {
	for (var i = 0; i < cacheEntries.length; i++) {
		var cacheEntry = cacheEntries[i];
		delete cache[cacheEntry.id];
	}
}

function addCacheEntries(cache, cacheEntries) {
	for (var i = 0; i < cacheEntries.length; i++) {
		var cacheEntry = cacheEntries[i];
		cache[cacheEntry.id] = cacheEntry;
	}
}

module.exports = namedRequire;