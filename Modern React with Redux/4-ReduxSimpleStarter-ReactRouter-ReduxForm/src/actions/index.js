import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=LNWPOR1234';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts/${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

// export function createPost(values){
export function createPost(values, callback){
    // const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values);
    //2nd argument = object ที่ต้องการสยิง่งไป

    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(()=>callback());
    // = api request เสร็จแล้ว ค่อยใช้ callback ที่ส่งเข้ามาตอนเรียก createPost
    
    return {
        type: CREATE_POST,
        payload: request
        // จะลัดเอา values มายัดใส่ state เลยไม่ได้ เพราะ มันไม่มี id มาด้วยหนิ ต้องรอ id จาก server ก่อน
    }
}

// ต้องคิดว่า user อาจเข้าหน้า detail ด้วย url ก็ได้
// ไม่ได้อาจกดมาจากหน้าแรกเราก่อนเสมอ
// ดังนั้นจะใช้วิธีเอาข้อมูลที่ fetch จากหน้าแรกมาแล้วมาใช้หน้า detail ไม่ได้
// ดังนั้นต้อง fetch ใหม่เองของแต่ละหน้า detail ตาม id จาก url
export function fetchPost(id){
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(id, callback){
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(()=>callback());
    return {
        type: DELETE_POST,
        payload: id
        // ไม่จำเป็นต้องเอามาทั้งก้อน post request เอาแค่ id ไปให้ reducer ลบ post id นั้นออกจาก state ก็พอ
    }
}