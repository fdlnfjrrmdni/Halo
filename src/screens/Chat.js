import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, StatusBar, Image, FlatList } from 'react-native';
import Header from '../component/Header';
import { colors, fonts, padding } from './style';
// import User from '../User';
import firebase from 'firebase';

export default class Chat extends Component {
	constructor(props){
		super(props);

		this.state = {
			person: {
				name: props.navigation.getParam('name'),
				uid: props.navigation.getParam('uid'),
			},
			textMessage: '',
			messageList: [],
			title: '',
			uid: firebase.auth().currentUser.uid,
			name: '',
		}

		// let dbRef = firebase.database().ref('users');
		// dbRef.on('child_added', (val)=>{
		// 	let person = val.val();
		// 	person.uid = val.key;
		// 	if(person.uid===this.state.uid){
		// 		this.state.name = person.name
		// 	}else{
		// 		this.setState((prevState)=>{
		// 			return{
		// 				users: [...prevState.users, person]
		// 			}
		// 		})
		// 	}
		// })
	}

	componentWillMount() {
		firebase.database().ref('messages').child(this.state.uid).child(this.state.person.uid)
			.on('child_added', (value) => {
				this.setState((prevState) => {
					return{
						messageList: [...prevState.messageList, value.val()]
					}
				})
			})
	}

	handleChange = key => val => {
		this.setState({[key]: val})
	}

	convertTime = (time) => {
		let d = new Date(time);
		let c = new Date();
		let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
		result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
		if(c.getDay() !== d.getDay()){
			result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
		}
		return result;
	}

	sendMessage = async () => {
		if(this.state.textMessage.length > 0){
			let msgId = firebase.database().ref('messages').child(this.state.uid).child(this.state.person.uid).push().key;
			let updates = {};
			let message = {
				message: this.state.textMessage,
				time: firebase.database.ServerValue.TIMESTAMP,
				from: this.state.uid
			}
			updates['messages/'+this.state.uid+'/'+this.state.person.uid+'/'+msgId] = message;
			updates['messages/'+this.state.person.uid+'/'+this.state.uid+'/'+msgId] = message;
			firebase.database().ref().update(updates);
			this.setState({textMessage:''}); 
		}
	}

	renderRow = ({item}) => {
		return (
			<View style={[styles.columnChat, {
				alignSelf: item.from===this.state.uid ? 'flex-end' : 'flex-start',
				backgroundColor: item.from===this.state.uid ? colors.blue : '#fff',
				marginLeft: item.from===this.state.uid ? 0 : 20,
				marginRight: item.from===this.state.uid ? 20 : 0,
				borderTopLeftRadius: 15,
				borderBottomLeftRadius: item.from===this.state.uid ? 15 : 0,
				borderTopRightRadius: 15,
				borderBottomRightRadius: item.from===this.state.uid ? 0 : 15,
 			}]}>
 				<Text style={{color: item.from===this.state.uid ? '#fff' : '#000', marginRight: 5, maxWidth: '70%'}}>{item.message}</Text>
 				<Text style={{fontSize: 12, color: '#00000020'}}>{this.convertTime(item.time)}</Text>
			</View>
		)
	}

	render() {
		return (
			<View style={{height: '100%'}}>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
				<Header 
					title={this.state.person.name}
					leftIcon={require('../assets/icons/left.png')}
					leftPress={() => this.props.navigation.goBack()}
					rightIcon={require('../assets/icons/pin.png')}
				/>
				<FlatList
					showsVerticalScrollIndicator={false}
					style={{marginTop: 10}}
					data={this.state.messageList}
					renderItem={this.renderRow}
					keyExtractor={(item, index) => index.toString()}
				/>
				<View style={styles.textChat}>
					<TextInput 
						multiline={true}
						numberOfLines={4}
						value={this.state.textMessage}
						onChangeText={this.handleChange('textMessage')}
						placeholder='Type...'
						style={styles.textInput}></TextInput>
					<TouchableOpacity onPress={this.sendMessage}>
						<Image style={{width: 30, height: 30}} source={require('../assets/icons/go.png')}/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	columnChat: {
		flexDirection: 'row', 
		padding: 15,
		elevation: 5,
		margin: 5
	},
	textChat: {
		flexDirection: 'row', 
		marginTop: 0,
		margin:20,
		height: 50,
		alignItems: 'center', 
		backgroundColor: '#fff',
		borderRadius: 50,
		elevation: 5,
		bottom: 0, 
		paddingRight: 10,
		paddingLeft: 20,
		width: '90%',
	},
	textInput: {
		fontSize: 16,
		width: '85%',
	}
});