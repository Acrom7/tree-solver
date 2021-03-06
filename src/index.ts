import {Tree} from './Tree'

const tree = new Tree()
const arg = process.argv.slice(2)

if (arg.length === 1) {
    tree.expr(arg[0])
    tree.print()
    console.log(tree.solve())
    process.exit(0)
}

const expr = '1 + 1 * 2'
tree.expr(expr)
tree.print()
tree.remove(2, 1)
tree.insert(2, 2, 1)
console.log(tree.solve())
