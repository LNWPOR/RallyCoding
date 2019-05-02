// SurveyField contains logic to render a single
// label and text input

import React from 'react';

// export default (props)=>{
// ได้ props มาจาก redux form
// console.log(props);
export default ({input, label, meta: {error, touched}})=>{

    return (
        <div>
            <label>{label}</label>
            {/* เหมือนกับทำ <input onBlur={...} onChange={.....} ...ครบทุกอันที่มีมาให้ /> */}
            <input {...input} style={{ marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error} {/*โดน touch ก่อน กับต้อง มี error จึงค่อยโชว์ error ไม่ใช่มาปุ้ป render เสร็จโชว์ error เลย*/}
            </div>
        </div>
    );
};