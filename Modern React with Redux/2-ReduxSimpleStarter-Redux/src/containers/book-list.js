import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

// การเชื่อม React และ Redux จำเป็นต้องใช้ third lib อีกตัวเชื่อม ชื่อ React-Redux โดยใช้ connect
// การจะใช้ React-Redux จำเป็นต้องใช้ใน Container
// Container = React Component that have direct connection to the state manage by Redux

// action creator ก็แค่ฟังชันธรรมดา ดังนั้นต้องมีวิธีการเชื่อมต่อกับ redux เพื่อเอา action ที่สร้างส่งให้ reducer ทุกตัว
// bindActionCreators ใช้ช่วยให้ action ที่สร้างจาก action creator ถูกส่งไปยัง reducer ทุกตัว

// which component should be a container???!!!
// = Component ที่ care state ของข้อมูลนั้นๆ
// BookList - cares about when the list of books changes
// BookDetail - cares about when the active book changes
// App - doesn't care when state changes

class BookList extends Component{
    renderList(){
        return this.props.books.map((book) => {
            return (
                <li
                    key={book.title}
                    onClick={() => this.props.selectBook(book)}//เรียก selectBook ation creator ที่เชื่อมกับ component นี้ด้วย bindActionCreators
                    className="list-group-item">
                    {book.title}
                </li>
            );
        });
    }


    render(){
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        )
    }
}

// take application state
// function นี้เป็นเหมือนกาวระหว่าง react & redux
// ทุกครั้งที่ application state เปลี่ยน ดังนั้น container นี้จะถูก re-render
function mapStateToProps(state){
    // Whatever is returned will show up as props
    // inside of BookList
    // return {
    //     asdf:'123'
    // };
    // ดังนั้น ถ้าใช้ this.props.asdf -> '123'
    return{
        // books หมายถึง this.props.books ของ component นี้
        // state.books หมายถึง books จาก reducer
        // = เอา state จาก reducer มาใส่ให้ props ของ component นี้
        books: state.books
    };
}

// Anything returned from this function will end up as props
// on the BookList container
// ดังนั้นเรียกใช้ this.props.key ได้
// -> this.props.selectBook
// ดังนั้น จะเป็นการเรียก action creator ชื่อ selectBook ให้ทำงาน
function mapDispatchToProps(dispatch){
    // Whenever selectBook is called, the result should be passed
    // to all of our reducers
                                // key: actionCreator   
    return bindActionCreators({ selectBook: selectBook}, dispatch)
    //dispatch จะเป็นตัวเอา action ที่ action creator นี้สร้าง ไป return ให้ reducer ทุกตัว
}

// connect จะรับ function และ component แล้ว return container มาให้
                        //function                          component ที่จะกลายเป็น container
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
// Promote BookList from a component to a container - it needs to know
// about this new dispatch method selectBook. Make it available
// as a props