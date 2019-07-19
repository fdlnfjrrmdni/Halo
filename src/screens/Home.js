import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Modal, FlatList } from 'react-native';
import firebase from 'firebase';
import Header from '../component/Header';
import User from '../User';
import { colors, fonts } from './style';

export default class Home extends Component {
	state = {
		modalVisible: false,
		users       : [],
		name: '',
		uid: firebase.auth().currentUser.uid,
	};

	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	componentWillMount() {
		let dbRef = firebase.database().ref('users');
		dbRef.on('child_added', (val)=>{
			let person = val.val();
			person.uid = val.key;
			if(person.uid===this.state.uid){
				this.state.name = person.name
			}else{
				this.setState((prevState)=>{
					return{
						users: [...prevState.users, person]
					}
				})
			}
		})
	}

	renderRow = ({item}) => {
		return(
			<TouchableOpacity style={{marginTop: 2}} onPress={() => this.props.navigation.navigate('Chat', item)}>
				<View style={styles.cardMessage}>
					<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
						<Text style={styles.name}>{item.name}</Text>
						<Text style={styles.date}>10:05</Text>
					</View>
					<Text numberOfLines={1}>This is example of message bla bla bla, This is example of message bla bla bla, This is example of message bla bla bla, </Text>
				</View>
			</TouchableOpacity>
		)
	}

	render() {
		console.log(this.state.users);
		return (
			<View>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
				<View style={styles.container}>
					<Header 
						leftIcon={require('../assets/icons/profile.png')}
						leftPress={() => this.props.navigation.navigate('Profile', this.state.users)}
						rightIcon={require('../assets/icons/maps.png')}
						rightPress={() => this.props.navigation.navigate('Maps')}
						title='Chat'
					/>

					<FlatList
						data={this.state.users}
						renderItem={this.renderRow}
						keyExtractor={(item)=>item.phone}
					/>
					<Text onPress={() => firebase.auth().signOut()} style={styles.logout}>Logout</Text>
					
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
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height         : '100%',
		width          : '100%',
		backgroundColor: '#00000005',
	},
	blurArea: {
		width          : '100%', 
		height         : '100%', 
		backgroundColor: '#00000090'
	},
	alert: {
		flex          : 1,
		justifyContent: 'center',
		alignItems    : 'center',
	},
	alertContent: {
		width          : '60%',
		height         : '40%',
		backgroundColor: '#fff',
		borderRadius   : 20,
	},
	logout: {
		backgroundColor: colors.red,
		padding        : 10,
		color          : '#fff',
		bottom         : 0,
	},
	cardMessage: {
		backgroundColor: '#fff',
		width            : '100%',
		padding          : 20,
		paddingTop       : 15,
		paddingBottom    : 15,
	},
	name: {
		fontSize       : fonts.md,
		color: '#000',
	},
	date: {
		fontSize: fonts.sm,
	}
})