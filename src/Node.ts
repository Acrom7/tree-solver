export enum NodeType {
    Number = 'Number',
    Operator = 'Operator',
    Empty = 'Empty'
}

export class Node {
    type: NodeType | null
    value: string
    left: Node | null
    right: Node | null

    constructor(nodeValue: string = '', nodeType: NodeType = NodeType.Empty) {
        this.type = nodeType
        this.value = nodeValue
        this.left = null
        this.right = null
    }
}
