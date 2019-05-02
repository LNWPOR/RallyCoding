import { combineReducers } from 'redux';
import { reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
    auth:authReducer,
    form:reduxForm, // ต้องตั้งชื่อมันว่า form เท่านั้น เนื่องจากเป็นชื่อ key เฉพาะของ redux form
    surveys: surveysReducer
});