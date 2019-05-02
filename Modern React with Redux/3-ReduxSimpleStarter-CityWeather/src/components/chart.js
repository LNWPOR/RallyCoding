// 1. ต้องเป็น component หรือ container
// => แค่รับค่ามาใช้ ไม่ได้มีการคุยอะไรกับ redux ดังนั้น ไม่ต้องเป้น container เป็นแค่ component พอ
// 2. ต้องเป็น class base หรือ function base component
// => เนื่องจากไม่ได้มีการใช้ component state อะไรเลย มีแค่รับ props มาใช้แล้ว rerender ดังนั้น เป็น function base ก็พอ


// จะสังเกตว่าเอา component แยกชิ้นมาอย่างนี้ นอกจะจากแก้ไข DRY Code แล้ว
// ยังสามารถเอา component นี้ไปใช้กับโปรเจคอื่นได้เลยทันทีอีกด้วย

import _ from 'lodash';
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines'; // ไว้ใช้วาดกราฟ

// เรียกฟังชันก์แบบนี้ว่า helper
function average(data){
    return _.round(_.sum(data)/data.length);
}

export default (props) =>{
    return (
        <div>
            <Sparklines height={120} width={180} data={props.data}>
                <SparklinesLine color={props.color} />
                <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{average(props.data)} {props.units}</div>
        </div>
    );
}