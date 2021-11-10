import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
  Rubik_800ExtraBold,
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

export default function Tasks1(props) {
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
        <View style={styles.headerContainer}>
          <LinearGradient
            style={{ height: "100%" }}
            colors={["#8FEDFF", "#8DC2DC 40%", "#DEE9FA"]}
          >
            <View style={styles.headerMenu}>
              <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Icon
                  name="menu"
                  color="#1F4E5F"
                  size={30}
                  style={{ paddingLeft: "6%" }}
                />
              </TouchableOpacity>
              <Image
                style={{ width: "8%", height: "90%", marginRight: "7%" }}
                source={require("./logoLetterTr.png")}
              />
            </View>

            <View style={styles.dateContainer}>
              <View style={styles.date}>
                <Text style={styles.dateCaption}> 2 Октября, 2021 </Text>
                <Text style={styles.dateWeek}>Пятница</Text>
              </View>
              <TouchableOpacity style={styles.calendar}>
                <Text style={styles.calendarText}>Календарь</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.boxesContainer}>
              <TouchableOpacity style={styles.box}>
                <Text style={styles.weekBox}>ПН</Text>
                <Text style={styles.dayBox}>28</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box}>
                <Text style={styles.weekBox}>ВТ</Text>
                <Text style={styles.dayBox}>29</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box}>
                <Text style={styles.weekBox}>СР</Text>
                <Text style={styles.dayBox}>30</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box}>
                <Text style={styles.weekBox}>ЧТ</Text>
                <Text style={styles.dayBox}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box2}>
                <Text style={styles.weekBox2}>ПТ</Text>
                <Text style={styles.dayBox2}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box}>
                <Text style={styles.weekBox}>СБ</Text>
                <Text style={styles.dayBox}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box}>
                <Text style={styles.weekBox}>ВС</Text>
                <Text style={styles.dayBox}>4</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.lowerHeader}>
          <Text style={styles.listCaption}>Лист Задач</Text>
          <View style={styles.sortIcons}>
            <TouchableOpacity style={styles.icon}>
              <Icon name="sort" color="white" size={23} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon2}>
              <Icon name="plus" color="white" size={23} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.taskSection}>
            <View style={styles.sideIcons}>
              <Icon name="circle-double" color="#3C6C8F" size={30} />
              <View style={styles.line}></View>
            </View>
            <TouchableOpacity style={styles.taskBox}>
              <View style={styles.boxHeader}>
                <View style={styles.boxCaption}>
                  <Text style={styles.boxMainText}>Дизайн Веб-сайта</Text>
                  <Text style={styles.boxDescription}>
                    Cверстать лэндинг страницу для карго DC
                  </Text>
                </View>
                <View style={styles.clockContainer}>
                  <View style={styles.clock}>
                    <Text style={styles.timeText}>10:00</Text>
                  </View>
                </View>
              </View>
              <View style={styles.boxLower}>
                <View style={styles.personsContainer}>
                  <View style={styles.personCircle}>
                    <Image
                      style={{
                        width: 31,
                        height: 31,
                        borderRadius: 100,
                      }}
                      source={{
                        uri:
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2Cz4tCOQOBgweFlT5OEjSjZCmOMdz3JzGQ&usqp=CAU",
                      }}
                    />
                  </View>
                  <View style={styles.personCircle1}>
                    <Image
                      style={{
                        width: 31,
                        height: 31,
                        borderRadius: 100,
                      }}
                      source={{
                        uri:
                          "data:image/jpeg;base64,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",
                      }}
                    />
                  </View>
                  <View style={styles.personCircle2}>
                    <Text style={styles.peopleMore}>+3</Text>
                  </View>
                </View>
                <View style={styles.projectBox}>
                  <TouchableOpacity style={styles.projectButton}>
                    <Text style={styles.projectName}>DCITY</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.markIcon}>
                  <Icon
                    name="checkbox-marked-circle"
                    color="#3C6C8F"
                    size={35}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
    height: "30%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "blue",
    overflow: "hidden",
  },
  headerMenu: {
    marginTop: "12%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    marginLeft: "6%",
    flexDirection: "column",
  },
  dateContainer: {
    height: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateCaption: {
    color: "#1F4E5F",
    fontSize: 20,
    fontFamily: "Rubik_400Regular",
  },
  dateWeek: {
    paddingLeft: "3%",
    paddingTop: "2%",
    color: "#1F4E5F",
    fontSize: 21,
    fontFamily: "Rubik_700Bold",
  },
  calendar: {
    backgroundColor: "#1F4E5F",
    width: "25%",
    height: "40%",
    marginRight: "5%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarText: {
    color: "white",
    fontSize: 13,
    fontFamily: "Rubik_400Regular",
  },
  boxesContainer: {
    width: "90%",
    alignSelf: "center",
    height: "30%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  box: {
    backgroundColor: "#BCE5E7",
    width: "12%",
    height: "70%",
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#1F4E5F",
  },
  dayBox: {
    color: "#1F4E5F",
    fontSize: 17,
    fontFamily: "Rubik_700Bold",
    marginTop: "3%",
  },
  weekBox: {
    color: "#1F4E5F",
    fontSize: 10,
    fontFamily: "Rubik_500Medium",
  },
  box2: {
    backgroundColor: "#1F4E5F",
    width: "12%",
    height: "70%",
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#1F4E5F",
  },
  dayBox2: {
    color: "white",
    fontSize: 17,
    fontFamily: "Rubik_700Bold",
    marginTop: "3%",
  },
  weekBox2: {
    color: "white",
    fontSize: 10,
    fontFamily: "Rubik_500Medium",
  },
  lowerHeader: {
    height: "6%",
    width: "87%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  listCaption: {
    color: "#1F4E5F",
    fontSize: 18,
    fontFamily: "Rubik_700Bold",
  },
  sortIcons: {
    flexDirection: "row",
    width: "22%",
    justifyContent: "space-between",
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: "#1F4E5F",
    justifyContent: "center",
    alignItems: "center",
  },
  icon2: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: "#FF895D",
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContainer: {
    height: "100%",
    width: "87%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  taskSection: {
    height: "18%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sideIcons: {
    flexDirection: "column",
    width: "10%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "80%",
  },
  line: {
    height: "70%",
    width: 2,
    backgroundColor: "#3C6C8F",
    marginBottom: "3%",
  },

  taskBox: {
    width: "80%",
    backgroundColor: "#D9EFFF",
    height: "80%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  boxHeader: {
    flexDirection: "row",
    backgroundColor: "transparent",
    height: "60%",
    width: "100%",
  },
  boxCaption: {
    flexDirection: "column",
    width: "70%",
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: "5%",
  },
  boxMainText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  boxDescription: {
    color: "#777777",
    fontSize: 11,
    fontFamily: "Rubik_400Regular",
    paddingTop: "2%",
    width: "95%",
  },
  clockContainer: {
    width: "25%",
    justifyContent: "center",
  },
  clock: {
    width: "80%",
    backgroundColor: "#3C6C8F",
    height: "40%",
    alignSelf: "flex-start",
    marginBottom: "20%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    color: "white",
    fontSize: 13,
    fontFamily: "Rubik_700Bold",
  },
  boxLower: {
    height: "40%",
    width: "92%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  personsContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    width: "27%",
  },
  personCircle: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  personCircle1: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  personCircle2: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  projectBox: {
    width: "59%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  markIcon: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  projectButton: {
    width: "80%",
    backgroundColor: "#3C6C8F",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 30,
  },
  peopleMore: {
    color: "#3C6C8F",
    fontSize: 14,
    fontFamily: "Rubik_700Bold",
  },
  projectName: {
    color: "white",
    fontSize: 13,
    fontFamily: "Rubik_500Medium",
  },
});
