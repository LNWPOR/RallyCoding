import React, {Component} from 'react';

//Functional component = เป็น React Component ที่แค่เรียกใช้ แล้วก็คืนค่าไป
// const SearchBar = () =>{
//     return <input/>;
// };

//Class-Based Components = เป็น React Component ที่มี BU
//ดังนั้นเลยไป extends Component มา จะได้มีฟังชันไว้ใช้เพิ่มด้วย
//ใช้ class-based components เมื่อต้องการให้มีการใช้ state
//ใช้ functional component เมื่อต้องการให้มีแค่รับค่ามาแล้วคืนค่าออกไป
class SearchBar extends Component {
    constructor(props) {
        super(props);
        // ใช้ this.state = แค่ตรง constructor เท่านั้น ตรงอื่นๆจะใช้ this.setState แทน
        this.state = { term:'' };
    }
    
    render() {
        return (
            <div className="search-bar">
                 <input
                    value={this.state.term} 
                    onChange={event => this.onInputChange(event.target.value)} />


                {/* component ที่มี value จาก state =  Control Component = Control Form Element*/}
                {/* value ของ component จะเปลี่ยนโดยขึ้นจาก state, ถ้า value จาก state เปลี่ยน ดังนั้น value ของ component เปลี่ยนตาม*/}
                {/* เมื่อ setState ถูกเรียก ดังนั้น state เปลี่ยนค่า และ ทำการ re render component ให้อัตโนมัติ */}
                {/* หลังจาก render ใหม่ input element ก็ได้ค่า value ตาม ค่า state ใหม่จาก setState */}
                {/* ดังนั้นจะเห็นว่าจริงๆแล้ว เมื่อ user พิมพ์บางอย่าง มันไม่ได้เปลี่ยน state เลย แต่มันจะไป triggerEvent */}
                {/* และเนื่องจากใน event นั้นเรามีการ setState ดังนั้น State จึงเปลี่ยน */}
                {/* <input
                    value={this.state.term} 
                    onChange={event => this.setState({ term:event.target.value})} /> */}
                
                {/* value ของ component จะเปลี่ยนโดนการที่ component สั่งให้ state update */}
                {/* ฉันไม่อัพเดท state นั้นแหละที่ต้องอัพเดท อารมณ์นั้น */}
                {/* this.setState จะ re-render ให้อัตโนมัติ แล้วก็จะอัพเดทค่า state นั้นๆใน DOM ให้*/}
                {/* <input onChange={event => this.setState({ term:event.target.value})} />     */}
                {/* Value of the input: {this.state.term} */}
            </div>
        )
        // return <input onChange={event => console.log(event.target.value)} />; 
        // return <input onChange={this.onInputChange} />;    
    }

    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

    //Event Handler
    //on = กำลังจะรอ handle
    //Input = ชื่อ element ที่กำลัง watch
    //Change = event ที่เกิดขึ้นกับ element นั้นที่เราจะ trigger ฟังชันนี้
    // onInputChange(event){
    //     console.log(event.target.value);
    // }
}

export default SearchBar;