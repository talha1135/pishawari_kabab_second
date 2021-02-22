import * as React from 'react'
import { 
  Text, 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Image 
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Blue, Pink, Grey, LightGrey} from '../../utils/Constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Dropdown extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			data: props.Options,
			placeholder: props.Placeholder,
      selectedIndex: props.SelectedIndex,
		};
	}

  componentDidUpdate() {
        console.log('index:',this.state.selectedIndex)
     // console.log("-----------------------------------------------------") 
     // console.log("State: ", this.state.data);
     // console.log("Props: ", this.props.Options);

    if(this.state.data !== this.props.Options) {
      this.setState({
        data: this.props.Options,
        selectedIndex: -1
      })
    }
  }

	navigate = () => {
		this.props.navigation.navigate('Options', {
      Options: this.state.data,
      returnLabel: this.getLabel.bind(this)
    });
	}

	getLabel(label, index) {
		this.props.CallBack(this.state.data[index]);
    this.setState({selectedIndex: index});
	}

	render() {
		const options = this.state.data;
    const placeholder = this.state.placeholder;
    const selectedIndex = this.state.selectedIndex;
    
    return (
      <TouchableOpacity
        style={[styles.container, styles.outline, {flex:1}]}
        disabled={this.state.disable}
        onPress={_ => this.navigate()}
      >
        <View style={[styles.innerContainer, {justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp('1%')}]}>
          { selectedIndex >= 0 ? 
            <Text style={{color: Blue, fontSize: wp('4%')}}>
              {this.state.data[selectedIndex].name_eng}
            </Text>
            :
            <Text style={{color: Grey, fontSize:wp('4%')}}>
              {placeholder}
            </Text>
          }
          <Icon 
            name={"chevron-down"}
            size={20}
            color={'#000'}
          />
        </View>
      </TouchableOpacity>
    );
	}
}

const styles = StyleSheet.create({
  container: {
  		padding: wp('2%')
  },
  innerContainer: {
  		flexDirection: 'row',
  		alignItems: 'center',
  },
  text: {
  		color: "#fff",
  		fontSize: 16,
  		textAlign: 'center'
  },
  headerFooterContainer: {
  		padding: 10,
  		alignItems: 'center'
  },
  clearButton: { 
  		backgroundColor: 'grey',
  		borderRadius: 5,
  		marginRight: 10,
  		padding: 5
  },
  optionContainer: {
  		padding: 20,
  		borderBottomColor: 'rgba(179,179,179,0.5)',
  		borderBottomWidth: 1
  },
  optionInnerContainer: {
  		flex: 1,
  		flexDirection: 'row'
  },
  box: {
  		width: 20,
  		height: 20,
  		borderWidth: 1,
  		borderColor: 'rgba(0,0,0,0.1)',
  		marginRight: 10
  },
  outline: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10
  }
})