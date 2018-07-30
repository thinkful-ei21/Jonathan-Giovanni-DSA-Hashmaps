'use strict';

const HashMap = require('./hashMap');

const checkAnyPermutationIsPalindrome = string => {
  //if is an odd of more than one letter = false;
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

  if (HM.length === 0) {
    throw new Error('Empty HashMap');
  }

  let odd = 0;
  for (const char of string) {
    if (HM.get(char) % 2 !== 0) {
      odd++;
    }
    if (odd > 1) {
      return false;
    }
  }
  return true;
};

const main = () => {
  const lor = new HashMap();

  const input = [
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

  for (const item of input) {
    lor.set(Object.keys(item)[0], Object.values(item)[0]);
  }

  //The set method is overriding the values. Is this ok?
  // console.log(lor.get('Maiar'));
  // console.log(lor.get('Hobbit'));

  console.log(checkAnyPermutationIsPalindrome('acecarr'));
  console.log(checkAnyPermutationIsPalindrome('north'));
};

main();
