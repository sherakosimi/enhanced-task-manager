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

export default function taskOverview() {
  return <View></View>;
}
