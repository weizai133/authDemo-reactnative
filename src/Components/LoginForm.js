import React, {Component} from "react";
import { Text } from "react-native";
import Button from "./common/Button";
import Card from "./common/Card";
import CardSection from "./common/CardSection";
import Input from "./common/Input";
import Spinner from "./common/Spinner";

import firebase from "firebase";

export default class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            error:'',
            loading: false
        }
    }

    onButtonPress(){
        const { email, password }=this.state;
        
        this.setState({error: '', loading : true});

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(()=>{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this))
        });
    }

    onLoginSuccess(){
        this.setState({
            email: '',
            password: '',
            loading : false,
            error: ''
        });
    }

    onLoginFail(){
        this.setState({
            error: 'Authentication failed!',
            loading: false
        })
    }


    renderButton(){
        if(this.state.loading){
            return <Spinner size="small" />
        }

        return <Button text="Log in"  whenPress={this.onButtonPress.bind(this)}  />
        
    }

    render(){
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email" 
                        placeholder="user@gmail.com"
                        onChangeText={ text => this.setState({email: text})}
                        value={this.state.email}
                        />
                </CardSection>
        
                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Password" 
                        placeholder="password"
                        onChangeText={ text => this.setState({password: text})}
                        value={this.state.password}
                        />
                </CardSection>

                <Text style={styles.errorStyle}>{this.state.error}</Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>


            </Card>
        );
    }
}


const styles={
    errorStyle:{
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}