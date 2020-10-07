import {Tree} from './Tree'

const expr = '2 + 4 * (1 + 3)'
const tree = new Tree(expr)
tree.print()
console.log(tree.solve())
