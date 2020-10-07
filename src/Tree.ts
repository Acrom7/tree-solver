import {Node, NodeType} from './Node'
import {operators} from './types'

export class Tree {
    expression: string
    tokens: string[]
    root: Node

    constructor(expression: string) {
        this.expression = expression
        this.tokens = expression.split('').filter(el => el !== ' ')
        this.root = new Node()
        this.gen(this.tokens, this.root)
    }

    gen(tokens: string[], root: Node): void {
        if (tokens.length === 1) {
            root.value = tokens[0]
            root.type = NodeType.Number
            return
        }
        const lowPriorityIndex = this.getLowPriorityToken(tokens)
        // Если нет оператора вне скобок
        if (lowPriorityIndex === -1) {
            this.gen(tokens.slice(1, -1), root)
            return
        }
        root.value = tokens[lowPriorityIndex]
        root.type = NodeType.Operator
        root.left = new Node()
        this.gen(tokens.slice(0, lowPriorityIndex), root.left)
        root.right = new Node()
        this.gen(tokens.slice(lowPriorityIndex + 1), root.right)
    }

    // Возвращает приоритет оператора: чем больше возращаемое значение - тем больше приоритет
    getPriority = (operator: string): number => {
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
    getLowPriorityToken = (tokensArray: string[]): number => {
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

    print() {
        // tslint:disable
        // @ts-ignore
        function printNode(printFn, node, leftKey, rightKey, displayKey, indent) {
            // default to empty string to avoid logging the word 'undefined'
            indent = indent || ''

            // current item's indentation prefix
            // tslint:disable-next-line:prefer-const
            var prefix = indent + '\\-'

            var leftChild = leftKey.constructor === Function ? leftKey(node) : node[leftKey],
                rightChild = rightKey.constructor === Function ? rightKey(node) : node[rightKey]

            var displayStr = displayKey.constructor === Function ? displayKey(node) : node[displayKey]
            printFn(prefix + ' ' + displayStr)

            // recurse left
            if (!!leftChild) printNode(printFn, leftChild, leftKey, rightKey, displayKey, indent + (!!rightChild ? ' |' : '  '))
            // recurse right
            if (!!rightChild) printNode(printFn, rightChild, leftKey, rightKey, displayKey, indent + '  ')
        }

        // tslint:enable
        printNode(console.log, this.root, 'left', 'right', 'value', undefined)
    }
}
