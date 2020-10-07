import {Node} from './Node'
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

    gen(tokens: string[], root: Node) {
        // Сгруппированы в порядке возрастания приоритета
        const operatorsPriority = [['+', '-'], ['*', '/']]
        // Возвращает приоритет оператора: чем больше возращаемое значение - тем больше приоритет
        const getPriority = (operator: string): number => {
            for (let i = 0; i < operatorsPriority.length; ++i) {
                if (operatorsPriority[i].includes(operator)) {
                    return i
                }
            }
            return -1
        }
        // Возвращает индекс оператора с наименьшим приоритетом
        const getLowPriorityToken = (tokensArray: string[]): number => {
            let lowPriority = Number.MAX_VALUE
            let index = -1
            for (let i = 0; i < tokensArray.length; ++i) {
                const token = tokensArray[i]
                if (operators.includes(token)) {
                    const tokenPriority = getPriority(token)
                    if (tokenPriority < lowPriority) {
                        lowPriority = tokenPriority
                        index = i
                    }
                }
            }
            return index
        }

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
