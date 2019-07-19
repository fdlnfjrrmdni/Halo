import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { colors, fonts } from './style';
import firebase from 'firebase';

export default class Loading extends Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.props.navigation.navigate(user ? 'Home' : 'Login')
		})
	}

	componentWillMount() {
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
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
				<ActivityIndicator size='large' color='#000'/>
			</View>		
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex          : 1,
		justifyContent: 'center',
		alignItems    : 'center',
	},
	text: {
		fontSize: fonts.xl,
		color   : colors.blue,
	}
})