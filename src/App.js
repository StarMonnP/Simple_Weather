import './App.css';
import React from 'react'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'


//weatherData contains all the data that needed to extract from weather API
function App() {
  const [input, setInput] = React.useState();
  const [weatherData, setData] = React.useState({
    cityname: "City",
    country: "Country",
    temp: 0,
    min_temp: 0,
    max_temp: 0,
    wind_speed: 0,
    icon: "https://openweathermap.org/img/wn/01d@2x.png",
    cod: 0
  });

   const icon_url= "https://openweathermap.org/img/wn/{icon_num}@2x.png";

    function try_btn  (e) {
      //e.preventDefault is needed
    e.preventDefault();

    const url = 'https://api.openweathermap.org/data/2.5/weather?q={city%name}&appid=84de42e1330f56e2ab2fdfaa04a8e427';
    const fetch_url = url.replace("{city%name}", input);
    
  // Math.round to round the decimal
  // calculation on temp/min_temp/max_temp is to convert k into F
  // 
  fetch(fetch_url)
  .then(response => response.json())
  .then(data => setData({
    cod: data.cod,
    cityname: data.name,
    country: data.sys.country,
    temp: Math.round((data.main.temp - 273.15)*(9/5)+32),
    min_temp: Math.round((data.main.temp_min - 273.15)*(9/5)+32),
    max_temp: Math.round((data.main.temp_max - 273.15)*(9/5)+32),
    wind_speed: data.wind.speed,
    icon: icon_url.replace("{icon_num}", data.weather[0].icon)
    }))
    .catch((error) => {
      console.log(error)
      setData({
        cityname: "city not found",
        country: " ",
        temp: 0,
        min_temp: 0,
        max_temp: 0,
        wind_speed: 0,
        icon: "https://openweathermap.org/img/wn/01d@2x.png"
      })
    });  
  }

  return (

    

    <div className="App">

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className='m-auto' href="/">Simple Weather</Navbar.Brand>
        </Container>
      </Navbar>


      <form className='input' onSubmit={try_btn}>
        <label>
          <input type="text" name="city" value={input||""} onChange={(e) => setInput(e.target.value)} placeholder='enter city name'/>
        </label>
        <input type="submit" value="submit" />
      </form>

    
      {/*
      top_layer displays two cardview on shows location and another one shows icon for current weather
      icon is from the weather weather website
      */}
      <CardGroup className='top_layer' >


        <Card 
            bg='secondary'
            text='light'
        >
          <Card.Body>
            <h2>{weatherData.cityname} </h2>
            <h3>{weatherData.country}</h3>
          </Card.Body>
        </Card>

        <Card 
            bg='secondary'
            text='dark'>
          <Card.Body>
            <img src={weatherData.icon} alt='weather icon'></img>
          </Card.Body>
        </Card>

      </CardGroup>

      {/*
      bottom_layer has three cardview that displays
      1. current temperature
      2. temperature range
      3. wind speed
      */}
      <CardGroup className='bottom_layer'>
        <Card 
            bg='secondary'
            text='light'> 
          <Card.Body>
            <h3>Current Temp</h3>
            <h2>{weatherData.temp} °F</h2>
          </Card.Body>
        </Card>

        <Card
            bg='secondary'
            text='light'>
          <Card.Body>
            <h3>Temp Range</h3>
            <h2>{weatherData.min_temp} ~ {weatherData.max_temp}  °F</h2>
          </Card.Body>
        </Card>

        <Card
            bg='secondary'
            text='light'>
          <Card.Body>
            <h3>Wind Speed</h3>
            <h2>{weatherData.wind_speed}  m/s</h2>
          </Card.Body>
        </Card>

      
      </CardGroup>
    
  
    </div>
  );
}

export default App;
