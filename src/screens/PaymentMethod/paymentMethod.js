import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
  ToastAndroid,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';

import Icon from 'react-native-vector-icons/AntDesign';
import {
  IP,
  LightBlue,
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
import {StackActions, NavigationActions} from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';
var ToPay = '';
var flatDetails = '';
var deliveryPlace = '';
var latitude = '';
var longitude = '';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'Islamabad',
      language: 'eng',
    };
  }

  componentDidMount() {
    ToPay = this.props.navigation.getParam('total');
    flatDetails = this.props.navigation.getParam('flatDetails');
    deliveryPlace = this.props.navigation.getParam('deliveryPlace');
    latitude = this.props.navigation.getParam('latitude');
    longitude = this.props.navigation.getParam('longitude');
    console.log('total bill-->', ToPay);
    console.log('delivery place-->', deliveryPlace);
    console.log('place latitude-->', latitude);
    console.log('place longitude-->', longitude);

    AsyncStorage.getItem('language').then((language) => {
      if (language != null) {
        this.setState({language: language});
      }
    });
  }

  Order() {
    var branchID = 0;
    var customerID = 0;

    AsyncStorage.getItem('branchID').then((branchID) => {
      if (branchID != null) {
        branchID = branchID;
      }

      AsyncStorage.getItem('customer')
        .then((customer) => {
          return JSON.parse(customer);
        })
        .then((customer) => {
          if (customer != null) {
            customerID = customer.id;
          }

          var body = {
            bill: ToPay,
            location: this.state.location,
            status: 'pending',
            payment_method: 'pay on delivery',
            payment_status: 'pending',
            delivery_place: deliveryPlace,
            customer_id: customerID,
            branch_id: branchID,
            latitude: latitude,
            longitude: longitude,
            flatDetails: flatDetails,
            items: [],
            // "itemsID":[],
            // "itemsQuantity":[],
            // "itemsSpice":[]
          };
          AsyncStorage.getItem('cartItems')
            .then((response) => {
              return JSON.parse(response);
            })
            .then((items) => {
              console.log('---------->items', items);
              items.map((item) => {
                const itemObj = {
                  quantity: item.quantity,
                  menu_item_id: item.id,
                  spice_id: item.spice_options_id,
                };
                body.items.push(itemObj);
                // body.itemsID.push(item.id);
                // body.itemsQuantity.push(item.quantity);
              });
              console.log('body --->', body);

              const url = IP + '/api/addOrder';
              var myHeaders = new Headers();
              myHeaders.append('Content-Type', 'application/json');
              myHeaders.append('Accept', 'application/json');
              this.setState({isLoading: true});

              return fetch(url, {
                method: 'post',
                headers: myHeaders,
                body: JSON.stringify(body),
              })
                .then((response) => {
                  console.log(response);
                  ToastAndroid.show('Order Placed!', ToastAndroid.SHORT);
                  this.setState({isLoading: false});
                  AsyncStorage.removeItem('cartItems');

                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Menu'})],
                  });
                  this.props.navigation.dispatch(resetAction);
                })
                .catch((err) => {
                  this.setState({isLoading: false});
                  ToastAndroid.show(err, ToastAndroid.SHORT);

                  console.log(err);
                });
            });
        });
    });
  }

  render() {
    return (
      <View style={styles.container}>
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
                Pyment Methods
              </Text>
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontSize: wp('5%'),
                  marginLeft: wp('2%'),
                }}>
                طرق الدفع
              </Text>
            )}
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 5,
            // paddingVertical:hp('1%'),
            margin: hp('5%'),
            marginTop: 100,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: LightGrey,
              paddingVertical: hp('2%'),
              jsutifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.state.language == 'eng' ? (
              <Text style={{color: DarkGrey}}>Choose your payment method</Text>
            ) : (
              <Text style={{color: DarkGrey}}>اختر طريقتك في الدفع</Text>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: hp('5%'),
                paddingTop: hp('4%'),
                paddingBottom: hp('1%'),
                borderRightWidth: 1,
                borderColor: LightGrey,
                flex: 1,
                jsutifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={'creditcard'} size={hp('8%')} color={Blue} />
              {this.state.language == 'eng' ? (
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: hp('1%'),
                    color: DarkGrey,
                  }}>
                  Pay online
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: hp('1%'),
                    color: DarkGrey,
                  }}>
                  ادفع عبر الإنترنت
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.Order();
              }}
              style={{
                paddingHorizontal: hp('5%'),
                paddingTop: hp('4%'),
                paddingBottom: hp('1%'),
                flex: 1,
                jsutifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon1 name={'cash-multiple'} size={hp('8%')} color={Orange} />
              {this.state.language == 'eng' ? (
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: hp('1%'),
                    color: DarkGrey,
                  }}>
                  Payment on Delivery
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: hp('1%'),
                    color: DarkGrey,
                  }}>
                  دفع على تسليم
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/*Loading Indicator*/}
          {this.state.isLoading && (
            <View
              style={[
                {
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
                styles.center,
              ]}>
              <ActivityIndicator color={LightBlue} size="large" />
            </View>
          )}
        </View>
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
