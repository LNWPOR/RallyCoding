import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyC1a_JOoy28-FdPQmChKV7xOthP-eB1EoM';

// YTSearch({key: API_KEY, term : 'surfboards'}, function(data){
//     console.log(data);
// });

class App extends Component{
    constructor(props){
        super(props);

        this.state = { 
            videos:[], 
            selectedVideo: null
        };

        this.videoSearch('surfboards');

        // // ดังนั้นระหว่างฟังชั้นนี้ยังทำงานไม่เสร็จ selectedVideo จะเป็น null ทำให้ video_detail Loading...
        // // แต่พอมันทำงานเสร็จ ดังนั้น setState ทำให้ App re-render ทำให้ video_detail โชว์ของได้
        // YTSearch({key: API_KEY, term : 'surfboards'}, (videos) => {
        //     // this.setState({ videos }); //ES6 // same as this.setState({ videos: videos });
        //     this.setState({
        //         videos: videos,
        //         selectedVideo: videos[0]
        //     })
        // });
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term : term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            })
        });
    }

    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)},300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                {/* passing data จาก parent ไป child */}
                {/* passing data ท่านี้ = ส่งไปเป็น props ให้ child */}
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

// // Creaate a new component. This component should produce
// // some HTML
// const App = () => {
//     return (
//         <div>
//             <SearchBar />
//         </div>
//     );
// }

// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container') );