import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, StatusBar, Image } from 'react-native';
import Header from '../component/Header';
import { colors, fonts, padding } from './style';
// import firebase from 'firebase';

export default class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			person: {
				name: props.navigation.getParam('name'),
				email: props.navigation.getParam('email'),
				phone: props.navigation.getParam('phone'),
			},
		}
	}

	render() {
		return (
			<View>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
				<Header 
					title='Profile'
					leftIcon={require('../assets/icons/left.png')}
					leftPress={null}
				/>
				<View>
					<Text>{this.state.person.name}</Text>
				</View>
			</View>
		)
	}
}