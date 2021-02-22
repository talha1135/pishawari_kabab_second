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
import Icon1 from 'react-native-vector-icons/AntDesign';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Blue, Pink, Grey, LightGrey, Brown, Cream, Red, Orange, LightRed, DarkGrey} from '../../utils/Constants';
import {Log, Signin, name, email, password, phone,continueToPayementMode as ctp, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

import { StackActions, NavigationActions } from 'react-navigation'; 
const i=null;

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      customer:[]
    };
    
  }
  logOut (){
    AsyncStorage.removeItem('customer');
    ToastAndroid.show("Log Out!", ToastAndroid.SHORT);

    this.props.navigation.navigate('Login');
  }
  setEnglish (){
    AsyncStorage.setItem('language', 'eng')
      .catch(err => {
        console.log(err);
      })
    this.setState({language:'eng'})

    
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Menu' })],
    });
    this.props.navigation.dispatch(resetAction)

  }
  setArabic (){
    AsyncStorage.setItem('language', 'arb')
      .catch(err => {
        console.log(err);
      })
    this.setState({language:'arb'})


    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Menu' })],
    });
    this.props.navigation.dispatch(resetAction)
  }
  handleBackPress = () => {
    console.log("Back Press");
    
    this.props.navigation.goBack(null);
    return true;
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  componentDidMount(){
    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
          }
        });
      
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    AsyncStorage.getItem('customer')
      .then(customer => {
          return JSON.parse(customer);
        })
      .then(customer => {
          console.log(customer);
          this.setState({customer:customer})
        })
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

            <Icon 
              name={"account"}
              size={hp('4%')}
              color={'rgba(255,255,255,1)'}
            />
            {this.state.language == 'eng' ? 
              <Text style={{
                color:'#fff',
                fontSize:wp('5%'),
                marginLeft:wp('2%')
              }}>
                Account
              </Text>
            :
              <Text style={{
                color:'#fff',
                fontSize:wp('5%'),
                marginLeft:wp('2%')
              }}>
                الحساب
              </Text>
            }
          </View>
          
        </View>

        <View style={{
          // backgroundColor:'pink',
          height:400,
          paddingHorizontal:wp('3%')
        }}>
          <Text style={{
            fontSize:wp('7%'),
            color:DarkGrey,

          }}>
            {this.state.customer.name}
          </Text>

          <Text style={{
            fontSize:wp('4%'),
            color:DarkGrey,

          }}>
            {this.state.customer.email}
          </Text>

          <View style={{borderBottomWidth:1,borderColor:DarkGrey,paddingVertical:hp('1%'),marginBottom:hp('5%')}}/>
          <TouchableOpacity
              onPress={() => {this.props.navigation.navigate("MyOrders")}}
              style={{
                alignItems:'center',
                flexDirection:'row',
                justifyContent:'space-between',
                paddingLeft:wp('5%'),
                paddingRight:wp('3%'),
                // backgroundColor:'rgba(39, 170, 225, 0.05)',
                paddingVertical:hp('2%')
              }}
            >

              {this.state.language == 'eng' ?
                <Text style={{
                  color:DarkGrey
                }}>
                  My Orders
                </Text>
              :
                <Text style={{
                  color:DarkGrey
                }}>
                  طلباتي
                </Text>
              }
              <Icon1 
                name={"right"}
                size={hp('2%')}
                color={DarkGrey}
              />
          </TouchableOpacity>


          

          <TouchableOpacity
              onPress={() => {this.props.navigation.navigate('AccountSettings')}}
              style={{
                alignItems:'center',
                flexDirection:'row',
                justifyContent:'space-between',
                paddingLeft:wp('5%'),
                paddingRight:wp('3%'),
                // backgroundColor:'rgba(39, 170, 225, 0.05)',
                paddingVertical:hp('2%'),
                marginTop:hp('1%')
              }}
            >
              {this.state.language == 'eng' ?
                <Text style={{
                  color:DarkGrey
                }}>
                  Account Settings
                </Text>
              :
                <Text style={{
                  color:DarkGrey
                }}>
                  إعدادت الحساب
                </Text>
              }
              <Icon1 
                name={"right"}
                size={hp('2%')}
                color={DarkGrey}
              />
          </TouchableOpacity>

          <View
              
              style={{
                alignItems:'center',
                justifyContent:'space-between',
                paddingLeft:wp('5%'),
                flexDirection:'row',
                paddingRight:wp('3%'),
                // backgroundColor:'rgba(39, 170, 225, 0.05)',
                paddingVertical:hp('3%'),
                marginVertical:hp('1%')
              }}
            >
            {this.state.language == 'eng' ?
              <Text style={{
                color:DarkGrey
              }}>
                Language
              </Text>
            :
              <Text style={{
                  color:DarkGrey
                }}>
                  لغة
                </Text>
              }

              <View style={{
                flexDirection:'row',
                // paddingVertical:hp('2%')
              }}>
                <TouchableOpacity style={{
                  paddingHorizontal:wp('4%'),
                  borderRightWidth:1,
                  borderColor:Grey
                }}
                  onPress = {()=>{this.setEnglish()}}

                >

                  <Text style={{
                    color:this.state.language == 'eng' ? Blue : DarkGrey

                  }}>
                    english
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity style={{
                  paddingLeft:wp('4%')
                }}
                  onPress = {()=>{this.setArabic()}}

                >

                  <Text style={{
                    color:this.state.language == 'arb' ? Blue : DarkGrey
                  }}>
                  عربى</Text>

                </TouchableOpacity>
              </View>

          </View>

          <TouchableOpacity
              onPress={() => {this.logOut()}}
              style={{
                alignItems:'center',
                justifyContent:'space-between',
                flexDirection:'row',
                paddingLeft:wp('5%'),
                paddingRight:wp('3%'),
                backgroundColor:'rgba(255, 0, 0, 0.05)',
                borderColor:Red,
                borderWidth:1,
                borderRadius:5,
                paddingVertical:hp('2%'),
                marginTop:hp('2%')
              }}
            >
            {this.state.language == 'eng' ?
              <Text style={{
                color:DarkGrey
              }}>
                Logout
              </Text>
            :
              <Text style={{
                color:DarkGrey
              }}>
                تسجيل خروج
              </Text>
            }
              <Icon1 
                name={"logout"}
                size={hp('4%')}
                color={Red}
              />
            </TouchableOpacity>


        </View>

        <View style={styles.footer}>

          <View
            style={{
              // paddingHorizontal:wp('1%'),
              marginTop:hp('1%'),
              flexDirection:'row',
              justifyContent:'space-around',
              width:'100%',
            }}
          >
            

            <TouchableOpacity
              style={{alignItems:'center'}}
              onPress = {() => {}}
            >
              <Icon 
                style={{alignSelf:'center'}}

                name={"account"}
                size={hp('4%')}
                color={'rgba(255,255,255,1)'}
              />
              {this.state.language == 'eng' ? 
                <Text style={{color:'#fff',fontSize:wp('3%'),textAlign:'center'}}>
                  Account
                </Text>
              :
                <Text style={{color:'#fff',fontSize:wp('3%'),textAlign:'center'}}>
                  الحساب
                </Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              onPress = {() => {this.props.navigation.navigate('Menu')}}
            >
              <Icon1 
                style={{alignSelf:'center'}}
                name={"home"}
                size={hp('4%')}
                color={'rgba(255,255,255,1)'}
              />
              {this.state.language == 'eng' ? 
                <Text style={{color:'#fff',fontSize:wp('3%'),textAlign:'center'}}>
                  Home
                </Text>
              :
                <Text style={{color:'#fff',fontSize:wp('3%'),textAlign:'center'}}>
                  الصفحة الرئيسية
                </Text>
              }
            </TouchableOpacity>

            <View style={{flexDirection:'row'}}>

              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('Cart',{i,i})}}
              >
                <Icon 
                  style={{alignSelf:'center'}}

                  name={"cart"}
                  size={hp('4%')}
                  color={'rgba(255,255,255,1)'}
                />
                {this.state.language == 'eng' ? 
                  <Text style={{color:'#fff',fontSize:wp('3%'),textAlign:'center'}}>
                    Cart
                  </Text>
                :
                  <Text style={{color:'#fff',fontSize:wp('3%'),textAlign:'center'}}>
                    كارة
                  </Text>
                }
              </TouchableOpacity>
              

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
    justifyContent:'space-between'
    // paddingTop:80
  },
   cartItems: {
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:LightGrey,
    paddingVertical:hp('1%'),
    paddingHorizontal:wp('2%'),
    justifyContent:'space-between'
    // width:'100%',
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
  footer: {
    backgroundColor:Orange,
    // height:hp('9%'),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:wp('3%'),
    alignItems:'center',
    paddingBottom:hp('0.5%'),
    alignSelf:'flex-end',
    // marginTop:hp('32%')
  },

});