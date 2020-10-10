import {Node, NodeType} from './Node'
import {operators} from './types'
// @ts-ignore
import {treeFromArray, treeToASCII} from '../node_modules/treevis/tree'

export class Tree {
    root: Node

    constructor() {
        this.root = new Node()
    }

    get height() {
        return this.getHeight(this.root)
    }

    expr(expression: string) {
        const tokens = expression.split('').filter(el => el !== ' ')
        this.gen(tokens, this.root)
    }

    solve({left, right, value}: Node = this.root): any {
        if (!isNaN(parseFloat(value as string))) {
            return parseFloat(value as string)
        } else if (operators.includes(value as string)) {
            switch (value) {
                case '+':
                    return this.solve(left as Node) + this.solve(right as Node)
                case '-':
                    return this.solve(left as Node) - this.solve(right as Node)
                case '*':
                    return this.solve(left as Node) * this.solve(right as Node)
                case '/':
                    return this.solve(left as Node) / this.solve(right as Node)
            }
        } else {
            throw Error(`Invalid character ${value}`)
        }
    }

    print() {
        const array = this.toArray(this.root)
        treeToASCII(treeFromArray(array))
    }

    printFullTree() {
        const emptyTree = this.getFullEmptyTree(this.height)
        const fullTree = this.getFullTree(this.root, emptyTree)
        const array = this.toArray(fullTree)
        treeToASCII(treeFromArray(array))
    }

    insert(value: string | number, level: number, position: number): number {
        let currentNode = this.root
        let localPosition = position
        let currentLevel = 1
        while (level !== currentLevel) {
            const middle = Math.pow(2, level - currentLevel - 1)
            // Если нужна позиция больше чем середина (для текущего уровня)
            if (localPosition > middle) {
                if (currentNode.right === null) {
                    // Если справа пустая Node, но она нам и нужна
                    if (level === currentLevel + 1 && localPosition <= 2) {
                        currentNode.right = new Node(value)
                        return 0
                    }
                    return -1
                }
                localPosition -= middle
                currentNode = currentNode.right
                currentLevel++
            } else {
                if (currentNode.left === null) {
                    // Если справа пустая Node, но она нам и нужна
                    if (level === currentLevel + 1) {
                        currentNode.left = new Node(value)
                        return 0
                    }
                    return -1
                }
                currentNode = currentNode.left
                currentLevel++
            }
        }
        currentNode.value = value
        return 0
    }

    private gen(tokens: string[], root: Node): void {
        if (tokens.length === 1) {
            root.value = tokens[0]
            return
        }
        const lowPriorityIndex = this.getLowPriorityToken(tokens)
        // Если нет оператора вне скобок
        if (lowPriorityIndex === -1) {
            this.gen(tokens.slice(1, -1), root)
            return
        }
        root.value = tokens[lowPriorityIndex]
        root.left = new Node()
        this.gen(tokens.slice(0, lowPriorityIndex), root.left)
        root.right = new Node()
        this.gen(tokens.slice(lowPriorityIndex + 1), root.right)
    }

    private getHeight(root: Node | null): number {
        if (root === null) {
            return 0
        }
        return 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right))
    }

    private getLevel(root: Node | null): number {
        const height = this.getHeight(root)
        const fullHeight = this.getHeight(this.root)
        return fullHeight - height + 1
    }

    // Возвращает приоритет оператора: чем больше возращаемое значение - тем больше приоритет
    private getPriority = (operator: string): number => {
        // Сгруппированы в порядке возрастания приоритета
        const operatorsPriority = [['+', '-'], ['*', '/']]
        for (let i = 0; i < operatorsPriority.length; ++i) {
            if (operatorsPriority[i].includes(operator)) {
                return i
            }
        }
        return -1
    }

    // Возвращает индекс оператора с наименьшим приоритетом
    private getLowPriorityToken = (tokensArray: string[]): number => {
        let lowPriority = Number.MAX_VALUE
        let index = -1
        let parenthesesCount = 0
        for (let i = 0; i < tokensArray.length; ++i) {
            const token = tokensArray[i]
            if (operators.includes(token) && parenthesesCount === 0) {
                const tokenPriority = this.getPriority(token)
                if (tokenPriority < lowPriority) {
                    lowPriority = tokenPriority
                    index = i
                }
            } else if (token === '(') {
                ++parenthesesCount
            } else if (token === ')') {
                --parenthesesCount
            }
        }
        return index
    }

    private getFullEmptyTree(height: number, root?: Node | undefined) {
        if (root === undefined) {
            root = new Node()
        }
        if (height > 1) {
            root.left = new Node()
            root.right = new Node()
            this.getFullEmptyTree(height - 1, root.left)
            this.getFullEmptyTree(height - 1, root.right)
        }
        return root
    }

    private toArray(root: Node): (string | number | null)[] {
        const stack: (Node | null)[] = [root]
        const result: (string | number | null)[] = []
        while (stack.length !== 0) {
            const first = stack.shift()
            if (first) {
                stack.push(first.left, first.right)
            }
            if (first) {
                result.push(first.value)
            } else {
                result.push(null)
            }
        }
        return result
    }

    private getFullTree(root: Node, fakeRoot: Node) {
        fakeRoot.value = root.value
        if (root.left !== null) {
            this.getFullTree(root.left, fakeRoot.left as Node)
        }
        if (root.right !== null) {
            this.getFullTree(root.right, fakeRoot.right as Node)
        }
        return fakeRoot
    }
}
