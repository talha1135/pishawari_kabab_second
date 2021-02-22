import React, { PureComponent } from 'react';
import { 
  View,
  ActivityIndicator
} from 'react-native'

import {Orange} from '../../utils/Constants';

export default class Indicator extends PureComponent {

	
	render() {
		return (
      <View style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',

      }}>
        <ActivityIndicator color={'blue'} size="large" />
      </View>
    );
	}
}