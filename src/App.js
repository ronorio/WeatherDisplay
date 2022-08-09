import React from 'react';
import NavBar from './components/NavBar'
import Form from './components/Form'
import Weather from './components/Weather'
import WeatherHour from './components/WeatherHour'
import './App.css';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//API KEY FROM THE WEATHER API
const API_KEY = "2673083e5516a053a4045a8173ec45bb";

class App extends React.Component{

  state = {
    temperatura: undefined,
    cidade: undefined,
    pais: undefined,
    umidade: undefined,
    descricao: undefined,
    error: undefined,
    icon: undefined,
    sensacao: undefined,
    max: undefined,
    min: undefined,
    weatherByHour: undefined,
    errorStatus: false
  }

  /*
  * after assembling the components, it validates if the browser supports geolocation
  * if yes, load the weather forecast from latitude and longitude
  */
  componentDidMount (){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getWeatherByGeolocation);
    }
  }

  /*
  * handle the close of the alert component
  */
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      error: "",
      errorStatus:false
    })
  };

  uselessFunction(){
    console.log("This is a useless function");
  }

  /*
  * method that loads a forecast by location
  */
  getWeatherByGeolocation = async (position) =>{
    //API to current weather
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    //API for the weather of the next 5 days at 3 hour intervals.
    const api_call_by_hour = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`);
    const data_by_hour = await api_call_by_hour.json();

    //validates the return
    //if cod === 404 show the error
    if(data.cod !== undefined && data.cod === "404"){
      this.setState({
        error: data.message,
        errorStatus:true
      })
    } else { 
      //if success load on state all the information
      this.setState({
        temperatura: data.main.temp,
        cidade: data.name,
        pais: data.sys.country,
        umidade: data.main.humidity,
        descricao: data.weather[0].description,
        error: "",
        errorStatus: false,
        icon: data.weather[0].icon,
        sensacao: data.main.feels_like,
        max: data.main.temp_min,
        min: data.main.temp_max,
        weatherByHour: data_by_hour
      })
    }
  }

  //Load the weather forecast by the location informed by the user
  //Do the same as the getWeatherByGeolocation method, only change the API call
  //use city and coutry insted of latitude and longitude
  getWeather = async (e) => {
    e.preventDefault();
    const cidade = e.target.elements.cidade.value;
    const pais = e.target.elements.pais.value;
    
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cidade},${pais}&appid=${API_KEY}&units=metric`);
    const api_call_by_hour = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cidade},${pais}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    const data_by_hour = await api_call_by_hour.json();
    if(data.cod !== undefined && data.cod === "404"){
      this.setState({
        error: data.message,
        errorStatus:true
      })
    } else { 
      this.setState({
        temperatura: data.main.temp,
        cidade: data.name,
        pais: data.sys.country,
        umidade: data.main.humidity,
        descricao: data.weather[0].description,
        error: "",
        errorStatus: false,
        icon: data.weather[0].icon,
        sensacao: data.main.feels_like,
        max: data.main.temp_min,
        min: data.main.temp_max,
        weatherByHour: data_by_hour
      })
    }
  }

  render(){
    return (
      <div className="App">
        {/*The alert that shows the erros*/}
        <Snackbar open={this.state.errorStatus} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="warning">
            {this.state.error}
          </Alert>
        </Snackbar>

        {/*NavBar component, aesthetic component*/}
        <NavBar />
        {/*Form component to update de location*/}
        <Form getWeather={this.getWeather} getWeatherByGeolocation={this.getWeatherByGeolocation} error={this.state.error}/>
        {/*Component with the current weather info*/}
        <Weather 
        temperatura={this.state.temperatura}
        cidade={this.state.cidade}
        pais={this.state.pais}
        umidade={this.state.umidade}
        descricao={this.state.descricao}
        icon={this.state.icon}
        sensacao={this.state.sensacao}
        max={this.state.max}
        min={this.state.min}
        />
        {/*Component with the weather info by hour*/}
        <WeatherHour 
        cidade={this.state.cidade}
        pais={this.state.pais}
        weatherByHour={this.state.weatherByHour}
        />
      </div>
    );
  }
}

export default App;
