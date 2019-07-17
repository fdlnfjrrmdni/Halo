import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, StatusBar } from 'react-native';
import { colors, fonts, padding } from './style';

export default class Splash extends Component {
	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
					<Image style={styles.icon} source={require('../assets/icons/halo.png')}/>
					<Text style={styles.text}>Halo</Text>
			</View>		
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center',
		backgroundColor: '#fff',
		flexDirection  : 'row',
	},
	// wrap: {
	// 	backgroundColor: '#00000010',
	// 	flexDirection  : 'row',
	// 	padding        : padding.md,
	// 	borderRadius   : 20,
	// },
	icon: {
		width : 50,
		height: 50,
	},
	text: {
		fontWeight: '500',
		fontSize  : 50,
		color     : '#000',
	}
})