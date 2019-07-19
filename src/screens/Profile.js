import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, StatusBar, Image, Modal } from 'react-native';
import Header from '../component/Header';
import { colors, fonts, padding } from './style';
import firebase from 'firebase';

export default class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalVisible: false,
			modalVisibleImg: false,
			person: {
				name: props.navigation.getParam('name'),
				email: props.navigation.getParam('email'),
				phone: props.navigation.getParam('phone'),
			},
			url: '',
		}
	}

	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	setModalVisibleImg(visible) {
	    this.setState({modalVisibleImg: visible});
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
					<TouchableOpacity  onPress={() => this.setModalVisibleImg(true)}>
						<Image style={{width: 100, height: 100, borderRadius: 100}} source={{uri: 'https://i1.wp.com/static.teamtreehouse.com/assets/content/default_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png?ssl=1'}}/>
					</TouchableOpacity>
					<Text numberOfLines={2} style={[styles.text, {fontSize: 20, padding: 10}]}>{this.state.person.name}</Text>
					<Text numberOfLines={1} style={[styles.text, {padding: 5}]}>{this.state.person.email}</Text>
					<Text numberOfLines={1} style={[styles.text, {padding: 5}]}>{this.state.person.phone}</Text>
					<Text style={[styles.text, {color: '#00000050',padding: 10}]} onPress={() => this.setModalVisible(true)}>Log out</Text>
				</View>

				{/*Modal Logout*/}
				<Modal
			        animationType="fade"
			        transparent={true}
			        visible={this.state.modalVisible}
			        onRequestClose={() => {
			                  this.setModalVisible(!this.state.modalVisible);
			                }}>
		          	<View style={styles.blurArea}>
		          		<StatusBar backgroundColor="#00000090" barStyle="dark-content" />
		          		<View style={{flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, maxWidth: '75%'}}>
		          			<View style={{padding: 20, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#00000020'}}>
		          				<Text style={{fontWeight: '500', fontSize: 20, color: '#000'}}>Log out</Text>
		          				<Text style={{textAlign: 'center', fontSize: fonts.md, color: '#000'}}>You will be returned to the login screen.</Text>
		          			</View>
		          			<View style={{flexDirection: 'row'}}>
		          				<Text style={{textAlign: 'center', borderRightWidth:0.5, borderColor: '#00000020', width: '50%', padding: 15, fontSize: 20, color: colors.blue}} onPress={() => firebase.auth().signOut()}>Yes</Text>
		          				<Text style={{textAlign: 'center', borderLeftWidth:0.5, borderColor: '#00000020', width: '50%', padding: 15, fontSize: 20, color: colors.blue}} onPress={() => this.setModalVisible(!this.state.modalVisible)}>Cancel</Text>
		          			</View>
			          	</View>
		          	</View>
		        </Modal>

		    	{/*Modal Input URL*/}
		        <Modal
			        animationType="fade"
			        transparent={true}
			        visible={this.state.modalVisibleImg}
			        onRequestClose={() => {
			                  this.setModalVisibleImg(!this.state.modalVisibleImg);
			                }}>
		          	<View style={styles.blurArea}>
		          		<StatusBar backgroundColor="#00000090" barStyle="dark-content" />
		          		<View style={{flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, maxWidth: '90%'}}>
		          			<View style={{padding: 20, paddingLeft: 0, paddingRight: 0, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#00000020'}}>
		          				<Text style={{fontWeight: '500', fontSize: 20, color: '#000', marginBottom: 10}}>Upload Image</Text>
		          				<TextInput 
		          					placeholder    ="URL"
									autoCapitalize ="none"
									style          ={styles.textInput}
									onChangeText   ={url => this.setState({ url })}
									value          ={this.state.url}
		          				/>
		          			</View>
		          			<View style={{flexDirection: 'row'}}>
		          				<Text style={{textAlign: 'center', borderRightWidth:0.5, borderColor: '#00000020', width: '50%', padding: 15, fontSize: 20, color: colors.blue}} >Upload</Text>
		          				<Text style={{textAlign: 'center', borderLeftWidth:0.5, borderColor: '#00000020', width: '50%', padding: 15, fontSize: 20, color: colors.blue}} onPress={() => this.setModalVisibleImg(!this.state.modalVisibleImg)}>Cancel</Text>
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
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color   : '#000',
		fontSize: fonts. md,
	},
	blurArea: {
		width          : '100%', 
		height         : '100%', 
		backgroundColor: '#00000090',
		justifyContent: 'center',
		alignItems: 'center',
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
});