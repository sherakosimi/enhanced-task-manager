import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
const OPTIONS = ["DCity", "DC Сухурта", "Личное", "Deco", "Shohona"];
const OPTIONS1 = ["sgsd", "sgdsgs", "yelldsgsdow", "gggg", "gggg"];
const OPTIONS2 = ["Обычное", "Среднее", "Важное", "Суперважное"];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const TaskType = (props) => {
  const onPressItem = (option) => {
    props.changeModalVisibility(false);
    props.setData(option);
  };

  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.text}>{item} </Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.changeModalVisibility(false)}
    >
      <View
        style={{
          width: WIDTH - 20,

          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const People = (props) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const { following } = props;
    console.log(firebase.auth().currentUser.uid);
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
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
  }, [props.following]);

  console.log(following);
  const onPressItem = (name, username, id) => {
    props.changeModalVisibility1(false);
    props.setData1(name, username, id);
  };

  const option = following.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item.name, item.username, item.id)}
      >
        <Text style={styles.text}>{item.name} </Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.changeModalVisibility1(false)}
    >
      <View
        style={{
          width: WIDTH - 20,

          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const ImpLevel = (props) => {
  const onPressItem = (option) => {
    props.changeModalVisibility2(false);
    props.setData2(option);
  };

  const option = OPTIONS2.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.text}>{item} </Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.changeModalVisibility2(false)}
    >
      <View
        style={{
          width: WIDTH - 20,

          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    alignItems: "flex-start",
    borderRadius: 10,
  },
  text: {
    margin: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F4E5F",
  },
});

export { TaskType, People, ImpLevel };
