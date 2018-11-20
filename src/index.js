import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDgKDTzdt-DuF_HbMt7zaIp9kg9TJaSoqk",
    authDomain: "coki-214004.firebaseapp.com",
    databaseURL: "https://coki-214004.firebaseio.com",
    projectId: "coki-214004",
    storageBucket: "coki-214004.appspot.com",
    messagingSenderId: "1067304291348"
  };
firebase.initializeApp(config);

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
