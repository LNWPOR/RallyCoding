// ตั้งชื่อตัวไฟล์ตัวเล็ก เพราะเป็นสิ่งที่จะถูกสิ่งอื่นนำไปใช้
import React, { Component } from 'react';
import {connect} from 'react-redux';
export default (ChildComponent)=>{
    class ComposedComponent extends Component {
        // Our component just got rendered
        componentDidMount(){
            this.shouldNavigateAway();
        }

        // Our component jist got updated
        componentDidUpdate(){
            this.shouldNavigateAway();
        }

        shouldNavigateAway(){
            if(!this.props.auth){
                this.props.history.push('/'); //history object เป็น props ที่มาจาก react-router
            }
        }

        render(){
            return <ChildComponent {...this.props}/> // ...this.props เอา props ทุกอันของ parent ส่งไปให้ ลูก
            // return <ChildComponent />
        }
    }
    
    function mapStateToProps(state){
        return { auth: state.auth };
    }

    return connect(mapStateToProps)(ComposedComponent);
    
}

