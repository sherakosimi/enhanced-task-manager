import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";

export default function ProfileDesign({ navigation }) {
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
          style={{ height: "100%" }}
          colors={[
            "#C2F1FA",
            "rgba(217, 242, 255, 0.53125)",
            "rgba(228, 237, 251, 0.73)",
          ]}
        >
          <View style={styles.headerContainer}>
            <View style={styles.photoText}>
              <View>
                <Text style={styles.taskTitle}>19</Text>
                <Text style={styles.taskCaption}>Завершенных Задач</Text>
              </View>
              <Avatar.Image
                source={{
                  uri:
                    "https://www.meme-arsenal.com/memes/d701774e6840211ad6c99153e34481c6.jpg",
                }}
                size={100}
              />
              <View>
                <Text style={styles.taskTitle}>24</Text>
                <Text style={styles.taskCaption}>Текущих Задач</Text>
              </View>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>John Smith</Text>
              <Text style={styles.username}>@jsmith</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonCaption}>Изменить Профиль</Text>
              </TouchableOpacity>
            </View>
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
    height: 350,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    flexDirection: "column",
  },
  photoText: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 100,
  },
  taskTitle: {
    color: "#1F4E5F",
    fontSize: 17,
    fontFamily: "Rubik_500Medium",
    textAlign: "center",
  },
  taskCaption: {
    paddingTop: 7,
    width: 80,
    textAlign: "center",
    color: "#7C969F",
    fontSize: 11,
    fontFamily: "Rubik_400Regular",
  },

  nameContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    color: "#1F4E5F",
    fontSize: 22,
    fontFamily: "Rubik_500Medium",
    textAlign: "center",
  },
  username: {
    textAlign: "center",
    color: "#7C969F",
    fontSize: 14,
    fontFamily: "Rubik_400Regular",
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1F4E5F",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  buttonCaption: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Rubik_500Medium",
  },
});