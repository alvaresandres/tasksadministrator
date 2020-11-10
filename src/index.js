import React from 'react';
import ReactDOM from 'react-dom';// enfocado al navegador 
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';//para servicios locales

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();


//jsx