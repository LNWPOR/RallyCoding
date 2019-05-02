// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    
    // constructor(props){
    //     super(props);
    //     this.state = {new :true};
    // }
    state = { showFormReview:false }; //เหมือนกับท่า constructor ข้างบน ด้วยพลังของ babel

    renderContent(){
        if(this.state.showFormReview){
            return <SurveyFormReview 
                onCancel={()=>this.setState({showFormReview:false})}
            />;
        }
        return <SurveyForm onSurveySubmit={()=>this.setState({showFormReview:true})}/>;
    }

    render() {
        return (
           <div>
               {this.renderContent()}
           </div> 
        );
    }
}

export default reduxForm({
    form: 'surveyForm' 
    // ใส่ชื่อเดียวกับ surveyForm ที่สร้างไว้ที่ surveyForm เพื่อให้อันนี้เป็นเหมือนตัวครอบอีกที ว่าถ้าเลิก render surveyNew component นี้ 
    // ให้เคลียค่าใน field ออก (default คือเคลียทิ้งเมื่อไม่ render)
    // แต่ถ้าแค่ออกจาก หน้า surveyForm ไปหน้า surveyFormReview (ซึ่งอยู่ใน component SurveyNew อยู่)
    // ให้ยังไม่ต้องเคลีย
})(SurveyNew);