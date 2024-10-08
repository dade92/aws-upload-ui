import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './App';
import {server} from "./server";
import {isLocalEnv} from "./Utils";

if (isLocalEnv()) {
    server();
}

ReactDOM.render(
    <React.StrictMode>
            <MyApp/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
