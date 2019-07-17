import  React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Loading from './src/screens/Loading'; 
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey           : "AIzaSyDvXAGHdtNtaIXdg5DhJoy-l_uLmq4M4ko",
  authDomain       : "halo-824ed.firebaseapp.com",
  databaseURL      : "https://halo-824ed.firebaseio.com",
  projectId        : "halo-824ed",
  storageBucket    : "",
  messagingSenderId: "50158119087",
  appId            : "1:50158119087:web:7971e376bb9ba23a"
};

firebase.initializeApp(firebaseConfig);

const SwitchNavigator = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home
  },
  {
    initialRouteName: 'Loading'
  }
)

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends Component {
    render() {
        return (
          <AppContainer />
        )
    }
}