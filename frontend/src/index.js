import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux'

import './index.css';

import App from './App';
// import store from './App/Store'
=======
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import EntireResult from './Components/TestResultCard/EntireResult';
>>>>>>> 9de5819ce42936d768e50b1ddc3573a013e03785

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
=======
    <div className="App">
      <EntireResult />
    </div>
>>>>>>> 9de5819ce42936d768e50b1ddc3573a013e03785
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
