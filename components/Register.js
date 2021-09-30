import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onSignUp = this.onSignUp.bind(this); //to be able to use states in onSignUp function
  }

  onSignUp() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
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
          placeholder="name"
          onChangeText={(name) => this.setState({ name: name })} //we change the state of the name with onChangeText function
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email: email })} //we change the state of the name with onChangeText function
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password: password })} //we change the state of the name with onChangeText function
        />
        <Button onPress={() => this.onSignUp()} title="Sign Up" />
      </View>
    );
  }
}
