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
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/AntDesign';
import {IP,Blue, Pink, Grey, LightGrey, Brown, Cream, Red, Orange, LightRed, DarkGrey} from '../../utils/Constants';
import {Log, Signin, name, email, password, phone,continueToPayementMode as ctp, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Caller from "../../configurations/Caller";

var spiceOptions=[
  {
    id: 1, 
    name_arb: "غير حار", 
    name_eng: "Non Spicy", 
  }, 
  {
    id: 2, 
    name_arb: "اقل حار", 
    name_eng: "Less Spicy", 
  }, 
  {
    id: 3, 
    name_arb: "حار حار",
    name_eng: "Hot Spicy", 
   }
];
var temp=0;
const cartItems = [
    {
      pic_url: '',
      name_eng: '',
      price_eng:'',
      quantity:'',
    },
    
  ]
export default class ViewCartItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      item: cartItems,
      menuItemList:[],
      spice_options_id:null
    };
    
  }
  plusButton = ()=>{
    if(this.state.item.quantity < 50)
      {
        var c = (parseInt(this.state.item.quantity)+temp).toString();
        this.state.item.quantity = c;
        this.setState({item:this.state.item});
        // console.log(c);
      }
  }
  minusButton = ()=>{

    if(this.state.item.quantity > temp)
      {
        var c = (parseInt(this.state.item.quantity)-temp).toString();
        this.state.item.quantity = c;
        this.setState({item:this.state.item});
        // console.log(c);
      }

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
    

    const item = this.props.navigation.getParam('item');
    console.log("item",item);
    if(item.spice_options=='true')
      this.setState({spice_options_id:2})
    if(item.quantity_eng==null)
      item.quantity_eng='1';

    item.quantity=item.quantity_eng;
    // console.log('item quantity-->',item.quantity);

   
    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language,item:item})
          }
        });
      
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    
    this.setState({item:item})
    temp=parseInt(item.quantity_eng);

    }
  addToCart(i){
    i.spice_options_id=this.state.spice_options_id;
    this.props.navigation.navigate('Cart',{i,i});
  }
  renderFields = ({ item, index }) => {
    return (
        
          
        <TouchableOpacity 
          style={{
            borderBottomRightRadius:5,
            borderBottomLeftRadius:5,
            borderTopRightRadius:5,
            borderTopLeftRadius:5,
            backgroundColor:'#fff',
            // alignItems:'center',
            // paddingBottom:hp('1.5%'),

            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2
        }}>

          

          <Image
              style={{
                width: wp('40%'),
                height: wp('40%'),
                borderTopRightRadius:5,
                borderTopLeftRadius:5,
                // marginBottom:hp('1.5%'),
                resizeMode: 'stretch',
              }}
              source={{uri: IP+"/storage/"+item.pic_url}}
            />
            {
              item.discount_eng != null &&
            
                <View style={styles.discount}>

                  <Text style={{
                    color:'#fff',
                    textAlign:'right',
                    fontSize:wp('3%')
                  }}>
                    {item.discount_eng}% Off
                  </Text>
                </View>
            }

            
            {
              this.state.language == 'eng' ? 
                <View>
                  <Text 
                    style={{
                      marginLeft:wp('4%'),
                      marginBottom:wp('1%'),
                      color:Blue,
                    }}>
                    {item.name_eng.substr(0,15)}
                  </Text>

                  <Text 
                    style={{
                      marginLeft:wp('4%'),
                      fontSize:wp('3%')
                    }}>
                    Calories: {item.calories_eng}
                  </Text>

                  {
                    item.quantity_eng != null &&
                      <Text 
                        style={{
                          marginLeft:wp('4%'),
                          fontSize:wp('3%')
                        }}>
                        Quantity: {item.quantity_eng}
                      </Text>
                  }

                  {
                    item.weight_eng != null &&
                      <Text 
                        style={{
                          marginLeft:wp('4%'),
                          fontSize:wp('3%')
                        }}>
                        Weight: {item.weight_eng}
                      </Text>
                  }
                </View>
                :
                <View>
                  <Text style={{marginHorizontal:wp('4%'),marginBottom:wp('1%'),color:Blue}}>
                    {item.name_arb.substr(0,16)}
                  </Text>

                  <Text 
                    style={{
                      marginLeft:wp('4%'),
                      fontSize:wp('3%')
                    }}>
                    سعرات حراريه: {item.calories_eng}
                  </Text>

                  {
                    item.quantity_eng != null &&
                      <Text 
                        style={{
                          marginHorizontal:wp('4%'),
                          fontSize:wp('3%')
                        }}>
                        كمية: {item.quantity_eng}
                      </Text>
                  }

                  {
                    item.weight_eng != null &&
                      <Text 
                        style={{
                          marginHorizontal:wp('4%'),
                          fontSize:wp('3%')
                        }}>
                        وزن: {item.weight_eng}
                      </Text>
                  }
                </View>
            }
            
            <View style={{marginTop:hp('3%')}}/>
            <View
              style={{
                position:'absolute',
                bottom:5,
                right:0
              }}
            >
              <Text 
                style={{
                  marginTop:hp('1%'),
                  marginRight:wp('4%'),
                  textAlign:'right',
                  color: Red,

                }}>
                {item.price_eng} SR
              </Text>
            </View>
        </TouchableOpacity>
            
        
    );
  };
  

  render() {
    const i=this.state.item;
    return (
      <View style={styles.container}>

        <View style={{
          paddingTop:hp('2%'),
          paddingBottom:hp('4%'),
          paddingLeft:wp('5%')
        }}>
          <TouchableOpacity
          style={{
            width:wp('8%'),
            height:wp('8%'),
            alignItems:'center',
            justifyContent:'center'
          }}
            onPress = {() => {this.props.navigation.goBack()}}
          
          >
            <Icon 
              name={"left"}
              size={wp('5%')}
              color={DarkGrey}
            />
          </TouchableOpacity>
        </View>

        <View style={{
          paddingHorizontal:wp('5%')
        }}>
          <View style={{
            flexDirection:'row'
          }}>
            <Image
              style={{
                width: wp('20%'),
                height: wp('20%'),
                borderRadius:5,
                marginBottom:hp('1.5%')
              }}
              source={{uri: IP+"/storage/"+this.state.item.pic_url}}
            />

            <View style={{
              marginHorizontal:wp('5%'),
              paddingVertical:hp('1%')
            }}>
              {this.state.language == 'eng' ?
              <Text style={{
                fontSize:wp('3%'),
                fontWeight:'bold',
                color:DarkGrey
              }}>
                {this.state.item.name_eng}
              </Text>
            :
              <Text style={{
                fontSize:wp('3%'),
                fontWeight:'bold',
                color:DarkGrey
              }}>
                {this.state.item.name_arb}
              </Text>
              } 

              <View style={{flexDirection:'row',marginTop:hp('1%'),alignItems:'center'}}>
                <Icon 
                  name={"clockcircleo"}
                  size={wp('3%')}
                  color={DarkGrey}
                />

                <Text style={{color:DarkGrey,fontSize:wp('3%'),marginLeft:wp('1%')}}>
                  45 MIN
                </Text>

              </View>

            </View>

            {this.state.item.spice_options == 'true'&&

            <View style={{
              alignItems:'flex-end',
              flex:1
            }}>

              <TouchableOpacity 
                onPress={()=>{this.setState({spice_options_id:'1'})}}
                style={{
                  borderWidth:1,
                  borderColor:Grey,
                  borderRadius:5,
                  width:wp('28%'),
                  alignItems:'center',
                  paddingVertical:wp('1%'),
                  backgroundColor:this.state.spice_options_id == '1'? 'rgba(237, 240, 72, 0.2)':'rgba(0, 0, 0, 0)'
                }}
              >
                {this.state.language == 'eng' ?
                  <Text style={{
                    fontSize:wp('3%'),
                    color:DarkGrey
                  }}>
                    {spiceOptions[0].name_eng}
                  </Text>
                :
                  <Text style={{
                    fontSize:wp('3%'),
                    color:DarkGrey
                  }}>
                    {spiceOptions[0].name_arb}
                  </Text>
                }

              </TouchableOpacity>

              <TouchableOpacity 
                onPress={()=>{this.setState({spice_options_id:'2'})}}
                style={{
                  borderWidth:1,
                  borderColor:Grey,
                  borderRadius:5,
                  width:wp('28%'),
                  alignItems:'center',
                  paddingVertical:wp('1%'),
                  marginTop:wp('1%'),
                  backgroundColor:this.state.spice_options_id == '2'?'rgba(114, 240, 72, 0.2)':'rgba(0, 0, 0, 0)'
                }}
              >
                {this.state.language == 'eng' ?
                  <Text style={{
                    fontSize:wp('3%'),
                    color:DarkGrey,
                    textAlign:'center'
                  }}>
                    {spiceOptions[1].name_eng}
                  </Text>
                :
                  <Text style={{
                    fontSize:wp('3%'),
                    textAlign:'center',
                    color:DarkGrey,
                  }}>
                    {spiceOptions[1].name_arb}
                  </Text>
                }

              </TouchableOpacity>

              <TouchableOpacity 
                onPress={()=>{this.setState({spice_options_id:'3'})}}
                style={{
                  borderWidth:1,
                  borderColor:Grey,
                  borderRadius:5,
                  width:wp('28%'),
                  alignItems:'center',
                  paddingVertical:wp('1%'),
                  marginTop:wp('1%'),
                  backgroundColor:this.state.spice_options_id == '3'?'rgba(242, 0, 0, 0.2)':'rgba(0, 0, 0, 0)'
                }}
              >
                {this.state.language == 'eng' ?
                  <Text style={{
                    fontSize:wp('3%'),
                    textAlign:'center',
                    color:DarkGrey
                  }}>
                    {spiceOptions[2].name_eng}
                  </Text>
                :
                  <Text style={{
                    fontSize:wp('3%'),
                    textAlign:'center',
                    color:DarkGrey
                  }}>
                    {spiceOptions[2].name_arb}
                  </Text>
                }

              </TouchableOpacity>

            </View>
            }

          </View>

          {/*
          <Image
              style={{
                width: '100%',
                height: hp('40%'),
                // resizeMode:'contain',
                borderRadius:5,
                marginBottom:hp('1.5%')
              }}
              source={{uri: this.state.item.pic_url}}
            />
            */}
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:hp('2%'),justifyContent:'space-between'}}>
            <Text style={{color:DarkGrey,fontSize:wp('5%')}}>
              {this.state.item.price_eng * (this.state.item.quantity/temp)} SR
            </Text>

            <View style={{
              borderWidth:1,
              borderColor:LightGrey,
              borderRadius:5,
              justifyContent:'center',
              width:wp('35%'),
              paddingVertical:hp('1%'),
              flexDirection:'row',
            }}>

              <TouchableOpacity style={{
                flex:1,
                alignItems:'center',
                borderRightWidth:1,
                borderColor:LightGrey
              }}
                onPress={()=>{this.minusButton()}}
              >
                <Icon 
                  name={"minus"}
                  size={wp('5%')}
                  color={DarkGrey}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{
                flex:1,
                alignItems:'center'
              }}>
                <Text>{this.state.item.quantity}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                flex:1,
                alignItems:'center',
                borderLeftWidth:1,
                borderColor:LightGrey
              }}
                onPress={()=>{this.plusButton()}}
              >
                <Icon 
                  name={"plus"}
                  size={wp('5%')}
                  color={DarkGrey}
                />
              </TouchableOpacity>

            </View>

          </View>

        </View>

        <View style={{
          justifyContent:'center',
          alignItems:'center',
          marginVertical:hp('4%')
        }}>
          {this.state.language == 'eng' ?
            <Text style={{
              color:DarkGrey,
              fontSize:wp('4%')
            }}>
              2 x Roti , Raita with each delivery
        
            </Text>
          :
            <Text style={{
              color:DarkGrey,
              fontSize:wp('4%')
            }}>
              2 x خبز , رائٹا مع كل تسليم
            </Text>
          }
        </View>
        <TouchableOpacity 
          onPress={() => {this.addToCart(i)}}

          style={{
            paddingVertical:wp('2%'),
            borderRadius:5,
            marginHorizontal:wp('10%'),
            marginVertical:hp('2%'),
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:Orange,
          
        }}>
          {this.state.language == 'eng' ? 
              <Text style={{
                color:'#fff',
                fontSize:wp('3%'),
                marginLeft:wp('2%')
              }}>
                ADD TO CART
              </Text>
            :
              <Text style={{
                color:'#fff',
                fontSize:wp('3%'),
                marginLeft:wp('2%')
              }}>
                {ctp}
              </Text>
            }
          
        </TouchableOpacity>
      {/*
        <View style={{
          paddingHorizontal:wp('3%'),
          marginTop:hp('3%')
        }}>

          {this.state.language == 'eng' ?

            <Text style={{
              color:DarkGrey,
              fontWeight:'bold',
              fontSize:wp('4%'),
            }}>
              Similar Items
            </Text>
          :
            <Text style={{
              color:DarkGrey,
              fontWeight:'bold',
              fontSize:wp('4%'),
            }}>
              منتجات مشابهة
            </Text>
          }

          <ScrollView style={{width:wp('95%')}}>
            <FlatList
                horizontal={true}
                data={this.state.menuItemList}
                extraData={this.state}
                contentContainerStyle={{padding: hp('2%')}}
                keyExtracstor={(item, index) => `${index}`}
                renderItem={this.renderFields}
                ItemSeparatorComponent={() => {
                  return ( <View style={{ marginHorizontal: wp('1%')}} /> )
                }}
              />
          </ScrollView>

        </View>
*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    // paddingTop:80
    // justifyContent:'space-between'
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
    marginBottom:hp('2%')
  },
  footer: {
    backgroundColor:Orange,
    // height:hp('9%'),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:wp('5%'),
    alignItems:'center',
    paddingBottom:hp('1%')
  },
    discount: {
    marginLeft:-wp('2%'),
    marginTop:-wp('1%'),
    position:'absolute',
    backgroundColor:Orange,
    paddingHorizontal:wp('3%'),
    paddingVertical:hp('0.5'),
    width:wp('20%'),
    borderTopLeftRadius:wp('4%'),
    borderBottomRightRadius:wp('4%')
  },

});