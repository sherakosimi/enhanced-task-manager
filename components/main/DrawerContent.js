import React from "react";
import firebase from "firebase";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
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
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", margingTop: 15 }}>
              <Avatar.Image
                source={{
                  uri:
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>John Smith </Title>
                <Caption style={styles.caption}>@johnsmith</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon
                      name="checkbox-marked-circle-outline"
                      color={color}
                      size={size}
                    />
                  )}
                  label=""
                  onPress={() => {
                    props.navigation.navigate("Tasks");
                  }}
                />
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Total Tasks</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section styles={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="checkbox-marked-circle-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Tasks"
              onPress={() => {
                props.navigation.navigate("Tasks");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-multiple-check-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Friends"
              onPress={() => {
                props.navigation.navigate("Friends");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="calendar-text-outline" color={color} size={size} />
              )}
              label="Calendar"
              onPress={() => {
                props.navigation.navigate("Calendar", {
                  uid: firebase.auth().currentUser.uid,
                });
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Work">
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-tie" color={color} size={size} />
              )}
              label="Dushanbe City"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-tie" color={color} size={size} />
              )}
              label="Apple Corp."
              onPress={() => {}}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cog-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {}}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} sizer={size} />
          )}
          label="Sign Out"
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  DrawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
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
