'use strict';

// const HashMap = require('./hashMapOA');
const HashMap = require('./hashMapSC');

//////////////////////////////////////////////////////////////////////////

const checkAnyPermutationIsPalindrome = string => {
  //if there is an odd number of more than one letter = false;
  const HM = new HashMap();
  for (const char of string) {
    let num;
    try {
      num = HM.get(char);
    } catch (err) {
      num = 0;
    }
    HM.set(char, num + 1);
  }
  console.log(HM);
  if (HM.length === 0) {
    throw new Error('Empty HashMap');
  }

  let odd = 0;
  for (const char of string) {
    if (HM.get(char) % 2 !== 0) {
      odd++;
    }
    console.log(odd);
    if (odd > 1) {
      return false;
    }
  }
  return true;
};

//////////////////////////////////////////////////////////////////////////

const anagramGrouping = arr => {
  const HM = new HashMap();
  const returnArr = [];
  const sortedKeyArr = [];
  for (const item of arr) {
    let sortedKey = item
      .split('')
      .sort()
      .join('');

    try {
      let prevItem = HM.get(sortedKey);
      HM.set(sortedKey, [...prevItem, item]);
    } catch (err) {
      HM.set(sortedKey, [item]);
      sortedKeyArr.push(sortedKey);
    }
  }

  for (const group of sortedKeyArr) {
    returnArr.push(HM.get(group));
  }
  return returnArr;
};

//////////////////////////////////////////////////////////////////////////

const main = () => {
  const lor = new HashMap();

  const inputLor = [
    { Hobbit: 'Bilbo' },
    { Hobbit: 'Frodo' },
    { Wizard: 'Gandolf' },
    { Human: 'Aragon' },
    { Elf: 'Legolas' },
    { Maiar: 'The Necromancer' },
    { Maiar: 'Sauron' },
    { RingBearer: 'Gollum' },
    { LadyOfLight: 'Galadriel' },
    { HalfElven: 'Arwen' },
    { Ent: 'Treebeard' }
  ];

  for (const item of inputLor) {
    lor.set(Object.keys(item)[0], Object.values(item)[0]);
  }

  //The set method is overriding the values. Is this ok?
  // console.log(lor.get('Maiar'));
  // console.log(lor.get('Hobbit'));

  // console.log(checkAnyPermutationIsPalindrome('acecarr')); // True
  // console.log(checkAnyPermutationIsPalindrome('north')); // False

  // const inputArr = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
  // console.log(anagramGrouping(inputArr));
};

main();
