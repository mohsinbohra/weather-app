import React, { useEffect, useState } from 'react'
import WeatherDetails from './WeatherDetails';

const SearchMain = () => {
    const [searchTerm, setSearchTerm] = useState('indore');
    const[tempInfo, setTempInfo] = useState({});
    //console.log(searchTerm);
const getWeatherInfo = async () =>{
    
    try {
       
let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
        
        let res = await fetch(url);
        let data = await res.json();
        const{temp, humidity, pressure} = data.main;
        const {main: weatherType} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind;
        const {country, sunrise,sunset} =data.sys;
      
      const myNewWeatherInfo = {
          temp,humidity,pressure,weatherType,name,speed,country,sunrise,sunset
      };
      
      setTempInfo(myNewWeatherInfo);
      console.log(data);
      
      
      } catch (error) {
          console.log(error);
      }
};


//useEffect
useEffect(()=>{
    getWeatherInfo();
},[])
//Async Function

//Promises

//Try and Catch


    return (
        <>
        <div className="wrap">
        <div className="search">
            <input 
            type="search" 
            placeholder="type city name.." 
            id="search" 
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            />
            </div>
            <button className="searchButton" onClick={getWeatherInfo}>Search</button>
        </div>
        {/* This is Weather Details page */}
        <WeatherDetails {...tempInfo} />
        
        </>
    )
}

export default SearchMain
