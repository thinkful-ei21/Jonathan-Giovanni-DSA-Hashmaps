'use strict';

const _Node = require('./node');

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, beforeItem) {
    if (this.head === null) {
      console.log('List Is Empty');
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;

    while (currNode) {
      if (currNode.value === beforeItem) {
        prevNode.next = new _Node(item, currNode);
        return;
      }
      prevNode = currNode;
      currNode = currNode.next;
    }
    prevNode.next = new _Node(item, null);
  }

  insertAfter(item, afterItem) {
    if (this.head === null) {
      console.log('List Is Empty');
      return;
    }

    let currNode = this.head;
    let nextNode = this.head;

    while (currNode) {
      if (currNode.value === afterItem) {
        currNode.next = new _Node(item, nextNode);
        return;
      }
      currNode = nextNode;
      nextNode = nextNode.next;
    }
    currNode.next = new _Node(item, null);
  }

  insertAt(item, position) {
    if (this.head === null) {
      console.log('List Is Empty');
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;

    while (position) {
      if (position === this.getLength() + 1) {
        console.log(this.getLength() + 1);
        this.insertLast(item);
        return;
      }

      position--;

      if (currNode.next === null) {
        console.log('Position Exceedes List Length');
        return;
      }
      prevNode = currNode;
      currNode = currNode.next;

      if (position === 1) {
        prevNode.next = new _Node(item, currNode);
        return;
      }
    }
    prevNode.next = new _Node(item, null);
  }

  find(item) {

    console.log(item)
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    let key;
      
    while (currNode.value !== item && key !== item ) {
      try {key = currNode.value.key;} catch (error) { }
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    let currNode = this.head;
    let prevNode = this.head;

    let key;
    try {key = currNode.value.key;} catch (error) { }
    

    if (this.head.value === item || key === item ) {
      this.head = this.head.next;
      return;
    }

    while (currNode !== null && currNode.value !== item && key !== item) {
      try {key = currNode.value.key;} catch (error) { }
      prevNode = currNode;
      currNode = currNode.next;
    }

    if (currNode === null) {
      console.log('Item Not Found');
      return;
    }

    prevNode.next = currNode.next;
  }

  getLength() {
    let currNode = this.head;
    let listLength = 0;
    while (currNode) {
      listLength++;
      currNode = currNode.next;
    }
    return listLength;
  }
}

// HELPER FUNCTIONS //

function display(SLL) {
  let current = SLL.head,
    displayList = '';

  while (current !== null) {
    displayList += `${current.value} -> `;
    current = current.next;
  }

  return displayList;
}

const getLength = SLL => {
  let currNode = SLL.head;
  let listLength = 0;
  while (currNode) {
    listLength++;
    currNode = currNode.next;
  }
  return listLength;
};

const isEmpty = SLL => {
  if (SLL.head === null) {
    return true;
  }
  if (SLL.head !== null) {
    return false;
  }
};

const findPrev = (SLL, item) => {
  let currNode = SLL.head;
  let prevNode = SLL.head;

  while (currNode) {
    if (currNode.value === item) {
      return prevNode.value;
    }
    prevNode = currNode;
    currNode = currNode.next;
  }
};

const findLast = SLL => {
  let currNode = SLL.head;

  while (currNode) {
    if (currNode.next === null) {
      return currNode.value;
    }
    currNode = currNode.next;
  }
};

module.exports = {
  LinkedList,
  display,
  getLength,
  isEmpty,
  findPrev,
  findLast
};
