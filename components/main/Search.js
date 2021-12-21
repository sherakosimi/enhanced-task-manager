import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
  ScrollView,
  FlatList,
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
require("firebase/firestore");

export default function Search(props) {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("username", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          console.log(doc.data());
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
        console.log(users);
      });
  };

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });
  console.log(firebase.auth().currentUser.uid);
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
                <Icon name="chevron-left" color="#1F4E5F" size={30} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Добавить Друга</Text>
              <Icon name="account-plus-outline" color="transparent" size={30} />
            </View>
          </View>
          <View style={styles.searchBar}>
            <Icon
              style={{ marginLeft: 10 }}
              name="magnify"
              color="#A9A9A9"
              size={22}
            />
            <TextInput
              style={styles.input}
              onChangeText={(search) => fetchUsers(search)}
              placeholder="Поиск Людей"
            />
          </View>
          <View style={styles.flatlist}>
            <FlatList
              numColumns={1}
              horizontal={false}
              data={users}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.friendBox2}
                  onPress={() =>
                    props.navigation.navigate("Profile Page", {
                      uid: item.id,
                    })
                  }
                >
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{
                        uri:
                          "https://www.meme-arsenal.com/memes/d701774e6840211ad6c99153e34481c6.jpg",
                      }}
                    />
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.username}>{item.username}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("Profile Page", {
                        uid: item.id,
                      })
                    }
                    style={{ right: 0, position: "absolute", paddingRight: 15 }}
                  >
                    <Icon
                      name="account-plus-outline"
                      color="#1F4E5F"
                      size={24}
                    />
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("Profile Page", {
                        uid: item.id,
                      })
                    }
                  >
                    <Text> {item.name}</Text>
                  </TouchableOpacity> */}
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
  flatlist: {
    marginTop: 10,
    width: "90%",
    flexDirection: "column",
    alignSelf: "center",
  },
  user: {
    height: 20,
    backgroundColor: "gray",
  },
  friendBox2: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 3,
    borderColor: "#4E6E79",
    borderWidth: 0.3,
  },
  imageContainer: {
    marginLeft: 15,
    height: 35,
    width: 35,
    backgroundColor: "#1F4E5F",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 8,
    width: 30,
    height: 30,
  },
  userInfo: {
    height: 40,
    justifyContent: "space-between",
    marginLeft: 20,
    flexDirection: "column",
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
