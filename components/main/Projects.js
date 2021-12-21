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
import { bindActionCreators } from "redux";
import {
  fetchUsersData,
  fetchUserPosts,
  fetchUserFollowing,
  fetchUsersFollowingPosts,
  clearData,
  fetchUserProjects,
} from "../../redux/actions/index";
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
var _ = require("lodash");

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
    load();

    setRefreshing(false);
  }, [props.projects]);

  async function load() {
    const ref = firebase.firestore().collection("ProjectUsers");
    ref
      .where("userID", "==", firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        let projects1 = snapshot.docs.map((doc) => {
          for (let i = 0; i < props.projects.length; i++) {
            if (doc.data().projectID == props.projects[i].projectID) {
              setProjects((projects) => [...projects, props.projects[i]]);
            }
          }
        });
      });
  }

  const handleRefresh = () => {
    setRefreshing(true);
    makeRemoteRequest();
  };

  const makeRemoteRequest = () => {
    props.clearData();
    props.fetchUserProjects();
    setRefreshing(false);
  };
  console.log(projects);
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ height: "100%", backgroundColor: "white" }}>
          <View style={styles.headerContainer}>
            <View style={styles.headerContainer1}>
              <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Icon name="menu" color="#FCA311" size={30} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Проекты</Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("createProject");
                }}
              >
                <Icon name="plus" color="#FCA311" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.searchBar}>
            <Icon
              style={{ marginLeft: 10 }}
              name="magnify"
              color="#CACACA"
              size={22}
            />
            <TextInput
              style={styles.input}
              placeholder="Поиск Проектов"
              placeholderTextColor="#CACACA"
            />
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <View style={styles.listContainer}>
              <FlatList
                numColumns={1}
                horizontal={false}
                data={_.uniqBy(projects, "id")}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("projectOverview", {
                        projectId: item.id,
                        uid: item.user.id,
                        participants: item.participants,
                        caption: item.caption,
                        description: item.description,
                      })
                    }
                    style={{
                      backgroundColor: "#FFD897",
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
                            <Text numberOfLines={2} style={styles.description}>
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
                                      width: 24.4,
                                      height: 24.4,
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
                        {/* <View style={styles.date}>
                          <Icon
                            name="calendar-range"
                            color="#1F4E5F"
                            size={17}
                          />
                          <Text style={styles.dataRange}>17 Октября, 2021</Text>
                        </View> */}
                      </View>
                      <View style={styles.secondHalf}>
                        <View style={styles.circleBar}>
                          <CircularProgress
                            radius={60}
                            value={8}
                            textColor="#1F4E5F"
                            fontSize={17}
                            valueSuffix={"%"}
                            inActiveStrokeColor={"#61C877"}
                            inActiveStrokeOpacity={0.2}
                            inActiveStrokeWidth={6}
                            duration={3000}
                            //onAnimationComplete={() => setValue(2)}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={{ width: "85%" }}>
                      <View
                        style={{
                          alignSelf: "flex-start",
                          width: "90%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={styles.date}>
                          <Icon
                            name="calendar-range"
                            color="#1F4E5F"
                            size={17}
                          />
                          <Text style={styles.dataRange}>17 Октября, 2021</Text>
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
        </View>
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
    backgroundColor: "#14213D",
    justifyContent: "center",
    flexDirection: "column",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: "#FCA311",
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
    borderWidth: 1,
    borderColor: "#CACACA",
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
    // backgroundColor: "pink",
    height: "75%",
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
  },
  firsthalf: {
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
    fontSize: 10,
    fontFamily: "Rubik_400Regular",
    paddingTop: 5,
    lineHeight: 15,
  },

  teamCaption: {
    paddingTop: 9,
    color: "#1F4E5F",
    fontSize: 10,
    fontFamily: "Rubik_500Medium",
  },
  personsContainer: {
    marginLeft: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",

    marginTop: 3,
    height: 35,
  },
  personCircle: {
    backgroundColor: "#3C6C8F",
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  date: {
    flexDirection: "row",
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
  users: store.usersState.users,
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  projects: store.userState.projects,
  feed: store.usersState.feed,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      clearData,
      fetchUsersData,
      fetchUserPosts,
      fetchUserFollowing,
      fetchUsersFollowingPosts,
      fetchUserProjects,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Projects);
