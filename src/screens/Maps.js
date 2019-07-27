import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, StatusBar, Image, Dimensions, Modal } from 'react-native';
import Header from '../component/Header';
import { colors, fonts, padding } from './style';
import firebase from 'firebase';

export default class Maps extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	    		modalVisible: false,
		      	latitude: null,
		      	longitude: null,
		      	error:null,
		      	person: {
					name: props.navigation.getParam('name'),
					email: props.navigation.getParam('email'),
					phone: props.navigation.getParam('phone'),
					url: props.navigation.getParam('url'),
				},
				users: [],
				urldefault: 'https://i1.wp.com/static.teamtreehouse.com/assets/content/default_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png?ssl=1',
	    	};
  	}

  	componentDidMount() {
	    navigator.geolocation.getCurrentPosition(
	       	(position) => {
	         	this.setState({
		           	latitude: position.coords.latitude,
		           	longitude: position.coords.longitude,
		           	error: null,
	         	});
	         	const uid = firebase.auth().currentUser.uid;
				firebase.database().ref('users/' + uid).update({
					latitude : position.coords.latitude,
					longitude: position.coords.longitude,
				});
	       	},
	       	(error) => this.setState({ error: error.message }),
	       	{ enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
	    );
   	}

   	componentWillMount() {
		let dbRef = firebase.database().ref('users');
		dbRef.on('child_added', (val)=>{
			let person = val.val();
			person.uid = val.key;
			if(person.uid!==this.state.uid){
				this.setState((prevState)=>{
					return{
						users: [...prevState.users, person]
					}
				})
			}
		})
	}

   	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	render() {
		return (
			<View>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
				<Header 
					title='Map'
					leftIcon={require('../assets/icons/left.png')}
					leftPress={() => this.props.navigation.goBack()}
				/>
				<View style={styles.container}>
					<MapView
						provider ={PROVIDER_GOOGLE} // remove if not using Google Maps
						style    ={styles.map}
						region   ={{
							latitude      : this.state.latitude || 37.78825,
							longitude     : this.state.longitude || -122.4324,
							latitudeDelta : 0.015,
							longitudeDelta: 0.0121,
				       	}}
				    >
				    	
					    {
					    	this.state.users.map((user) => {
					    		return(
					    			
					    				<MapView.Marker
									       coordinate={{
									       	latitude: user.latitude || 37.78825, 
									       	longitude: user.longitude || -122.4324}}
									       onPress={() => this.setModalVisible(true)}
									       title={user.name}
									       description={user.phone}
									    >
									    	<MapView.Callout>
									    	</MapView.Callout>	
									    </MapView.Marker>
					    			
					    		)
					    	})
					    }
				    </MapView>

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
			          				<Image style={{width: 100, height: 100, borderRadius: 100, marginBottom: 15}} source={{uri: this.state.person.url || this.state.urldefault }}/>
			          				<Text style={{fontWeight: '500', fontSize: 20, color: '#000'}}>{this.state.person.name}</Text>
			          				<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
										<Image style={{width: 20, height: 20, marginRight: 10}} source={require('../assets/icons/email.png')}/>
										<Text numberOfLines={1} style={[styles.text, {padding: 5}]}>{this.state.person.email}</Text>
									</View>
									<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
										<Image style={{width: 20, height: 20, marginRight: 10}} source={require('../assets/icons/phone.png')}/>
										<Text numberOfLines={1} style={[styles.text, {padding: 5}]}>{this.state.person.phone}</Text>
									</View>
			          			</View>
			          			<View style={{flexDirection: 'row'}}>
			          				<Text style={{textAlign: 'center', borderColor: '#00000020', width: '100%', padding: 15, fontSize: 20, color: colors.blue}} onPress={() => this.setModalVisible(!this.state.modalVisible)}>Close</Text>
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
   		...StyleSheet.absoluteFillObject,
   		height: Dimensions.get('window').height,
   		width: Dimensions.get('window').width,
   		justifyContent: 'flex-end',
   		alignItems: 'center',
 	},
 	map: {
   		...StyleSheet.absoluteFillObject,
 	},
 	blurArea: {
		width          : '100%', 
		height         : '100%', 
		backgroundColor: '#00000090',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color   : '#000',
		fontSize: fonts. md,
	},
});