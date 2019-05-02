import React, { Component } from 'react';
import gql from 'graphql-tag'; // เนื่องจากเราจะ query จาก frontend แต่เราจะเขียนตรงๆไม่ได้ มันไม่ใช้ js ดังนั้นต้องใช้ gql มาช่วย
import { graphql } from 'react-apollo'; // รอบนี้เอามาช้วย execute query
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({ variables: { id } })
      .then(() => this.props.data.refetch()); // refetch มาจาก react-apollo โดยมันจะไปเรียก query ทุกอย่างที่ผูกกับ component นี้ให้ใหม่
    // ในกรณีของ component นี้คือ fetchSong
    // ถ้าอยากเรียก query อื่น ที่ไม่เกี่ยวกับ component นี้ก็ไปใช้ท่า refetchQueries แล้วระบุ query ที่ต้องการไปเองเหมือนใน SongCreate
    // จริงๆจะใช้ท่า refetchQueries กับกรณี้ก็ได้ แต่ใช้ data.refetch ไปเลยก็ได้สำหรับกรณีนี้ ง่ายดี
  }

  renderSongs() {
    // ระวังถ้ายัง query ไม่เสร็จ ดังนั้น songs.map จะ error เนื่องจาก songs undefined
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

// const query = gql`
//   {
//     songs {
//       id
//       title
//     }
//   }
// `;

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// graphql(query) return function ซึ่งจะถูกเรียกให้กับ (SongList) ทันทีหลังจาก render component SongList
// พอ graphql(query) เรียกข้อมูลเสร็จ ดังนั้นจะ rerender component ใหม่อัตโนมัติ
// โดย component สามารถเอาข้อมูลจาก query มาใช้ได้ผ่าน props
// export default graphql(query)(SongList);

// ใช้หลาย mutation ต้องทำท่าน่าเกลียดแบบนี้ จริงๆน่ามีวิธีอื่นนะจะได้สวยกว่านี้
export default graphql(mutation)(graphql(query)(SongList));
