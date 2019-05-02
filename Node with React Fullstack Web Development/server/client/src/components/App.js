import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';


import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component{
    // ไม่ใช้ componentWillMount เพราะว่ามันอาจถูกเรียกหลายทีในอนาคต แต่เราต้องการเรียกแค่ตอนเปิดเข้ามาทีแรกทีเดียวเพื่อดูว่า login อยู่่ไหม ดังนั้นใช้ componentDidMount
    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        return (
                <BrowserRouter>
                    {/* BrowserRouter รับได้แต่ 1 child */}
                    <div className="container">
                        {/* exact={true} เพื่อบอกว่าต้องตรง path นี้เป้ะๆถึงจะโชว์ ไม่งั้นมันจะดูทุก path ว่า path ไหนมี string contain url ตาม browser เรียก ละโชว์หมด */}
                        {/* เช่น ไป '/surveys' ดังนั้น มีทั้ง '/' และ '/surveys' มันจึงโชว์ 2 อย่าง*/}
                        {/* ใช้ exact เฉยๆก็ได้ JSX รู้ว่าเราจะใส่ค่า true */}
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
        );
    }
};

export default connect(null, actions)(App);


// const App = () => {
//     return (
//         <div className="container">
//             {/* BrowserRouter รับได้แต่ 1 child */}
//             <BrowserRouter>
//                 <div>
//                     {/* exact={true} เพื่อบอกว่าต้องตรง path นี้เป้ะๆถึงจะโชว์ ไม่งั้นมันจะดูทุก path ว่า path ไหนมี string contain url ตาม browser เรียก ละโชว์หมด */}
//                     {/* เช่น ไป '/surveys' ดังนั้น มีทั้ง '/' และ '/surveys' มันจึงโชว์ 2 อย่าง*/}
//                     {/* ใช้ exact เฉยๆก็ได้ JSX รู้ว่าเราจะใส่ค่า true */}
//                     <Header />
//                     <Route exact path="/" component={Landing} />
//                     <Route exact path="/surveys" component={DashBoard} />
//                     <Route path="/surveys/new" component={SurveyNew} />
//                 </div>
//             </BrowserRouter>
//         </div>
//     );
// };

// export default App;