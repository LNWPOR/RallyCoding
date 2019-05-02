import React from 'react'

// const VideoListItem = (props) => {
    // const video = props.video;
const VideoListItem = ({video, onVideoSelect}) => {// ES6 = สร้าง const video = props.video ให้เลย 
                                    // โดยจะไปดูจากชื่อ props.___ ให้ว่ามีไหม ถ้ามีก็เอา
    const imageUrl = video.snippet.thumbnails.default.url;
    return (
        <li onClick={() => onVideoSelect(video)} className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img src={imageUrl} alt="" className="media-object" />
                </div>
                <div className="media-body">
                    <div className="media-heading">{video.snippet.title}</div>
                </div>
            </div>
        </li>
    );
};

export default VideoListItem;