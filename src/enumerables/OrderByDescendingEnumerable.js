const IOrderedEnumerable = require('./IOrderedEnumerable');

const defaultSelector = require('./../methods/defaultSelector');
const defaultComparer = require('./../methods/defaultComparer');
const selectorComparer = require('./../methods/selectorComparer');
const descendingComparer = require('./../methods/descendingComparer');

class OrderByDescendingEnumerable extends IOrderedEnumerable {
    constructor(source, keySelector = defaultSelector, comparer = defaultComparer) {
        super(source, descendingComparer(selectorComparer(keySelector, comparer)));
    }
};

module.exports = OrderByDescendingEnumerable;