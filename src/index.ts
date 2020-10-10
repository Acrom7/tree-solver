import {Tree} from './Tree'

const expr = '1 + 4 * (1 + 3)'
const tree = new Tree()
tree.expr(expr)
tree.insert('+', 2, 1)
tree.insert('1', 3, 1)
tree.insert('1', 3, 2)
tree.print()
console.log(tree.solve())
