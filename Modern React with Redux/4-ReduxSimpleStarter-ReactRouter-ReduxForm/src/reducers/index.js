import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer // ต้องใช้ key=form เท่านั้น เพราะ form ทั้งหมดในทุก component จะได้รู้ว่าต่อกับ reducer นี้อยู่
});

export default rootReducer;
