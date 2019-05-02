import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// reduxForm ใช้ช่วยเชื่อมกับ reducerForm ที่เราตั้ง key ไว้ที่ reducer ได้
// อารมณ์เดียวกับ connect
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost} from '../actions';

class PostsNew extends Component {
    renderField(field){ // field argument สำหรับเชื่อมต่อ jsx นี้กับ Field นั้นๆ
        // field argument contain a event handler สำหรับใช้ช่วยให้ Field ที่จะเชื่อมกับ component จากฟังชันก์นี้
        // รู้ว่าต้องเชื่อมกันยังไง

        //ES6 destructuring เอาแค่ field touched,error ของ meta มาสร้าง const ตามชื่อ field นั้นๆให้ 
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input} // เชื่อม event handler จาก Field ให้ input
                    // event handler ที่เชื่อมเข้าไปให้ ได้แก่ เช่น
                    /*
                        onChange={field.input.onChange}
                        onFocus={field.input.onFocus}
                        onBlur={field.input.onBlur}
                    */
                />
                <div className="text-help">
                    {/* {field.meta.touched ? field.meta.error : ''} */}
                    {touched ? error : ''}
                </div>
                {/* show error แค่ตอน field ถูก touch แล้ว */}

                {/* {field.meta.error} */}
                {/* เป็น properties ที่ใส่มาให้ อัตโนมัติจาก validate function */}
            </div>
        );
    }

    onSubmit(values){
        // console.log(values);
        // ทุกครั้งที่จะมีการ save หรือ api request บลาๆ จะต้องนึกถึง actionCreator
        
        
        
        this.props.createPost(values,()=>{
            // ส่ง callback function ไปให้ actionCreator ไว้ใช้เปลี่ยน path ตอน post ได้ response เสร็จแล้ว
            this.props.history.push('/'); // navigate กลับไปที่ route ตามที่ define ไว้
            // เป็น helper function ที่ได้มาจาก react-router จาก การ route
        });
        // this.props.createPost(values);
        // จะเกิด request 2 อัน
        // อันแรก = option request
        // เกิดเนื่องจาก เกิด Cross-Origin Resource Sharing (CORS)
        // = request จาก localhost ไป domain อื่น
        // เป็น security ของ browser ที่จะกัน code แปลกปลอม request ไปยัง domain อื่น
        // อันที่ 2 = post request ของเรา ซึ่งได้ id มาแล้ว
    }
    
    render() {
        const { handleSubmit } = this.props;
        // เป็นหนึ่งใน properties ที่ได้มาจาก redux form ตอนเชื่อมกันข้างล่าง
        // redux form is responsible for handle the state and validation of form
        // not responsible for taking the data to do save/post/sent to backend bla bla
        // ดังนั้น handleSubmit จะช่วย โดยการ รับฟังชันก์ที่เราสร้างขึ้นเอง (เช่นตอนนี้ใช้ onSubmit)
        // ดังนั้น เมื่อ redux form ทำการ validate เสร็จแล้ว และ validate ผ่าน
        // มันก็จะ เรียกฟังชันก์ onSubmit ของเรานั้นให้ เพื่อไปทำงานอื่นๆต่อของเราเอง
        // ดูลำดับด้านล่าง comment อธิบายไว้แล้ว

        return (
            // onSubmit = submit event listener attribute ของ form
            // เมื่อมีการ submit ดังนั้นเรียกฟังชันก์ handleSubmit
            // handleSubmit เมื่อถูกเรียก ดังนั้นจะทำการ validate ตามที่เรา config ไว้
            // ถ้า validate ผ่าน ดังนั้น จะไปเรียกฟังชันก์ที callback ่เราเชื่อมไว้ให้ทำงานต่ออีกที
            // ซึ่งในตัวอย่างนี้เราเชื่อมฟังชันก์ชื่อ onSubmit ไว้
            // bind this ไปเพื่อให้ใช้ this ของ component ถูกต้อง
            // ถ้า form ถูก submit ดังนั้น Field ทุกตัวจะอยู่ใน touched state ทันที
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Title" // สร้าง properties ส่งเข้าไปใช้ก็ได้
                    name="title" // = what piece of state that user editing
                    component={this.renderField} // = รับ function หรือ component ที่จะใช้ display Field component
                    // ไม่เรียกฟังชันด้วยนี้ด้วยการใส่ () เนื่องจาก เราไม่ได้ทำการเรียกฟังชันนี้ใช้เอง
                    // Field มันจะมาเรียกใช้เองในอนาคต
                    // Field รู้แค่วิธี interact with reduxForm แต่ไม่รู้วิธี render ตัวเองด้วย JSX
                    // เลยต้องรับ component properties
                />
                <Field 
                    label="Categories"
                    name="categories" // name properties เป็น property เฉพาะที่ redux form จะใช้หาตอนจะส่ง errors object มาโชว์
                    // เช่น ถ้า errors object มี property ชื่อ categories
                    // ดังนั้น redner function ของ Field ที่ name=categories ก็จะถูกแนบ error object น้้นไปใน field argument ให้ด้วย
                    // ดังนั้น name เป็นตัวเชื่อมระหว่าง Field กับ validate function
                    component={this.renderField}
                />
                <Field 
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    // values = ค่าที่ user กรอกใส่ form
    // console.log(value); -> {title:'asdf',categories:'asdf',content:'asdf'}
    const errors = {};// create error object
    
    // Validate the inputs from 'values'
    if(!values.title){
        errors.title = "Enter a title!";
    }
    if(!values.categories){
        errors.categories = 'Enter some categories';
    }
    if(!values.content){
        errors.content = 'Enter some content please';
    }

    // If errors is empty, Redux Form will assume that the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid and not gonna submit at all
    return errors;
}

// // reduxForm รับ function ที่ประกอบด้วย configuration option
// export default reduxForm({
//     validate,
//     // => validate:validate
//     // ฟังชันก์ validate นี้จะถูกเรียกอัตโนมัติ ใน Form Life Cycle ซึ่งมักจะถูกเรียกตอน submit form
//     // โดยจะมีการส่ง values ไปด้วย
//     form: 'PostsNewForm'
//     // คิดซะว่าคือชื่อของ form
//     // ***ต้อง unique เพื่อให้ state ของแต่ละ form แยกกัน
//     // ถ้าชื่อเหมือนกัน state มันจะถูกรวมกัน
// })(PostsNew);

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    // connect กันก่อนแล้วค่อย ส่ง redux component ที่ได้ให้ reduxForm อีกทอด
    // = วิธีรวม connect แล้วต่อด้วย reduxForm
    // = multiple connect life helper
    connect(null,{createPost})(PostsNew)
);


/* state ของ input
1.pristine
    input พึ่งถูก render ยังไม่มีใครไปแตะต้อง ยังไม่ select
2.touched
    user select->focus->focus out of the field
3.invalid
    invalid ดังนั้นโชว์ error
*/