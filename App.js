import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/Landing";
import RegisterScreen from "./components/Register";
import LoginScreen from "./components/Login";
import firebase from "firebase";
import { Provider } from "react-redux";
import rootReducers from "./redux/reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import MainScreen from "./components/Main";
import TasksScreen from "./components/main/Tasks";
import SearchScreen from "./components/main/Search";
import CalendarScreen from "./components/main/Calendar";
import SaveScreen from "./components/main/Save";
import ProfilePageScreen from "./components/main/ProfilePage";
import ProfileDesign from "./components/main/ProfileDesign";
import Tasks1 from "./components/main/Tasks1";
import FriendsPage from "./components/main/Friends";
import Projects from "./components/main/Projects";
import CreateTask from "./components/main/createTask";
import CommentScreen from "./components/main/Comment";
import ProfileScreen from "./components/main/Profile";
const store = createStore(rootReducers, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyB6DshdRAS5PoY1dZ5fzGrBrYjB_7OUAZo",
  authDomain: "dcitymobileapp.firebaseapp.com",
  projectId: "dcitymobileapp",
  storageBucket: "dcitymobileapp.appspot.com",
  messagingSenderId: "300615855846",
  appId: "1:300615855846:web:ac628b928d2568b2df9527",
  measurementId: "G-YJDWB8PSX9",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  //to check if the user is logged in or not, in order to have a method componentDidMount WE MUST HAVE CLASS APP EXTENDS COMPONENT, not a Function
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text> Loading </Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen name="Tasks" component={TasksScreen} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen
              name="ProfileDesign"
              component={ProfileDesign}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Friends"
              component={FriendsPage}
              options={{ headerShown: false }}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false }}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Save"
              component={SaveScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Profile Page"
              options={{ headerShown: false }}
              component={ProfilePageScreen}
            />
            <Stack.Screen
              name="Comment"
              options={{ headerShown: false }}
              component={CommentScreen}
            />
            <Stack.Screen
              name="CreateTask"
              options={{ headerShown: false }}
              component={CreateTask}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
