import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import StarRatings from './StarRatings';
import reportWebVitals from './reportWebVitals';
import Chalange from './Chalange';
//  import App from './App -v1'
import App from './App-Geo';
// import App from './App-v2';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StarRatings maxRating={10} />
              
    <StarRatings  message={["terrible","Bad","Okay","Good","Ammazing"]} defaultRating={5}/> */}
    <App />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
