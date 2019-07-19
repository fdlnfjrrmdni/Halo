import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, StatusBar, Image } from 'react-native';
import Header from '../component/Header';
import { colors, fonts, padding } from './style';
// import firebase from 'firebase';

export default class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalVisible: false,
			person: {
				name: props.navigation.getParam('name'),
				email: props.navigation.getParam('email'),
				phone: props.navigation.getParam('phone'),
			},
		}
	}

	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	render() {
		return (
			<View>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
				<Header 
					title='Profile'
					leftIcon={require('../assets/icons/left.png')}
					leftPress={() => this.props.navigation.goBack()}
				/>
				<View style={styles.content}>
					<Text style={styles.text}>{this.state.person.name}</Text>
					<Text style={styles.text}>{this.state.person.email}</Text>
					<Text style={styles.text}>{this.state.person.phone}</Text>
					<Text onPress={() => this.setModalVisible(true)}>Logout</Text>
				</View>
				<Modal
			        animationType="fade"
			        transparent={true}
			        visible={this.state.modalVisible}
			        onRequestClose={() => {
			                  this.setModalVisible(!this.state.modalVisible);
			                }}>
		          	<View style={styles.blurArea}>
		          		<StatusBar backgroundColor="#00000090" barStyle="dark-content" />
		          		<View style={styles.alert}>
			          		<View style={styles.alertContent}>
			          			<Text onPress={() => firebase.auth().signOut()} style={styles.logout}>Logout</Text>
			          		</View>
			          	</View>
		          	</View>
		        </Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color   : '#000',
		fontSize: fonts. md,
	},
	logout: {
		backgroundColor: colors.red,
		padding        : 10,
		color          : '#fff',
		bottom         : 0,
	},
});