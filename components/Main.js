import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPosts } from "../redux/actions/index";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./main/Profile";
import TasksScreen from "./main/Tasks";
import CalendarScreen from "./main/Calendar";
import SearchScreen from "./main/Search";
import FriendsScreen from "./main/Friends";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerContent } from "./main/DrawerContent";
import ProfilePage from "./main/ProfilePage";
const Drawer = createDrawerNavigator();

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPosts();
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
        <Drawer.Screen name="Tasks" component={TasksScreen} />
        <Drawer.Screen name="Search" component={SearchScreen} />
        <Drawer.Screen name="Calendar" component={ProfilePage} />
        <Drawer.Screen
          name="Friends"
          component={SearchScreen}
          navigation={this.props.navigation}
        />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="ProfilePage" component={ProfilePage} />
      </Drawer.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
