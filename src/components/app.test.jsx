import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

it('renders without crashing', () => {
	const div = document.createElement('root');
	ReactDOM.render(<App />, div);
});