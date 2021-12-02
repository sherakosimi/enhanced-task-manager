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

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  useEffect(() => {
    if (
      props.usersFollowingLoaded == props.following.length &&
      props.following.length !== 0
    ) {
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      console.log(props.feed);
      setPosts(props.feed);
    }
    console.log(props.following);

    setRefreshing(false);
  }, [props.usersFollowingLoaded, props.feed]);

  const makeRemoteRequest = () => {
    setRefreshing(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    makeRemoteRequest();
  };
  console.log();
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <LinearGradient
            style={{ height: "100%" }}
            colors={["#8FEDFF", "#8DC2DC", "#DEE9FA"]}
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
            <TouchableOpacity
              style={styles.icon2}
              onPress={() => props.navigation.navigate("CreateTask")}
            >
              <Icon name="plus" color="white" size={23} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lowerContainer}>
          <FlatList
            numColumns={1}
            horizontal={false}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.taskSection}>
                <View style={styles.sideIcons}>
                  <Icon name="circle-double" color="#3C6C8F" size={30} />
                  <View style={styles.line}></View>
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
                      <View style={styles.clock}>
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
                            +{item.participants.length}
                          </Text>
                        </View>
                      )}
                    </View>
                    {item.participants.length == 0 ? (
                      <View style={styles.projectBox2}>
                        <TouchableOpacity style={styles.projectButton}>
                          <Text style={styles.projectName}>
                            {item.taskType}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.projectBox}>
                        <TouchableOpacity style={styles.projectButton}>
                          <Text style={styles.projectName}>
                            {item.taskType}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.markIcon}>
                      <Icon name="check" color="white" size={20} />
                    </View>
                  </View>
                </TouchableOpacity>
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
  line: {
    height: "70%",
    width: 2,
    backgroundColor: "#3C6C8F",
    marginBottom: "3%",
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
  projectButton: {
    width: "85%",
    backgroundColor: "#3C6C8F",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    borderRadius: 30,
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
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});
export default connect(mapStateToProps, null)(Tasks1);
