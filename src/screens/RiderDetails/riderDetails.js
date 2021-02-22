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
  Linking
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';

import {Blue, Pink, Grey, LightGrey, Brown, Cream, Red, Orange, DarkGrey,LightRed} from '../../utils/Constants';
import {Log, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      rider:[]
    };
    
  }

  componentDidMount () {
    const rider = this.props.navigation.getParam('rider');
    // console.log(rider);
    this.setState({rider:rider});
    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
            console.log(language)
          }
        });
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    console.log("Back Press");
    
      this.props.navigation.goBack(null);
    return true;
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

    call(number){

      if (Platform.OS === 'ios') {
      number = 'telprompt:${'+number+'}';
      }
      else {
      number = 'tel:${'+number+'}'; 
      }

      Linking.openURL(number);
  }

  message(number){
    Linking.openURL('sms:'+number);
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
              <Icon 
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
                Rider Details
              </Text>
            :
              <Text style={{
                color:'#fff',
                fontSize:wp('5%'),
                marginLeft:wp('2%')
              }}>
                تفاصيل رايدر
              </Text>
            }
          </View>
          
        </View>

        <View style={styles.form}>
          <View style={{
            // borderWidth:1,
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
              {this.state.language == 'eng' ? 
              <Text style={{
                color:DarkGrey,
                fontSize:wp('4.5%'),
                fontWeight:"bold",
                paddingRight:wp('4%'),
              }}>
                Rider Name
              </Text>
            :
              <Text style={{
                color:DarkGrey,
                fontSize:wp('4.5%'),
                fontWeight:"bold",
                paddingRight:wp('4%'),

              }}>
                اسم الراكب
              </Text>
            }
              <Text style={{
                fontSize:wp('4%'),
                color:DarkGrey,
                marginTop:hp('1%')

              }}>
                {this.state.rider.name}
              </Text>
            </View>


          </View>

          <View style={{marginVertical:hp('1.5%')}}/>

          <View style={{
            // borderWidth:1,
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
              {this.state.language == 'eng' ? 
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:"bold",
                  paddingRight:wp('4%'),
                  marginBottom:hp('2%')

                }}>
                  Contact Info
                </Text>
              :
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:"bold",
                  paddingRight:wp('4%'),
                  alignSelf:'flex-start',
                  marginBottom:hp('2%')

                }}>
                  معلومات الاتصال
                </Text>
              }
              <View style={{flexDirection:'row'}}>
                <Icon1 
                  name={"phone"}
                  size={wp('5%')}
                  color={'#74db0d'}
                />
                <Text style={{
                  fontSize:wp('4%'),
                  color:DarkGrey,
                  marginLeft:wp('2%')

                }}>
                  {this.state.rider.phone_number}
                </Text>
                
              </View>

              <View style={{flexDirection:'row',marginTop:hp('1%')}}>

                <TouchableOpacity 
                  onPress={()=>{this.call(this.state.rider.phone_number)}}
                  style={{
                  backgroundColor:'#fff',
                  padding:wp('1%'),
                  paddingHorizontal:wp('5%'),
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

                  <Text style={{
                    color:DarkGrey,
                    marginRight:wp('4%')
                  }}>
                    call
                  </Text>

                  <Icon1 
                    name={"phone"}
                    size={wp('5%')}
                    color={'#74db0d'}
                  />

                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={()=>{this.message(this.state.rider.phone_number)}}
                  style={{
                  marginLeft:wp('4%'),
                  backgroundColor:'#fff',
                  padding:wp('1%'),
                  paddingHorizontal:wp('5%'),
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

                  <Text style={{
                    color:DarkGrey,
                    marginRight:wp('4%')
                  }}>
                    sms
                  </Text>

                  <Icon1 
                    name={"message-text"}
                    size={wp('5%')}
                    color={'#d1db0f'}
                  />

                </TouchableOpacity>

              </View>
            </View>


          </View>
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
    paddingVertical:hp('1%'),
    // height:hp('9%'),
    borderBottomRightRadius:wp('10%'),
    borderBottomLeftRadius:wp('10%'),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:wp('5%'),
    alignItems:'center',
    marginBottom:hp('2%'),
  },
  form: {
    // justifyContent:'center',
    // alignItems:'center',
    marginTop:hp('2%'),
    paddingHorizontal:wp('4%'),
    // borderWidth:1
  }

});