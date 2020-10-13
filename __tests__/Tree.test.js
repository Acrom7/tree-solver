import {Tree} from "../src/Tree"

describe('Mathematical expressions', () => {
	test.each([
		['1 + 1', 2],
		['2 + 2 * 2', 6],
		['(1 + 2) * ( 3 - 4 ) * 9', -27],
		['((1 + 1) / 2 - (5 * (3 + 1)))', -19],
		['1 / 0', Infinity],
	])('%s === %d', (expr, result) => {
		const tree = new Tree()
		tree.expr(expr)
		expect(tree.solve()).toBe(result)
	})
})

describe('Inserting nodes', () => {
	let tree

	beforeEach(() => {
		tree = new Tree()
	})

	it('should be simple and return 2', () => {
		tree.insert('+', 1, 1)
		tree.insert('1', 2, 1)
		tree.insert(1, 2, 2)
		expect(tree.solve()).toBe(2)
		expect(tree).toMatchSnapshot()
	})

	it('should throw error on empty tree', () => {
		expect(() => tree.solve()).toThrowError(/empty/i)
		expect(tree).toMatchSnapshot()
	})

	it('should parse expression, insert some nodes, and return 88', () => {
		tree.expr('1 + 2 * (3 + 4)')
		// replace 1 on 11
		tree.insert(11, 2, 1)
		// replace 2 on +, add arguments 5 and 6
		tree.insert('+', 3, 3)
		tree.insert(5, 4, 5)
		tree.insert(6, 4, 6)
		expect(tree.solve()).toBe(88)
		expect(tree).toMatchSnapshot()
	})

	it('should replace root node operator', () => {
		tree.insert('+', 1, 1)
		tree.insert('1', 2, 1)
		tree.insert(1, 2, 2)
		tree.insert('-', 1, 1)
		expect(tree.solve()).toBe(0)
		expect(tree).toMatchSnapshot()
	})

	it('should not insert value into level 2 on empty tree', () => {
		const result = tree.insert('1', 2, 1)
		expect(result).toBe(-1)
		expect(tree).toMatchSnapshot()
	})
})
