// ไม่ต้องสนใจ redux ดังนั้นเป็น component

import React, {Component} from 'react';

class GoogleMap extends Component{

    // เป็นฟังชันก์ที่ถูกเรียกอัตโนมัติ เมื่อ component ถูก render บน screen
    componentDidMount(){
        // creaate map
        // ต้องส่ง element ที่จะเอา map วาง == this.refs.map
        // ***มักใช้วิธี ref นี้กับ thirdparty ที่สร้างของให้ใหม่ โดยไม่รู้ว่าจะทำงานร่วมกับ react ยังไง
        new google.maps.Map(this.refs.map, {
            zoom:12,
            center:{
                lat: this.props.lat,
                lng: this.props.lon
            }
        })
    }

    render(){
        // ใส่ ref ไว้ ทำให้ เรียก this.refs.map ได้ทุกที่ใน Component นี้ = หมายถึง element <div ref="map" /> นี้
        return <div ref="map" />;
    }
}

export default GoogleMap;