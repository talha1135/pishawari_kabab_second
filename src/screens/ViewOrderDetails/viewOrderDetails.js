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
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {IP,DarkGrey,Blue, Pink, Grey, LightGrey, Brown, Cream, Red, Orange} from '../../utils/Constants';
import {Log, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const cartItems = [
    {
      avatar: 'data:image/jpeg;base64,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',
      name: 'Kabuli Rice With Chicken',
      price:'17',
      quantity:'3',
      
    },
    
  ]
export default class ViewOrderDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      cartItems: cartItems
    };
    
  }
  componentDidMount () {
    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
          }
        });
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    const item = this.props.navigation.getParam('item');
    console.log(item);
    this.setState({cartItems:item})

  }
   handleBackPress = () => {
    console.log("Back Press");
    
      this.props.navigation.goBack(null);
    return true;
  }

  componentWillUnmount() {
    this.backHandler.remove();
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
  renderFields = ({ item, index }) => {
    return (

      <View style={styles.cartItems}>

        <View style={{flexDirection:'row'}}>
          <Image
            style={{
              width: wp('20%'),
              height: wp('20%'),
              borderRadius:5,
              marginBottom:hp('1.5%')
            }}
            source={{uri:IP + "/storage/"+item.pic_url}}
          />



          <View 
            style={{
              marginLeft:wp('4%'),
              marginTop:hp('1.5%')
            }}
          >

            <Text style={{
              color:Blue,
              fontWeight:'bold'
            }}>
              {this.state.language == 'eng' ? this.linebreaker(item.name_eng)  : this.linebreaker(item.name_eng)}
            </Text>

            {this.state.language == 'eng' ? 
              <View style={{flexDirection:'row',marginTop:hp('2%')}}>
                <Text style={{
                  fontSize:wp('3.8%'),
                  marginRight:wp('3%')
                }}>
                  Quantity
                </Text>

                <Text style={{
                  fontSize:wp('3.8%'),
                  color:DarkGrey
                }}>
                {item.quantity_eng}
                </Text>
              </View>
            :
              <View style={{flexDirection:'row',marginTop:hp('2%'),justifyContent:'flex-end'}}>
                <Text style={{
                  fontSize:wp('3.8%'),
                  marginRight:wp('3%')
                }}>
                  {item.quantity_eng}
                </Text>

                <Text style={{
                  fontSize:wp('3.8%'),
                  color:DarkGrey
                }}>
                كمية
                </Text>
              </View>
            }

            
          </View>
        
        </View>

       

      </View>

    );
  };

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
            <Text style={{
              color:'#fff',
              fontSize:wp('5%'),
              marginLeft:wp('2%')
            }}>
              Order Details
            </Text>
          </View>
          <View style={{
            alignItems:'flex-end',
            paddingRight:wp('8%'),
            paddingVertical:hp('1.8%')
          }}>
            <Text style={{
              color:'#fff',
              fontWeight:'bold',
              fontSize:25
            }}>
              {this.state.cartItems.bill} Sr
            </Text>
          </View>
        </View>

        <ScrollView style={{}}>
          <FlatList
            data={this.state.cartItems.orders_item}
            extraData={this.state}
            keyExtracstor={(item, index) => `${index}`}
            renderItem={this.renderFields}
            ItemSeparatorComponent={() => {
              return ( <View style={{ marginVertical: hp('2%')}} /> )
            }}
          />
        </ScrollView>
        
        <View style={styles.riderDetails}>
          <Text></Text>
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
  riderDetails:{

  }

});