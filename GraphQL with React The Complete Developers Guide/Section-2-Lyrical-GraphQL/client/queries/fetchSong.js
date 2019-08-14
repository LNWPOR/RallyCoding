import gql from 'graphql-tag';

export default gql`
  query SongQuery($id: ID!) {
    # song(id: $id) {
    #   id
    #   title
    # }

    # จะสังเกตว่าถ้าจะเพิ่มของจาก query ก็เพิ่มไปได้เลยอยากได้ field อะไรเพิ่ม
    # ไม่ต้องไปเขียน query ใหม่
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
