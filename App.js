import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import Header from "./src/Components/common/Header";
import LoginForm from "./src/Components/LoginForm";

import Button from "./src/Components/common/Button";
import Spinner from "./src/Components/common/Spinner";

export default class App extends React.Component {
    constructor(props){
      super(props);
      this.state={
        loggedIn: null
      };

      this.renderContent=this.renderContent.bind(this);
    }

  componentWillMount(){
    const firebaseConfig={      
      apiKey: 'AIzaSyDwx_KrZeLiPrYqKIyoeQ7VkepFllcx_zI',
      authDomain: 'authdemo-rn.firebaseapp.com',
      databaseURL: 'https://authdemo-rn.firebaseio.com',
      storageBucket: 'authdemo-rn.appspot.com'};

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({loggedIn: true});
      }else{
        this.setState({loggedIn: false});
      }
    });
  }

  LogOut(){
    firebase.auth().signOut();
  }

  renderContent(){
    switch(this.state.loggedIn){
      case true:
        return <View style={styles.ButtonStyle}><Button text="Log Out" whenPress={this.LogOut.bind(this)} /></View>
      case false:
        return <LoginForm />
      default: 
        return <View style={styles.ButtonStyle}><Spinner /></View>
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Auth Demo" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles={
  ButtonStyle:{
    padding: 5,
    flexDirection: 'row'
  }
}


