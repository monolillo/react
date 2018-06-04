import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Provider from './Provider';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider />, document.getElementById('root'));
registerServiceWorker();
