import React, { useState } from 'react';
import { getCoords, fetchWeather } from '../utils';
import Input from './input';
import Forecast from './forecast';
import Button from './button';
import cities from './data/cities';

import dayjs from 'dayjs';

import '../App.css';

function App() {
	const [show_weather, setShowWeather] = useState(false);
	const [current_city, setCurrentCity] = useState('');
	const [current_unit, setUnit] = useState('imperial');
	const [forecast, setForecast] = useState([]);
	const [current_weather, setCurrentWeather] = useState({
		feels_like: '',
		condition: '',
		icon: '',
		temp: '',
		temp_max: '',
		temp_min: '',
	});
	const [coords, setCoords] = useState({
		lat: '',
		lon: '',
	});

	const onInput = city => {
		setShowWeather(true);
		setCurrentCity(city);

		getCoords(city)
			.then(res => {
				const coords = res;
				setCoords(coords);

				setWeatherData(city, current_unit, coords);
			});
	};

	const toggleUnit = () => {
		const unit = current_unit === 'imperial' ? 'metric' : 'imperial';
		setUnit(unit);

		setWeatherData(current_city, unit, coords);
	};

	const setWeatherData = (city, unit, coords) => {
		fetchWeather(city, unit, coords)
			.then(res => {
				const current = res.daily[0];
				const condition = res.daily[0].weather[0];
				const five_days = res.daily.slice(1, 6);

				setCurrentWeather({
					feels_like: current.feels_like.day,
					condition: condition.main,
					icon: condition.icon,
					temp: current.temp.day,
					temp_max: current.temp.max,
					temp_min: current.temp.min,
				});

				setForecast(five_days);
			});
	}

	return (
		<div className={'container'}>
			<h1>Check the Weather!</h1>

			<Input
				className='input-container'
				placeholder='Search for your city...'
				suggestions={cities}
				onInput={onInput}
			/>
			{show_weather && 
				<div>
					<div className='weather-card'>
						<div className='current'>
							<h3>
								{current_weather.condition} in {current_city}
							</h3>
							{current_weather.temp &&
								<Forecast
									className='current-forecast'
									current
									{...current_weather}
								/>
							}
							<Button
								className='button--toggle'
								onClick={toggleUnit}
							>
								{current_unit === 'imperial' ? 'Celsius' : 'Fahrenheit'}
							</Button>
						</div>
					</div>
					<div className='forecast-container'>
						<h5>
							Here's your 5 day forecast
						</h5>
						<div className='forecast'>
							{forecast.map((item, i) => {
								const condition = item.weather[0];
								const date = dayjs.unix(new Date(item.dt)).format('ddd MM/DD');

								const forecast_props = {
									condition: condition.main,
									icon: condition.icon,
									temp: item.temp.day,
									temp_max: item.temp.max,
									temp_min: item.temp.min,
									date,
								};

								return (
									<Forecast
										className='forecast__item'
										key={`forecast-${i}`}
										{...forecast_props}
									/>
								)
							})}
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default App;
