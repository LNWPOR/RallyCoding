import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component{

    componentDidMount() {
        
        // ตอนนี้ถ้ามาหน้า show จากหน้า index ดังนั้นจะมีการ request เอา specific post นี้อีกครั้ง ซึ่งจริงๆอาจมีใน state แล้วตั้งแต่หน้า index
        // ถ้าไม่อยากให้มีการเรียกโดยไม่จำเป็นก็ใช้ท่านี้ก็ได้
        // แต่ถ้าต้องการเรียกซ้ำกันเหนียวก็ไม่เป็นไร เพราะ user อาจจะอยู่หน้าแรกนาน จนข้อมูลไม่อัพเดทแล้วก็ได้
        // ดังนั้นตอนมาอีกหน้า อัพเดทหน่อยอีกรอบก็ดี
        // if(!this.props.post){
        //     const {id} = this.props.match.params;
        //     this.props.fetchPost(id);
        // }


        const {id} = this.props.match.params;
        // this.props.match.params.id;
        // helper function จาก react router, .id มาจาก wildcard ที่เราตั้งชื่อไว้
        // params เก็บ wildcard ที่เราตั้งๆไว้
        
        this.props.fetchPost(id);
    }

    onDeleteClick(){
        const { id } = this.props.match.params;
        //อย่าใช้ this.props.post.id นะ งานหยาบไป post อาจจะยังไม่มีก็ได้
        this.props.deletePost(id, ()=>{
            this.props.history.push('/');
        });
    }

    render() {
        const {post} = this.props;
        
        // เนื่องจาก post ตอนก่อน componentDidmount เรายังไม่มีค่า post ทำให้ error เนื่องจาก undefined.blabla
        // *** เป็น case ที่เจอบ่อยมากๆๆๆๆๆๆๆ ***
        // ต้องระวังเสมอว่า object ที่จะใช้มีค่ารึเปล่า
        if(!post){
            return <div>Loading...</div>
        }

        return(
            // posts[this.props.match.params.id];
            // จะทำท่านี้ก็ได้ แต่ว่าจะกลายเป็นว่า logic มันไปพันกับ ข้อมูลก้อนใหญ่เกินที่ตัวเองจะใช้
            // เพราะจริงๆ component นี้สนใจแค่ post เดียว ไม่ใช่ทุก post

            <div>
                <Link to="/">Bact To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// function mapStateToProps({ posts }){
    // return {posts};
function mapStateToProps({ posts }, ownProps){ 
    // 2nd argument = by convention ownProps       
    // ownProps = props ของ component นี้ทั้งหมด
    // หรือก็คือบอกได้ว่า this.props === ownProps
    return { post: posts[ownProps.match.params.id]};
    // อาจจะมองว่าก็ยังพันกับ post ก้อนใหญ่อยู่หนิ แต่ถ้ามองว่า เราเขียน mapStateToProps แยกไว้อีกไฟล์นึง ซึ่งปกติเขาทำกัน
    // ก็จะดูเหมือนว่า component นี้ เล่นแต่กับ this.props.post ซึ่งส่งมาจาก mapStateToProps อีกทีได้
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);