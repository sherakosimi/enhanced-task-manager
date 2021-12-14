import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  clearData,
  fetchUserProjects,
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
import { relativeTimeThreshold } from "moment";
import SaveScreen from "./main/Save";
import createProject from "./main/createProject";
import CommentsTest from "./main/commentTest";
import projectOverview from "./main/projectOverview";
const Drawer = createDrawerNavigator();

export class Main extends Component {
  componentDidMount() {
    this.props.clearData();
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchUserFollowing();
    this.props.fetchUserProjects();
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
          name="Calendar"
          component={Tasks1}
          options={{
            headerShown: false,
          }}
          navigation={this.props.navigation}
        />
        <Drawer.Screen
          name="projectOverview"
          component={projectOverview}
          options={{
            headerShown: false,
          }}
          navigation={this.props.navigation}
        />
        <Drawer.Screen
          name="Tasks1"
          component={Tasks1}
          options={{
            headerShown: false,
          }}
          navigation={this.props.navigation}
        />

        <Drawer.Screen
          name="Friends"
          component={Friends}
          navigation={this.props.navigation}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Create Task"
          component={CreateTask}
          navigation={this.props.navigation}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Projects"
          component={Projects}
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
        <Drawer.Screen
          name="createProject"
          component={createProject}
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
    {
      fetchUser,
      fetchUserPosts,
      fetchUserFollowing,
      clearData,
      fetchUserProjects,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
