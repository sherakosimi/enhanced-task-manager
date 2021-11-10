import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  clearData,
} from "../redux/actions/index";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./main/Profile";
import TasksScreen from "./main/Tasks";
import CalendarScreen from "./main/Calendar";
import SearchScreen from "./main/Search";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerContent } from "./main/DrawerContent";
import ProfilePage from "./main/ProfilePage";
import ProfilePage1 from "./main/ProfileDesign";
import Tasks1 from "./main/Tasks1";
import Friends from "./main/Friends";
import Projects from "./main/Projects";
import CreateTask from "./main/createTask";
const Drawer = createDrawerNavigator();

export class Main extends Component {
  componentDidMount() {
    this.props.clearData();
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchUserFollowing();
  }
  render() {
    //const { currentUser } = this.props;
    //  console.log(currentUser);
    // if (currentUser == undefined) {
    //   return <View></View>;
    // }
    return (
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#ffff",
          },
        }}
      >
        <Drawer.Screen
          name="Tasks"
          component={CreateTask}
          options={{
            headerShown: false,
            drawerActiveTintColor: "#1F4E5F",
            headerTitleStyle: {
              paddingRight: 200,
              color: "#1F4E5F",
            },
          }}
          navigation={this.props.navigation}
        />
        <Drawer.Screen
          name="Calendar"
          component={ProfilePage}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Friends"
          component={Friends}
          navigation={this.props.navigation}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserFollowing, clearData },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
