import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";
import { Text } from "react-native-paper";
import { People, ImpLevel } from "./Pickers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function commentTest(props) {
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
          <View>
            <View style={styles.headerContainer}>
              <View style={styles.headerContainer1}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                  <Icon name="chevron-left" color="#1F4E5F" size={35} />
                </TouchableOpacity>

                <Icon
                  name="account-plus-outline"
                  color="transparent"
                  size={30}
                />
              </View>
              <View
                style={{
                  width: "80%",
                  alignSelf: "center",
                }}
              >
                <Text style={styles.caption}>Веб-сайт для DC-Сугурта</Text>
                <Text style={styles.description}>
                  Поменять иконки для сайта DC-Сугурта. Подогнать под все
                  размеры экранов.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.teamCaption}>Команда</Text>
                    <View style={{ flexDirection: "row", height: 60 }}>
                      <View style={styles.personCircle}></View>
                      <View style={styles.personCircle}></View>
                      <View style={styles.personCircle}></View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 75,
                      backgroundColor: "#61C877",
                      borderRadius: 15,
                      height: 35,
                      marginTop: 22,
                      borderWidth: 1,
                      borderColor: "#1D4E27",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.textReady}>Готово</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    height: "100%",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContainer1: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 60,
    marginTop: 50,
  },

  caption: {
    color: "#1F4E5F",
    fontSize: 18,
    fontFamily: "Rubik_700Bold",
    width: "80%",
  },
  description: {
    paddingTop: 8,
    color: "#777777",
    fontFamily: "Rubik_400Regular",
    fontSize: 14,
  },
  teamCaption: {
    paddingTop: 20,
    color: "#1F4E5F",
    fontSize: 12,
    fontFamily: "Rubik_500Medium",
  },
  personCircle: {
    marginTop: 10,
    backgroundColor: "#1F4E5F",
    width: 30,
    height: 30,
    borderRadius: 100,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textReady: {
    color: "white",
    fontSize: 13,
    fontFamily: "Rubik_500Medium",
  },
});
