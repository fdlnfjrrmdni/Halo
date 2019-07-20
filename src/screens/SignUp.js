import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, StatusBar, Image } from 'react-native';
import { colors, fonts, padding } from './style';
import firebase from 'firebase';

export default class SignUp extends Component {
	state = { 
		uid			: null,
		email       : '',
		name		: '',
		phone		: '',
		password    : '',
		errorMessage: null,
	}

	handleSignUp = () => {
	    if(this.state.phone.length < 10){
	      	Alert.alert('Error', 'wrong phone number');
	    }else if(this.state.name.length < 3){
	      	Alert.alert('Error', 'wrong name');
	    }else{
		    firebase.auth()
					.createUserWithEmailAndPassword(this.state.email, this.state.password)
					.then(() => {
						const uid = firebase.auth().currentUser.uid;
						firebase.database().ref('users/' + uid).set({
							name: this.state.name,
							phone: this.state.phone,
							email: this.state.email,
						});
						this.props.navigation.navigate('Home');
					})
					.catch(error => this.setState({ errorMessage: error.message }));
  		}
  	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
				<View style={styles.head}>
					<Image style={{width: 40, height: 40, marginRight: 5}} source={require('../assets/icons/regis.png')}/>
					<Text style={styles.textHead}>Sign Up</Text>
				</View>
				<TextInput
					placeholder    ="Name"
					autoCapitalize ="none"
					style          ={[styles.textInput, {marginBottom: 10}]}
					onChangeText   ={name => this.setState({ name })}
					value          ={this.state.name}
				/>
				<TextInput
					placeholder    ="Email"
					autoCapitalize ="none"
					keyboardType   ="email-address"
					style          ={[styles.textInput, {marginBottom: 10}]}
					onChangeText   ={email => this.setState({ email })}
					value          ={this.state.email}
				/>
				<TextInput
					placeholder    ="Phone"
					autoCapitalize ="none"
					keyboardType   ="phone-pad"
					style          ={[styles.textInput, {marginBottom: 10}]}
					onChangeText   ={phone => this.setState({ phone })}
					value          ={this.state.phone}
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
					<TouchableOpacity onPress={this.handleSignUp}>
						<Image style={{width: 30, height: 30, margin: 10}} source={require('../assets/icons/ok.png')}/>
					</TouchableOpacity>
				</View>
				{this.state.errorMessage && 
					<Text style={styles.textError}>{this.state.errorMessage}</Text>
				}
				<View style={{padding: padding.md}}>
					<Text>
						Already have an account?&nbsp; 
						<Text onPress={() => this.props.navigation.navigate('Login')} style={styles.textBtn}> 
							Login
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