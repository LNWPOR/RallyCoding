import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
    const videoItems = props.videos.map((video) =>{
        // return <VideoListItem video={video} />
        return (
            <VideoListItem 
                onVideoSelect={props.onVideoSelect}
                key={video.etag} 
                video={video} />
        );
    });
    
    return(
        <ul className="col-md-4 list-group" >
            {/* ทุกครั้งที่ render array ที่ของข้างใน type เดียวกันหมด */}
            {/* react จะคิดว่า array นี้เป็น List ทำให้กลายเป็น การ render List*/}
            {/* ทำให้ react ไปใช้ logic สำหรับการ render list แทน */}
            {/* ดังนั้นต้องมี unique key ให้ item ใน List ด้วย */}
            {videoItems}
        </ul>
    );
};

export default VideoList;