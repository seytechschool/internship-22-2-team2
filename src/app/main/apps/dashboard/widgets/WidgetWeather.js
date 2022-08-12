import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect /* memo */ } from 'react';
import Moment from 'moment';
import { DebounceInput } from 'react-debounce-input';

function WidgetWeather() {
  const [searchVal, setSearchVal] = useState('');
  const [weatherData, setWeatherData] = useState({
    weather: [{ id: '', description: '', icon: '' }],
    coord: { lon: '', lat: '' },
    name: '',
    main: { temp: '' }
  });
  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const [forecast, setForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const apiKey = '107a420b6f4b7dd8c2243eb7a310e6fe';

  const fetchData = url => {
    fetch(url)
      .then(res => res.json())
      .then(res => (res.cod === '404' ? setWeatherData(prevState => prevState) : setWeatherData(res)));
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (searchVal !== '') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${apiKey}`;
      fetchData(url);
    } else if (searchVal.length === 0) {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=${apiKey}`;
      fetchData(api);
    }
    setLon(weatherData.coord.lon);
    setLat(weatherData.coord.lat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal]);
  console.log(weatherData);

  const convertCtoF = (temp, type) => {
    return type === 'fahrenheit' ? Math.floor(((temp - 273.15) * 9) / 5 + 32) : Math.floor(temp - 273.15);
  };

  const getDailyForecast = arr => {
    const newArr = [];
    let count = 0;
    for (let i = 0; i < arr.length; i += 1) {
      if (i === count) {
        newArr.push(arr[i]);
        count += 8;
      }
    }
    setDailyForecast(newArr);
    return newArr;
  };
  useEffect(() => {
    const API = `https://api.openweathermap.org/data/2.5/forecast?lat=${Number(lat)}&lon=${Number(
      lon
    )}&appid=${apiKey}&units=metric`;
    fetch(API)
      .then(res => res.json())
      .then(res => setForecast(getDailyForecast(res.list)));
  }, [lat, lon]);

  console.log(forecast, 'forecast');

  const omitTime = str => {
    const arr = str.split(' ');
    const sliced = arr.slice(0, 1);
    return sliced.join('');
  };

  const handleChange = e => {
    setSearchVal(e.target.value);
  };
  console.log(searchVal);
  // if (!searchVal) {
  //   return <div>Loading...</div>
  // }
  return (
    <Paper
      className="w-full rounded-20 shadow flex flex-col justify-between text-white"
      style={{
        background: 'linear-gradient(180deg, hsla(358, 69%, 62%, 1) 0%, hsla(0, 76%, 10%, 1) 84%)'
      }}
    >
      <div className="flex items-center justify-between px-4 pt-8">
        <div className="flex items-center align-content-center px-8">
          <Icon className="text-black">location_on</Icon>
          <DebounceInput
            style={{ borderRadius: '30px', padding: '8px', color: 'black' }}
            value={searchVal}
            placeholder="Enter a city..."
            debounceTimeout={1000}
            onChange={handleChange}
          />
        </div>
        <IconButton aria-label="more">
          <Icon>more_vert</Icon>
        </IconButton>
      </div>
      <Typography className="text-20 mx-8 font-medium text-center">{weatherData.name}</Typography>
      <div className="flex items-center justify-center p-20 pb-32">
        <Icon className="meteocons text-48 ltr:mr-8 rtl:ml-8" color="action">
          <img
            className="w-img"
            src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="weather"
            style={{ width: '150px' }}
          />
        </Icon>
        <Typography className="text-44 mx-8 font-medium tracking-tighter">
          {convertCtoF(weatherData.main.temp)}
        </Typography>
        <Typography className="text-48">°</Typography>
        <Typography className="text-44">C</Typography>
      </div>
      <Divider />
      <div className="flex justify-between items-center p-16">
        <div className="flex items-center">
          <Typography className="mx-4 font-semibold">
            {capitalizeFirstLetter(weatherData.weather[0].description)}
          </Typography>
        </div>

        <div className="flex items-center">
          <Typography className="mx-4 font-semibold">
            Feels like: {convertCtoF(weatherData.main.feels_like)}&deg;C
          </Typography>
        </div>
      </div>
      <Divider />
      <div className="w-full py-16">
        {forecast.map((day, index) => (
          <div className="flex items-center justify-between w-full py-16 px-24" key={index}>
            <Typography className="text-15 font-medium">{Moment(omitTime(day.dt_txt)).format('DD.MM.YYYY')}</Typography>
            <div className="flex items-center">
              <Icon className="meteocons text-24 ltr:mr-16 rtl:ml-16" color="action">
                <img
                  className="f-img"
                  src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                  alt="weather"
                />
              </Icon>
              <Typography className="text-20 font-medium tracking-tighter">{Math.round(day.main.temp)}</Typography>
              <Typography className="text-20">&deg;</Typography>
              <Typography className="text-20">C</Typography>
            </div>
          </div>
        ))}
      </div>
    </Paper>
  );
}

export default WidgetWeather;
