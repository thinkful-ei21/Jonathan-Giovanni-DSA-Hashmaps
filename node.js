'use strict';

class _Node {
  constructor(value, next) {
    console.log('node being called with', value)
    this.value = value;
    this.next = next;
  }
}

module.exports = _Node;
