/**
 * Created by wm123 on 2017/2/14.
 */
const Enumerable = require('./linq');

const core = require('./core/core');

module.exports = function() {
	Enumerable.extends(Array.prototype, 'array');

	(function(types, props) {
	    for (let type of types) {
	        for (let prop of props) {
	            let original = type.prototype[prop];
	            core.defineProperty(type.prototype, prop, function() {
	                return Enumerable.asEnumerable(original.apply(this, arguments));
	            });
	        }
	    }
	})([Array, Map, Set, WeakMap, WeakSet], ['keys', 'values', 'entries']);
};