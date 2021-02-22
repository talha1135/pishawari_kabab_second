import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
  ImageBackground,
  ToastAndroid,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import Caller from '../../configurations/Caller';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as geolib from 'geolib';
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
} from '../../utils/Constants';

const resturantLocation = {
  latitude: 33.65017,
  longitude: 73.0777019,
};

var itemTotal = null;
var deliveryPlace = null;
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 33.5799453,
        longitude: 73.0335136,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
    };
  }

  requestGPSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'GPS location Permission',
          message: 'we want to access your GPS location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getCurrentLocation();
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  onLocationChange(e) {
    console.log('change', e.nativeEvent.coordinate);
    const location = e.nativeEvent.coordinate;
    var region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };
    this.setState({region: region});
  }
  getDistance() {
    const point = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    };
    const distance = geolib.getDistance(
      {
        latitude: 33.5992013,
        longitude: 73.060059,
      },
      point,
    );
    console.log('total distance from resturant is :', distance);
    console.log('final location coords:', this.state.region);
    this.props.navigation.navigate('CheckOut', {
      itemTotal: itemTotal,
      distance: distance,
      deliveryPlace: deliveryPlace,
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    });
  }
  getCurrentLocation() {
    console.log('geting location');
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 1000,
    })
      .then((location) => {
        console.log('latitutdes--->', location.latitude);
        console.log('longitude--->', location.longitude);
        var region = {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        };
        this.setState({region, region});
        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
      })
      .catch((ex) => {
        const {code, message} = ex;
        console.warn(code, message);
        if (code === 'CANCELLED') {
          alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          alert('Turn on the GPS');
        }
        if (code === 'TIMEOUT') {
          alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          alert('Authorization denied');
        }
      });
  }
  componentDidMount() {
    this.requestGPSPermission();
    itemTotal = this.props.navigation.getParam('itemTotal');
    console.log('total of items -- > ', itemTotal);
    deliveryPlace = this.props.navigation.getParam('deliveryPlace');
    console.log('total of items -- > ', deliveryPlace);
  }

  componentWillUnmount() {}

  onRegionChange() {}
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}>
          <Marker
            draggable
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
            onDragEnd={(e) => {
              this.onLocationChange(e);
            }}
            title={'You are here'}
          />
        </MapView>
        {/* <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'YOUR API KEY',
            language: 'en',
          }}
          style={{
            width: wp('70%'),
          }}
          currentLocation={true}
          currentLocationLabel="Current location"
        /> */}

        <View
          style={{
            position: 'absolute',
            top: hp('2%'),
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: Red,
            }}>
            Hold Pin Marker to drag
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.requestGPSPermission();
          }}
          style={{
            position: 'absolute',
            right: wp('2.8%'),
            top: hp('2.4%'),
          }}>
          <Icon
            name={'my-location'}
            size={wp('6%')}
            color={Red}
            style={{
              alignSelf: 'center',
              marginRight: wp('2%'),
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.getDistance();
          }}
          style={{
            // position: 'absolute',
            backgroundColor: Blue,
            paddingHorizontal: 80,
            paddingVertical: 3,
            borderRadius: 5,
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
