import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import firebase from 'firebase';
import Header from '../component/Header';
import { colors, fonts } from './style';

export default class Home extends Component {
	state = {
		users       : [],
		name        : '',
		currUser 	: {
			name     : '',
			email    : '',
			phone    : '',
			url      : '',
			longitude: '',
			latitude : '',
		},
		uid         : firebase.auth().currentUser.uid,
	};

	componentWillMount() {
		let dbRef = firebase.database().ref('users');
		dbRef.on('child_added', (val)=>{
			let person = val.val();
			person.uid = val.key;
			if(person.uid===this.state.uid){
				this.state.currUser.name = person.name;
				this.state.currUser.email = person.email;
				this.state.currUser.phone = person.phone;
				this.state.currUser.url = person.url;
				this.state.currUser.longitude = person.longitude;
				this.state.currUser.latitude = person.latitude;
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
					<Image style={{width: 40, height: 40, borderRadius: 100, marginRight: 10}} source={{uri: item.url || this.state.urldefault}}/>
					<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
						<Text style={styles.name}>{item.name}</Text>
						{/* <Text style={styles.date}>10:05</Text> */}
					</View>
					{/* <Text numberOfLines={1}>This is example of message bla bla bla, This is example of message bla bla bla, This is example of message bla bla bla, </Text> */}
				</View>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
				<View style={styles.container}>
					<Header 
						leftIcon={require('../assets/icons/profile.png')}
						leftPress={() => this.props.navigation.navigate('Profile', this.state.currUser)}
						rightIcon={require('../assets/icons/maps.png')}
						rightPress={() => this.props.navigation.navigate('Maps', this.state.currUser)}
						title='Chat'
					/>

					<FlatList
						data={this.state.users}
						renderItem={this.renderRow}
						keyExtractor={(item)=>item.uid}
					/>
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
	alert: {
		flex          : 1,
		justifyContent: 'center',
		alignItems    : 'center',
	},
	cardMessage: {
		backgroundColor: '#fff',
		width            : '100%',
		padding          : 20,
		paddingTop       : 15,
		paddingBottom    : 15,
		flexDirection: 'row'
	},
	name: {
		fontSize: fonts.md,
		color   : '#000',
	},
	date: {
		fontSize: fonts.sm,
	}
})