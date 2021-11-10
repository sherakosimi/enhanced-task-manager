import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

const OPTIONS = ["Красный", "blue", "yellow", "green", "orange"];
const OPTIONS1 = ["sgsd", "sgdsgs", "yelldsgsdow", "gggg", "gggg"];
const OPTIONS2 = ["asd", "asdasd", "asdasdasdsa", "asdasd", "asdasd"];
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
  const onPressItem = (option) => {
    props.changeModalVisibility1(false);
    props.setData1(option);
  };

  const option = OPTIONS1.map((item, index) => {
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F4E5F",
  },
});

export { TaskType, People, ImpLevel };
