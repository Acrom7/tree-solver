"use strict"
Object.defineProperty(exports, "__esModule", {value: true})
var TreeBuilder_1 = require("./TreeBuilder")
var expr = '(3+(4*5))'
var tree = new TreeBuilder_1.TreeBuilder(expr)
console.log(tree)
tree.print()
