import React, {Component} from 'react';
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
  ToastAndroid,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';

import Icon from 'react-native-vector-icons/AntDesign';
import {
  Blue,
  Pink,
  Grey,
  LightGrey,
  Brown,
  Cream,
  Red,
  Orange,
  DarkGrey,
  LightRed,
} from '../../utils/Constants';
import {
  Log,
  Signin,
  name,
  email,
  password,
  phone,
  Already_have_account_Login as ha,
  Dont_have_account_signup as dha,
} from '../../utils/Constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
var itemTotal = '';
var resturant = 0;
var delivery = 20;
var ToPay = 0;
var deliveryPlace = 'Door Step';

export default class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      location: '',
      deliveryPlace: 'Out of Building',
      delivery: 15,
    };
  }

  componentDidMount() {
    itemTotal = this.props.navigation.getParam('total');
    console.log('item total-->', itemTotal);
    resturant = itemTotal * 0.15;
    ToPay = parseInt(itemTotal) + resturant + this.state.delivery;

    AsyncStorage.getItem('language').then((language) => {
      if (language != null) {
        this.setState({language: language});
      }
    });
  }

  doorStep() {
    this.setState({deliveryPlace: 'Door Step', delivery: 20});
    deliveryPlace = 'Door Step';
    ToPay = parseInt(itemTotal) + resturant + 20;
  }
  outOfBuilding() {
    this.setState({deliveryPlace: 'Out of Building', delivery: 15});
    deliveryPlace = 'Out of Building';
    ToPay = parseInt(itemTotal) + resturant + 15;
  }

  PaymentMethodPress() {
    var location = this.state.location;
    if (this.state.location == '')
      ToastAndroid.show('Enter Location', ToastAndroid.SHORT);
    else
      this.props.navigation.navigate('PaymentMethod', {
        ToPay,
        ToPay,
        location,
        location,
        deliveryPlace: deliveryPlace,
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  marginRight: wp('1%'),
                }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Icon name={'left'} size={18} color={'rgba(255,255,255,1)'} />
              </TouchableOpacity>
              {this.state.language == 'eng' ? (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('5%'),
                    marginLeft: wp('2%'),
                  }}>
                  Invoice
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('5%'),
                    marginLeft: wp('2%'),
                  }}>
                  فاتورة
                </Text>
              )}
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: wp('5%'),
            }}>
            {this.state.language == 'eng' ? (
              <Text
                style={{
                  fontSize: wp('6%'),
                  color: DarkGrey,
                }}>
                BILL DETAILS
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: wp('6%'),
                  color: DarkGrey,
                }}>
                تفاصيل الفاتورة
              </Text>
            )}

            {this.state.language == 'eng' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                }}>
                <Text style={{color: DarkGrey}}>Items Total</Text>
                <Text style={{color: DarkGrey}}>{itemTotal} SR</Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                }}>
                <Text style={{color: DarkGrey}}>{itemTotal} SR</Text>
                <Text style={{color: DarkGrey}}>إجمالي العناصر</Text>
              </View>
            )}

            {this.state.language == 'eng' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                }}>
                <Text style={{color: DarkGrey}}>VAT 15%</Text>
                <Text style={{color: DarkGrey}}>
                  {resturant.toString().substr(0, 5)} SR
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                }}>
                <Text style={{color: DarkGrey}}>
                  {resturant.toString().substr(0, 5)} SR
                </Text>
                <Text style={{color: DarkGrey}}>VAT 15%</Text>
              </View>
            )}

            {this.state.language == 'eng' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                }}>
                <Text style={{color: DarkGrey}}>Delivery Charges</Text>
                <Text style={{color: DarkGrey}}>{this.state.delivery} SR</Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                }}>
                <Text style={{color: DarkGrey}}>{this.state.delivery} SR</Text>
                <Text style={{color: DarkGrey}}>رسوم التوصيل</Text>
              </View>
            )}

            {this.state.language == 'eng' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                  borderTopWidth: 1,
                  paddingVertical: hp('1%'),
                  borderColor: Grey,
                }}>
                <Text style={{fontWeight: 'bold'}}>To Pay</Text>
                <Text style={{fontWeight: 'bold'}}>{ToPay} SR</Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                  borderTopWidth: 1,
                  paddingVertical: hp('1%'),
                  borderColor: Grey,
                  flexDirection: 'row',
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  {parseInt(itemTotal) + resturant + delivery} SR
                </Text>
                <Text style={{fontWeight: 'bold'}}>للدفع</Text>
              </View>
            )}

            <View
              style={{
                marginTop: hp('5%'),
              }}
            />

            {this.state.language == 'eng' ? (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                  borderTopWidth: 1,
                  paddingVertical: hp('1%'),
                  borderColor: Grey,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: hp('1%'),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.doorStep();
                    }}
                    style={{
                      paddingHorizontal: wp('4%'),
                      paddingVertical: wp('1%'),
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: Grey,
                      backgroundColor:
                        this.state.deliveryPlace == 'Door Step'
                          ? 'rgba(95, 180, 250,0.3)'
                          : 'rgba(0, 0, 0,0)',
                    }}>
                    <Text>Door Step</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.outOfBuilding();
                    }}
                    style={{
                      paddingHorizontal: wp('4%'),
                      paddingVertical: wp('1%'),
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: Grey,
                      backgroundColor:
                        this.state.deliveryPlace == 'Out of Building'
                          ? 'rgba(95, 180, 250,0.3)'
                          : 'rgba(0, 0, 0,0)',
                    }}>
                    <Text>Out of Building</Text>
                  </TouchableOpacity>
                </View>

                <Text style={{fontWeight: 'bold'}}>DELIVER TO</Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                  borderTopWidth: 1,
                  paddingVertical: hp('1%'),
                  borderColor: Grey,
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: hp('1%'),
                  }}>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: wp('4%'),
                      paddingVertical: wp('1%'),
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: Grey,
                    }}>
                    <Text>خطوة الباب</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      paddingHorizontal: wp('4%'),
                      paddingVertical: wp('1%'),
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: Grey,
                    }}>
                    <Text>خارج المبنى</Text>
                  </TouchableOpacity>
                </View>

                <Text style={{fontWeight: 'bold'}}>يسلم إلى</Text>
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('5%'),
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: wp('2%'),
                  // marginHorizontal:wp('6%'),
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                  flex: 4,
                }}>
                <TextInput
                  onChangeText={(val) => {
                    this.setState({location: val});
                  }}
                  placeholder={'enter your location'}></TextInput>
              </View>

              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: wp('5%'),
                }}>
                <Icon2
                  style={{
                    alignSelf: 'center',
                  }}
                  name={'location'}
                  size={hp('4%')}
                  color={LightRed}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('MapView');
              }}
              style={{
                paddingVertical: wp('2%'),
                borderRadius: 5,
                marginHorizontal: wp('10%'),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Orange,
                marginTop: hp('5%'),
              }}>
              {this.state.language == 'eng' ? (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('3%'),
                    marginLeft: wp('2%'),
                  }}>
                  Map Location
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('3%'),
                    marginLeft: wp('2%'),
                  }}>
                  arabic
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.PaymentMethodPress();
              }}
              style={{
                paddingVertical: wp('2%'),
                borderRadius: 5,
                marginHorizontal: wp('10%'),
                marginVertical: hp('2%'),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Orange,
                marginTop: hp('5%'),
              }}>
              {this.state.language == 'eng' ? (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('3%'),
                    marginLeft: wp('2%'),
                  }}>
                  PAYMENT METHODS
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('3%'),
                    marginLeft: wp('2%'),
                  }}>
                  arabic
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop:80
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: Orange,
    paddingVertical: hp('1%'),
    // height:hp('9%'),
    borderBottomRightRadius: wp('10%'),
    borderBottomLeftRadius: wp('10%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
});
