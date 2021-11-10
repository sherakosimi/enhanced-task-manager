import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";
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
import { TaskType, People, ImpLevel } from "./Pickers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default function createTask(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(moment().format("DD.MM.YYYY"));
  const [time, setTime] = useState(moment().format("HH:mm"));

  const [chooseData, setchooseData] = useState("Выбрать...");
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData1, setchooseData1] = useState("Выбрать...");
  const [isModalVisible1, setisModalVisible1] = useState(false);
  const [chooseData2, setchooseData2] = useState("Выбрать...");
  const [isModalVisible2, setisModalVisible2] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(moment(date).format("DD.MM.YYYY"));
    console.log(moment(date).format("DD.MM.YYYY"));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    setTime(moment(time).format("HH:mm"));
    console.log(moment(time).format("HH:mm"));
    hideTimePicker();
  };

  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };

  const setData = (option) => {
    setchooseData(option);
  };

  const changeModalVisibility1 = (bool) => {
    setisModalVisible1(bool);
  };

  const setData1 = (option) => {
    setchooseData1(option);
  };

  const changeModalVisibility2 = (bool) => {
    setisModalVisible2(bool);
  };

  const setData2 = (option) => {
    setchooseData2(option);
  };

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
            <View style={styles.headerContainer1}>
              <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Icon name="menu" color="#1F4E5F" size={30} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Друзья</Text>
              <Icon name="account-plus-outline" color="#1F4E5F" size={30} />
            </View>
          </View>
          <ScrollView>
            <View style={styles.formContainer}>
              <View style={styles.inputForm}>
                <Text style={styles.captionInput}>Тип задачи:</Text>
                <TouchableOpacity
                  style={styles.TouchableOpacity}
                  onPress={() => changeModalVisibility(true)}
                >
                  <Text style={styles.text}>{chooseData}</Text>
                  <Icon name="chevron-down" color="#1F4E5F" size={35} />
                </TouchableOpacity>
              </View>
              <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                nRequestClose={() => changeModalVisibility(false)}
              >
                <TaskType
                  changeModalVisibility={changeModalVisibility}
                  setData={setData}
                />
              </Modal>
              <View style={styles.inputForm}>
                <Text style={styles.captionInput}>Название</Text>
                <TouchableOpacity
                  style={styles.TouchableOpacity}
                  onPress={() => changeModalVisibility2(true)}
                >
                  <Text style={styles.text}>Написать...</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputForm}>
                <Text style={styles.captionInput}>Дата и Время</Text>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={styles.TouchableOpacityDate}
                    onPress={showDatePicker}
                  >
                    <Text style={styles.textDate}>{date}</Text>
                    <Icon name="calendar-range" color="#1F4E5F" size={25} />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      datePickerModeOnAndroid={"spinner"}
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.TouchableOpacityTime}
                    onPress={showTimePicker}
                  >
                    <Text style={styles.textDate}>{time}</Text>
                    <Icon
                      name="clock-time-four-outline"
                      color="#1F4E5F"
                      size={25}
                    />
                    <DateTimePickerModal
                      isVisible={isTimePickerVisible}
                      mode="time"
                      onConfirm={handleConfirmTime}
                      onCancel={hideTimePicker}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputForm}>
                <Text style={styles.captionInput}>Важность:</Text>
                <TouchableOpacity
                  style={styles.TouchableOpacity}
                  onPress={() => changeModalVisibility2(true)}
                >
                  <Text style={styles.text}>{chooseData2}</Text>
                  <Icon name="chevron-down" color="#1F4E5F" size={35} />
                </TouchableOpacity>
              </View>
              <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible2}
                nRequestClose={() => changeModalVisibility2(false)}
              >
                <ImpLevel
                  changeModalVisibility2={changeModalVisibility2}
                  setData2={setData2}
                />
              </Modal>
              <View style={styles.inputForm}>
                <Text style={styles.captionInput}>Участники:</Text>
                <TouchableOpacity
                  style={styles.TouchableOpacity}
                  onPress={() => changeModalVisibility1(true)}
                >
                  <Text style={styles.text}>{chooseData1}</Text>
                  <Icon name="chevron-down" color="#1F4E5F" size={35} />
                </TouchableOpacity>
              </View>
              <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible1}
                nRequestClose={() => changeModalVisibility1(false)}
              >
                <People
                  changeModalVisibility1={changeModalVisibility1}
                  setData1={setData1}
                />
              </Modal>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.addedPeople}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        source={{
                          uri:
                            "https://www.meme-arsenal.com/memes/d701774e6840211ad6c99153e34481c6.jpg",
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        height: 35,
                        paddingLeft: 8,
                      }}
                    >
                      <Text style={styles.personBox}>Shera Kosimi</Text>
                      <Text style={styles.personBox2}>@sherakosimi</Text>
                    </View>
                  </View>
                  <Icon
                    name="trash-can-outline"
                    color="#1F4E5F"
                    size={22}
                    style={{ alignSelf: "center", padding: 7 }}
                  />
                </View>
              </View>
              <View style={styles.inputForm}>
                <Text style={styles.captionInput}>Описание</Text>
                <TouchableOpacity
                  style={styles.TouchableOpacity1}
                  onPress={() => changeModalVisibility2(true)}
                >
                  <Text style={styles.text}>Написать...</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: "transparent",
              width: "100%",
              height: 115,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "90%",
                borderRadius: 10,
                backgroundColor: "#1F4E5F",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.createButton}>Создать</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    width: 36,
    height: 36,
  },
  imageContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#1F4E5F",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    height: "100%",
  },
  headerContainer1: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
    marginTop: "10%",
  },
  headerContainer: {
    height: 120,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    flexDirection: "column",
  },
  headerText: {
    color: "#1F4E5F",
    fontSize: 18,
    fontFamily: "Rubik_700Bold",
  },
  formContainer: {
    marginTop: 10,
    alignSelf: "center",
    width: "90%",
  },
  text: {
    marginVertical: 12,
    fontSize: 18,
    padding: 5,
    fontFamily: "Rubik_400Regular",
    color: "#7C969F",
  },
  textDate: {
    marginVertical: 12,
    fontSize: 18,
    padding: 5,
    fontFamily: "Rubik_400Regular",
    color: "#1F4E5F",
  },
  TouchableOpacity: {
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  TouchableOpacity1: {
    height: 100,
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TouchableOpacityDate: {
    width: "50%",
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  TouchableOpacityTime: {
    width: "30%",
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "stretch",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 50,
  },
  captionInput: {
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
    color: "#1F4E5F",
    paddingBottom: 10,
  },
  inputForm: {
    marginTop: 20,
  },
  addedPeople: {
    marginTop: 10,
    height: 60,
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  personBox: {
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
    color: "#1F4E5F",
  },
  personBox2: {
    fontSize: 14,
    fontFamily: "Rubik_400Regular",
    color: "#4E6E79",
  },
  createButton: {
    fontSize: 18,
    fontFamily: "Rubik_500Medium",
    color: "white",
  },
});
