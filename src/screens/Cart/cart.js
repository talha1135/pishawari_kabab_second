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
  BackHandler,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/AntDesign';
import {
  IP,
  Blue,
  Pink,
  Grey,
  LightGrey,
  Yellow,
  Cream,
  Red,
  Orange,
  LightRed,
} from '../../utils/Constants';
import {
  Log,
  Signin,
  name,
  email,
  password,
  phone,
  continueToPayementMode as ctp,
  Already_have_account_Login as ha,
  Dont_have_account_signup as dha,
} from '../../utils/Constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

import {NavigationEvents} from 'react-navigation';
const cartItems = [
  // {
  //   pic_url: '',
  //   name_eng: '',
  //   price_eng_eng:'',
  //   quantity:'',
  // },
];

var temp = 0;
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      cartItems: cartItems,
    };
  }

  calculatebill() {
    var total = 0;
    var cartItems = this.state.cartItems;
    cartItems.map((Data) => {
      if (Data.discount_eng == null)
        total =
          total +
          parseInt(Data.quantity) * (Data.price_eng / Data.quantity_eng);
      else {
        console.log('discount calculating');
        total =
          total +
          (parseInt(Data.price_eng) -
            (parseInt(Data.price_eng) * parseInt(Data.discount_eng)) / 100) *
            (parseInt(Data.quantity) / parseInt(Data.quantity_eng));
      }
    });

    this.props.navigation.navigate('Invoice1', {total, total});
  }

  plusButton = (index) => {
    // console.log(index);
    if (this.state.cartItems[index].quantity < 50) {
      var c = (
        parseInt(this.state.cartItems[index].quantity) +
        parseInt(this.state.cartItems[index].quantity_eng)
      ).toString();
      this.state.cartItems[index].quantity = c;
      this.setState({cartItems: this.state.cartItems});

      AsyncStorage.setItem(
        'cartItems',
        JSON.stringify(this.state.cartItems),
      ).catch((err) => {
        console.log(err);
      });
    }
  };
  minusButton = (index) => {
    // console.log(index,' quantity_eng', this.state.cartItems[index].quantity_eng, ' quantity',this.state.cartItems[index].quantity);
    console.log(this.state.cartItems[index].quantity_eng);
    if (
      parseInt(this.state.cartItems[index].quantity) >
      parseInt(this.state.cartItems[index].quantity_eng)
    ) {
      console.log('true');
      var c = (
        parseInt(this.state.cartItems[index].quantity) -
        parseInt(this.state.cartItems[index].quantity_eng)
      ).toString();
      this.state.cartItems[index].quantity = c;
      this.setState({cartItems: this.state.cartItems});

      AsyncStorage.setItem(
        'cartItems',
        JSON.stringify(this.state.cartItems),
      ).catch((err) => {
        console.log(err);
      });
    }
  };
  deleteButton = (index) => {
    var temp = this.state.cartItems;
    temp = temp.slice(0, index).concat(temp.slice(index + 1, temp.length));
    this.setState({cartItems: temp});

    AsyncStorage.setItem('cartItems', JSON.stringify(temp)).catch((err) => {
      console.log(err);
    });
  };
  handleBackPress = () => {
    // console.log("Back Press");

    this.props.navigation.goBack(null);
    return true;
  };
  componentWillUnmount() {
    this.backHandler.remove();
  }
  componentDidMount() {
    AsyncStorage.getItem('language').then((language) => {
      if (language != null) {
        this.setState({language: language});
      }
    });

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );

    var totalCost = 0;
    const item = this.props.navigation.getParam('i');
    if (item != null) temp = parseInt(item.quantity_eng);

    if (item == null) {
      AsyncStorage.getItem('cartItems')
        .then((cartItems) => {
          this.setState({cartItems: JSON.parse(cartItems)});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      AsyncStorage.getItem('cartItems').then((cartItems) => {
        if (cartItems != null) {
          const json = cartItems;
          var j = JSON.parse(json);
          this.setState({cartItems: j});

          var chk = true;
          j.map((cartItem, index) => {
            // totalCost+=parseInt(cartItem.price_eng)*parseInt(cartItem.quantity);

            if (item != null)
              if (cartItem.id == item.id) {
                j[index].quantity = (
                  parseInt(cartItem.quantity) + parseInt(item.quantity)
                ).toString();
                chk = false;
                return;
              }
          });
          if (chk == true) j.push(item);

          this.setState({cartItems: j});
          console.log('saving cart');
          AsyncStorage.setItem('cartItems', JSON.stringify(j)).catch((err) => {
            console.log(err);
          });
        } else {
          if (item == null) {
            // console.log('caaliiiinggg 1');
            AsyncStorage.getItem('cartItems')
              .then((cartItems) => {
                this.setState({cartItems: JSON.parse(cartItems)});
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            // console.log('caaliiiinggg 2');

            var list = [];
            list.push(item);
            this.setState({cartItems: list});
            AsyncStorage.setItem('cartItems', JSON.stringify(list)).catch(
              (err) => {
                console.log(err);
              },
            );
          }
        }
      });
      this.setState({totalCost: totalCost});
    }
  }
  ceilPrecised(number, precision) {
    var power = Math.pow(10, precision);

    return Math.ceil(number * power) / power;
  }

  linebreaker(str) {
    var linebreak = true;

    for (var j = 0; j <= str.length - 1; j++) {
      if (j > 20) {
        if (str[j] == ' ') {
          if (linebreak) {
            str = str.substr(0, j) + '\n' + str.substr(j + 1, str.length);
            // console.log('true');

            linebreak = false;
          }
        }
      }
    }
    return str;
  }

  renderFields = ({item, index}) => {
    console.log('cart item ', item);
    return (
      <View style={styles.cartItems}>
        <NavigationEvents onDidFocus={() => console.log('I am triggered')} />
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{
              width: wp('20%'),
              height: wp('20%'),
              borderRadius: 5,
              marginBottom: hp('1.5%'),
              resizeMode: 'stretch',
            }}
            source={{uri: IP + '/storage/' + item.pic_url}}
          />

          <View
            style={{
              marginLeft: wp('4%'),
              marginTop: hp('1.5%'),
            }}>
            {this.state.language == 'eng' ? (
              <Text
                style={{
                  color: Blue,
                  fontWeight: 'bold',
                }}>
                {this.linebreaker(item.name_eng)}
              </Text>
            ) : (
              <Text
                style={{
                  color: Blue,
                  fontWeight: 'bold',
                }}>
                {this.linebreaker(item.name_arb)}
              </Text>
            )}

            <View
              style={{
                borderWidth: 1,
                borderColor: LightGrey,
                borderRadius: 5,
                justifyContent: 'center',
                width: wp('25%'),
                flexDirection: 'row',
                marginTop: 20,
                backgroundColor:Yellow
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  borderRightWidth: 1,
                  borderColor: LightGrey,
                }}
                onPress={() => {
                  this.minusButton(index);
                }}>
                <Icon name={'minus'} size={wp('5%')} color={"#000"} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor:'#fff'
                }}>
                <Text>{item.quantity}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  borderLeftWidth: 1,
                  borderColor: LightGrey,
                }}
                onPress={() => {
                  this.plusButton(index);
                }}>
                <Icon name={'plus'} size={wp('5%')} color={"#000"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: wp('2%'),
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              this.deleteButton(index);
            }}>
            <Icon1 name={'delete-empty'} size={hp('5%')} color={LightRed} />
          </TouchableOpacity>
          {item.discount_eng == null ? (
            <Text
              style={{
                color: Orange,
                fontWeight: 'bold',
                fontSize: wp('5%'),
              }}>
              {item.price_eng * (item.quantity / item.quantity_eng)} SR
            </Text>
          ) : (
            <Text
              style={{
                color: Orange,
                fontWeight: 'bold',
                fontSize: wp('5%'),
              }}>
              {this.ceilPrecised(
                (item.quantity / item.quantity_eng) *
                  (item.price_eng - (item.price_eng * item.discount_eng) / 100),
                4,
              )}{' '}
              SR
            </Text>
          )}
        </View>
      </View>
    );
  };

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

            <Icon1
              name={'cart'}
              size={hp('4%')}
              color={'rgba(255,255,255,1)'}
            />
            {this.state.language == 'eng' ? (
              <Text
                style={{
                  color: '#fff',
                  fontSize: wp('5%'),
                  marginLeft: wp('2%'),
                }}>
                My Cart
              </Text>
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontSize: wp('5%'),
                  marginLeft: wp('2%'),
                }}>
                سلة التسوق
              </Text>
            )}
          </View>
        </View>

        <ScrollView style={{}}>
          {this.state.cartItems != null ? (
            <View>
              {this.state.cartItems.length > 0 ? (
                <FlatList
                  data={this.state.cartItems}
                  extraData={this.state}
                  keyExtracstor={(item, index) => `${index}`}
                  renderItem={this.renderFields}
                  ItemSeparatorComponent={() => {
                    return <View style={{marginVertical: hp('2%')}} />;
                  }}
                />
              ) : (
                <View
                  style={{
                    // padedingHorizontal:wp('20%'),
                    paddingVertical: hp('10%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon1
                    name={'cart'}
                    size={hp('20%')}
                    color={Grey}
                    style={{
                      alignSelf: 'center',
                      marginRight: wp('2%'),
                    }}
                  />
                  {this.state.language == 'eng' ? (
                    <Text
                      style={{
                        fontSize: wp('6%'),
                        color: Grey,
                        marginTop: hp('4%'),
                      }}>
                      Your Cart Is Empty
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: wp('6%'),
                        color: Grey,
                        marginTop: hp('4%'),
                      }}>
                      عربة التسوق فارغة
                    </Text>
                  )}
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                // padedingHorizontal:wp('20%'),
                paddingVertical: hp('10%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon1
                name={'cart'}
                size={hp('20%')}
                color={Grey}
                style={{
                  alignSelf: 'center',
                  marginRight: wp('2%'),
                }}
              />
              {this.state.language == 'eng' ? (
                <Text
                  style={{
                    fontSize: wp('6%'),
                    color: Grey,
                    marginTop: hp('4%'),
                  }}>
                  Your Cart Is Empty
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: wp('6%'),
                    color: Grey,
                    marginTop: hp('4%'),
                  }}>
                  عربة التسوق فارغة
                </Text>
              )}
            </View>
          )}
        </ScrollView>
        {this.state.cartItems != null && (
          <View>
            {this.state.cartItems.length > 0 && (
              <TouchableOpacity
                // onPress={() => {this.props.navigation.navigate('Invoice',{total,total})}}
                onPress={() => {
                  this.calculatebill();
                }}
                style={{
                  paddingVertical: wp('2%'),
                  borderRadius: 5,
                  marginHorizontal: wp('10%'),
                  marginVertical: hp('2%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Yellow,
                }}>
                {this.state.language == 'eng' ? (
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3%'),
                      marginLeft: wp('2%'),
                    }}>
                    CONTINUE
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3%'),
                      marginLeft: wp('2%'),
                    }}>
                    استمر
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.footer}>
          <View
            style={{
              marginTop: hp('1%'),
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                this.props.navigation.navigate('Account');
              }}>
              <Icon1
                style={{alignSelf: 'center'}}
                name={'account'}
                size={hp('4%')}
                color={'rgba(255,255,255,1)'}
              />
              {this.state.language == 'eng' ? (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('3%'),
                    textAlign: 'center',
                  }}>
                  Account
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('3%'),
                    textAlign: 'center',
                  }}>
                  الحساب
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Menu');
              }}>
              <Icon
                style={{alignSelf: 'center'}}
                name={'home'}
                size={hp('4%')}
                color={'rgba(255,255,255,1)'}
              />
              {this.state.language == 'eng' ? (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('3%'),
                    textAlign: 'center',
                  }}>
                  Home
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('3%'),
                    textAlign: 'center',
                  }}>
                  الصفحة الرئيسية
                </Text>
              )}
            </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Cart');
                }}>
                <Icon1
                  style={{alignSelf: 'center'}}
                  name={'cart'}
                  size={hp('4%')}
                  color={'rgba(255,255,255,1)'}
                />
                {this.state.language == 'eng' ? (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: wp('3%'),
                      textAlign: 'center',
                    }}>
                    Cart
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: wp('3%'),
                      textAlign: 'center',
                    }}>
                    كارة
                  </Text>
                )}
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
    backgroundColor: '#fff',
    // paddingTop:80
  },
  cartItems: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: LightGrey,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    justifyContent: 'space-between',
    // width:'100%',
  },
  header: {
    backgroundColor: Orange,
    borderBottomRightRadius: wp('10%'),
    borderBottomLeftRadius: wp('10%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
    paddingVertical: hp('1%'),
  },
  footer: {
    backgroundColor: Orange,
    // height:hp('9%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
    paddingBottom: hp('0.5%'),
  },
});
