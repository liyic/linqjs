const IEnumerable = require('./../IEnumerable');

const core = require('./../core/core');

const Enumerable = require('./../Enumerable');

const defaultEqualityComparer = require('./../methods/defaultEqualityComparer');

class UnionEnumerable extends IEnumerable {
    constructor(source, other, comparer = defaultEqualityComparer) {
        super(source);
        core.defineProperty(this, Symbol.iterator, function*() {
            let temp = [];
            for (let element of source) {
                if (!Enumerable.contains(temp, element, comparer)) {
                    temp.push(element);
                    yield element;
                }
            }
            for (let element of other) {
                if (!Enumerable.contains(temp, element, comparer)) {
                    temp.push(element);
                    yield element;
                }
            }
        });
    };
};

module.exports = UnionEnumerable;