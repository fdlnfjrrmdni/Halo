import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, StatusBar, Image } from 'react-native';
import Header from '../component/Header';
import { colors, fonts, padding } from './style';
// import firebase from 'firebase';

export default class SignUp extends Component {
	render() {
		return (
			<View>
				<Header title='Chat'/>
			</View>
		)
	}
}