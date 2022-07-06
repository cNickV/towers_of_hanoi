class Node {
  constructor(value) {
    this.id = `Tile-${value}`;
    this.value = value;
    this.width = 2 * value;
    this.next = null;
  }
}

class Stack {
  constructor(maxSize) {
    this.top = null;
    this.maxSize = maxSize;
    this.size = 0;
  }

  push(value) {
    let newNode = new Node(value);
    if (!this.top) {
      this.top = newNode;
    } else if (this.size !== this.maxSize && this.top) {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.size++;
    return this;
  }

  peek() {
    if (this.top) {
      return this.top.value;
    } else {
      return null;
    }
  }

  pop() {
    if (this.size > 0) {
      let topNode = this.top;
      this.top = topNode.next;
      topNode.next = null;
      this.size--;
      return topNode;
    }
  }

  traverse() {
    let list = [];
    let currentNode = this.top;
    while (currentNode) {
      let tempNode = Object.assign({}, currentNode);
      tempNode.next = null;
      list.push(tempNode);
      currentNode = currentNode.next;
    }

    return list;
  }
}

export default Stack;
