import React from 'react';
import ReactDOM from 'react-dom';
import Input from './input';

it('renders without crashing', () => {
	const div = document.createElement('root');
	ReactDOM.render(<App />, div);
});