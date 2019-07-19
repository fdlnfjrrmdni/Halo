import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, StatusBar, Alert, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { colors, fonts, padding } from './style';

export default class Login extends Component {
	state = { 
		email       : '',
		password    : '',
		errorMessage: null,
	}

	handleLogin = () => {
		const { email, password } = this.state;
		firebase.auth()
	     		.signInWithEmailAndPassword(email, password)
	     		.then(() => this.props.navigation.navigate('Home'))
	     		.catch(error => this.setState({ errorMessage: error.message }))
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
				<View style={styles.head}>
					<Image style={{width: 40, height: 40, marginRight: 5}} source={require('../assets/icons/halo.png')}/>
					<Text style={styles.textHead}>Halo</Text>
				</View>
				<TextInput
					placeholder    ="Email"
					autoCapitalize ="none"
					style          ={[styles.textInput, {marginBottom: 10}]}
					onChangeText   ={email => this.setState({ email })}
					value          ={this.state.email}
				/>
				<View style={{flexDirection: 'row', width: '80%'}}>
					<TextInput
						secureTextEntry
						placeholder    ="Password"
						autoCapitalize ="none"
						style          ={[styles.textInput, {width: '85%'}]}
						onChangeText   ={password => this.setState({ password })}
						value          ={this.state.password}
					/>
					<TouchableOpacity onPress={this.handleLogin}>
						<Image style={{width: 30, height: 30, margin: 10}} source={require('../assets/icons/ok.png')}/>
					</TouchableOpacity>
				</View>
				{this.state.errorMessage && 
					<Text style={styles.textError}>{this.state.errorMessage}</Text>
				}
				<View style={{padding: padding.md}}>
					<Text>
						Don't have an account?&nbsp;
						<Text onPress={() => this.props.navigation.navigate('SignUp')} style={styles.textBtn}> 
							SignUp
						</Text>
					</Text>
				</View>
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
	head: {
		marginBottom: 20,
		flexDirection: 'row',
	},
	textHead: {
		color       : '#000', 
		fontSize    : fonts.xl,
	},
	textInput: {
		height         : 50,
		fontSize       : fonts.md,
		width          : '80%',
		backgroundColor: '#00000010',
		borderRadius   : 12,
		paddingLeft    : 15,
		paddingRight   : 15,
	},
	textBtn: {
		color   : '#000',
	},
	textError: {
		color          : colors.red,
		position       : 'absolute',
		top            : 20,
		backgroundColor: '#ff000010',
		padding        : 10,
		borderRadius   : 12,
		width          : '80%',
	}
});