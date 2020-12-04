import React from 'react';
import PropTypes from 'prop-types';

const Forecast = props => {
	const {
		current,
		className,
		temp,
		feels_like,
		temp_max,
		temp_min,
		condition,
		icon,
		date,
	} = props;

	return (
		<div className={className}>
			{date &&
				<p className='date'>
					{date}
				</p>
			}
			<div className='current-info'>
				<div className='current-condition'>
					{!current &&
						<div className='condition'>
							{condition}
						</div>
					}
					<div className='current-image'>
						<img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={`${condition}-icon`}/>
					</div>
				</div>
				<div className='current-temp'>
					<div className='temperature'>
						{Math.round(temp)}
					</div>
					{feels_like &&
						<span>
							Feels Like {Math.round(feels_like)}
						</span>
					}
				</div>
				<div className='current-range'>
					<div className='range__high'>
						High: {Math.round(temp_max)}
					</div>
					<div className='range__low'>
						Low: {Math.round(temp_min)}
					</div>
				</div>
			</div>
		</div>
	);
};

Forecast.propTypes = {
	current: PropTypes.bool,
	className: PropTypes.string,
	temp: PropTypes.number.isRequired,
	temp_max: PropTypes.number.isRequired,
	temp_min: PropTypes.number.isRequired,
	condition: PropTypes.string.isRequired,
};

export default Forecast;
