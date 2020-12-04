const MY_API_TOKEN = 'f364ce2b3cfffb977f65aa8f98dcbece';

const getCoords = async (cityName, unit) => {
	const get_coordinates = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${MY_API_TOKEN}`;

	let coordinates = await fetch(get_coordinates)
		.then(res => res.json())
		.then(data => {
			return data.coord;
		})
		.catch(err => console.log(err, 'Error loading'));

	return coordinates;
};

const fetchWeather = async (cityName, unit, coords) => {
	const weather_api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,hourly,alert&appid=${MY_API_TOKEN}&units=${unit}`;

	let current_weather_data = await fetch(weather_api)
		.then(res => res.json())
		.then(data => {
			return data;
		})
		.catch(err => console.log(err, 'Error loading'));

	return current_weather_data;
};

export {
	getCoords,
	fetchWeather,
};
