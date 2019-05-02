// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

function reverse(str) {
  return str.split('').reduce((rev, char) => char + rev, '');
  // show การใช้ arry ให้ interviewer อึ้งไปเลย
  // reduce รับค่า 2 ค่า คือ function และ ค่าตั้งต้นของตัวแปรตังหนึ่ง
  // โดยมันจะเอา ตัวแปรตัวนั้นไปใส่เป็น argument แรก ของ function ดังกล่าว
  // แล้ว result ที่ return จาก function ดังกล่าวก็จะเป็นตัวแปลตั้งต้นในรอบถัดๆไปแทน
  // ส่วน argrument อื่น ของ function นั้นก็ตาม array ปกติ
}

module.exports = reverse;

// function reverse(str) {
//   return str
//     .split('') // เปลี่ยน str เป็น array ของแต่ละ char
//     .reverse() // กลับตำแหน่ง array // บางที่อาจไม่อยากให้ใช้ท่านี้ ดูโกงไป
//     .join(''); // เอา ของในแต่ล index มารวมกัน เป็น string
// }

// function reverse(str) {
//   let reversed = '';
//
//   for (let character of str) {
//     reversed = character + reversed;
//   }
//
//   return reversed;
// }
