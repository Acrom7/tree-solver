"use strict"
Object.defineProperty(exports, "__esModule", {value: true})
exports.Node = exports.NodeType = void 0
var NodeType;
(function (NodeType) {
	NodeType["Number"] = "Number"
	NodeType["Operator"] = "Operator"
	NodeType["Empty"] = "Empty"
})(NodeType = exports.NodeType || (exports.NodeType = {}))
var Node = /** @class */ (function () {
	function Node(nodeValue, nodeType) {
		if (nodeValue === void 0) {
			nodeValue = ''
		}
		if (nodeType === void 0) {
			nodeType = NodeType.Empty
		}
		this.type = nodeType
		this.value = nodeValue
		this.left = null
		this.right = null
	}

	return Node
}())
exports.Node = Node
