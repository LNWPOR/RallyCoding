// เรื่องจากต้องมีการดูข้อมูลจาก state ดังนั้นต้อง เป็น container
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';
/*
    [
        {
            city:{name:'New York'}
            list:[
                {main:{temp:260,humidity:40,pressure:40}}
                {main:{temp:260,humidity:40,pressure:40}}
                {main:{temp:260,humidity:40,pressure:40}}
                {main:{temp:260,humidity:40,pressure:40}}
            ]
        },    
        {
            city:{name:'New York'}
            list:[
                {main:{temp:260,humidity:40,pressure:40}}
                {main:{temp:260,humidity:40,pressure:40}}
                {main:{temp:260,humidity:40,pressure:40}}
                {main:{temp:260,humidity:40,pressure:40}}
            ]
        }
    ]
    */
class WeatherList extends Component {
    
    renderWeather(cityData){
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        /*
        const lon = cityData.city.coord.lon;
        const lat = cityData.city.coord.lat;
        */
        const { lon, lat } = cityData.city.coord; //ES6

        return (
            <tr key={name} >
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td><Chart data={temps} color="orange" units="K" /></td>
                <td><Chart data={pressures} color="green" units="hPa" /></td>
                <td><Chart data={humidities} color="black" units="%" /></td>
            </tr>
        );
    }
    render(){
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (K)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}    
                </tbody>
            </table>
        )
    }
}

// function mapStateToProps(state){
//     return { weather: state.weather }
function mapStateToProps({ weather }){ //ES6 same as const weather = state.weather
    // return { weather: weather }
    return { weather }; // ES6
}

export default connect(mapStateToProps)(WeatherList);