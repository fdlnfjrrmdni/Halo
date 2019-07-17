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