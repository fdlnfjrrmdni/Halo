import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, Modal, FlatList } from 'react-native';
import firebase from 'firebase';
import Carousel from 'react-native-snap-carousel';
import Header from '../component/Header';
import { colors, fonts } from './style';

export default class Home extends Component {
	constructor(props){
	    super();
	    this.state = {
		    errors: [],
		    modalVisible: false,
	    }
	    this.props = props;
	    this._carousel = {};
	    this.init();
	}

	init(){
    this.state = {
	    videos: [
	        {
	          id: "WpIAc9by5iU",
	          thumbnail: "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
	          title: "Led Zeppelin - Stairway To Heaven"
	        }, {
	          id: "sNPnbI1arSE",
	          thumbnail: "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
	          title: "Eminem - My Name Is"
	        }, {
	          id: "VOgFZfRVaww",
	          thumbnail: "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
	          title: ""
	        }
	    ]
	};

	    console.log("ThumbnailCarousel Props: ", this.props)
	}

	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	componentDidMount() {
		const { currentUser } = firebase.auth();
    	this.setState({ currentUser });
	}

	_renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }

	render() {
		const { currentUser } = this.state;

		return (
			<View>
				<StatusBar backgroundColor="transparent" barStyle="dark-content" />
				<View style={styles.container}>
					<Header 
						leftIcon={require('../assets/icons/oldman.png')} 
						rightIcon={require('../assets/icons/door.png')}
						rightPress={() => {this.setModalVisible(true)}}/>
					<Carousel
						layout={'default'}
		              ref={(c) => { this._carousel = c; }}
		              data={[
		              	{
		              		name: 'Fadlan',
		              		message: 'Hai'
		              	},{
		              		name: 'Noah',
		              		message: 'Halo',
		              	}
		              ]}
		              renderItem={this._renderItem}
		              sliderWidth={200}
		              itemWidth={100}
		            />
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
		height: '100%',
		width: '100%',
		backgroundColor: '#fff',
	},
	blurArea: {
		width: '100%', 
		height: '100%', 
		backgroundColor: '#00000090'
	},
	alert: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	alertContent: {
		width: '60%',
		height: '40%',
		backgroundColor: '#fff',
		borderRadius: 20,
	},
	logout: {
		backgroundColor: colors.red,
		padding: 10,
		color: '#fff',
		bottom: 0,
	},
	cardMessage: {

	}
})