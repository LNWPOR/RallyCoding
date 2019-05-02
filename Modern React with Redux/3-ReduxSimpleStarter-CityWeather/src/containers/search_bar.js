// เนื่องจาก search_bar ต้องมีการสร้าง action ไปแก้ state = มีการติดต่อกับ redux
// = มีการ สนใจ state
// ดังนั้นต้องเป็น container
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';


class SearchBar extends Component{
    
    constructor(props){
        super(props);
        this.state = { term:''};
    
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    
    onInputChange(event){
        this.setState({ term:event.target.value });
    }

    onFormSubmit(event){
        event.preventDefault();// กันไม่ให้ form submit post เอง

        // We need to go and fetch weather data
        this.props.fetchWeather(this.state.term);
        this.setState({term:''});
    }

    render(){
        return(
            // เนื่องจากเป็น form ดังนั้นถ้ามีการกด Enter หรือ button
            // มันจะคิดว่าเราจะทำการ post ดังนั้นมันจะ post ไปที่ bankend server แต่เรามีแค่ localhost
            // เลยดีดกลับมาหน้าเดิม ทำให้หน้า ถูก refresh
            // แต่เราไม่ต้องการแบบนี้ เพราะเราทำ spa ดังนั้นไม่อยากให้ refresh
            // ดังนั้นต้องทำ handler สำหรับ submit event ของ form นี้เอง และตั้งให้มันกัน
            // <form className="input-group">
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input 
                    placeholder="Get a five-day forecast in your favorite cities"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange}//ถ้าเรียกใช้ callback function อย่างนี้ = ส่งฟังชันไปเฉยๆ (ต่างจากก่อนน่านี้ที่ใช้ => เรียกสั่งตรงนี้เลยไม่ได้โยนไปเรียกฟังชันแบบนี้)
                    // ทำให้ this. ในฟังชันนั้นถูกมองเป็น this อะไรไม่รู้ แต่ไม่ใช่ component นี้แน่ๆ
                    // ดังนั้นต้องมีการ bind this ไปให้ฟังชันนี้ด้วย เพื่อเปลี่ยน this ของฟังชันนั้นให้เป็น this ของ component นี้
                    // โดยอาจไปทำไว้ใน constructor ก็ได้
                    // ดังนั้น bind this ไว้ด้วย ถ้าต้องการจะใช้ this ใน callback function นั้น
                    type="text"
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchWeather },dispatch);
}

// ถ้าไม่ต้องการดู state ต้องการ เปลี่ยน state อย่างเดียว ดังนั้น ส่งค่าเดียวก็ได้
// แต่ลำดับ parameter ต้องตามเดิม ดังนั้น เลยใส่ null ให้ตรง mapStateToProps
export default connect(null, mapDispatchToProps)(SearchBar);