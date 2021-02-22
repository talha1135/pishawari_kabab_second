import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
  ImageBackground,
  ToastAndroid,
  StyleSheet
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import Caller from "../../configurations/Caller";

export default class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {


    setTimeout(() => {
      AsyncStorage.getItem('customer')
      .then(customerID => {
          if(customerID != null )
            this.props.navigation.navigate('Menu');
          else
            this.props.navigation.navigate('Login');
        });
    }, 1000)


   


  }
 
  componentWillUnmount() {


  }

  render() {
    return (
      <View style={styles.container}>
        
            <View style={{height: hp('90%'), paddingVertical: 20, alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{alignItems: 'center', marginTop: hp('20%')}} >
                <Image
                  style={{width: 150, height: 150, resizeMode: 'contain',marginBottom:hp('2%')}}
                  source={require('../../images/icons/logo.png')}
                />
                <Text style={{fontSize: 15, marginTop: 10}} >PESHAWRI KABAB HOUSE</Text>
              </View>
              
            </View>
          

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    backgroundColor:'#fff'
  },
  row: {
    width: wp('95%'),
    flexDirection: 'row',
    marginVertical: 5
  },
  text: {
    fontSize: 18,
    color: '#fff'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  outline: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 50
  }
})