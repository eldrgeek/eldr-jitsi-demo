import React from 'react';
import ReactDOM from 'react-dom';

import App from './WindowSet';
// import App from './JtsiHandler';
const rootElement = document.getElementById('root');
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	rootElement
);
