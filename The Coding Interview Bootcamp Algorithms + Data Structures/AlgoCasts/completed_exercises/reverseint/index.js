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
  const reversed = n
    .toString()
    .split('')
    .reverse()
    .join('');

  // parseInt(reversed) มันเอา - ด้านหลัง , 0 ด้านหน้าออกให้ด้วยเลย 5- => 5, 005 => 5 ให้เลย

  return parseInt(reversed) * Math.sign(n);
}

module.exports = reverseInt;
