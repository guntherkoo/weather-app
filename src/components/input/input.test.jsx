import React from 'react';

import {
	render,
	screen,
} from '@testing-library/react';

import Input from './input';

describe('Test the input component', () => {
	const placeholder = 'Search for something...';

	it('renders component', () => {
		const component = render(<Input placeholder={placeholder} />);

		expect(component).toBeTruthy();
	});
});