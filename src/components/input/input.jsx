import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Input = props => {
	const {
		placeholder,
		suggestions,
		onInput = () => {},
	} = props;

	const [input_value, setInputValue] = useState('');
	const [show_suggestions, setShowSuggestions] = useState(false);
	const [suggestions_list, setSuggestionsList] = useState([...suggestions]);
	const [active_selection, setActiveSelection] = useState(0);

	const onChange = (e) => {
		const user_input = e.currentTarget.value;

		// if input is empty
		if (user_input.length === 0) {
			setActiveSelection(0);
			setShowSuggestions(false);
		} else if (user_input.length > 0) {
			setShowSuggestions(true);
		}

		// filtering the suggestion list based on input
		const filterSuggestions = suggestions.filter((suggestion) =>
			suggestion.toLowerCase().indexOf(user_input.toLowerCase()) > -1
		);

		// if something is in the input field, keep first selected
		setActiveSelection(0);
		setSuggestionsList(filterSuggestions);
		setInputValue(user_input);
	};

	const onKeyDown = (e) => {
		if (e.keyCode === 8) {
			// If backspace or delete
			setSuggestionsList(suggestions);
			setShowSuggestions(true);
		} else if (e.keyCode === 13) {
			const selected = suggestions_list[active_selection];
			// If enter key
			setInputValue(selected);
			setShowSuggestions(false);
			onInput(selected);
		} else if (e.keyCode === 38) {
			// If up key
			if (active_selection !== 0) {
				setActiveSelection(active_selection - 1);
			}
		} else if (e.keyCode === 40) {
			// If down key
			if (active_selection !== suggestions_list.length - 1) {
				setActiveSelection(active_selection + 1);
			}
		}
	};

	// handling a click instead of keyboard input
	const selectionClick = (i) => {
		const selected = suggestions_list[i];

		setSuggestionsList([selected]);
		setInputValue(selected);
		setShowSuggestions(false);
		onInput(selected);
	};

	return (
		<div className='input-container'>
			<input
				value={input_value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
			/>
			{show_suggestions && (
				<ul>
					{suggestions_list.map((item, i) => {
						return (
							<li
								className={`__item--${active_selection === i && 'active'}`}
								key={i}
								onClick={() => selectionClick(i)}
							>
								{item}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

Input.propTypes = {
	placeholder: PropTypes.string.isRequired,
	suggestions: PropTypes.array,
	onInput: PropTypes.func,
};

Input.defaultProps = {
	placeholder: 'Search for something...',
	suggestions: [],
};

export default Input;
