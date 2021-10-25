import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
      surname: "",
    };
    this.onSignUp = this.onSignUp.bind(this); //to be able to use states in onSignUp function
  }

  onSignUp() {
    const { email, password, name, surname } = this.state;
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
            surname,
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
          placeholder="surname"
          onChangeText={(surname) => this.setState({ surname: surname })} //we change the state of the name with onChangeText function
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
export default Register;
