import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";
require("firebase/firestore");
import { connect } from "react-redux";
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

function ProfilePage(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  useEffect(() => {
    const { currentUser, posts } = props;

    console.log(firebase.auth().currentUser.uid);
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("does not exist");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }

    if (props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({
        id: props.route.params.uid,
        email: user.email,
        name: user.name,
        username: user.username,
      });
  };
  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
  };

  console.log(props.route);
  console.log(userPosts);
  const onLogout = () => {
    firebase.auth().signOut();
  };

  if (user === null) {
    return <View />;
  }
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
              <TouchableOpacity onPress={() => props.navigation.popToTop()}>
                <Icon name="chevron-left" color="#1F4E5F" size={35} />
              </TouchableOpacity>
            </View>
            <View style={styles.photoText}>
              <View>
                <Text style={styles.taskTitle}>19</Text>
                <Text style={styles.taskCaption}>Завершенных Задач</Text>
              </View>
              <Avatar.Image
                source={{
                  uri:
                    "https://www.meme-arsenal.com/memes/d701774e6840211ad6c99153e34481c6.jpg",
                }}
                size={100}
              />
              <View>
                <Text style={styles.taskTitle}>24</Text>
                <Text style={styles.taskCaption}>Текущих Задач</Text>
              </View>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.username}>
                @{user.username.toLowerCase()}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                <View>
                  {following ? (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => onUnfollow()}
                    >
                      <Text style={styles.buttonCaption}>В друзьях</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => onFollow()}
                    >
                      <Text style={styles.buttonCaption}>Добавить</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonCaption}>Профиль</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <FlatList
            numColumns={1}
            horizontal={false}
            data={userPosts}
            renderItem={({ item }) => (
              <View style={styles.posts}>
                <Image
                  style={{ width: "100%", height: 200 }}
                  source={{
                    uri: item.downloadURL,
                  }}
                />
              </View>
            )}
          />
        </LinearGradient>
      </View>
      // <View style={styles.container}>
      //   <View style={styles.containerInfo}>
      //     <Text>{user.username}</Text>
      //     <Text>{user.email}</Text>

      //     {props.route.params.uid !== firebase.auth().currentUser.uid ? (
      //       <View>
      //         {following ? (
      //           <Button title="Following" onPress={() => onUnfollow()} />
      //         ) : (
      //           <Button title="Follow" onPress={() => onFollow()} />
      //         )}
      //       </View>
      //     ) : (
      //       <Button title="Logout" onPress={() => onLogout()} />
      //     )}
      //   </View>

      //   <View style={styles.containerGallery}>
      //     <FlatList
      //       numColumns={3}
      //       horizontal={false}
      //       data={userPosts}
      //       renderItem={({ item }) => (
      //         <View style={styles.containerImage}>
      //           <Image
      //             style={styles.image}
      //             source={{ uri: item.downloadURL }}
      //           />
      //         </View>
      //       )}
      //     />
      //   </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer1: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "87%",
    marginLeft: "1%",
    marginTop: "5%",
  },
  headerContainer: {
    height: 350,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    flexDirection: "column",
  },
  photoText: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: "7%",
  },
  taskTitle: {
    color: "#1F4E5F",
    fontSize: 17,
    fontFamily: "Rubik_500Medium",
    textAlign: "center",
  },
  taskCaption: {
    paddingTop: 7,
    width: 80,
    textAlign: "center",
    color: "#7C969F",
    fontSize: 11,
    fontFamily: "Rubik_400Regular",
  },

  nameContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    color: "#1F4E5F",
    fontSize: 22,
    fontFamily: "Rubik_500Medium",
    textAlign: "center",
  },
  username: {
    textAlign: "center",
    color: "#7C969F",
    fontSize: 14,
    fontFamily: "Rubik_400Regular",
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1F4E5F",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  buttonCaption: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Rubik_500Medium",
  },
  posts: {
    width: "87%",
    backgroundColor: "gray",
    alignSelf: "center",
    marginTop: 25,
    alignItems: "center",
  },
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});
export default connect(mapStateToProps, null)(ProfilePage);
