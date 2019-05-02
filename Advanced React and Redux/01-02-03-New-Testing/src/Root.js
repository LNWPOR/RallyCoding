import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import reduxPromise from 'redux-promise'
import async from 'middlewares/async';
import stateValidator from 'middlewares/stateValidator';
import reducers from 'reducers';

// export default props =>{
export default ({children, initialState = {}}) =>{
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(async, stateValidator)
        // applyMiddleware(reduxPromise)
    );
    
    return (
        <Provider store={store}>{children}</Provider>
    )

    // return (
    //     // <Provider store={createStore(reducers,{})}>// argument ที่ 2 ของ createStore คือ ค่าเริ่มต้นของ state ใน store
    //     <Provider store={createStore(reducers, initialState)}>
    //         {children}
    //     </Provider>
    // )
}