import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  BackHandler,
  ToastAndroid
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Caller from "../../configurations/Caller";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {Blue, Pink, Grey, LightGrey, Brown, Cream, Red, Orange, DarkGrey} from '../../utils/Constants';
import {Log, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
const pass="abc12345";

export default class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      customer:[]
    };
    
  }

  componentDidMount () {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
          }
        });

     AsyncStorage.getItem('customer')
      .then(customer => {
          return JSON.parse(customer);
        })
      .then(customer => {
          console.log(customer);
          this.setState({customer:customer})
        })
  }

  handleBackPress = () => {
    console.log("Back Press");
    // if (this.props.navigation.isFocused())
      // this.state.backClickCount == 1 ? BackHandler.exitApp() : this.spring();
    // else
      this.props.navigation.goBack(null);
    return true;
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  ChangeUserPassword(){
    if(this.state.previousPassword != null && this.state.newPassword != null ){

      AsyncStorage.getItem('customer')
          .then(customer => {
            return JSON.parse(customer);
          })
          .then(customer => {
              
              if(customer != null ){
                customerID=customer.id;
              
                  Caller.callServer("ChangeCustomerPassword","POST", [this.state.previousPassword,this.state.newPassword,customerID])
                        .then( response  => {
                          console.log("response-->",response);
                        })
                        
              }
            });

    }
    else
    {
      ToastAndroid.show('Enter Previous and New Password', ToastAndroid.SHORT);

    }
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                justifyContent:'center',
                marginRight:wp('1%')
               }} 
              onPress={() => {this.props.navigation.goBack()}}
              
            >
              <Icon1 
                name={"left"}
                size={18}
                color={'rgba(255,255,255,1)'}
              />
            </TouchableOpacity>
            {this.state.language == 'eng' ?
              <Text style={{
                color:'#fff',
                fontSize:wp('5%'),
                marginLeft:wp('2%')
              }}>
                Change Password
              </Text>
            :
              <Text style={{
                color:'#fff',
                fontSize:wp('5%'),
                marginLeft:wp('2%')
              }}>
                غير كلمة السر
              </Text>
            }
          </View>
          
        </View>

        <View style={styles.form}>

          <View style={{
            backgroundColor:'#fff',
            padding:wp('2%'),
            paddingHorizontal:wp('4%'),
            borderRadius:5,
            flexDirection:'row',
            justifyContent:'space-between',
            borderColor:'#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,

            elevation: 2,
          }}>

            <View>
              
              
              <TextInput
                secureTextEntry={true}
                style={{
                  fontSize:wp('4%')
                }}
                placeholder={this.state.language=='eng' ? "Previous Password" : "كلمة المرور السابقة"}
                onChangeText={(val) => { this.setState({previousPassword: val}) }}
              />


            </View>

          </View>

          <View style={{
            marginTop:hp('4%'),
            backgroundColor:'#fff',
            padding:wp('2%'),
            paddingHorizontal:wp('4%'),
            borderRadius:5,
            flexDirection:'row',
            justifyContent:'space-between',
            borderColor:'#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,

            elevation: 2,
          }}>

            <View>
              
              
              <TextInput
                secureTextEntry={true}
                style={{
                  fontSize:wp('4%')
                }}
                placeholder={this.state.language=='eng' ? "New Password" : "كلمة سر جديدة"}
                onChangeText={(val) => { this.setState({newPassword: val}) }}
              />


            </View>

          </View>

          <TouchableOpacity
            onPress={()=>{this.ChangeUserPassword()}}
            style={{
              paddingHorizontal:wp('10%'),
              paddingVertical:hp('1%'),
              backgroundColor:Orange,
              marginHorizontal:wp('5%'),
              borderRadius:5,
              marginTop:hp('10%'),
              alignItems:'center'
            }}
          >
            {this.state.language == 'eng' ?
              <Text style={{
                color:'#fff',
                fontSize:wp('4%'),
                fontWeightL:'bold'
              }}>
                Change Password
              </Text>
            :
              <Text style={{
                color:'#fff',
                fontSize:wp('4%'),
                fontWeightL:'bold'
              }}>
                غير كلمة السر
              </Text>
            }
          </TouchableOpacity>

        </View>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    // paddingTop:80
  },
   
   header: {
    backgroundColor:Orange,
    // height:hp('9%'),
    borderBottomRightRadius:wp('10%'),
    borderBottomLeftRadius:wp('10%'),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:wp('5%'),
    alignItems:'center',
    marginBottom:hp('2%'),
    paddingVertical:hp('1.5%')
  },

  form: {
    justifyContent:'center',
    marginTop:hp('15%'),
    paddingHorizontal:wp('4%'),
    // borderWidth:1
  }

});