'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IEnumerable = require('./../IEnumerable');

var core = require('./../core/core');

var IteratorEnumerable = function (_IEnumerable) {
    _inherits(IteratorEnumerable, _IEnumerable);

    function IteratorEnumerable(iterable) {
        _classCallCheck(this, IteratorEnumerable);

        var _this = _possibleConstructorReturn(this, (IteratorEnumerable.__proto__ || Object.getPrototypeOf(IteratorEnumerable)).call(this, iterable));

        core.defineProperty(_this, Symbol.iterator, regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.delegateYield(iterable, 't0', 1);

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
        return _this;
    }

    return IteratorEnumerable;
}(IEnumerable);

;

module.exports = IteratorEnumerable;