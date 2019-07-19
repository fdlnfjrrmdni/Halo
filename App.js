import  React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Loading from './src/screens/Loading'; 
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Profile from './src/screens/Profile';
import Maps from './src/screens/Maps';
import Header from './src/component/Header';

const AppStack = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        Chat: {
            screen: Chat
        },
        Profile: {
            screen: Profile
        },
        Maps: {
            screen: Maps
        },
    },
    {
        headerMode: 'none',
        initialRouteName: 'Home'
    }
);

const SwitchNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Loading,
    SignUp,
    Login,
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