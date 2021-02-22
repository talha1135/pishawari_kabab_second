import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  BackHandler,
  StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

export default class OptionsView extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      data: this.props.navigation.getParam('Options', ''),
      origData: this.props.navigation.getParam('Options', ''),
      error: null,
      value: ''
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          marginLeft: 10,
          marginRight: 10,
          width: '95%',
          backgroundColor: 'rgba(138, 138, 138, 0.2)',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text
    });
    const newData = this.state.origData.filter(item => {
      const itemName = `${item.name_eng.toUpperCase()}`;
      const textData = text.toUpperCase();

      return (itemName.includes(textData));
    });

    this.setState({
      data: newData
    });
  };

  renderHeader = () => {
    return (
      <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 5}}>
        <TextInput
          style={{height: 40, backgroundColor: "#e9ecef", borderRadius: 25, paddingLeft: 20}}
          placeholder="Search"
          value={this.state.value}
          onChangeText={text => this.searchFilterFunction(text)}
        />
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, marginTop: 30}}>
        <ImageBackground
          imageStyle={{width:wp('75%'),height:hp('35%'),alignSelf:'center',marginHorizontal:wp('12.5%'),marginVertical:hp('33%'),opacity:0.02}}
          source={require('../../images/icons/logo.png')}
          style={{width:wp('100%'),height:hp('100%')}}
        >
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            extraData={this.state}
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableOpacity style={{flex: 1}}
               onPress={() => {
                var id = item.id;
                AsyncStorage.setItem('branchID',id)
                .catch(err => {
                  console.log(err);
                })

                var label = item.label;
                var index = this.state.origData.indexOf(item);
                this.props.navigation.state.params.returnLabel(label, index, id);
                this.props.navigation.goBack();
              }} 
              > 
                <View style={{flexDirection: 'row', padding: 20, alignItems: 'center'}} >
                 
                  
                  <View style={{flexDirection: 'column', marginLeft: 15}}>
                    <Text style={{fontSize: wp('4%')}}>{item.name_eng}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </ImageBackground>
        </View>
      );
    }
  }
}