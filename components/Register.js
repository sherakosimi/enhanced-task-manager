import React, { useEffect, useState } from "react";
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
require("firebase/firestore");
require("firebase/firebase-storage");
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

export default function Register({ navigation }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
    name: "",
    check_textInputChange: false,
    check_usernameChange: false,
    secureTextEntry: true,
    secureTextEntry2: true,
    passwordsMatch: true,
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

  const userInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        username: val,
        check_usernameChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_usernameChange: false,
      });
    }
  };

  const nameInputChange = (val) => {
    setData({
      ...data,
      name: val,
    });
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handlePasswordChange2 = (val) => {
    if (val == data.password) {
      setData({
        ...data,
        password2: val,
        passwordsMatch: true,
      });
    } else {
      setData({
        ...data,
        passwordsMatch: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateSecureTextEntry2 = () => {
    setData({
      ...data,
      secureTextEntry2: !data.secureTextEntry2,
    });
  };

  const onSignUp = () => {
    let username = data.username;
    let email = data.email;
    let password = data.password;
    let name = data.name;
    if (data.passwordsMatch) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((result) => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              name,
              username,
              email,
              password,
            });
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: username,
          });
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
          <Text style={styles.caption}>Регистрация</Text>
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.description}>
              Зарегестрируйте себе аккаунт и
            </Text>
            <Text style={styles.description}>
              Начните управлять своими задачами, проектами и
            </Text>
            <Text style={styles.description}>Многое другое...</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Icon
              style={{ marginLeft: 10 }}
              name="account-outline"
              color="#7C969F"
              size={25}
            />
            <View style={{ marginLeft: 10, width: "72%" }}>
              <TextInput
                style={styles.textHolder}
                placeholder="Имя"
                onChangeText={(val) => nameInputChange(val)}
              />
            </View>
          </View>
          <View style={styles.input}>
            <Icon
              style={{ marginLeft: 10 }}
              name="account-outline"
              color="#7C969F"
              size={25}
            />
            <View style={{ marginLeft: 10, width: "72%" }}>
              <TextInput
                style={styles.textHolder}
                placeholder="Ник"
                onChangeText={(val) => userInputChange(val)}
              />
            </View>
            {data.check_usernameChange ? (
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
              name="email-outline"
              color="#7C969F"
              size={25}
            />
            <View style={{ marginLeft: 10, width: "72%" }}>
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
            <View style={{ marginLeft: 10, width: "72%" }}>
              <TextInput
                style={styles.textHolder}
                placeholder="Пароль"
                onChangeText={(val) => handlePasswordChange(val)}
                secureTextEntry={data.secureTextEntry ? true : false}
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
          {data.passwordsMatch ? (
            <View style={styles.input}>
              <Icon
                style={{ marginLeft: 10 }}
                name="lock-outline"
                color="#7C969F"
                size={25}
              />
              <View style={{ marginLeft: 10, width: "72%" }}>
                <TextInput
                  style={styles.textHolder}
                  secureTextEntry={data.secureTextEntry2 ? true : false}
                  placeholder="Подтвердите пароль"
                  onChangeText={(val) => handlePasswordChange2(val)}
                />
              </View>
              <TouchableOpacity onPress={updateSecureTextEntry2}>
                {data.secureTextEntry2 ? (
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
          ) : (
            <View style={styles.input2}>
              <Icon
                style={{ marginLeft: 10 }}
                name="lock-outline"
                color="#7C969F"
                size={25}
              />
              <View style={{ marginLeft: 10, width: "72%" }}>
                <TextInput
                  style={styles.textHolder}
                  secureTextEntry={data.secureTextEntry2 ? true : false}
                  placeholder="Подтвердите пароль"
                  onChangeText={(val) => handlePasswordChange2(val)}
                />
              </View>
              <TouchableOpacity onPress={updateSecureTextEntry2}>
                {data.secureTextEntry2 ? (
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
          )}
          {data.passwordsMatch ? null : (
            <Text style={styles.description1}>Пароли не совпадают</Text>
          )}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.regButton} onPress={() => onSignUp()}>
            <Text style={styles.buttonText1}>Зарегестрироваться</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.regButton2}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.buttonText}>Уже есть аккаунт? Войти</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginTop: "2%",
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
  description1: {
    fontFamily: "Rubik_400Regular",
    fontSize: 13,
    color: "#F5857E",
  },
  inputContainer: {
    height: "40%",
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
  input2: {
    backgroundColor: "#F5857E",
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
