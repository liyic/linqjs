'use strict';

const GeneratorEnumerable = require('./GeneratorEnumerable');

const Enumerable = require('./../Enumerable');
const IterableEnumerable = require('./IterableEnumerable');

const core = require('./../core/core');

const methods = require('./../methods/methods');
const defaultPredicate = require('./../methods/defaultPredicate');

const NotAncestorOfException = require('./../core/exceptions/NotAncestorOfException');

class ITree extends GeneratorEnumerable {
    constructor(value, generator) {
        super(generator);
        core.defineProperty(this, 'value', () => value, true, true);
        let iterator = this[Symbol.iterator];
        core.defineProperty(this, Symbol.iterator, function ITreeIterator() {
            return iterator();
        });
        core.defineProperty(this, 'children', function() {
            return new GeneratorEnumerable(iterator);
        }, true, true);
    }
    get values() {
        return Enumerable.select(this.children, child => child.value);
    }
    getChild(index) {
        return Enumerable.elementAt(this.children, index);
    }
    getValue(index) {
        return this.getChild(index).value;
    }
    toObject() {
        let obj = {
            key: this.key,
            value: this.value
        };
        let children = Enumerable.select(this, sub => sub.toObject()).toArray();
        if (children.length) {
            obj.children = children;
        }
        if (!core.isUndefined(this.parent)) {
            obj.parent = this.parent;
        }
        return obj;
    }
    /**
     * 广度优先遍历
     */
    breadth() {
        let tree = this;
        return new GeneratorEnumerable(function* () {
            let queue = [ [ tree ] ];
            while (queue.length) {
                for (let element of queue.shift()) {
                    yield element.value;
                    queue.push(element);
                }
            }
        });
    }

    /**
     * 在指定树中的最小公共祖先
     */
    lowestAncestor(root, ...trees) {
        let path = root.pathTo(this);
        for (let tree of trees) {
            path = Enumerable.zip(path, root.pathTo(tree), (pValue, tValue) => pValue === tValue ? pValue : false);
        }
        return Enumerable.takeWhile(path, value => value !== false).last();
    }
    /**
     * 是否是后辈节点
     */
    isDescendantOf(root) {
        return root.isAncestorOf(this);
    }
    /**
     * 是否是祖先节点
     */
    isAncestorOf(node) {
        let search = (result, current) => {
            result.push(current);
            if (current === node || current.value === node.value) {
                return true;
            } else {
                for (let child of current) {
                    if (search(result, child)) {
                        return true;
                    }
                }
                result.pop();
                return false;
            }
        };
        return search([], this);
    }

    /**
     * 搜索当前节点的路径(深度优先搜索)
     */
    path(root) {
        return root.pathTo(this);
    }
    pathTo(node) {
        let search = (result, current) => {
            result.push(current);
            if (current === node || current.value === node.value) {
                return result;
            } else {
                for (let child of current) {
                    if (search(result, child)) {
                        return result;
                    }
                }
                result.pop();
                return false;
            }
        };
        let result = search([], this);
        if (result) {
            return Enumerable.select(result, node => node.value);
        } else {
            throw new NotAncestorOfException(this, node);
        }
    }

    /**
     * 广度
     */
    degree(predicate = defaultPredicate) {
        predicate = methods.asPredicate(predicate);
        return Enumerable.count(this.children, (element, index) => predicate(element.value, index));
    }
    /**
     * 深度
     */
    deep(predicate = defaultPredicate) {
        predicate = methods.asPredicate(predicate);
        return Enumerable.where(this.children, (element, index) => predicate(element.value, index)).maxOrDefault(0, child => child.deep(predicate)) + 1;
    }
    /**
     * 是否为二叉树
     */
    isBinary() {
        return this.degree() <= 2 && Enumerable.all(this.children, child => child.isBinary());
    }
    /**
     * 是否为满二叉树(国际标准)
     */
    isFullBinary() {
        let degree = this.degree();
        return degree === 0 || degree === 2 && Enumerable.all(this.children, child => child.isFullBinary());
    }

    /**
     * 是否为完全二叉树
     */
    isCompleteBinary() {
        let queue = [ this ];
        let current;
        let end = false;
        while (queue.length) {
            current = queue.shift();
            if (end) {
                if (current.degree() !== 0) {
                    return false;
                }
            } else {
                let degree = current.degree();
                if (degree > 2) {
                    return false;
                }
                if (degree !== 2) {
                    end = true;
                }
                queue.push(...current.children);
            }
        }
        return true;
    }

    /**
     * 是否为完美二叉树
     */
    isPerfectBinary() {
        let line = [ this ];
        let nextLine = [];
        let current;
        while (line.length) {
            current = line.shift();
            let degree = current.degree();
            if (degree === 0) {
                if (nextLine.length) {
                    return false;
                }
            } else if (degree === 2) {
                nextLine.push(...current.children);
            } else {
                return false;
            }
            if (!line.length && nextLine.length) {
                line = nextLine;
                nextLine = [];
            }
        }
        return true;
    }
    asBinary() {
        return new BinaryTree(this.value, this[Symbol.iterator]);
    }
}

module.exports = ITree;

const BinaryTree = require('./BinaryTree');