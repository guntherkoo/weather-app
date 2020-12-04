import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
	const {
		className,
		onClick,
		children,
	} = props;

	return (
		<button
			className={className}
			type='button'
			aria-label='toggle'
			onClick={onClick}
		>
			{children}
		</button>
	)
};

Button.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.string.isRequired,
};

export default Button;
