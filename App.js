import  React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Loading from './src/screens/Loading'; 
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Profile from './src/screens/Profile';
import Maps from './src/screens/Maps';
import Header from './src/component/Header';

const SwitchNavigator = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home,
    Chat,
    Profile,
    Maps,
    Header
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