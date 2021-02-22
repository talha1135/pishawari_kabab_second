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
  ImageBackground,
  Animated,
  Easing
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon1 from 'react-native-vector-icons/FontAwesome5';

import Icon from 'react-native-vector-icons/AntDesign';
import {IP,Black,Blue, Pink, Grey,Yellow, LightGrey, Brown, Cream, Red, Orange, LightRed, DarkGrey} from '../../utils/Constants';
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
const cartItems = 
    {
      pic_url: '',
      name_eng: '',
      price_eng:'',
      quantity:'',
    }

    
  
export default class ViewCartItem extends Component {

  constructor(props) {
    super(props);
    this.RotateValue = new Animated.Value(0);
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

  ceilPrecised(number, precision) {
  var power = Math.pow(10, precision);

    return Math.ceil(number * power) / power;
  }
  componentDidMount(){
    this.startImageRotaion();
    const item = this.props.navigation.getParam('item');


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
  
  linebreaker(str){
    var linebreak =  true;

    for (var j = 0; j <= str.length - 1; j++) {
      if(j>20){
        if(str[j]==' '){
          if(linebreak){
            str = str.substr(0, j) + "\n" + str.substr(j+1,str.length);
            console.log('true');

            linebreak = false;
          }
        }
      }
    }
    return str;
  }

  startImageRotaion(){
    this.RotateValue.setValue(0);
    Animated.timing(this.RotateValue,{
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }
  

  render() {
    const RotateData = this.RotateValue.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg','720deg']
    })
    const i=this.state.item;

    return (
      <View style={styles.container}>

        <Image
          style={{
            width: wp('100%'),
            height: hp('30%'),
            borderRadius:5,
            marginBottom:hp('1.5%'),
            resizeMode: 'contain',

          }}
          source={{uri: IP+"/storage/"+this.state.item.pic_url}}
        />
        <View style={{
          paddingTop:hp('2%'),
          paddingBottom:hp('4%'),
          paddingLeft:wp('2%'),
          position:"absolute"

        }}>
          <TouchableOpacity
            style={{
            width:wp('8%'),
            height:wp('8%'),
            alignItems:'center',
            justifyContent:'center',
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
          paddingHorizontal:wp('5%'),
          marginTop:hp('2%')
        }}>
          <View style={{
            flexDirection:'row'
          }}>
            <Image
              style={{
                width: wp('20%'),
                height: wp('20%'),
                borderRadius:5,
                marginBottom:hp('1.5%'),
                resizeMode:'stretch'
              }}
              source={{uri: IP+"/storage/"+this.state.item.pic_url}}
            />

            <View style={{
              marginHorizontal:wp('5%'),
              paddingVertical:hp('1%')
            }}>
              {this.state.language == 'eng' ?
              <Text style={{
                fontSize:wp('5%'),
                fontWeight:'bold',
                color:DarkGrey
              }}>
                {this.linebreaker(i.name_eng)}
              </Text>
            :
              <Text style={{
                fontSize:wp('5%'),
                fontWeight:'bold',
                color:DarkGrey
              }}>
                {this.linebreaker(this.state.item.name_arb) }
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
              {this.state.item.calories_eng != null &&
                <View style={{flexDirection:'row',marginTop:hp('1%'),alignItems:'center'}}>
                  <Icon1 
                    name={"fire"}
                    size={wp('3%')}
                    color={Red}
                  />

                  <Text style={{color:DarkGrey,fontSize:wp('3%'),marginLeft:wp('1%'),fontWeight:'bold'}}>
                    {this.state.item.calories_eng} Kcal
                  </Text>

                </View>
              }
            </View>




          </View>

          <View>
            {this.state.language == 'eng' ? 
              <Text style={{
                color:DarkGrey,
                fontSize:wp('4%')
              }}>
                {this.state.item.description_eng}
              </Text>
            :
              <Text style={{
                color:DarkGrey,
                fontSize:wp('4%')
              }}>
                {this.state.item.description_arb}
              </Text>
            }
          </View>
          
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:hp('2%'),justifyContent:'space-between'}}>
            
            {this.state.item.discount_eng == null ?
            <Text style={{color:DarkGrey,fontSize:wp('5%')}}>
              {this.state.item.price_eng * (this.state.item.quantity/temp)} SR
            </Text>
            :
            <View>
              <Text style={{color:DarkGrey,fontSize:wp('5%'),textDecorationLine: 'line-through'}}>
                {this.state.item.price_eng * (this.state.item.quantity/temp)} SR
              </Text>
              <Text style={{color:DarkGrey,fontSize:wp('5%')}}>
                {this.ceilPrecised(((this.state.item.price_eng - (this.state.item.price_eng * this.state.item.discount_eng / 100)) * (this.state.item.quantity/temp)),4)} SR
              </Text>
            </View>
            }

            <View style={{
              borderWidth:1,
              borderColor:LightGrey,
              borderRadius:5,
              justifyContent:'center',
              width:wp('35%'),
              flexDirection:'row',
              backgroundColor:Yellow
            }}>

              <TouchableOpacity style={{
                flex:1,
                alignItems:'center',
                borderRightWidth:1,
                borderColor:LightGrey,
                paddingVertical:hp('1%'),
              }}
                onPress={()=>{this.minusButton()}}
              >
                <Icon 
                  name={"minus"}
                  size={wp('5%')}
                  color={Black}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{
                flex:1,
                paddingVertical:hp('1%'),
                alignItems:'center',
                backgroundColor:'#fff'
              }}>
                <Text>{this.state.item.quantity}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                flex:1,
                alignItems:'center',
                borderLeftWidth:1,
                borderColor:LightGrey,
                paddingVertical:hp('1%'),
                // backgroundColor:Yellow
              }}
                onPress={()=>{this.plusButton()}}
              >
                <Icon 
                  name={"plus"}
                  size={wp('5%')}
                  color={Black}
                />
              </TouchableOpacity>

            </View>

          </View>
        
          

        {this.state.item.spice_options == 'true'&&
          <View style={{
            flexDirection:'row',
            justifyContent:'space-around',
            marginTop:hp('2%'),
            marginHorizontal:wp('7%')
          }}>
            <TouchableOpacity 
              onPress={()=>{this.setState({spice_options_id:'1'})}}
              style={{
              alignItems:'center'
              }}
            >
              <View 
                style={{
                  borderWidth:2,
                  borderColor:'#93b70f',
                  borderRadius:50,
                  alignItems:'center',
                  padding:wp('1%'),
                  marginTop:wp('1%'),
                  backgroundColor:this.state.spice_options_id == '1'? 'rgba(147, 183, 15, 0.15)':'rgba(0, 0, 0, 0)'
                }}
              >
                <Animated.Image
                  style={{
                    width: wp('12%'),
                    height: wp('12%'),
                    transform:[{rotate: RotateData}]

                  }}
                  source={require('../../images/nonspicy.png')}
                />
              </View>
                {this.state.language == 'eng' ?
                  <Text style={{
                    fontSize:wp('3%'),
                    color:'#93b70f'
                  }}>
                    {spiceOptions[0].name_eng}
                  </Text>
                :
                  <Text style={{
                    fontSize:wp('3%'),
                    color:'#93b70f'
                  }}>
                    {spiceOptions[0].name_arb}
                  </Text>
                }
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=>{this.setState({spice_options_id:'2'})}}
              style={{
              alignItems:'center'
              }}
            >
              <View 
                style={{
                  borderWidth:2,
                  borderColor:'#ff8202',
                  borderRadius:50,
                  alignItems:'center',
                  padding:wp('1%'),
                  marginTop:wp('1%'),
                  backgroundColor:this.state.spice_options_id == '2'? 'rgba(255, 130, 2, 0.15)':'rgba(0, 0, 0, 0)'
                }}
              >
                <Animated.Image
                  style={{
                    width: wp('12%'),
                    height: wp('12%'),
                    transform:[{rotate: RotateData}]

                  }}
                  source={require('../../images/mediumspicy.png')}
                />
              </View>
                {this.state.language == 'eng' ?
                  <Text style={{
                    fontSize:wp('3%'),
                    color:'#ff8202'
                  }}>
                    {spiceOptions[1].name_eng}
                  </Text>
                :
                  <Text style={{
                    fontSize:wp('3%'),
                    color:'#ff8202'
                  }}>
                    {spiceOptions[1].name_arb}
                  </Text>
                }
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=>{this.setState({spice_options_id:'3'})}}
              style={{
              alignItems:'center'
              }}
            >
              <View 
                style={{
                  borderWidth:2,
                  borderColor:'#f6121f',
                  borderRadius:50,
                  alignItems:'center',
                  padding:wp('1%'),
                  marginTop:wp('1%'),
                  backgroundColor:this.state.spice_options_id == '3'? 'rgba(246, 18, 31, 0.15)':'rgba(0, 0, 0, 0)'
                }}
              >
                <Animated.Image
                  style={{
                    width: wp('12%'),
                    height: wp('12%'),
                    transform:[{rotate: RotateData}]
                  }}
                  source={require('../../images/hotspicy.png')}
                />
              </View>
                {this.state.language == 'eng' ?
                  <Text style={{
                    fontSize:wp('3%'),
                    color:'#f6121f'
                  }}>
                    {spiceOptions[2].name_eng}
                  </Text>
                :
                  <Text style={{
                    fontSize:wp('3%'),
                    color:'#f6121f'
                  }}>
                    {spiceOptions[2].name_arb}
                  </Text>
                }
            </TouchableOpacity>

          </View>
        }

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
              {this.state.item.additional_items_eng}
              
        
            </Text>
          :
            <Text style={{
              color:DarkGrey,
              fontSize:wp('4%')
            }}>
              {this.state.item.additional_items_arb}
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
            backgroundColor:Yellow,
          
        }}>
          {this.state.language == 'eng' ? 
              <Text style={{
                color:Black,
                fontSize:wp('4%'),
                marginLeft:wp('2%')
              }}>
                ADD TO CART
              </Text>
            :
              <Text style={{
                color:Black,
                fontSize:wp('4%'),
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