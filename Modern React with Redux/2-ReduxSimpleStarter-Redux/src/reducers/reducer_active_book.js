// reducer ต้องรับ parameter 2 ค่า คือ state,action
// State argument is not application state, only the state
// this reducer is responsible for
// คือบอกว่า state ที่กล่าวถึงนี้นั้นไม่ได้หมายถึง state ของทั้ง app แต่หมายถึง
// state ที่ map ไว้กับ reducer ด้วย combineReducers ที่ index
export default function(state = null, action){
    // เนื่องจาก ทุกครั้งที่มีการ dispatch ดังนั้น reducer ฟังชันนี้ก็จะถูกเรียก
    // ดังนั้น reducer ก้จะสนใจแค่ action ที่สนใจ
    // ถ้าไม่ใช่ action ที่สนใจ ก็จะ "return state เก่า" กลับคืนไป ไม่ทำอะไร
    // ถ้าใช่ ก็จะ "สร้าง state ใหม่" แล้ว return กลับไป
    // จากนั้นตอน return ก็จะนำ piece state จากทุกๆ reducer มารวมกัน return ไปมองเป็น global application state
    // (เนื่องจาก action อะไรก็ตามเกิดขึ้น ทุก reducer ก็จะถูกเรียกใช้ และต้องมี การ return เลย return รวมๆกันเป็น global state )
    // แล้ว global application state ทีรวบรวม piece of state จาก ทุกๆ reducer นั้นก็จะถูกนำไปส่งกลับให้ทุกๆ container
    // container re-render and update view
    switch(action.type){
        case 'BOOK_SELECTED':
            return action.payload;
            // reducer ต้อง return fresh object
            // ดังนั้นห้ามทำแบบนี้
            /*
                state.title = book.title
                return state
            */
    }

    return state;
    // ห้ามเป็น undefind เด็ดขาด ถ้าเป็น undefind Redux จะมองเป็น error
    // ดังนั้นตอน start app ครั้งแรกจึงต้องมีการกำหนดค่าเริ่มต้นไว้ให้ ไม่งั้นจะ error
    // ดังนั้น กำหนด ค่าเริ่มต้น state = null ไว้
    // ดังนั้น ที่ตอนเอาค่า state ไปใช้ จะต้องมีดัง null ไว้ เพราะ อาจเป็นกรณีพึ่งเปิด app

    // ตอนแรกที่ start app นั้น action ก็จะมีค่า default จาก redux มาเช่นกัน
}

// ดังนั้นมองว่า reducer = ตัวจัดการเรื่อง state เวลามี action เกิดขึ้น