import {Tree} from "../src/Tree"

test.each([
	['1 + 1', 2],
	['2 + 2 * 2', 6],
	['(1 + 2) * ( 3 - 4 ) * 9', -27],
	['((1 + 1) / 2 - (5 * (3 + 1)))', -19],
])('%s === %i', (expr, result) => {
	const tree = new Tree()
	tree.expr(expr)
	expect(tree.solve()).toBe(result)
})

test.todo('Insertion and deleting nodes')
