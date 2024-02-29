import React, { useState } from 'react';
import Sunny from '../assets/sun.png';
import Rainy from '../assets/rain.png';
import Windy from '../assets/windy.png';
import Humidity from '../assets/humidity.png';
import Snow from '../assets/snowy.png';
import Cloudy from '../assets/cloud.png';
import Haze from '../assets/foggy.png';

const WeatherApp = () => {
	const API_KEY = import.meta.env.VITE_API_KEY;
	const [location, setLocation] = useState('');
	const [weatherData, setWeatherData] = useState(null);
	const [error, setError] = useState('');
	let weatherIcon = null;

	const handleInputChange = (event) => {
		setLocation(event.target.value);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const handleSearch = async () => {
		// If our location is empty, setError state to have this string, and return.
		if (!location.trim()) {
			setError('Please enter a valid Location');
			return;
		} else if (/[^a-zA-Z\s]/.test(location)) {
			setError(
				'Invalid location format. Please avoid special characters and numbers.'
			);
			return;
		} else {
			setError('Invalid location. Please try again.');
			setWeatherData(null);
		}

		try {
			// fetch our data, and return it as a json file.
			const retrieve = await fetch(
				// set our api call to our location state, as well as our units to metric, and our api key variable.
				`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
			);

			const data = await retrieve.json();
			// set our json data to be equal to our weatherData setter function
			setWeatherData(data);
			console.log(data);
			// setError to empty, since no error has occurred.
			setError('');
		} catch (error) {
			// console our error if an error has occurred
			console.error('Failed to retrieve weather data', error);
			// set the error to this string, which will equate our error state variable to be true.
			setError('Failed to retrieve weather data');
			setWeatherData(null);
		}
	};

	if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
		const weatherMain = weatherData.weather[0].main;
		// Run through each of the weatherData string results. Depending on the result is what imported image will be displayed
		if (weatherMain === 'Clear') {
			weatherIcon = Sunny;
		} else if (weatherMain === 'Rain') {
			weatherIcon = Rainy;
		} else if (weatherMain === 'Snow') {
			weatherIcon = Snow;
		} else if (weatherMain === 'Clouds') {
			weatherIcon = Cloudy;
		} else if (weatherMain === 'Haze') {
			weatherIcon = Haze;
		}
	}

	return (
		<section className='flex m-auto w-full '>
			<div className='border-none rounded-md flex flex-col mx-auto my-20 p-4 md:w-[500px] w-[300px] bg-blue-100  shadow-lg'>
				<div className='mx-auto '>
					<input
						onChange={handleInputChange}
						type='text'
						className='w-[150px] md:w-[300px]  my-2 p-2 outline-none rounded-l-md shadow-lg'
						value={location}
						onKeyDown={handleKeyPress}
						placeholder='Insert Location Here...'
					/>
					<button
						onClick={() => handleSearch()}
						className=' px-4 py-2 rounded-r-md bg-blue-200 hover:bg-blue-300 border-none shadow-lg'
					>
						Search
					</button>
					{/* We use short circuiting here. If our error is truthy(a non-empty string in this case), then our error message p tag will show */}
					{error && <p className='text-red-600 text-sm'>{error}</p>}
				</div>
				{/* We can't display any data if our weatherData is empty. So we use conditional rendering. Our data will display as long as our weatherData state is true */}
				{weatherData && (
					<div className='flex flex-col items-center my-4 mb-2'>
						{/* display our correlated weather forecast icon */}
						<div className='bg-blue-200 p-2 rounded-full mb-4 shadow-xl'>
							<img
								className='w-[200px]'
								src={weatherIcon}
								alt={weatherData.weather[0].description}
							/>
						</div>
						{/* display the correlated location name */}
						<h1 className='text-4xl font-bold my-2 '>{weatherData.name}</h1>
						<div className='flex '>
							{/* display the temperature, and round it to equal no decimals */}
							<h2 className='text-2xl font-semibold '>
								{Math.round(weatherData.main.temp)}°C
							</h2>
						</div>
						<div className='grid text-left grid-cols-2 justify-between gap-10 my-6'>
							<div className='flex items-center gap-2'>
								<img
									src={Windy}
									alt='wind speed icon'
								/>
								{/* Wind speed display along with being rounded */}
								<h2 className='md:text-lg text-md flex flex-col'>
									Wind Speed:
									<span>{Math.round(weatherData.wind.speed)} km/h</span>
								</h2>
							</div>
							<div className='flex items-center gap-2'>
								<img
									src={Humidity}
									alt='humidity icon'
								/>
								{/* display the humidity */}
								<h2 className='md:text-lg text-md flex flex-col'>
									Humidity: <span>{weatherData.main.humidity}%</span>
								</h2>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default WeatherApp;
