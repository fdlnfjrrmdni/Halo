import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, StatusBar, Image, Dimensions } from 'react-native';
import Header from '../component/Header';
import { colors, fonts, padding } from './style';
// import firebase from 'firebase';

export default class Maps extends Component {
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
							latitude      : 37.78825,
							longitude     : -122.4324,
							latitudeDelta : 0.015,
							longitudeDelta: 0.0121,
				       	}}
				    >
				    </MapView>
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
});