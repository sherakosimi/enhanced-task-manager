import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
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

export function DrawerContent(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data().name);
          setUsername(snapshot.data().username);
        } else {
          console.log("does not exist");
        }
      });
  });
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  const onLogout = () => {
    firebase.auth().signOut();
  };

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <LinearGradient
              style={styles.headerContent}
              colors={[
                "rgba(194, 241, 250, 1)",
                "rgba(141, 194, 220, 0.510417)",
                "rgba(134, 179, 248, 0.01)",
              ]}
            >
              <View style={styles.userInfoSection}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    props.navigation.navigate("Profile Page", {
                      uid: firebase.auth().currentUser.uid,
                    });
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      width: 60,
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#1F4E5F",
                    }}
                  >
                    <Avatar.Image
                      source={{
                        uri:
                          "https://www.meme-arsenal.com/memes/d701774e6840211ad6c99153e34481c6.jpg",
                      }}
                      size={55}
                    />
                  </View>
                  <View style={{ marginLeft: 15, flexDirection: "column" }}>
                    <Title style={styles.title}>{name} </Title>
                    <Caption style={styles.caption}>
                      @{username.toLowerCase()}
                    </Caption>
                  </View>
                </TouchableOpacity>
              </View>
            </LinearGradient>
            <View style={styles.menuContainer}>
              <Drawer.Section styles={styles.drawerSection}>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon
                      name="format-list-bulleted-square"
                      color="#1F4E5F"
                      size={size}
                    />
                  )}
                  label={({ color, size }) => (
                    <Text style={styles.labelCaption}>Задачи</Text>
                  )}
                  onPress={() => {
                    props.navigation.navigate("Profile");
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="email-outline" color="#1F4E5F" size={size} />
                  )}
                  label={({ color, size }) => (
                    <Text style={styles.labelCaption}>Сообщения</Text>
                  )}
                  onPress={() => {
                    props.navigation.navigate("Tasks");
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon
                      name="account-multiple-outline"
                      color="#1F4E5F"
                      size={size}
                    />
                  )}
                  label={({ color, size }) => (
                    <Text style={styles.labelCaption}>Друзья</Text>
                  )}
                  onPress={() => {
                    props.navigation.navigate("Friends", {
                      uid: firebase.auth().currentUser.uid,
                    });
                  }}
                />
              </Drawer.Section>
            </View>
            <Drawer.Section title="Бизнес">
              <DrawerItem
                icon={({ color, size }) => (
                  <Avatar.Image
                    source={{
                      uri:
                        "https://us.123rf.com/450wm/billah9/billah92004/billah9200400557/144333442-d-c-initial-letter-logo-design-vector-template-graphic-alphabet-symbol-for-corporate-business-identi.jpg?ver=6",
                    }}
                    size={35}
                  />
                )}
                label={({ color, size }) => (
                  <Text style={styles.BusinessCaption}>Душанбе Сити</Text>
                )}
                onPress={() => {}}
              />
              <View style={{ paddingLeft: 30 }}>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon
                      name="checkbox-blank-circle"
                      color="#1F4E5F"
                      size={10}
                    />
                  )}
                  label={({ color, size }) => (
                    <Text style={styles.sublabelCaption}>Моя Команда</Text>
                  )}
                  onPress={() => {}}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon
                      name="checkbox-blank-circle"
                      color="#1F4E5F"
                      size={10}
                    />
                  )}
                  label={({ color, size }) => (
                    <Text style={styles.sublabelCaption}>Проекты</Text>
                  )}
                  onPress={() => {}}
                />
              </View>
              <DrawerItem
                icon={({ color, size }) => (
                  <Avatar.Image
                    source={{
                      uri: "https://wallpaperaccess.com/full/213588.jpg",
                    }}
                    size={35}
                  />
                )}
                label={({ color, size }) => (
                  <Text style={styles.BusinessCaption}>Apple Corp.</Text>
                )}
                onPress={() => {}}
              />
              <View style={{ paddingLeft: 30 }}>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon
                      name="checkbox-blank-circle"
                      color="#1F4E5F"
                      size={10}
                    />
                  )}
                  label={({ color, size }) => (
                    <Text style={styles.sublabelCaption}>Моя Команда</Text>
                  )}
                  onPress={() => {}}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon
                      name="checkbox-blank-circle"
                      color="#1F4E5F"
                      size={10}
                    />
                  )}
                  label={({ color, size }) => (
                    <Text style={styles.sublabelCaption}>Проекты</Text>
                  )}
                  onPress={() => {}}
                />
              </View>
            </Drawer.Section>
            <Drawer.Section>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="cog-outline" color="#1F4E5F" size={size} />
                )}
                label={({ color, size }) => (
                  <Text style={styles.labelCaption}>Настройки</Text>
                )}
                onPress={() => {}}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="door" color="#1F4E5F" size={size} />
                )}
                onPress={() => onLogout()}
                label={({ color, size }) => (
                  <Text style={styles.labelCaption}>Выйти</Text>
                )}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        {/* <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={color} sizer={size} />
            )}
            label="Sign Out"
            onPress={() => {}}
          />
        </Drawer.Section> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  DrawerContent: {
    flex: 1,
  },
  headerContent: {
    height: 185,
    marginTop: -55,
  },
  userInfoSection: {
    paddingLeft: 15,
    paddingTop: 80,
  },
  menuContainer: {
    paddingLeft: 0,
  },
  title: {
    color: "#1F4E5F",
    fontSize: 15,
    marginTop: 3,
    fontFamily: "Rubik_500Medium",
  },
  caption: {
    color: "#7C969F",
    fontSize: 15,
    lineHeight: 14,
    fontFamily: "Rubik_400Regular",
  },
  labelCaption: {
    color: "#1F4E5F",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Rubik_400Regular",
  },
  sublabelCaption: {
    color: "#1F4E5F",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Rubik_400Regular",
  },
  BusinessCaption: {
    color: "#1F4E5F",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Rubik_500Medium",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  section: {
    marginRight: 0,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
