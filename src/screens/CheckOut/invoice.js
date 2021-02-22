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
import Caller from '../../configurations/Caller';

import LinearGradient from 'react-native-linear-gradient';

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
// var itemTotal = '';
// var resturant = 0;
// var delivery = 20;
// var ToPay = 0;
// var deliveryPlace = 'Door Step';

const deliveryPackages = [
  {
    from: 0,
    To: 5,
    cost: 0,
  },
  {
    from: 6,
    To: 20,
    cost: 10,
  },
  {
    from: 21,
    To: 50,
    cost: 15,
  },
];
export default class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      itemTotal: '',
      distance: null,
      deliveryCharges: null,
      arrow: 'up',
      VAR: null,
      flatDetails: '',
    };
  }

  componentDidMount() {
    const itemTotal = this.props.navigation.getParam('itemTotal');
    console.log('total of items -- > ', itemTotal);

    const distance = this.props.navigation.getParam('distance');
    console.log('total distance -- > ', distance);

    const deliveryPlace = this.props.navigation.getParam('deliveryPlace');
    console.log('deliveryPlace -- > ', deliveryPlace);

    const latitude = this.props.navigation.getParam('latitude');
    console.log('latitude -- > ', latitude);

    const longitude = this.props.navigation.getParam('longitude');
    console.log('longitude -- > ', longitude);

    this.setState({itemTotal: itemTotal});
    this.setState({distance: distance});
    this.setState({deliveryPlace: deliveryPlace});
    this.setState({latitude: latitude});
    this.setState({longitude: longitude});

    AsyncStorage.getItem('branchID').then((branchID) => {
      if (branchID != null) {
        Caller.callServer('getDeliveryPackages', 'GET', [branchID])
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log('-------->', data);
            this.setState({isLoading: false});
            this.setState({deliveryPackages: data});
            this.setDeliveryCharges(distance);
          });
      }
    });

    AsyncStorage.getItem('language').then((language) => {
      if (language != null) {
        this.setState({language: language});
      }
    });
  }

  ceilPrecised(number, precision) {
    var power = Math.pow(10, precision);

    return Math.ceil(number * power) / power;
  }

  togaleArrow() {
    if (this.state.arrow == 'down') this.setState({arrow: 'up'});
    else this.setState({arrow: 'down'});
  }

  setDeliveryCharges(distance) {
    const distanceInKM = distance / 1000;
    console.log('distance in km', distanceInKM);
    var charges = null;
    this.state.deliveryPackages.forEach((element) => {
      const p1 = element.from;
      const p2 = element.to;
      console.log('frm', typeof p1);

      if (distanceInKM > p1 && 0.786 < p2) {
        charges = element.cost;
        this.setState({deliveryCharges: charges});
      }
    });
    const itemTotal = this.props.navigation.getParam('itemTotal');

    const VAT = this.ceilPrecised(
      (parseInt(itemTotal) + parseInt(charges)) * 0.15,
      4,
    );
    this.setState({VAT: VAT});
    const total = parseFloat(itemTotal) + parseFloat(charges) + parseFloat(VAT);
    console.log('total-------->', total);
    this.setState({total: total});
  }

  checkOut() {
    const total = this.state.total;
    const deliveryPlace = this.state.deliveryPlace;
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;
    if (this.state.deliveryPlace == 'Door Step') {
      if (this.state.flatDetails != '') {
        this.props.navigation.navigate('PaymentMethod', {
          total: total,
          deliveryPlace: deliveryPlace,
          latitude: latitude,
          longitude: longitude,
          flatDetails: this.state.flatDetails,
        });
      } else {
        ToastAndroid.show('Enter Flat Details', ToastAndroid.SHORT);
      }
    } else {
      this.props.navigation.navigate('PaymentMethod', {
        total: total,
        deliveryPlace: deliveryPlace,
        latitude: latitude,
        longitude: longitude,
        flatDetails: this.state.flatDetails,
      });
    }
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
                }}>
                <Text style={{color: DarkGrey}}>Delivery Distance</Text>
                <Text style={{color: DarkGrey}}>
                  {this.ceilPrecised(parseInt(this.state.distance) / 1000, 4)}{' '}
                  Km
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: DarkGrey}}>
                  {this.ceilPrecised(parseInt(this.state.distance) / 1000, 4)}{' '}
                  Km
                </Text>
                <Text style={{color: DarkGrey}}>مسافة التسليم</Text>
              </View>
            )}
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
                  marginTop: hp('2%'),
                }}>
                <Text style={{color: DarkGrey}}>Delivery Charges</Text>
                <Text style={{color: DarkGrey}}>
                  {this.state.deliveryCharges} SR
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('2%'),
                }}>
                <Text style={{color: DarkGrey}}>
                  {this.state.deliveryCharges} SR
                </Text>
                <Text style={{color: DarkGrey}}>رسوم التوصيل</Text>
              </View>
            )}

            {this.state.language == 'eng' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('2%'),
                }}>
                <Text style={{color: DarkGrey}}>VAT (15%)</Text>
                <Text style={{color: DarkGrey}}>{this.state.VAT} SR</Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('2%'),
                }}>
                <Text style={{color: DarkGrey}}>{this.state.VAT} SR</Text>
                <Text style={{color: DarkGrey}}>VAT (15%)</Text>
              </View>
            )}

            {this.state.language == 'eng' ? (
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: Grey,
                  paddingTop: hp('1%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('4%'),
                }}>
                <Text style={{color: DarkGrey, fontWeight: 'bold'}}>Total</Text>
                <Text style={{color: DarkGrey, fontWeight: 'bold'}}>
                  {this.state.total} SR
                </Text>
              </View>
            ) : (
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: Grey,
                  paddingTop: hp('1%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp('4%'),
                }}>
                <Text style={{color: DarkGrey, fontWeight: 'bold'}}>
                  {this.state.total} SR
                </Text>
                <Text style={{color: DarkGrey, fontWeight: 'bold'}}>مجموع</Text>
              </View>
            )}
            {this.state.deliveryPlace == 'Door Step' && (
              <View
                style={{
                  marginTop: hp('8%'),
                  borderWidth: 1,
                  borderColor: Grey,
                  paddingHorizontal: wp('2%'),
                  borderRadius: wp('2%'),
                }}>
                <TextInput
                  placeholder={'flat details'}
                  onChangeText={(val) => {
                    this.setState({flatDetails: val});
                  }}
                />
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                this.checkOut();
              }}
              style={{
                paddingVertical: wp('2%'),
                borderRadius: 5,
                marginHorizontal: wp('10%'),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Orange,
                marginTop: hp('15%'),
              }}>
              {this.state.language == 'eng' ? (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('3%'),
                    marginLeft: wp('2%'),
                  }}>
                  Proceed
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('3%'),
                    marginLeft: wp('2%'),
                  }}>
                  تقدم
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
