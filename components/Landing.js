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
              style={{ width: 100, height: 50, marginTop: 60, marginLeft: 20 }}
              source={require("./main/logoGotcha.png")}
            />
            <Text style={styles.welcomeText}> WELCOME </Text>
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
            <TouchableOpacity style={styles.button}>
              <Text>HAHAHAHAHHA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text>HAHAHAHAHHA</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 550,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  welcomeText: {
    fontFamily: "Rubik_500Medium",
    fontSize: 60,
    alignSelf: "center",
    paddingTop: "40%",
    color: "#1F4E5F",
  },
  buttonContainer: {
    flexDirection: "column",
    backgroundColor: "purple",
    alignItems: "center",
    width: "100%",
    height: 300,
    justifyContent: "space-evenly",
  },
  button: {
    width: "80%",
    height: 60,
    backgroundColor: "#1F4E5F",
    alignItems: "center",
    borderRadius: 20,
  },
  socialContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    height: 60,
    backgroundColor: "blue",
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
    backgroundColor: "#1F4E5F",
    justifyContent: "center",
    alignItems: "center",
  },
  socialItem4: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#1F4E5Fl",
    justifyContent: "center",
    alignItems: "center",
  },
});
