import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import {
  fetchUsersData,
  fetchUserPosts,
  fetchUserFollowing,
  fetchUsersFollowingPosts,
  clearData,
} from "../../redux/actions/index";
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
import { connect } from "react-redux";

function Tasks1(props) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postTest, setPostTest] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  var _ = require("lodash");
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  useEffect(() => {
    setPosts([]);
    console.log(props.feed.length);
    load();
    setRefreshing(false);
  }, [props.usersFollowingLoaded, props.feed]);

  async function load() {
    if (
      props.usersFollowingLoaded == props.following.length &&
      props.following.length !== 0
    ) {
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });

      for (let i = 0; i < props.feed.length; i++) {
        for (let f = 0; f < props.feed[i].participants.length; f++) {
          if (
            firebase.auth().currentUser.uid == props.feed[i].participants[f].id
          )
            setPosts((posts) => [...posts, props.feed[i]]);
        }
      }

      for (let i = 0; i < props.posts.length; i++) {
        setPosts((posts) => [...posts, props.posts[i]]);
      }
    }
  }
  const makeRemoteRequest = () => {
    props.clearData();
    props.fetchUserPosts();
    props.fetchUserFollowing();
    setRefreshing(false);
  };

  const taskDone = (id, userID) => {
    console.log("go");
    firebase
      .firestore()
      .collection("posts")
      .doc(userID)
      .collection("userPosts")
      .doc(id)
      .update({
        done: true,
      });
    setPosts(posts.filter((item) => item.id !== id));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    makeRemoteRequest();
  };
  console.log(posts);
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ height: "100%", backgroundColor: "#14213D" }}>
            <View style={styles.headerMenu}>
              <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Icon name="menu" color="#FCA311" size={30} />
              </TouchableOpacity>
              <View style={styles.sortIcons}>
                <TouchableOpacity style={styles.icon} onPress={handleRefresh}>
                  <Icon name="sort" color="#FCA311" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon2}
                  onPress={() => props.navigation.navigate("CreateTask")}
                >
                  <Icon name="plus" color="#FCA311" size={25} />
                </TouchableOpacity>
              </View>
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
          </View>
        </View>

        <View style={styles.lowerContainer}>
          <FlatList
            numColumns={1}
            horizontal={false}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            data={_.uniqBy(posts, "id")}
            renderItem={({ item }) => (
              <View>
                {!item.done ? (
                  <View style={styles.taskSection}>
                    <View style={styles.sideIcons}>
                      <Icon name="circle-double" color="#3C6C8F" size={30} />
                      <View
                        style={{
                          height: "70%",
                          width: 2,
                          backgroundColor: "#3C6C8F",
                          marginBottom: "3%",
                        }}
                      ></View>
                    </View>
                    <TouchableOpacity
                      style={styles.taskBox}
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
                      <View style={styles.boxHeader}>
                        <View style={styles.boxCaption}>
                          <Text style={styles.boxMainText}>{item.caption}</Text>
                          <Text style={styles.boxDescription}>
                            {item.description}
                          </Text>
                        </View>
                        <View style={styles.clockContainer}>
                          <View
                            style={{
                              width: "80%",
                              backgroundColor: "#3C6C8F",
                              height: "40%",
                              alignSelf: "flex-start",
                              marginBottom: "20%",
                              borderRadius: 30,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text style={styles.timeText}>{item.time}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.boxLower}>
                        <View style={styles.personsContainer}>
                          <FlatList
                            numColumns={3}
                            horizontal={false}
                            data={item.participants.slice(0, 1)}
                            renderItem={({ item }) => (
                              <View style={styles.personCircle}>
                                {item.url == "" ? (
                                  <Image
                                    style={{
                                      width: 26,
                                      height: 26,
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
                                      width: 26,
                                      height: 26,
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
                          {item.participants.length == 0 ? null : (
                            <View style={styles.personCircle}>
                              <Text style={styles.peopleMore}>
                                +{item.participants.length - 1}
                              </Text>
                            </View>
                          )}
                        </View>
                        {item.participants.length == 0 ? (
                          <View style={styles.projectBox2}>
                            <TouchableOpacity
                              style={{
                                width: "85%",
                                backgroundColor: item.color,
                                alignItems: "center",
                                justifyContent: "center",
                                height: 30,
                                borderRadius: 30,
                              }}
                            >
                              <Text style={styles.projectName}>
                                {item.project}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View style={styles.projectBox}>
                            <TouchableOpacity
                              style={{
                                width: "85%",
                                backgroundColor: item.color,
                                alignItems: "center",
                                justifyContent: "center",
                                height: 30,
                                borderRadius: 30,
                              }}
                            >
                              <Text style={styles.projectName}>
                                {item.project}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                        <TouchableOpacity
                          onPress={() => taskDone(item.id, item.creator)}
                          style={styles.markIcon}
                        >
                          <Icon name="check" color="white" size={20} />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
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
    width: "88%",
    alignSelf: "center",
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
    color: "white",
    fontSize: 20,
    fontFamily: "Rubik_400Regular",
  },
  dateWeek: {
    paddingLeft: "3%",
    paddingTop: "2%",
    color: "white",
    fontSize: 21,
    fontFamily: "Rubik_700Bold",
  },
  calendar: {
    backgroundColor: "white",
    width: "25%",
    height: "40%",
    marginRight: "5%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarText: {
    color: "#14213D",
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
    backgroundColor: "#FCA311",
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
    color: "white",
    fontSize: 17,
    fontFamily: "Rubik_700Bold",
    marginTop: "3%",
  },
  weekBox: {
    color: "white",
    fontSize: 10,
    fontFamily: "Rubik_500Medium",
  },
  box2: {
    backgroundColor: "white",
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
    color: "#FCA311",
    fontSize: 17,
    fontFamily: "Rubik_700Bold",
    marginTop: "3%",
  },
  weekBox2: {
    color: "#FCA311",
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
    width: "18%",
    justifyContent: "space-between",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  icon2: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 11,
    width: "87%",
    alignSelf: "center",
    backgroundColor: "#FAFAFA",
  },
  listContainer: {
    flexDirection: "column",
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
  },
  taskSection: {
    height: 160,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sideIcons: {
    flexDirection: "column",
    width: 30,
    justifyContent: "space-between",
    alignItems: "center",
    height: 120,
  },

  taskBox: {
    width: "85%",
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
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 35,
  },
  personCircle: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    borderRadius: 100,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  projectBox: {
    width: "59%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  projectBox2: {
    width: "70%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  markIcon: {
    borderRadius: 100,
    backgroundColor: "#3C6C8F",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  peopleMore: {
    color: "#3C6C8F",
    fontSize: 14,
    fontFamily: "Rubik_700Bold",
  },
  projectName: {
    color: "white",
    fontSize: 12,
    fontFamily: "Rubik_500Medium",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  feed: store.usersState.feed,
  posts: store.userState.posts,
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Tasks1);
