import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';

class PostsIndex extends Component {
    
    // หนึ่งใน React Life Cycle method
    // เรียกอัตโนมัติ เมื่อ component นี้ถูกโชว์ ใน DOM
    // *** ดังนั้นเหมาะใช้ fetchData, init, ทำอะไรก็ตามที่ต้องการทำ 1 ครั้ง ตอนแรก
    // ทำไมเราถึงอยาก fetchData หลังจากที่ component โชว์บน screen หละ?
    // ทำไมไม่ทำ ก่อนหรือหลัง บลาๆ => จริงๆไม่ต่าง
    // React ไม่มีการช่วยดักว่า fetch เสร็จแล้วหรือยัง เสร็จแล้วค่อยโชว์ ไม่มีการ hold รอไว้ก่อนให้
    // ถึงจะมี componentWillMount ให้ แต่ก็ไม่ต่างกัน เพราะยังไงก็ render สำเร็จ 1 ครั้งก่อนอยู่ดี ก่อนเรา fetch data สำเร็จ
    // ต้องใช้เวลาในการทำ api request
    // ดังนั้น ถ้า log ดูจะเห็น log เด้ง 2 ครั้งอย่างน้อย
    // ครั้งแรก = render สดๆ ไม่มี data ->  {}
    // ครั้ง2 = data มาแล้ว ดังนั้นจึงเกิดการ rerender อีกรอบ เนื่องจากมีการ update state แล้วนั้นเอง
    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPosts(){
        return _.map(this.props.posts, post =>{
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            );
        });
        // เนื่องจาก posts เป็น object ไม่ใช่ array ดังนั้นใช้ map ของ array ไม่ได้
        // เลยใช้ map ของ lodash ช่วยแทน
    }

    render(){
        // console.log(this.props.posts);
        return(
            <div>
                <div className="text-xs-right">
                    {/* Link ก็มี a เป็นไส้ในนั้นแหละแต่ต่างตรงที่มีฟังชันก์ช่วย กันการทำงานปกติของ a ที่เปลี่ยนหน้า get,refresh page บลาๆ*/}
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {posts:state.posts};
}

// ใช้ parametaer { fetchPosts:fetchPosts } แทน การใส่ function mapDispatchToProps ได้
// เดี๋ยว connect จัดการเรื่อง dispatch ให้เอง
// ES6 ย่อได้อีกเหลือ {fetchPosts}
// ดังนั้น เราก็สามารถเรียก this.props.fetchPosts ใน component นี้ได้ตามปกเหมือนใช้วิธีเดิม
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);

// ***
// เราจะไม่ใช้ idea state activePost redux กับ app นี้ที่หน้า detail
// เนื่องจาก เราก็มีข้อมูลบอกอยู่แล้วว่า post ไหน active อยู่
// ซึ่งก็คือดูจาก path เอาได้ /:id
// เพราะจริงๆ แล้ว url ก็คือ piece of state เหมือนกัน
// ดังนั้นไม่จำเป็นต้องทำ state activePost ไว้ดู post ที่ถูกเลือกปัจจุบัน
// เป็นการทำงานซ้ำซ้อนเปล่าๆ
// ดังนั้นดูจาก url แล้วไปเลือก post ตามนั้นมาโชว์ง่ายกว่า
// เรื่องพวกของ selected มักจะเป็นอารมณ์นี้

/*
    การเก็บ post app นี้จะไม่เก็บ state เป็น array แต่จะเก็บเป็น object แทน โดยใช้ key
    ทำให้ เวลาต้องการเลือก post ใด post หนึ่งจะได้ง่ายไม่ต้อง loop หาใน array
    {
        4:{title:'Hello',id:4,content:'Hi',tags:'greeting'},
        12:{title:'Bye',id:2,content:'Bye',tags:'greetings'}
    }
*/