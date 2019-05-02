import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'Root';
import { BrowserRouter, Route} from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducers from 'reducers';

import App from 'components/App';

ReactDOM.render(
    <Root>
        <BrowserRouter>
            <Route path="/" component={App}/>
        </BrowserRouter>
    </Root>
    ,document.querySelector('#root')
);
// ReactDOM.render(
//     <Root>
//         <App/>
//     </Root>
//     ,document.querySelector('#root')
// );

// ReactDOM.render(
//     <Provider store={createStore(reducers,{})}>
//         <App />
//     </Provider>
//     , document.querySelector('#root')
// );