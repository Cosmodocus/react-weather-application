import React from 'react';
import WeatherApp from './WeatherApp/WeatherApp';

const App = () => {
	return (
		<>
			{/* className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4' */}
			<main>
				<WeatherApp />
			</main>
		</>
	);
};

export default App;
