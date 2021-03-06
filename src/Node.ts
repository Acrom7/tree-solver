export class Node {
    value: string | number
    left: Node | null
    right: Node | null

    constructor(nodeValue: string | number = ' ') {
        this.value = nodeValue
        this.left = null
        this.right = null
    }
}
