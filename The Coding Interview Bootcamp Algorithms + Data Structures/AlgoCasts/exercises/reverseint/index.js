// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

function reverseInt(n) {
  if (n===0) return n;
  let reversed = n.toString().split('').reduce((rev,char)=>char+rev,'').split('').filter(str=>str!=='-');
  const firstNumberIndex = reversed.findIndex(element => element !== 0);
  if(firstNumberIndex){
    reversed = reversed.slice(firstNumberIndex+1, reversed.length);
  }
  reversed = Math.sign(n) === 1 ? reversed:['-',...reversed];
  reversed = parseInt(reversed.join(''));
  return reversed;
}

module.exports = reverseInt;
