'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IEnumerable = require('./../IEnumerable');

var core = require('./../core/core');

var Enumerable = require('./../Enumerable');

var defaultEqualityComparer = require('./../methods/defaultEqualityComparer');

var ExceptEnumerable = function (_IEnumerable) {
    _inherits(ExceptEnumerable, _IEnumerable);

    function ExceptEnumerable(source, other) {
        var comparer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultEqualityComparer;

        _classCallCheck(this, ExceptEnumerable);

        var _this = _possibleConstructorReturn(this, (ExceptEnumerable.__proto__ || Object.getPrototypeOf(ExceptEnumerable)).call(this, source));

        core.defineProperty(_this, Symbol.iterator, regeneratorRuntime.mark(function _callee() {
            var temp, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, element;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            temp = [];
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 4;
                            _iterator = source[Symbol.iterator]();

                        case 6:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 16;
                                break;
                            }

                            element = _step.value;

                            if (Enumerable.contains(other, element, comparer)) {
                                _context.next = 13;
                                break;
                            }

                            if (Enumerable.contains(temp, element, comparer)) {
                                _context.next = 13;
                                break;
                            }

                            temp.push(element);
                            _context.next = 13;
                            return element;

                        case 13:
                            _iteratorNormalCompletion = true;
                            _context.next = 6;
                            break;

                        case 16:
                            _context.next = 22;
                            break;

                        case 18:
                            _context.prev = 18;
                            _context.t0 = _context['catch'](4);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 22:
                            _context.prev = 22;
                            _context.prev = 23;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 25:
                            _context.prev = 25;

                            if (!_didIteratorError) {
                                _context.next = 28;
                                break;
                            }

                            throw _iteratorError;

                        case 28:
                            return _context.finish(25);

                        case 29:
                            return _context.finish(22);

                        case 30:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[4, 18, 22, 30], [23,, 25, 29]]);
        }));
        return _this;
    }

    return ExceptEnumerable;
}(IEnumerable);

;

module.exports = ExceptEnumerable;