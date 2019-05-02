import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

export class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  onSubmit(event) {
    // default html form จะ submit ไปหลังบ้าน ซึ่งเราไม่ต้องการ ดังนั้น prevent ไว้
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        // refetchQueries: [{query:query, variables: บลาๆ}]
        refetchQueries: [{ query }] // query ที่จะสั่งให้ทำงานต่อ เมื่อ mutate ทำเสร็จ (ไว้แก้ปัญหา ตอนกลับไปหน้า songlist แล้วมันไม่ fetch ของใหม่ทั้งหมดให้)
      })
      .then(() => {
        // create เสร็จแล้วก็กลับไปหน้าแรก
        hashHistory.push('/');
      });
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title</label>
          <input
            type="text"
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

// ผูก mutation ให้ component ด้วย graphql() จาก apollo
// ทำให้ component มี props.mutate ไว้ใช้ได้
// ซึ่งมันจะไปเรียก mutation ที่เราประกาศไว้
export default graphql(mutation)(SongCreate);
