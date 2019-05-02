// เนื่องจาก book-detail สนใจ state ของ activeBook
// ดังนั้นต้องสร้างมันเป็น container
import React,{Component} from 'react';
import {connect} from 'react-redux';

class BookDetail extends Component {
    render(){

        // เอาไว้กันกรณี app พึ่งเปิด ทำให้ state ของ book = null เนื่องจกเรา set ที่ reducer ไว้ว่า state=null
        if(!this.props.book){
            return <div>Select a book to get started.</div>
        }

        return (
            <div>
                <h3>Detail for:</h3>
                <div>Title: {this.props.book.title}</div>
                <div>Pages: {this.props.book.pages}</div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        book:state.activeBook
    };
}

export default connect(mapStateToProps)(BookDetail);