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
  KeyboardAvoidingView,
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
import { connect } from "react-redux";

function createProject(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(moment().format("DD.MM.YYYY"));
  const [time, setTime] = useState(moment().format("HH:mm"));

  const [participants, setFollowing] = useState([]);

  const [imgUrl, setImgUrl] = useState("");

  const [caption, setCaption] = useState("");
  const [projectID, setProjectID] = useState("");
  const [description, setDescription] = useState("");

  const [taskType, setchooseData] = useState("Выбрать...");
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData1, setchooseData1] = useState("Выбрать...");
  const [isModalVisible1, setisModalVisible1] = useState(false);
  const [importantLevel, setchooseData2] = useState("Выбрать...");
  const [isModalVisible2, setisModalVisible2] = useState(false);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  const savePostData = () => {
    for (let i = 0; i < participants.length; i++) {
      firebase
        .firestore()
        .collection("ProjectUsers")
        .doc(participants[i].id + "_" + projectID)
        .set({
          creator: firebase.auth().currentUser.uid,
          userID: participants[i].id,
          projectID: projectID,
          inProject: true,
        });
    }

    firebase
      .firestore()
      .collection("ProjectUsers")
      .doc(firebase.auth().currentUser.uid + "_" + projectID)
      .set({
        creator: firebase.auth().currentUser.uid,
        userID: firebase.auth().currentUser.uid,
        projectID: projectID,
        inProject: true,
      });

    firebase
      .firestore()
      .collection("projects")
      .doc(projectID)
      .set({
        creator: firebase.auth().currentUser.uid,
        projectID,
        caption,
        participants,
        description,
        date,
        time,
        importantLevel,
        color: generateColor(),
        creation: firebase.firestore.FieldValue.serverTimestamp(),
        user: props.currentUser,
      })
      .then(function () {
        props.navigation.navigate("Projects");
      });
  };

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

  const setData1 = (name, username, id) => {
    let imageRef = firebase
      .storage()
      .ref("profilepicture/" + id + "/" + "profilePicture");
    imageRef
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        //from url you can fetched the uploaded image easily
        setImgUrl(url);
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));

    const data = {
      name: name,
      username: username,
      id: id,
      url: imgUrl,
    };
    setFollowing([...participants, data]);
  };

  const deleteData = (username) => {
    setFollowing(participants.filter((item) => item.username !== username));
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

  console.log(props.currentUser);
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
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
              <Text style={styles.headerText}>Создание Проекта</Text>
              <Icon name="account-plus-outline" color="transparent" size={30} />
            </View>
          </View>
          <ScrollView>
            <View style={styles.formContainer}>
              <View style={styles.inputForm}>
                <Text style={styles.captionInput}>Название</Text>
                <View style={styles.TouchableOpacity}>
                  <TextInput
                    style={styles.text}
                    placeholder="Ввести"
                    placeholderTextColor="#7C969F"
                    onChangeText={(caption) => setCaption(caption)}
                  />
                </View>
              </View>
              <View style={styles.inputForm}>
                <Text style={styles.captionInput}>ID</Text>
                <View style={styles.TouchableOpacity}>
                  <TextInput
                    style={styles.text}
                    placeholder="Ввести"
                    placeholderTextColor="#7C969F"
                    onChangeText={(projectID) => setProjectID(projectID)}
                  />
                </View>
              </View>
              <View style={styles.inputForm}>
                <Text style={styles.captionInput}>Дата и Время Окончания</Text>
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
                  <Text style={styles.text}>{importantLevel}</Text>
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
                <FlatList
                  numColumns={3}
                  horizontal={false}
                  data={participants}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <TouchableOpacity style={styles.addedPeople}>
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
                          <Text style={styles.personBox}>{item.name}</Text>
                          <Text style={styles.personBox2}>
                            @{item.username}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ alignSelf: "center", padding: 7 }}
                        onPress={() => deleteData(item.username)}
                      >
                        <Icon
                          name="trash-can-outline"
                          color="#1F4E5F"
                          size={22}
                        />
                      </TouchableOpacity>
                      <Icon
                        name="trash-can-outline"
                        color="transparent"
                        size={15}
                        style={{ alignSelf: "center", padding: 7 }}
                      />
                    </View>
                  )}
                />
              </View>
              <View style={styles.inputForm}>
                <Text style={styles.captionInput}>Описание</Text>
                <View
                  style={styles.TouchableOpacity1}
                  onPress={() => changeModalVisibility2(true)}
                >
                  <TextInput
                    style={styles.text1}
                    multiline={true}
                    placeholder="Ввести"
                    placeholderTextColor="#7C969F"
                    onChangeText={(description) => setDescription(description)}
                  />
                </View>
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
              onPress={() => savePostData()}
            >
              <Text style={styles.createButton}>Создать</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
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
  text1: {
    fontSize: 18,
    padding: 5,
    fontFamily: "Rubik_400Regular",
    color: "#7C969F",
    width: "100%",
    height: "90%",
    marginVertical: 10,
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
    height: 150,
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-start",
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
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(createProject);
