"use strict"
Object.defineProperty(exports, "__esModule", {value: true})
exports.TreeBuilder = void 0
var Node_1 = require("./Node")
var types_1 = require("./types")
var TreeBuilder = /** @class */ (function () {
	function TreeBuilder(expression) {
		this.expression = expression
		this.tokens = expression.split('').filter(function (el) {
			return el !== ' '
		})
		this.root = new Node_1.Node()
		console.log(this)
		this.gen(this.tokens, this.root)
	}

	TreeBuilder.prototype.gen = function (tokens, root) {
		var token = tokens[0]
		if (token === types_1.LEFT_PARENTHESIS) {
			root.left = new Node_1.Node()
			this.gen(tokens.slice(1), root.left)
		} else if (types_1.operators.includes(token)) {
			root.value = token
			root.type = Node_1.NodeType.Operator
			root.right = new Node_1.Node()
			this.gen(tokens.slice(1), root.right)
		} else if (!isNaN(parseFloat(token))) {
			root.value = token
			root.type = Node_1.NodeType.Number
			return
		} else if (token === types_1.RIGHT_PARENTHESIS) {
			return
		} else {
			throw new Error("Unknown character " + token)
		}
	}
	TreeBuilder.prototype.print = function () {
		// tslint:disable
		// @ts-ignore
		function printNode(printFn, node, leftKey, rightKey, displayKey, indent) {
			// default to empty string to avoid logging the word 'undefined'
			indent = indent || ''
			// current item's indentation prefix
			// tslint:disable-next-line:prefer-const
			var prefix = indent + '\\-'
			var leftChild = leftKey.constructor === Function ? leftKey(node) : node[leftKey],
				rightChild = rightKey.constructor === Function ? rightKey(node) : node[rightKey]
			var displayStr = displayKey.constructor === Function ? displayKey(node) : node[displayKey]
			printFn(prefix + ' ' + displayStr)
			// recurse left
			if (!!leftChild)
				printNode(printFn, leftChild, leftKey, rightKey, displayKey, indent + (!!rightChild ? ' |' : '  '))
			// recurse right
			if (!!rightChild)
				printNode(printFn, rightChild, leftKey, rightKey, displayKey, indent + '  ')
		}

		// tslint:enable
		printNode(console.log, this.root, 'left', 'right', 'value', undefined)
	}
	return TreeBuilder
}())
exports.TreeBuilder = TreeBuilder
