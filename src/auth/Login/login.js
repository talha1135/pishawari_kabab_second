import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  ScrollView,
  BackHandler,
  ToastAndroid
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LightBlue,Blue, Pink, Grey, LightGrey, Brown, Cream, Orange} from '../../utils/Constants';
import {Log, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Caller from "../../configurations/Caller";


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      isLoading:false
    };
    
  }

  spring() {
    this.setState({backClickCount: 1}, () => {
      ToastAndroid.show('Back press twice to exit', ToastAndroid.SHORT);
      setTimeout(() => {this.setState({backClickCount: 0})}, 1000);
      });
  }

  handleBackPress = () => {
    console.log("Back Press");
    if (this.props.navigation.isFocused())
      this.state.backClickCount == 1 ? BackHandler.exitApp() : this.spring();
    else
      this.props.navigation.goBack(null);
    return true;
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  componentDidMount () {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
            console.log(language)
          }
        });
  }
  onLoginPress = () => {

  	if(this.state.email  != null && this.state.password != null){
  	
  		this.setState({isLoading:true})

    	Caller.callServer("LoginCustomer","POST", [this.state.email,this.state.password])
            .then( response  => {
              return response.json();
            })
            .then ( data => {
              if(data.message == 'login successfuly'){
                this.setState({isLoading:false})
              	
                const customer=JSON.stringify(data.Data);
                AsyncStorage.setItem('customer', customer)
                .catch(err => {
                  console.log(err);
                })

                this.props.navigation.navigate('Menu');
              }
              else
              	this.setState({isLoading:false})
                ToastAndroid.show(data.message, ToastAndroid.SHORT);

            });
  	}
  	else{
      ToastAndroid.show("Enter Email and Password", ToastAndroid.SHORT);
  	}

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView   keyboardShouldPersistTaps="always">
        <View
          style={{
            backgroundColor:LightBlue
          }}
        >
          <View style={{padding: 10, paddingTop: 10}}>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',justifyContent:'center'}}>
              
                {this.state.language=="eng" ? 
                  <Text style={{fontWeight: 'bold',color:'#fff'}} > Log In </Text>
                  :
                  <Text style={{fontWeight: 'bold',color:'#fff'}} > {Log} </Text>

                }
              <View style={{width: 22}} />
            </View>
          </View>
        </View>


        <View style={{height: hp('60%'), alignItems: 'center', margin: 10, padding: 10}}>
          
          <View style={[{paddingVertical: 20}, styles.center]}>
            <Image
              style={{width: 100, height: 100, resizeMode: 'contain'}}
              source={require('../../images/icons/logo.png')}
            />
          </View>

          <View style={{paddingVertical: 10}}/>  
          <View style={{width: '100%',  flex: 1, justifyContent: 'center'}}>
          <View style={[styles.outline,{flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center'}]}>
            <Icon 
              name={"email"}
              size={20}
              color={Cream}
            />
            <TextInput
              style={{flex: 1, fontSize: 16, padding: 7}}
              placeholder= {this.state.language=="eng" ? "email" : email}
              onChangeText={(val) => { this.setState({email: val}) }}
              placeholderTextColor={Cream}
              
            />
          </View>

          <View style={{paddingVertical: hp('3%')}}/>

          <View style={[styles.outline,{flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center'}]}>
            <Icon 
              name={"lock"}
              size={20}
              color={Cream}
            />
            <TextInput
              secureTextEntry={true}
              style={{flex: 1, fontSize: 16, padding: 7}}
              placeholder= {this.state.language=="eng" ? "Password" : password }
              onChangeText={(val) => { this.setState({password: val}) }}
              placeholderTextColor={Cream}
            />
          </View>
          </View>
          
        </View>
        
        <View style={{height: hp('7.5%'), paddingHorizontal: 30, paddingVertical: 0, justifyContent: 'center'}}>
          <LinearGradient
            start={{x: 0.0, y: 0.25}} end={{x: 1, y: 1.0}}
            locations={[0,0.5,0.9]}
            colors={[LightBlue, LightBlue, LightBlue]}
            style={{flex: 1, borderRadius: 10}}>
            <TouchableOpacity
              style={[{flex: 1}, styles.center]}
              onPress={() => {this.onLoginPress()}}
            >
              {this.state.language=="eng" ? 
                <Text style={{color: '#fff', fontSize: 16}} >Log In</Text>
                :
                <Text style={{color: '#fff', fontSize: 16}} >{Log}</Text>

              }

            </TouchableOpacity>
          </LinearGradient>
        </View>
        
        <TouchableOpacity
          style={[{marginTop: 20}, styles.center]}
          onPress={() => {this.props.navigation.navigate('SignUp')}}
        >
          {this.state.language=="eng" ? 
            <Text style={{color: '#8a8a8a', fontSize: 14}} >Doesn't have account ? Sign Up</Text>
            :
            <Text style={{color: '#8a8a8a', fontSize: 14}} >{dha}</Text>
          }
        </TouchableOpacity>

        </ScrollView>

        
        {/*Loading Indicator*/}
        {this.state.isLoading && (
          <View style={[{backgroundColor: 'rgba(255,255,255,0.8)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}, styles.center]}>
            <ActivityIndicator color={LightBlue} size="large" />
          </View>
        )} 

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderColor: Cream,
    borderRadius: 50
  }
})