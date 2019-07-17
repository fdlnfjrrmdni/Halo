import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from "react-native";
import firebase from 'firebase';


export default class SimpleHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title     : this.props.title,
            rightPress: this.props.rightPress,
            leftPress : this.props.leftPress,
            rightIcon : this.props.rightIcon,
            leftIcon  : this.props.leftIcon,
            centerIcon: this.props.centerIcon,
        };
    }

    componentDidMount() {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={this.state.leftPress} style={{width: '15%'}}>
                    <Image style={{margin:10,  width: 28, height: 28}}
                           source={this.state.leftIcon}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', width: '70%'}}>
                    {this.state.centerIcon && 
                        <Image style={{width: 28, height: 28, marginRight: 5,}}
                           source={this.state.centerIcon} />}
                    <Text numberOfLines={1} style={{fontSize: 20, fontWeight: '500', color: '#000'}}>{currentUser && currentUser.email}</Text>
                </View>
                <TouchableOpacity onPress={this.state.rightPress} style={{width: '15%'}}>
                    <Image style={{margin:10, width: 28, height: 28}}
                           source={this.state.rightIcon}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height         : 60,
        width          : '90%',
        margin         : 15,
        borderRadius   : 20,
        flexDirection  : 'row',
        justifyContent : 'space-between',
        backgroundColor: '#fff',
        alignItems     : 'center',
        alignSelf      : 'center',
        elevation      : 10,
    },
});