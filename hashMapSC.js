'use strict';

const { LinkedList } = require('./linked-list');

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  //get will have to look through list to find key (pre-hash) calling find method
  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key Error');
    }

    let currNode = this._slots[index].head;

    if (!this._slots[index].head) {
      return null;
    }
    while (currNode.value.key !== key) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }

    return currNode.value;
  }

  //set will have to add to a list and call insertLast method
  set(key, value) {
    //might need to change something here to deal with changes in deletion
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);

    const kvPair = { key, value };

    if (this._slots[index] === undefined) {
      this._slots[index] = new LinkedList();
    }

    let currNode = this._slots[index].head;
    if (currNode === null) {
      this._slots[index].insertLast(kvPair);
    } else {
      while (currNode !== null) {
        if (currNode.value.key === key) {
          currNode.value.value = value;
        } else if (currNode.next === null) {
          this._slots[index].insertLast(kvPair);
        }
        currNode = currNode.next;
      }
    }

    // if (!this._slots[index]) {
    this.length++;
    // }
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key Error');
    }

    this.length--;
    this._deleted++;

    if (!slot.head) {
      return null;
    }

    if (slot.head.value.key === key) {
      slot.head = slot.head.next;
      return;
    }

    let currNode = slot.head;
    let prevNode = slot.head;

    while (currNode !== null && currNode.value.key !== key) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    if (currNode === null) {
      console.log('Item Not Found');
      return;
    }

    prevNode.next = currNode.next;
  }

  //this will be simplified bcs we won't have to travesrse
  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    return start;

    // for (let i = start; i < start + this._capacity; i++) {
    //   const index = i % this._capacity;
    //   const slot = this._slots[index];
    //   if (slot === undefined || (slot.key === key && !slot.deleted)) {
    //     return index;
    //   }
    // }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];
    // console.log(oldSlots);
    for (const slot of oldSlots) {
      if (slot !== undefined && slot.head !== null) {
        let currNode = slot.head;
        while (currNode !== null) {
          this.set(currNode.value.key, currNode.value.value);
          currNode = currNode.next;
        }
      }
    }
    // console.log(this._slots);
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

module.exports = HashMap;
