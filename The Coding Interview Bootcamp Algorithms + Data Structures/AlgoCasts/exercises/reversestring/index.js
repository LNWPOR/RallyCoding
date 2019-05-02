// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

function reverse(str) {
  let temp = '';
  for(let i = str.length-1; i > -1 ; i--){
    temp += str[i];
  }
  return temp;
}

reverse('test');

module.exports = reverse;
