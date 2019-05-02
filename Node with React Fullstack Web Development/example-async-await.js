// write a function to retrieve a blob of json
// make an ajax request! Use the 'fetch' function.
// https://rallycoding.herokuapp.com/api/music_albums


// function fetchAlbums(){
//     fetch('https://rallycoding.herokuapp.com/api/music_albums')
//         .then(res => res.json())
//         .then(json => console.log(json));
// }

// ประกาศ async ไว้เพื่อบอกว่าฟังชันนี้มี async code // มี promise
// อ่านง่ายกว่า
// ต้อง browser ใหม่ๆ
// ต้อง node v8 up
// async function fetchAlbums(){
const fetchAlbums = async () => {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums') // บรรทัดต่อไปจะยังไม่ทำ จนกว่า promise จะเสร็จ // ดูเทียบเหมือน .then แบบเก่า
    const json = await res.json()
    
    console.log(json);
}

fetchAlbums();