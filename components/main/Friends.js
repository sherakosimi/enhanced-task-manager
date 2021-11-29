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
import { Text } from "react-native-paper";
import { connect } from "react-redux";

function Friends(props) {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  useEffect(() => {
    const { currentUser, following } = props;

    console.log(firebase.auth().currentUser.uid);
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      firebase
        .firestore()
        .collection("following")
        .doc(props.route.params.uid)
        .collection("userFollowing")
        .get()
        .then((snapshot) => {
          let following = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setFollowing(following);
        });
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
        .collection("following")
        .doc(props.route.params.uid)
        .collection("userFollowing")
        .get()
        .then((snapshot) => {
          let following = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setFollowing(following);
        });
    }
  }, [props.route.params.uid, props.following]);

  const onUnfollow = (id) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(id)
      .delete();
  };

  console.log(firebase.auth().currentUser.uid);
  console.log(following);
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
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Search");
                }}
              >
                <Icon name="account-plus-outline" color="#1F4E5F" size={30} />
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
            <TextInput style={styles.input} placeholder="Поиск Друзей" />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              numColumns={1}
              horizontal={false}
              data={following}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.friendBox2}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.urlImage,
                      }}
                    />
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.username}>{item.username}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => onUnfollow(item.id)}
                    style={{ marginLeft: "5%" }}
                  >
                    <Icon name="delete-outline" color="#1F4E5F" size={24} />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
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
    width: "90%",
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
    flexDirection: "column",
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
  },
  friendBox2: {
    backgroundColor: "white",
    height: 72,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 15,
  },
  imageContainer: {
    marginLeft: 15,
    height: 50,
    width: 50,
    backgroundColor: "#1F4E5F",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 10,
    width: 46,
    height: 46,
  },
  userInfo: {
    height: 40,
    justifyContent: "space-between",
    marginLeft: 20,
    flexDirection: "column",
    width: "55%",
  },
  name: {
    color: "#1F4E5F",
    fontSize: 16,
    fontFamily: "Rubik_700Bold",
  },
  username: {
    color: "#4E6E79",
    fontSize: 14,
    fontFamily: "Rubik_400Regular",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});
export default connect(mapStateToProps, null)(Friends);
