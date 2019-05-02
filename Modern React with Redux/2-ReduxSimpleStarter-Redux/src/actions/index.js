export function selectBook(book){
    // selectBook is an ActionCreator, it needs to return an action,
    // an object with a type property.
    return {
        type: 'BOOK_SELECTED',
        payload: book
    };
}

// ทุกครั้งที่เกิด event เช่น user click btn
// ดังนั้น "ควร" ทำการเรียก Action Creator
// Action Creator = function that return action
// action = object
// action will automatically sent to "all" reducers
// reducer จะรับ action มาละเลือกดูว่าจะ return piece of state ไปอย่างไรบ้าง ตาม type ของ action
//      switch(action.type)
// โดย แต่ละ reducer อาจจะสนใจแค่บาง action ก็ได้ action อื่นที่ไม่เกี่ยวกับ reduce ตัวเองก็ไม่ต้องทำอะไร
// combindeReducer map key ให้เรียบร้อย
// กลับมาที่ application state -> mapState to props -> rerender application

// action object ประกอบด้วย Type(must have) และ payload(optional)
// type = describe purpose of the action
// payload = a piece of data that describe the action