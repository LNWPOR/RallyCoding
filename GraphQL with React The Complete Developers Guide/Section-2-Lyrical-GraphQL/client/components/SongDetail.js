import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    // จะ check จาก this.props.loading ก็ได้
    if (!song) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

// ต้องยัด id ไปด้วยเนื่องจาก fetchSong ต้องใช้
// และเนื่องจากเป็น query ที่เรียกด้วย graphql อัตโนมัติตอนโหลด component
// ดังนั้นต้องผูก variables ด้วยท่านี้
export default graphql(fetchSong, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
