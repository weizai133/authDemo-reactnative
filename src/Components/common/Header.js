import * as React from 'react';
import {Text,View} from "react-native";

export default class header extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const {textStyle, viewStyle}=styles;
    const {headerText}=this.props;

    return (
      <View style={viewStyle}>
        <Text style={textStyle}>
          {headerText}
        </Text>
      </View>
    );
  }
}

const styles={
  viewStyle:{
    backgroundColor : '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {width : 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
    //justifyContent=> control the vertical postion of the component
    // alignItems=> horizontal
    //    flex-start, flext-end, center 
  },
  textStyle:{
    fontSize: 20
  }
} 