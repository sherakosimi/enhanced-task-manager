import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

export default function Landing({ navigation }) {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={{
            height: "100%",
            alignItems: "flex-start",
          }}
          colors={[
            "#C2F1FA",
            "rgba(217, 242, 255, 0.53125)",
            "rgba(228, 237, 251, 0.73)",
          ]}
        >
          <View style={styles.headerContainer}>
            <Image
              style={{
                width: 100,
                height: 50,
                marginTop: "12%",
                marginLeft: 20,
              }}
              source={require("./main/logoGotcha.png")}
            />
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.welcomeText}> WELCOME </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialItem1}>
                <Image source={require("../assets/images/apple.png")} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialItem2}>
                <Image source={require("../assets/images/google.png")} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialItem3}>
                <Image source={require("../assets/images/facebook.png")} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialItem4}>
                <Image source={require("../assets/images/vk.png")} />
              </TouchableOpacity>
            </View>
            <Text style={styles.orCaption}> OR </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.button}
            >
              <Text style={styles.loginCaption}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={styles.button1}
            >
              <Text style={styles.loginCaption1}>Регистрация</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: "60%",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  welcomeText: {
    fontFamily: "Rubik_500Medium",
    fontSize: 60,
    color: "#1F4E5F",
    paddingBottom: "20%",
  },
  buttonContainer: {
    flexDirection: "column",

    alignItems: "center",
    width: "100%",
    height: 300,
    justifyContent: "space-evenly",
  },
  button: {
    width: "80%",
    height: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#7C969F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  button1: {
    width: "80%",
    height: 60,
    backgroundColor: "#1F4E5F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  socialContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    height: 60,
  },
  socialItem1: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  socialItem2: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  socialItem3: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    backgroundColor: "#3b5998",
    alignItems: "center",
  },
  socialItem4: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    backgroundColor: "#4C75A3",
    alignItems: "center",
  },
  orCaption: {
    fontFamily: "Rubik_500Medium",
    fontSize: 15,
    color: "black",
  },
  loginCaption: {
    fontFamily: "Rubik_500Medium",
    fontSize: 16,
    color: "#1F4E5F",
  },
  loginCaption1: {
    fontFamily: "Rubik_500Medium",
    fontSize: 16,
    color: "white",
  },
});
