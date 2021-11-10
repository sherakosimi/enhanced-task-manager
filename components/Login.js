import React, { useState, Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

export default function ({ navigation }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const onSignUp = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //render is called everytime the state changes
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <Icon
              name="chevron-left-circle-outline"
              color="#1F4E5F"
              size={30}
            />
          </TouchableOpacity>
          <Image
            style={{ width: 100, height: 50 }}
            source={require("./main/logoGotcha.png")}
          />
        </View>
        <View style={styles.registrationCap}>
          <Text style={styles.caption}>Рады Тебя Снова Видеть!</Text>
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.description}>Заходи в свой аккаунт и</Text>
            <Text style={styles.description}>
              Начни управлять своими задачами
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Icon
              style={{ marginLeft: 10 }}
              name="email-outline"
              color="#7C969F"
              size={25}
            />
            <View style={{ marginLeft: 10, width: "73%" }}>
              <TextInput
                style={styles.textHolder}
                placeholder="Email"
                onChangeText={(val) => textInputChange(val)}
              />
            </View>
            {data.check_textInputChange ? (
              <Icon
                style={{ marginLeft: 10 }}
                name="checkbox-marked-circle-outline"
                color="#61C877"
                size={25}
              />
            ) : null}
          </View>
          <View style={styles.input}>
            <Icon
              style={{ marginLeft: 10 }}
              name="lock-outline"
              color="#7C969F"
              size={25}
            />
            <View style={{ marginLeft: 10, width: "73%" }}>
              <TextInput
                style={styles.textHolder}
                placeholder="Пароль"
                secureTextEntry={data.secureTextEntry ? true : false}
                onChangeText={(val) => handlePasswordChange(val)}
              />
            </View>
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Icon
                  style={{ marginLeft: 10 }}
                  name="eye-off-outline"
                  color="#7C969F"
                  size={25}
                />
              ) : (
                <Icon
                  style={{ marginLeft: 10 }}
                  name="eye-outline"
                  color="#7C969F"
                  size={25}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.regButton} onPress={() => onSignUp()}>
            <Text style={styles.buttonText1}>Войти</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.regButton2}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.buttonText}>Нет аккаунта? Зарегестрируйся</Text>
          </TouchableOpacity>
        </View>
      </View>
      // <View>
      //   <TextInput
      //     placeholder="email"
      //     onChangeText={(val) => textInputChange(val)} //we change the state of the name with onChangeText function
      //   />
      //   <TextInput
      //     placeholder="password"
      //     secureTextEntry={true}
      //     onChangeText={(val) => handlePasswordChange(val)} //we change the state of the name with onChangeText function
      //   />
      //   <Button onPress={() => onSignUp()} title="Sign In" />
      // </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 170,
    width: "87%",
    marginLeft: "1%",
  },
  registrationCap: {
    alignSelf: "center",
    width: "85%",
    marginTop: "10%",
  },
  caption: {
    fontFamily: "Rubik_500Medium",
    fontSize: 20,
    color: "#1F4E5F",
  },
  description: {
    fontFamily: "Rubik_400Regular",
    fontSize: 13,
    color: "#7C969F",
  },
  inputContainer: {
    height: "15%",
    marginTop: "10%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  input: {
    borderColor: "#7C969F",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: 50,
    borderRadius: 20,
  },
  textHolder: {
    width: "100%",
  },
  buttons: {
    height: 130,
    marginTop: "10%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  regButton: {
    height: 58,
    width: "85%",
    backgroundColor: "#1F4E5F",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  regButton2: {
    height: 58,
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7C969F",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Rubik_500Medium",
    fontSize: 15,
    color: "#1F4E5F",
  },
  buttonText1: {
    fontFamily: "Rubik_500Medium",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
