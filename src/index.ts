import {Tree} from './Tree'

const expr = '1 + 4 * (1 + 3)'
const tree = new Tree()
tree.expr(expr)
// tree.print()
tree.remove(2, 2)
tree.insert('+', 2, 2)
tree.insert('2', 3, 3)
tree.insert(3, 3, 4)
tree.insert('*', 2, 2)
tree.print()
console.log(tree.solve())
