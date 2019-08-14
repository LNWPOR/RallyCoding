import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  onSubmit(event) {
    event.preventDefault(); // กันปกติที่ onSubmit มันจะเรียกยิง backend เราเล่นอัตโนมัติ
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId // เอา this.props.params.id มาใช้ไม่ได้เนื่องจาก react router มันจะส่ง param ให้แค่ component แรกที่ reactrouter render ซึ่งก็คือ SongDetail แต่ LyricCreate ถูก render ด้วย SongDetail ไม่ใช่ render ด้วย ReactRouter จึงทำให้ไม่มี params ไว้ใช้
        }
      })
      .then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Add a Lyric</label>
          <input
            value={this.state.content}
            onChange={event => this.setState({ content: event.target.value })}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AdLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        # เอา id มาด้วยเพื่อใช้ช่วยบอก apollo store ว่าค่า record อะไรเปลี่ยน ช่วยไปบอก react ให้ rerender view ให้ด้วย
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
