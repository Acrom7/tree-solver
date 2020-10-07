import {Node, NodeType} from './Node'
import {Tree} from './Tree'

const expr = '3+4*((5+2)+1)'
const tree = new Tree(expr)
console.log(tree)
tree.print()
