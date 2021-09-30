import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onSignIn = this.onSignIn.bind(this); //to be able to use states in onSignUp function
  }

  onSignIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    //render is called everytime the state changes
    return (
      <View>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email: email })} //we change the state of the name with onChangeText function
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password: password })} //we change the state of the name with onChangeText function
        />
        <Button onPress={() => this.onSignin()} title="Sign In" />
      </View>
    );
  }
}
