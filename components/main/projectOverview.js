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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsersData } from "../../redux/actions/index";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";
import CircularProgress from "react-native-circular-progress-indicator";

import { Text } from "react-native-paper";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
var _ = require("lodash");

function projectOverview(props) {
  const [value, setValue] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState("Задачи");
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [commentText, setCommentText] = useState("");
  useEffect(() => {
    function matchUserToComment(comments) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty("user")) {
          continue;
        }
        const user = props.users.find((x) => x.uid === comments[i].creator);
        if (user == undefined) {
          props.fetchUsersData(comments[i].creator, false);
        } else {
          comments[i].user = user;
        }
      }
      setComments(comments);
    }

    if (props.route.params.projectId !== projectId) {
      firebase
        .firestore()
        .collection("projects")
        .doc(props.route.params.projectId)
        .collection("comments")
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          matchUserToComment(comments);
        });
      setProjectId(props.route.params.projectId);
    } else {
      matchUserToComment(comments);
    }
    load();
    setRefreshing(false);
  }, [
    props.route.params.projectId,
    setTasks,
    props.route.params.postId,
    props.users,
  ]);

  async function load() {
    console.log(props.route.params.projectId);
    const ref = firebase.firestore().collection("ProjectPosts");
    ref
      .where("projectID", "==", props.route.params.projectId)
      .get()
      .then((snapshot) => {
        let projects1 = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(doc.data());
          getPosts(doc.data().creator, doc.data().postID);
          const id = doc.id;
        });
      });
  }

  async function getPosts(userID, postID) {
    setTasks([]);
    const ref = firebase
      .firestore()
      .collection("posts")
      .doc(userID)
      .collection("userPosts");
    ref
      .where("id", "==", postID)
      .get()
      .then((snapshot) => {
        let tasks1 = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          console.log(doc.data());
          return { id, ...data };
        });
        setTasks((tasks) => [...tasks, tasks1[0]]);
      });
  }

  const onCommentSend = () => {
    firebase
      .firestore()
      .collection("projects")
      .doc(props.route.params.projectId)
      .collection("comments")
      .add({
        creator: firebase.auth().currentUser.uid,
        commentText,
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    makeRemoteRequest();
  };

  const makeRemoteRequest = () => {
    load();
    setRefreshing(false);
  };

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  const listTab = [
    {
      status: "Задачи",
    },
    {
      status: "Файлы",
    },
    {
      status: "Комментарии",
    },
  ];

  const setStatusFilter = (status) => {
    console.log(status);
    setStatus(status);
  };
  console.log(props.route.params.projectId);
  console.log(_.uniqBy(tasks, "id"));
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LinearGradient
          style={{ height: "100%", flex: 1 }}
          colors={[
            "#C2F1FA",
            "rgba(217, 242, 255, 0.53125)",
            "rgba(228, 237, 251, 0.73)",
          ]}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
              <View style={styles.headerContainer1}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Projects")}
                >
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
                <Text style={styles.caption}>{props.route.params.caption}</Text>
                <Text style={styles.description}>
                  {props.route.params.description}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                  <View style={{ paddingTop: 20 }}>
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
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.teamCaption}>Команда</Text>
                    <View style={{ flexDirection: "row", height: 60 }}>
                      <FlatList
                        numColumns={6}
                        horizontal={false}
                        data={_.uniqBy(props.route.params.participants, "id")}
                        renderItem={({ item }) => (
                          <View style={styles.personCircle}>
                            {item.url == "" ? (
                              <Image
                                style={{
                                  width: 29,
                                  height: 29,
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
                                  width: 30,
                                  height: 30,
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
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: 20,
                    marginTop: -10,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#E0FFE7",
                      borderRadius: 15,
                      height: 35,
                      marginTop: 22,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.textID}>
                      ID: {props.route.params.projectId}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 75,
                      backgroundColor: "white",
                      borderRadius: 15,
                      height: 35,
                      marginTop: 22,
                      borderWidth: 0.5,
                      borderColor: "#C7C7C7",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={handleRefresh}
                  >
                    <Text style={styles.textReady}>Готово</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "80%",
                marginTop: 20,
                borderRadius: 10,
                height: 50,
                backgroundColor: "white",
                alignSelf: "center",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {listTab.map((e) => (
                <TouchableOpacity
                  style={[styles.tab, status === e.status && styles.tabActive]}
                  onPress={() => setStatusFilter(e.status)}
                >
                  <Text
                    style={[
                      styles.textTab2,
                      status === e.status && styles.textTab1,
                    ]}
                  >
                    {e.status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                flex: 1,
                width: "90%",
                marginTop: 25,
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                {status == "Задачи" ? (
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.addTaskCaption}>Добавить задачу</Text>
                      <View
                        style={{
                          height: 25,
                          width: 25,
                          borderRadius: 100,
                          backgroundColor: "#FF895D",
                          marginLeft: 10,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Icon name="plus" color="white" size={18} />
                      </View>
                    </View>

                    <FlatList
                      numColumns={1}
                      horizontal={false}
                      data={_.uniqBy(tasks, "id")}
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={{
                            width: "100%",
                            height: 52,
                            backgroundColor: "white",
                            marginTop: 15,
                            borderRadius: 10,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            props.navigation.navigate("Comment", {
                              postId: item.id,
                              uid: item.user.id,
                              participants: item.participants,
                              caption: item.caption,
                              description: item.description,
                            })
                          }
                        >
                          <View
                            style={{
                              width: "15%",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                borderRadius: 5,
                                height: 25,
                                width: 25,
                                borderWidth: 1,
                                borderColor: "#C4C4C4",
                              }}
                            ></View>
                          </View>
                          <View style={{ width: "60%" }}>
                            <Text style={styles.taskCaptionText}>
                              {item.caption}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              width: "15%",
                            }}
                          >
                            <FlatList
                              numColumns={1}
                              horizontal={false}
                              data={item.participants.slice(0, 1)}
                              renderItem={({ item }) => (
                                <View style={styles.personCircleMini}>
                                  {item.url == "" ? (
                                    <Image
                                      style={{
                                        width: 21,
                                        height: 21,
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
                                        width: 21,
                                        height: 21,
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
                            {/* {item.participants.length == 0 ? (
                          <View style={styles.personCircleMini}>
                            <Text style={styles.peopleMore}>
                              +{item.participants.length}
                            </Text>
                          </View>
                        ) : null} */}
                          </View>
                          <View
                            style={{
                              transform: [{ rotateY: "180deg" }],
                              width: "10%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Icon
                              name="chevron-left"
                              color="#1F4E5F"
                              size={30}
                            />
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                ) : null}
                {status == "Комментарии" ? (
                  <View style={{ flex: 1 }}>
                    <FlatList
                      numColumns={1}
                      horizontal={false}
                      data={_.uniqBy(comments, "id")}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            flexDirection: "column",
                            width: "94%",
                            marginTop: 20,
                            alignSelf: "center",
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.imageContainer}>
                              <Image
                                style={styles.image}
                                source={{
                                  uri:
                                    "data:image/jpeg;base64,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",
                                }}
                              />
                            </View>
                            <View
                              style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                marginLeft: 10,
                              }}
                            >
                              {item.user !== undefined ? (
                                <Text style={styles.textName}>
                                  {item.user.name}
                                </Text>
                              ) : null}
                              {item.user !== undefined ? (
                                <Text style={styles.textUsername}>
                                  @{item.user.username}
                                </Text>
                              ) : null}
                            </View>
                          </View>
                          <Text style={styles.textComment}>
                            {item.commentText}
                          </Text>
                        </View>
                      )}
                    />

                    <View
                      style={{
                        height: 150,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <View style={styles.input}>
                        <View
                          style={{
                            marginLeft: 8,
                            width: "84%",
                          }}
                        >
                          <TextInput
                            multiline={true}
                            style={styles.textHolder}
                            placeholder="Комментировать..."
                            onChangeText={(commentText) =>
                              setCommentText(commentText)
                            }
                          />
                        </View>
                        <TouchableOpacity
                          style={{
                            height: 40,
                            width: 40,
                            backgroundColor: "#1F4E5F",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 100,
                          }}
                          onPress={() => onCommentSend()}
                        >
                          <Icon
                            name="send"
                            color="white"
                            size={22}
                            style={{
                              transform: [{ rotate: "-40deg" }],
                              marginBottom: 3,
                              marginLeft: 4,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
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
    width: 35,
    height: 35,
    borderRadius: 100,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  personCircleMini: {
    backgroundColor: "#1F4E5F",
    width: 25,
    height: 25,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textID: {
    color: "#61C877",
    padding: 10,
    fontSize: 13,
    fontFamily: "Rubik_500Medium",
  },
  textReady: {
    color: "#777777",
    padding: 10,
    fontSize: 13,
    fontFamily: "Rubik_500Medium",
  },
  tab: {
    width: "30%",
    borderRadius: 10,
    height: 40,
    backgroundColor: "white",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    width: "30%",
    borderRadius: 10,
    height: 40,
    backgroundColor: "#1F4E5F",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textTab1: {
    color: "white",
    fontSize: 12,
    fontFamily: "Rubik_700Bold",
  },
  textTab2: {
    color: "#1F4E5F",
    fontSize: 12,
    fontFamily: "Rubik_700Bold",
  },
  addTaskCaption: {
    color: "#1F4E5F",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  taskCaptionText: {
    color: "#1F4E5F",
    fontSize: 14,
    fontFamily: "Rubik_500Medium",
  },
  imageContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#1F4E5F",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 100,
    width: 36,
    height: 36,
  },
  textName: {
    color: "#1F4E5F",
    fontSize: 14,
    fontFamily: "Rubik_500Medium",
  },
  textUsername: {
    color: "#7C969F",
    fontSize: 12,
    fontFamily: "Rubik_400Regular",
    marginTop: 2,
  },
  textComment: {
    color: "black",
    fontSize: 14,
    fontFamily: "Rubik_400Regular",
    marginLeft: 59,
    marginTop: 10,
  },
  createButton: {
    fontSize: 18,
    fontFamily: "Rubik_500Medium",
    color: "white",
  },
  input: {
    borderColor: "#7C969F",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
    width: "100%",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
  },
  textHolder: {
    width: "100%",
    fontSize: 14,
    marginBottom: 3,
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
const mapDispatchProps = (dispatch, getState) =>
  bindActionCreators({ fetchUsersData }, dispatch, getState);

export default connect(mapStateToProps, mapDispatchProps)(projectOverview);
