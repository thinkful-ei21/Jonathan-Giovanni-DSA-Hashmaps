'use strict';

const {LinkedList, display} = require('./linked-list');


class HashMap {
  constructor(initialCapacity = 20) {
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
    return this._slots[index].value;
  }

  //set will have to add to a list and call insertLast method
  set(key, value) {

    //might need to change something here to deal with changes in deletion
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    
    const index = this._findSlot(key);
    // console.log(value, index);

    const kvPair = {key, value};

    if(this._slots[index] === undefined){
      
      this._slots[index] = new LinkedList();    
    }

    const obj = this._slots[index].find(key);
    console.log(this._slots[index])
    if(obj === null){
      this._slots[index].insertLast(kvPair);
    }
    else{
      this._slots[index].remove(key);
      this._slots[index].insertLast(kvPair);
    }

    // console.log(display(this._slots[index]));
    // this._slots[index] = {
    //   key,
    //   value,
    //   deleted: false
    // };

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
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  //this will be simplified bcs we won't have to travesrse
  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
  }


  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
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
