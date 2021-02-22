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
  BackHandler
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {Blue, Pink, Grey, LightGrey, Brown, Cream, Red, Orange, DarkGrey} from '../../utils/Constants';
import {Log, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
// import Modal from 'react-native-modal';

const pass="abc12345";

export default class AccountSettings extends Component {

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
          this.setState({userName:customer.name})
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
                Account Settings
              </Text>
            :
              <Text style={{
                color:'#fff',
                fontSize:wp('5%'),
                marginLeft:wp('2%')
              }}>
                إعدادت الحساب
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
              {this.state.language=='eng' ?
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:"bold",
                  paddingRight:wp('4%'),
                }}>
                  User Name
                </Text>
              :
                <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4.5%'),
                    fontWeight:"bold",
                    paddingRight:wp('4%'),
                  }}>
                    اسم المستخدم
                  </Text>
                
              }
              <Text style={{
                fontSize:wp('4%'),
                color:DarkGrey

              }}>
                {this.state.customer.name}
              </Text>
            </View>

            <TouchableOpacity 
              onPress={()=>{this.setState({viewModel:true})}}
              style={{
              justifyContent:'center'
            }}>
              <Icon1 
                name={"edit"}
                size={wp('5%')}
                color={Orange}
              />
            </TouchableOpacity>

          </View>

          <View style={{marginVertical:hp('1%')}}/>
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
                  Email
                </Text>
              :
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:"bold",
                  paddingRight:wp('4%'),
                }}>
                  البريد الإلكتروني
                </Text>
              }
              <Text style={{
                fontSize:wp('4%'),
                color:DarkGrey

              }}>
                {this.state.customer.email}
              </Text>
            </View>

            

          </View>
          <View style={{marginVertical:hp('1%')}}/>
          <TouchableOpacity 
            onPress={()=>{this.props.navigation.navigate('ChangePassword')}}
            style={{
            // borderWidth:1,
            backgroundColor:'#fff',
            paddingVertical:wp('5%'),
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
            {this.state.language == 'eng' ? 
              <Text style={{
                fontSize:wp('4%'),
                fontWeight:'bold',
                color:DarkGrey

              }}>
                Change Password
              </Text>
            :
              <Text style={{
                fontSize:wp('4%'),
                fontWeight:'bold',
                color:DarkGrey

              }}>
                غير كلمة السر
              </Text>
            }

            <Icon1 
                name={"right"}
                size={wp('5%')}
                color={Orange}
            />
          
          </TouchableOpacity>
          <View style={{marginVertical:hp('1%')}}/>
          
          <TouchableOpacity style={{
            // borderWidth:1,
            backgroundColor:'#fff',
            paddingVertical:wp('5%'),
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
            {this.state.language == 'eng' ? 
              <Text style={{
                fontSize:wp('4%'),
                fontWeight:'bold',
                color:DarkGrey

              }}>
                Manage Address
              </Text>
            :

              <Text style={{
                fontSize:wp('4%'),
                fontWeight:'bold',
                color:DarkGrey

              }}>
                إدارة العنوان
              </Text>
              
            }

            <Icon1 
                name={"right"}
                size={wp('5%')}
                color={Orange}
            />

          </TouchableOpacity>


        {/*
          <Modal isVisible={this.state.viewModel}>
            <View style={{
              width:wp('90%'),
              height:hp('30%'),
              backgroundColor:'#fff',
              alignSelf:'center',
              borderRadius:5,
              paddingTop:hp('5%')
            }}>

              <View style={{
                backgroundColor:'#fff',
                padding:wp('2%'),
                paddingHorizontal:wp('4%'),
                borderRadius:5,
                flexDirection:'row',
                justifyContent:'space-between',
                borderColor:'#fff',
                shadowColor: "#000",
                marginHorizontal:wp('5%'),
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,

                elevation: 2,
              }}>
                <TextInput
                  autoFocus={true}
                  defaultValue={this.state.userName}
                  style={{
                    fontSize:wp('4%')
                  }}
                  placeholder={this.state.language=='eng' ? "User Name" : "اسم المستخدم" }
                  onChangeText={(val) => { this.setState({userName: val}) }}
                />
              </View>

              <View style={{
                flex:1,
                flexDirection:'row',
                marginTop:hp('7%'),
                borderTopWidth:1,
                borderColor:LightGrey
              }}>

                <TouchableOpacity
                  onPress={()=>{this.update()}}
                 style={{
                  flex:1,
                  justifyContent:'center',
                  alignItems:'center',
                  borderRightWidth:1,
                  borderColor:LightGrey
                }}>
                  {this.state.language == 'eng'?
                    <Text style={{
                      fontSize:wp('6%'),
                      color:DarkGrey
                    }}>
                      Update
                    </Text>
                    :
                    <Text style={{
                      fontSize:wp('6%'),
                      color:DarkGrey
                    }}>
                      تحديث
                    </Text>
                  }
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={()=>{this.setState({viewModel:false})}}
                 style={{
                  flex:1,
                  justifyContent:'center',
                  alignItems:'center'
                }}>
                  {this.state.language == 'eng'?
                    <Text style={{
                      fontSize:wp('6%'),
                      color:DarkGrey
                    }}>
                      Cancel
                    </Text>
                    :
                    <Text style={{
                      fontSize:wp('6%'),
                      color:DarkGrey
                    }}>
                      إلغاء
                    </Text>
                  }
                </TouchableOpacity>

              </View>

            </View>
          </Modal>
        */}

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
    // justifyContent:'center',
    // alignItems:'center',
    marginTop:hp('2%'),
    paddingHorizontal:wp('4%'),
    // borderWidth:1
  }

});