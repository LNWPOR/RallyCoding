// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends Component {
    
    renderFields(){
        return _.map(formFields, ({label,name}) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        });
    };
    
    render() {
        return (
            <div>
                {/* handleSubmit เป็น props function ของ reduxForm helper ที่เราเชื่อมไว้ตรง export ข้างล่าง*/}
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}> {/* onSurveySubmit ไม่ใส่ () เนื่องจากแค่ต้องการส่งฟังชันนี้เปน callback ไว้เฉยๆไม่ต้องการให้ทำงานเลย*/}
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    {/* <Field 
                        type="text"
                        name="surveyTitle" // ดังนั้นเมื่อมีคนพิมพ์ ก็จะเก็บข้อมูลลงใน redux store ด้วย key surveyTitle
                        component="input"
                    /> */}
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>    
                    </button>
                    
                </form>
            </div>
        );
    }
}

// take values object
function validate(values){
    const errors = {};

    // if(!values.title){
    //     errors.title = "You must provide a title"; //.title คือชื่อเดียวกับ name ของ Field นั้น ดังนั้น reduxForm จะ map error นี้ไปให้กับเฉพาะ Field ตามชื่อนั้น
    // }

    errors.recipients = validateEmails(values.recipients || ''); // || '' มาช่วยดักตอนมัน render ตอนแรก ให้ถือว่าไม่ error

    _.each(formFields, ({name})=>{
        if(!values[name]){ //เป็นการด properties ตามkeyใน [] ของ object
            errors[name] = 'You must provide a value'// สร้าง key ใหม่ใน object
        }
    });

    
    return errors;// ถ้า reduxForm ได้ error object ว่าง {} กลับไป ดังนั้นมันจะมองว่า สำเร็จ แต่ถ้ามีของมันจะมองว่า invalid และหยุด process
}

export default reduxForm({
    validate,// key นี้เป็นของ redux ซึ่ง function ที่ผูกกับ key นี้จะถูกรัน ครั้งแรกที่หน้า render กับ ทุกครั้งที่ form ถูก submit
    form: 'surveyForm', //ชื่อนี้จะถูกใช้เป็น key เก็บค่าต่างๆ ของ form ใน formReducer
    destroyOnUnmount: false // true by defaut == ไม่เก็บค่าในฟอร์มไว้ให้ถ้าไม่ render แล้ว
})(SurveyForm);