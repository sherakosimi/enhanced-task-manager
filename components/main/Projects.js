import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
  ScrollView,
  SnapshotViewIOSComponent,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";
import { collection, query, where } from "firebase/firestore";
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
import CircularProgress from "react-native-circular-progress-indicator";
import { connect } from "react-redux";

function Projects(props) {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [tempProjects, setTempProjects] = useState([]);

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  useEffect(() => {
    setProjects([]);
    console.log(projects);
    const ref = firebase.firestore().collection("ProjectUsers");
    ref
      .where("userID", "==", firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        let projects1 = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(doc.data().projectID);
          for (let i = 0; i < props.projects.length; i++) {
            if (doc.data().projectID == props.projects[i].projectID) {
              setProjects((projects) => [...projects, props.projects[i]]);
            }
          }
          const id = doc.id;
          return { id, ...data };
        });
      });
    setRefreshing(false);
  }, []);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    makeRemoteRequest();
  };

  const makeRemoteRequest = () => {
    setProjects([]);

    firebase
      .firestore()
      .collection("projects")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let projects = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          console.log(data);
          return { id, ...data };
        });
        setTempProjects(projects);
      });

    const ref = firebase.firestore().collection("ProjectUsers");
    ref
      .where("userID", "==", firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        let projects1 = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(doc.data().projectID);
          for (let i = 0; i < tempProjects.length; i++) {
            if (doc.data().projectID == tempProjects[i].projectID) {
              setProjects((projects) => [...projects, tempProjects[i]]);
            }
          }
          const id = doc.id;
          return { id, ...data };
        });
      });
    setRefreshing(false);
  };
  console.log(projects);
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
              <Text style={styles.headerText}>Проекты</Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Search");
                }}
              >
                <Icon name="dots-vertical" color="#1F4E5F" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.searchBar}>
            <Icon
              style={{ marginLeft: 10 }}
              name="magnify"
              color="#A9A9A9"
              size={22}
            />
            <TextInput style={styles.input} placeholder="Поиск Проектов" />
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <View style={styles.listContainer}>
              <FlatList
                numColumns={1}
                horizontal={false}
                data={projects}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 183,
                      borderRadius: 15,
                      marginTop: 15,
                      alignItems: "center",
                      justifyContent: "center",
                      borderBottomWidth: 11,
                      borderColor: `${item.color}`,
                    }}
                  >
                    <View style={styles.boxContainer}>
                      <View style={styles.firsthalf}>
                        <View style={styles.textContainer}>
                          {item.caption !== undefined ? (
                            <Text style={styles.caption}>{item.caption}</Text>
                          ) : null}
                          {item.description !== undefined ? (
                            <Text style={styles.description}>
                              {item.description}
                            </Text>
                          ) : null}
                        </View>
                        <Text style={styles.teamCaption}>Команда</Text>
                        <View style={styles.personsContainer}>
                          <FlatList
                            numColumns={3}
                            horizontal={false}
                            data={item.participants.slice(0, 2)}
                            renderItem={({ item }) => (
                              <View style={styles.personCircle}>
                                {item.url == "" ? (
                                  <Image
                                    style={{
                                      width: 29.4,
                                      height: 29.4,
                                      borderRadius: 100,
                                    }}
                                    source={{
                                      uri:
                                        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg",
                                    }}
                                  />
                                ) : (
                                  <Image
                                    style={{
                                      width: 29.4,
                                      height: 29.4,
                                      borderRadius: 100,
                                    }}
                                    source={{
                                      uri: item.url,
                                    }}
                                  />
                                )}
                              </View>
                            )}
                          />
                          {item.participants.length <= 2 ? (
                            <View style={styles.personCircle}>
                              <Icon name="plus" color="white" size={18} />
                            </View>
                          ) : (
                            <View style={styles.personCircle}>
                              <Text style={styles.peopleMore}>
                                +{item.participants.length - 2}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.date}>
                          <Icon
                            name="calendar-range"
                            color="#1F4E5F"
                            size={17}
                          />
                          <Text style={styles.dataRange}>17 Октября, 2021</Text>
                        </View>
                      </View>
                      <View style={styles.secondHalf}>
                        <View style={styles.circleBar}>
                          <CircularProgress
                            radius={57}
                            value={8}
                            textColor="#1F4E5F"
                            fontSize={17}
                            valueSuffix={"%"}
                            inActiveStrokeColor={"#61C877"}
                            inActiveStrokeOpacity={0.2}
                            inActiveStrokeWidth={6}
                            duration={3000}
                            onAnimationComplete={() => setValue(50)}
                          />
                        </View>
                        <View style={styles.taskContainer}>
                          <Icon
                            name="checkbox-marked-outline"
                            color="#1F4E5F"
                            size={17}
                          />
                          <Text style={styles.taskRange}>12 Задач</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
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
  searchBar: {
    width: "85%",
    alignSelf: "center",
    height: 40,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    textAlign: "center",
    width: "85%",
    height: 30,
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 2,
    width: "85%",
    alignSelf: "center",
  },
  projectBox: {
    backgroundColor: "white",
    height: 183,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 11,
    borderColor: "#3C6C8F",
  },
  projectBox2: {
    backgroundColor: "white",
    height: 183,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 11,
    borderColor: "#EF6D5E",
    marginTop: 15,
  },
  boxContainer: {
    marginTop: 2,
    height: "85%",
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
  },
  firsthalf: {
    backgroundColor: "transparent",
    height: "100%",
    width: "50%",
    flexDirection: "column",
  },
  textContainer: {
    backgroundColor: "transparent",
  },
  caption: {
    color: "#1F4E5F",
    fontSize: 20,
    fontFamily: "Rubik_500Medium",
  },
  description: {
    color: "#4E6E79",
    fontSize: 12,
    fontFamily: "Rubik_400Regular",
    paddingTop: 5,
  },

  teamCaption: {
    paddingTop: 20,
    paddingLeft: 6,
    color: "#1F4E5F",
    fontSize: 12,
    fontFamily: "Rubik_500Medium",
  },
  personsContainer: {
    marginLeft: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",

    marginTop: 6,
    height: 35,
  },
  personCircle: {
    backgroundColor: "#3C6C8F",
    width: 35,
    height: 35,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  personCircle1: {
    backgroundColor: "#3C6C8F",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  personCircle2: {
    backgroundColor: "#3C6C8F",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  personCircle3: {
    backgroundColor: "#FF895D",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    marginLeft: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  personCircle4: {
    backgroundColor: "#FF895D",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    marginLeft: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    flexDirection: "row",
    marginLeft: 6,
    marginTop: 10,
  },
  dataRange: {
    marginLeft: 6,
    marginTop: 1,
    color: "#4E6E79",
    fontSize: 12,
    fontFamily: "Rubik_400Regular",
  },
  secondHalf: {
    width: "50%",
    backgroundColor: "transparent",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  circleBar: {
    paddingBottom: 5,
  },
  taskContainer: {
    flexDirection: "row",
    marginLeft: 6,
    marginTop: 9,
  },
  taskRange: {
    marginLeft: 6,
    marginTop: 1,
    color: "#4E6E79",
    fontSize: 12,
    fontFamily: "Rubik_400Regular",
  },
  peopleMore: {
    color: "white",
    fontSize: 14,
    fontFamily: "Rubik_700Bold",
  },
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  projects: store.userState.projects,
  feed: store.usersState.feed,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});
export default connect(mapStateToProps, null)(Projects);
