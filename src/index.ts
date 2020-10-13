import {Tree} from './Tree'

const expr = '1 + 1'
const tree = new Tree()
tree.expr(expr)
tree.print()
console.log(tree.solve())
