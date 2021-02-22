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
import Caller from "../../configurations/Caller";

import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
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
var itemTotal = null;
// var resturant = 0;
// var delivery = 20;
// var ToPay = 0;
// var deliveryPlace = 'Door Step';

const deliveryPackages = [
  {
    from: '0',
    To: '5',
    cost: '0',
  },
  {
    from: '6',
    To: '20',
    cost: '10',
  },
  {
    from: '21',
    To: '50',
    cost: '15',
  },
];
export default class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      location: '',
      deliveryPlace: 'Out of Building',
      delivery: 15,
      itemTotal: '',
      resturant: '',
      ToPay: '',
      arrow: 'down',
    };
  }

  componentDidMount() {
    itemTotal = this.props.navigation.getParam('total');
    console.log('total of items -- > ', itemTotal);
    this.setState({itemTotal: itemTotal});
    AsyncStorage.getItem('language').then((language) => {
      if (language != null) {
        this.setState({language: language});
      }
    });
    AsyncStorage.getItem('branchID').then((branchID) => {
      if (branchID != null) {
        Caller.callServer("getDeliveryPackages","GET", [branchID])
        .then( response  => {
          return response.json();
        })
        .then ( data => {
          console.log("-------->",data);
          this.setState({isLoading:false})
          this.setState({deliveryPackages:data});
        });
      }
    });

    
  }

  doorStep() {
    this.setState({deliveryPlace: 'Door Step', delivery: 20});
    // deliveryPlace = 'Door Step';
    // ToPay = parseInt(itemTotal) + resturant + 20;
  }
  outOfBuilding() {
    this.setState({deliveryPlace: 'Out of Building', delivery: 15});
    // deliveryPlace = 'Out of Building';
    // ToPay = parseInt(itemTotal) + resturant + 15;
  }

  PaymentMethodPress() {
    // var location = this.state.location;
    // if (this.state.location == '')
    //   ToastAndroid.show('Enter Location', ToastAndroid.SHORT);
    // else
    //   this.props.navigation.navigate('PaymentMethod', {
    //     ToPay,
    //     ToPay,
    //     location,
    //     location,
    //     deliveryPlace: deliveryPlace,
    //   });
  }
  togaleArrow() {
    if (this.state.arrow == 'down') this.setState({arrow: 'up'});
    else this.setState({arrow: 'down'});
  }

  renderFields = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: wp('5%'),
          backgroundColor:
            index % 2 == 0
              ? 'rgba(3, 207, 252, 0.1)'
              : 'rgba(255, 255, 51, 0.1)',
          paddingVertical: wp('1%'),
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{color: DarkGrey}}>
            {item.from} Km {'    '}-{'    '}
          </Text>

          <Text style={{color: DarkGrey}}>{item.to} Km</Text>
        </View>

        <Text style={{color: DarkGrey, fontWeight: 'bold'}}>
          {item.cost} SR
        </Text>
      </View>
    );
  };
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

            <View
              style={{
                marginTop: hp('5%'),
              }}
            />

            {this.state.language == 'eng' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                }}>
                <Text style={{color: DarkGrey}}>Items Total</Text>
                <Text style={{color: DarkGrey}}>{this.state.itemTotal} SR</Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                }}>
                <Text style={{color: DarkGrey}}>{this.state.itemTotal} SR</Text>
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
                <Text style={{color: DarkGrey}}>
                  Delivery charges will be added according to delivery location
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
                  سيتم إضافة رسوم التوصيل حسب مكان التوصيل
                </Text>
              </View>
            )}

            {this.state.language == 'eng' ? (
              <TouchableOpacity
                onPress={() => {
                  this.togaleArrow();
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                }}>
                <Text style={{color: DarkGrey, fontWeight: 'bold'}}>
                  Delivery Packages
                </Text>
                <Icon
                  name={this.state.arrow}
                  size={wp('4%')}
                  color={DarkGrey}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.togaleArrow();
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('5%'),
                }}>
                <Icon
                  name={this.state.arrow}
                  size={wp('4%')}
                  color={DarkGrey}
                />

                <Text style={{color: DarkGrey, fontWeight: 'bold'}}>
                  حزم التسليم
                </Text>
              </TouchableOpacity>
            )}

            {this.state.arrow == 'up' && (
              <View
                style={{
                  marginTop: hp('2%'),
                }}>
                <FlatList
                  data={this.state.deliveryPackages}
                  extraData={this.state}
                  contentContainerStyle={{}}
                  keyExtracstor={(item, index) => `${index}`}
                  renderItem={this.renderFields}
                  numColumns={1}
                  ItemSeparatorComponent={() => {
                    return <View style={{marginVertical: wp('0.2%')}} />;
                  }}
                />
              </View>
            )}
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
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderWidth: 1,
                      width: wp('40%'),
                      padding: wp('3%'),
                      borderColor: Grey,
                      backgroundColor:
                        this.state.deliveryPlace == 'Door Step'
                          ? 'rgba(34, 235, 242,0.3)'
                          : 'rgba(0, 0, 0,0)',
                    }}>
                    <Icon1 name="door-open" size={wp('7%')} color={Blue} />

                    <View
                      style={{
                        marginTop: hp('2%'),
                      }}>
                      <Text>Door Step</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.outOfBuilding();
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: wp('3%'),
                      width: wp('40%'),
                      borderColor: Grey,
                      backgroundColor:
                        this.state.deliveryPlace == 'Out of Building'
                          ? 'rgba(34, 235, 242,0.3)'
                          : 'rgba(0, 0, 0,0)',
                    }}>
                    <Icon1 name="building" size={wp('7%')} color={Blue} />

                    <View
                      style={{
                        marginTop: hp('2%'),
                      }}>
                      <Text>Out of Building</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
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
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderWidth: 1,
                      width: wp('40%'),
                      padding: wp('3%'),
                      borderColor: Grey,
                      backgroundColor:
                        this.state.deliveryPlace == 'Door Step'
                          ? 'rgba(34, 235, 242,0.3)'
                          : 'rgba(0, 0, 0,0)',
                    }}>
                    <Icon1 name="door-open" size={wp('7%')} color={Blue} />

                    <View
                      style={{
                        marginTop: hp('2%'),
                      }}>
                      <Text>عتبة الباب</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.outOfBuilding();
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: wp('3%'),
                      width: wp('40%'),
                      borderColor: Grey,
                      backgroundColor:
                        this.state.deliveryPlace == 'Out of Building'
                          ? 'rgba(34, 235, 242,0.3)'
                          : 'rgba(0, 0, 0,0)',
                    }}>
                    <Icon1 name="building" size={wp('7%')} color={Blue} />

                    <View
                      style={{
                        marginTop: hp('2%'),
                      }}>
                      <Text>خارج المبنى</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('MapView', {
                  itemTotal: itemTotal,
                  deliveryPlace:this.state.deliveryPlace
                });
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
                  Map Locations
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
