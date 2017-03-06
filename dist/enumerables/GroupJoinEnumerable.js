'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IEnumerable = require('./../IEnumerable');

var core = require('./../core/core');

var defaultEqualityComparer = require('./../methods/defaultEqualityComparer');
var defaultSelector = require('./../methods/defaultSelector');

var IGrouping = require('./IGrouping');
var Entry = require('./Entry');

var GroupJoinEnumerable = function (_IEnumerable) {
    _inherits(GroupJoinEnumerable, _IEnumerable);

    function GroupJoinEnumerable(outer, inner, resultSelector) {
        var outerKeySelector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSelector;
        var innerKeySelector = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultSelector;
        var comparer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultEqualityComparer;

        _classCallCheck(this, GroupJoinEnumerable);

        var _this = _possibleConstructorReturn(this, (GroupJoinEnumerable.__proto__ || Object.getPrototypeOf(GroupJoinEnumerable)).call(this, outer));

        core.defineProperty(_this, Symbol.iterator, regeneratorRuntime.mark(function _callee2() {
            var _this2 = this;

            var innerTemp, outerIndex, innerIndex, innerIterator, innerHasNext, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

            return regeneratorRuntime.wrap(function _callee2$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            innerTemp = [], outerIndex = 0, innerIndex = 0, innerIterator = inner[Symbol.iterator]();

                            innerHasNext = function innerHasNext() {
                                var next = innerIterator.next();
                                if (!next.done) {
                                    var innerElement = next.value;
                                    innerTemp.push(new Entry(innerKeySelector(innerElement, innerIndex++), innerElement));
                                }
                                return !next.done;
                            };

                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context3.prev = 5;
                            _loop = regeneratorRuntime.mark(function _loop() {
                                var outerElement, outerKey;
                                return regeneratorRuntime.wrap(function _loop$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                outerElement = _step.value;
                                                outerKey = outerKeySelector(outerElement, outerIndex++);
                                                _context2.next = 4;
                                                return resultSelector(outerElement, new IGrouping(outerKey, _defineProperty({}, Symbol.iterator, regeneratorRuntime.mark(function _callee() {
                                                    var index;
                                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                                        while (1) {
                                                            switch (_context.prev = _context.next) {
                                                                case 0:
                                                                    index = 0;

                                                                case 1:
                                                                    if (!(innerTemp.length > index || innerHasNext())) {
                                                                        _context.next = 9;
                                                                        break;
                                                                    }

                                                                    if (!(innerTemp.length > index)) {
                                                                        _context.next = 7;
                                                                        break;
                                                                    }

                                                                    if (!comparer(outerKey, innerTemp[index].key)) {
                                                                        _context.next = 6;
                                                                        break;
                                                                    }

                                                                    _context.next = 6;
                                                                    return innerTemp[index].value;

                                                                case 6:
                                                                    index++;

                                                                case 7:
                                                                    _context.next = 1;
                                                                    break;

                                                                case 9:
                                                                case 'end':
                                                                    return _context.stop();
                                                            }
                                                        }
                                                    }, _callee, this);
                                                }))));

                                            case 4:
                                                outerIndex++;

                                            case 5:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _loop, _this2);
                            });
                            _iterator = outer[Symbol.iterator]();

                        case 8:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context3.next = 13;
                                break;
                            }

                            return _context3.delegateYield(_loop(), 't0', 10);

                        case 10:
                            _iteratorNormalCompletion = true;
                            _context3.next = 8;
                            break;

                        case 13:
                            _context3.next = 19;
                            break;

                        case 15:
                            _context3.prev = 15;
                            _context3.t1 = _context3['catch'](5);
                            _didIteratorError = true;
                            _iteratorError = _context3.t1;

                        case 19:
                            _context3.prev = 19;
                            _context3.prev = 20;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 22:
                            _context3.prev = 22;

                            if (!_didIteratorError) {
                                _context3.next = 25;
                                break;
                            }

                            throw _iteratorError;

                        case 25:
                            return _context3.finish(22);

                        case 26:
                            return _context3.finish(19);

                        case 27:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee2, this, [[5, 15, 19, 27], [20,, 22, 26]]);
        }));
        return _this;
    }

    return GroupJoinEnumerable;
}(IEnumerable);

;

module.exports = GroupJoinEnumerable;