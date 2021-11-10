import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
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
import CircularProgress from "react-native-circular-progress-indicator";

export default function Projects(props) {
  let size1 = 30;
  const [value, setValue] = useState(0);
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

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
              <Text style={styles.headerText}>Проекты</Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Search");
                }}
              >
                <Icon name="dots-vertical" color="#1F4E5F" size={30} />
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
            <TextInput style={styles.input} placeholder="Поиск Проектов" />
          </View>
          <ScrollView style={{ width: "100%" }}>
            <View style={styles.listContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  height: 183,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 11,
                  borderColor: generateColor(),
                }}
              >
                <View style={styles.boxContainer}>
                  <View style={styles.firsthalf}>
                    <View style={styles.textContainer}>
                      <Text style={styles.caption}>Карго DCity</Text>
                      <Text style={styles.description}>
                        Разработка веб-сайта
                      </Text>
                    </View>
                    <Text style={styles.teamCaption}>Команда</Text>
                    <View style={styles.personsContainer}>
                      <View style={styles.personCircle}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "data:image/jpeg;base64,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",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle1}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "data:image/jpeg;base64,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",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle2}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2Cz4tCOQOBgweFlT5OEjSjZCmOMdz3JzGQ&usqp=CAU",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle3}>
                        <Icon name="plus" color="white" size={18} />
                      </View>
                    </View>
                    <View style={styles.date}>
                      <Icon name="calendar-range" color="#1F4E5F" size={17} />
                      <Text style={styles.dataRange}>17 Октября, 2021</Text>
                    </View>
                  </View>
                  <View style={styles.secondHalf}>
                    <View style={styles.circleBar}>
                      <CircularProgress
                        radius={57}
                        value={88}
                        textColor="#1F4E5F"
                        fontSize={17}
                        valueSuffix={"%"}
                        inActiveStrokeColor={"#61C877"}
                        inActiveStrokeOpacity={0.2}
                        inActiveStrokeWidth={6}
                        duration={3000}
                        onAnimationComplete={() => setValue(50)}
                      />
                    </View>
                    <View style={styles.taskContainer}>
                      <Icon
                        name="checkbox-marked-outline"
                        color="#1F4E5F"
                        size={17}
                      />
                      <Text style={styles.taskRange}>12 Задач</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  height: 183,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 11,
                  borderColor: generateColor(),
                  marginTop: 15,
                }}
              >
                <View style={styles.boxContainer}>
                  <View style={styles.firsthalf}>
                    <View style={styles.textContainer}>
                      <Text style={styles.caption}>DC Next</Text>
                      <Text style={styles.description}>
                        Новый Мобайл Банкинг
                      </Text>
                    </View>
                    <Text style={styles.teamCaption}>Команда</Text>
                    <View style={styles.personsContainer}>
                      <View style={styles.personCircle}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "data:image/jpeg;base64,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",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle1}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "data:image/jpeg;base64,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",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle2}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2Cz4tCOQOBgweFlT5OEjSjZCmOMdz3JzGQ&usqp=CAU",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle3}>
                        <Icon name="plus" color="white" size={18} />
                      </View>
                    </View>
                    <View style={styles.date}>
                      <Icon name="calendar-range" color="#1F4E5F" size={17} />
                      <Text style={styles.dataRange}>17 Октября, 2021</Text>
                    </View>
                  </View>
                  <View style={styles.secondHalf}>
                    <View style={styles.circleBar}>
                      <CircularProgress
                        radius={57}
                        value={32}
                        textColor="#1F4E5F"
                        fontSize={17}
                        valueSuffix={"%"}
                        inActiveStrokeColor={"#61C877"}
                        inActiveStrokeOpacity={0.2}
                        inActiveStrokeWidth={6}
                        duration={3000}
                        onAnimationComplete={() => setValue(50)}
                      />
                    </View>
                    <View style={styles.taskContainer}>
                      <Icon
                        name="checkbox-marked-outline"
                        color="#1F4E5F"
                        size={17}
                      />
                      <Text style={styles.taskRange}>12 Задач</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  height: 183,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 11,
                  borderColor: generateColor(),
                  marginTop: 15,
                }}
              >
                <View style={styles.boxContainer}>
                  <View style={styles.firsthalf}>
                    <View style={styles.textContainer}>
                      <Text style={styles.caption}>DC Next</Text>
                      <Text style={styles.description}>
                        Новый Мобайл Банкинг
                      </Text>
                    </View>
                    <Text style={styles.teamCaption}>Команда</Text>
                    <View style={styles.personsContainer}>
                      <View style={styles.personCircle}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "data:image/jpeg;base64,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",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle1}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "data:image/jpeg;base64,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",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle2}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2Cz4tCOQOBgweFlT5OEjSjZCmOMdz3JzGQ&usqp=CAU",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle3}>
                        <Icon name="plus" color="white" size={18} />
                      </View>
                    </View>
                    <View style={styles.date}>
                      <Icon name="calendar-range" color="#1F4E5F" size={17} />
                      <Text style={styles.dataRange}>17 Октября, 2021</Text>
                    </View>
                  </View>
                  <View style={styles.secondHalf}>
                    <View style={styles.circleBar}>
                      <CircularProgress
                        radius={57}
                        value={32}
                        textColor="#1F4E5F"
                        fontSize={17}
                        valueSuffix={"%"}
                        inActiveStrokeColor={"#61C877"}
                        inActiveStrokeOpacity={0.2}
                        inActiveStrokeWidth={6}
                        duration={3000}
                        onAnimationComplete={() => setValue(50)}
                      />
                    </View>
                    <View style={styles.taskContainer}>
                      <Icon
                        name="checkbox-marked-outline"
                        color="#1F4E5F"
                        size={17}
                      />
                      <Text style={styles.taskRange}>12 Задач</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  height: 183,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 11,
                  borderColor: generateColor(),
                  marginTop: 15,
                }}
              >
                <View style={styles.boxContainer}>
                  <View style={styles.firsthalf}>
                    <View style={styles.textContainer}>
                      <Text style={styles.caption}>DC Next</Text>
                      <Text style={styles.description}>
                        Новый Мобайл Банкинг
                      </Text>
                    </View>
                    <Text style={styles.teamCaption}>Команда</Text>
                    <View style={styles.personsContainer}>
                      <View style={styles.personCircle}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "data:image/jpeg;base64,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",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle1}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "data:image/jpeg;base64,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",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle2}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2Cz4tCOQOBgweFlT5OEjSjZCmOMdz3JzGQ&usqp=CAU",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle3}>
                        <Icon name="plus" color="white" size={18} />
                      </View>
                    </View>
                    <View style={styles.date}>
                      <Icon name="calendar-range" color="#1F4E5F" size={17} />
                      <Text style={styles.dataRange}>17 Октября, 2021</Text>
                    </View>
                  </View>
                  <View style={styles.secondHalf}>
                    <View style={styles.circleBar}>
                      <CircularProgress
                        radius={57}
                        value={32}
                        textColor="#1F4E5F"
                        fontSize={17}
                        valueSuffix={"%"}
                        inActiveStrokeColor={"#61C877"}
                        inActiveStrokeOpacity={0.2}
                        inActiveStrokeWidth={6}
                        duration={3000}
                        onAnimationComplete={() => setValue(50)}
                      />
                    </View>
                    <View style={styles.taskContainer}>
                      <Icon
                        name="checkbox-marked-outline"
                        color="#1F4E5F"
                        size={17}
                      />
                      <Text style={styles.taskRange}>12 Задач</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  height: 183,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 11,
                  borderColor: generateColor(),
                  marginTop: 15,
                }}
              >
                <View style={styles.boxContainer}>
                  <View style={styles.firsthalf}>
                    <View style={styles.textContainer}>
                      <Text style={styles.caption}>DC Next</Text>
                      <Text style={styles.description}>
                        Новый Мобайл Банкинг
                      </Text>
                    </View>
                    <Text style={styles.teamCaption}>Команда</Text>
                    <View style={styles.personsContainer}>
                      <View style={styles.personCircle}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "data:image/jpeg;base64,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",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle1}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIREhgSEhEYGBgRGBgSGBgRGBERERIRGBgZGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISHjQrISE0NDE0NDQ0NDE0NDQxNDQ0NDQ0NDQ0NDQ0NDQ1NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NP/AABEIAL0BCwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAACAwEEBQYHAAj/xAA/EAACAQIDBQUFBQcDBQEAAAABAgADEQQSIQUxQVFhBiJxgfATkaGxwTJCUtHhBxQjYnKC8VOishY0Q5LyJP/EABkBAQEBAQEBAAAAAAAAAAAAAAACAQMEBf/EACERAQEAAgMBAQEAAwEAAAAAAAABAhEDITESQVEyYXEi/9oADAMBAAIRAxEAPwDVUWPRYCCOUS2DURqiAojVEJEojVEFRGqIBIsaqwVEYomglEYBIURgEDwEMCeAhgTB4CEBPAQgIEASbQgJMCLT1pSrbXw6Eg1QSN4TM9vHKDaVv+pcHexq24aq/wCUbjfm/wAZe09aVsNtGhUOVKik8jdW9xly0bLNAtItGWkEQwoiCRHWgETQoiAwjiIDCAkiLYR5EWwgIYRTiWGEUwgV3WIdZbYRLrBFJ1iMsuOsVlmCugjlEBBGqIUNRGKIKiNUQkaCMQQUEcggEojVEFRHKIHlWGonlEYogeAhASVEICB4CEBJAmH7SbYGEpXWxd+6inhzcjkNPMgRWybWNp7WpYYfxG71r5V1bpflND21t2pi2y5sqDXIpfL/AHW+15zFVazVHuSSSbksczMx3sRPAspGhIPA2F/LjOWWVrtjhItUnAUKnuOZlsfD85Yp0mIsxQchdr+YI098Rhlz/dJtv/EJk8Nh3AujPax3gcPdpItdJCkGWwK7xYHQi3RhoZndnbfqU1CuM4XunMcrjlqfrMbSw9rhxbS+4g7/ALVtxF+Ilr91JF7E24gX05X9a85ky14q4b6rbcBjUrpnThoym2ZG5G0skTn645cHilrC5V1yuFvZ0PED8QIv7/Gb9hqy1EWohurgMp5g6z0Y5bjy54/NSRIIjLQSJqCiIBEcRAImhJEWwjiIDCAhhFMJYYRbCBXYRTiWGEUywKrrE5ZaZYq0CmojVEBRGrMUNRHKIpRHKISYgjVEFRGqIDEEYBBWMWASiGokKIaiBIEICSBCAgQBOYdo8W2IxDv91P4acgiki/mbnznTMW+Wm7fhVj7gZzNqAKhuXA66c5zzy1068WO907YOy/bOAF3+M37D9kEyWK9eRB6GJ7C4K1myjpz906EiC082Vtr24ySOb4nssU1AseYFxaDT2G6jcbXJuNND6M6gtJTvAhjDJyiY3+lyxn45rT2QzU8p7wuRY6NbmLbjwlyhsVl4khrgcL6bj16zekwCA3CjWO/dlA3Tfmn3jHGO1uyMiZiN2oJ0t4/CR2E2jYHCuddaib9x1ddd/PTrOidstmrUwzm2oF9JyHYzsMXRQfdcaneBrcfMecvjtl05c2Mym46ZBIjDBM9LxFkQCIwwTAUwi2Ecwi2E0KYRTCPaKYQEsIlhLDCJcQEOIq0sMIrLBFFRGKICRizFGoI1RFpGrCTVjlEUoj0EA1EaogLGLAJRGKIKxiiBIEICeEkQK+0KWei6/iRhpv3Gc2pvZrcNJ1O05eaVncfgZl/9T+k5cjtxfrpXYAg0zz4zdEmr9j9nfu1BS57zgOb8L62mfXadE6CoptyII98872/i+kaBKVLGodzg+BEtJVDbpUqMpTRJi/agbzPLiFO5hp1E2VFlIx9MPTZTxBnIE2ag2kmQ3W3tdOBW4+YE7DXYEEDW+mk5ds2mRjnDb6aOLHhd9ZuM/wDRldYVsJgmGYBnpeIBkGEYJgA0W0YYBmhbRbRrRbQFMIlhHMIt4CWEXaMYQLQMckasUsasxRyCOWJSOSEmrHpErHJAasaBFLGiAQEYICw1gEBDAgiSIDlqhFLtRaoAVUqhAZQ1+9rvmD212bopVSvSdiuJrKjo9u4zatY79cp0PPfNhwD9/L+PTz3j4/OTt/DMalJhbJnQndq29Tfna/vnm5bZl/p7+GY5YTrubXdqYRqtE00NrixtxUcJouO2ZVBKU8NUawLZ3qtSViOARQfjadKwZ0jqmHVtdx5g2M5T103+OTbM7N4t/wCI9Ip3rBM9TPl53DEeU6b2ewrUkyPe45m4t0MtJhwupNz11ljDLrNk3ltlusdNb7cUK7BPYByW0YU2yKORY2J5zneFpY8VnQ0KwKAuXW+oBt3WYANew0vx6Tt1amDv4iUzs4k/bNuoU6eO+V86qZl1O/Gpdl1rMy1C7lTdXWoGRwd3eXUXvxlirhKFPEYjEVSVXMlPugszFwpChQDqWf5TbGohFsJrzgMXLC+SuKhvxyILf7gvvibl69VJMu74o1lCswF7AkC++3WKJhMbm546wTPW+dQkwTCMEwwJgGEYBmgWgNDaLMBbRbRjRbQEsIEY0XaBjUjVikjVmKOSOSJSOSEnLHLELHpAasasUsYsBghiLEYIBiSIIk3gGrEG44a+cym029rh867wVa3JlYEjw3++Ym8l6rCm6r95Tp1GoI6znyY/WLvwZ/OWr5Wb2ZXzoG6TLUjNU2JitLX0axHUkfCbJTbSeSV7sonF1BxNgNSd2kXsraNGqC1KqrqpKkoQ1mGhB6ypi9oUCGpnvZgQQNfKYB8O6rmpqUHAUwVzAcCfrH122Ybx1W6YvEpcJnUORmVSQGa1r2HH9ZbovcXmnbNVfajEYiiM+UIjnMXVOWvid1t5mz4asri6tcdOEuZbrlnx6mhYl9DNf2g6ogRd799umY5jfxNvcJldpVgqN4TWGcsbk3JnXjm8t/xy5cvnDU/XoJkwTO7xoMEySZBMATAMIwCZqgtFtDJgMYSBotoxopoCmgwngXgYxY1TEqY1DMUsIY1DEIY5DCT0MekrIY9DAegjFiUMaDAYIYigYYMBgMm8WDCvAIGMpoWYKONz4gAk/AGVa+ISmhqO2VUFyTwhfs/DYqtVxlQd0f8A56SnciGzv5nuXPiIvlVPVcOaNRqZ3Bs6aalCbgDlymzYXEe0plb7wQCPCYTtZhDT/iAa0+6etM7j66zEUNs5FtcAnXlpPnXctj6mNmUlbLS2EyXdq7At92mECqPFgST1gnEpSNv3msCdLFFqD4LL+ysejoLm+n0lp6NFzfKNOV5WN1OlTKzqqlHCmutlxNTUb2Wnb3ZfqI7ZOEqYbMKrBv5l7obra+kydOoiDQATXdrbaytY7z3VAGrE7hNtk1b6jeVt/g9p4otcc/kJjrwSzE98WO4g/dtw8Z689XHNYvBzZfWXXkFIJkXnjOjigwSZJgmaBMEySYJMKCxi2MJjAYwkLQGhMYtjAW0CGxi4GMWNWIUxyGYo9DGoYhTHIYSsIY1TK6GOUwHqY1YhTGKYDhJBiwYNauiKXdgqjeWIAgPvE4vHU6K5qlQKOF/tN4DeZq+1e1RN0w4twzuP+Cn5n3TWnqs75nYszalmJJPmZUxGU29tl8UbAFUX7K31J/E3XpwnSf2VVg2DdRvSoSfBlUg/A+6cjK6f4m5fsz2r7DFimx7uIHsz/WLlD/yH903KdDq+1cAtemVOjWsCd1uR6Tku29mPQqFCCADoPw+HTwnaLXExe2tj08VTKPofuutsyn6jpPLnh9dz16OPl+er45LgttVKIte4GmnDx/WZHD9sBpm5a872/OVttbBq4aplqJodFqJ9hvHkehlBNmFiFBGpA1E89wn69mOds6bF/wBXFwMo387gD8+MzewNnFj+91xrYsobSwAvmPLQaCV9g9nKaWdu+3DNbKvgOMye3KpfJgaf28V3GIv/AA8P/wCRyRu7twPGbMNdsyz30xm39p0KeKam75C6pUGYEKc6Anvbt998hXBFwQQdxGoPnMH+1HDZcaLDRqNMjyLpb3KJqOCxdWib03Zeg1U+KnQz6Mx6j5tvbpd5BM1nAdqAdKyEH8aar5rvHleZ3DYynVF6bq3gdR4jeJlljFgmCTIJkEzFPEwGM8TAYwlDGCZ4mATAhjFtJYwGMAWMC88xg3gYtDGqYhTGIZilhDHIZXQxqGErKGNUyupjlMCwphlwouSABqSdAB1MwO0O0FOl3U77jgpGRf6m+g+E1nH7Sq1z/EfTgi6IPLj4mbINl2l2pRLrQGc/jbRB4cW+AmsYrF1KzZqjljwvuHQLuHlK4hqPXrwlyCQPXrygNoQevr5xoX168ovELp69cYFka+usZhnam4dTZlIYEcGBJB99oFIXAPOx+sYtP6fImbpjvHZjbKY7DLVWwYdyon+nVAFx4G9x0ImXyzjn7PdrNh8XkGq4lcuX8VRBdR4lcwB5hRxM7JSqLUQOhurC4P58j0nHKaqp4RXwiupVlDK2hVgCp8RNYxPZP2b+0oarvNNtSP6GO/wOvUzcgInF4mnRRqlRwqrqS24cAOpJ0A4yLjMvXTHO4+NQxm01w6ABS1Ru4iAd5n3Wt4zLdmNiPRzV65zYiv8AbO8U03hF+v6TXsV2kzYgV6WHpXTuh6ilqrU7HitspPnYaTaNh9pKeKPsyuSoBfKTmVhxytYX8CB5xOG491WXNMpqNN/a3he/Qq8Cr0yeoKso9xf3Tm7LOxftQo5sGrfgrIfJkdT8xOROtp6cP8XDL0sCQAQbgkEbiNCD5Sb625b+kJvXoy0sjhO0Nano/fH82j2/qH1vM/gNs0q5yKSr2vlcWJHGx3GaYwvK9ZmS1RSQyHMCNDbj66SMsYqV0gmATKey8cK9MPx3MOTfkd/nLTGcxDGATPMYBMDxMAmSWi2M0Cxg3nmMXeYMYpjVMQpjVMxR6mNQyupjVMJWVaa7tva5YtSpmwGjMDq54gch85l8VX9nTd/wqSPG2nxmjKxmwWEHr15w1Hr14QEPrTnLCgb/AHj3azpG0GX168Y5E9evOSietPXCPVfWvX85sibUInrX1wkYmgSmg3evpHKPWnrjG2uP8dPzm6ZtjcNjEACPdCAB39xsLaGZBADu3dPASvURXJUAG2/cQL3/ADlihTCDINBvA5c/XUxCgou1NwUNmRhURuTqbjx1Hwnb9gbTV6aVRpTxShyP9KsdGHhmBB6jxnEaw1vynR/2ZYsVKdTCv93+Kg/lawcDoDlP9858mPSsa6NWdUUsxsF3/pOa9shi8ZTeoy5KWH/iIhOpynVzbe2XN0HDiTvFCm7uPaPf2eiD6nmeEpdqAFwtYnS9N182UqB7zOU9i96cz2bXzKL7xNg2Ds2q5NambZWspG+66/Wa9gMO4HeyiwHE3Pw0nS+ySBcKhBuHzMT1ztfy6ztn/jpGN7YztzizU2WxcZWFSkCODEVACR87TljDh63zsX7QcL7TZtawF0yVR/Y6s3+3NOOuY4vGZekCw3SLz15BM6MQYLievPNAu9lsVkqGkTo118xqvwm2M00ClUyVA44ZX05qdfpN6VwwDA3DAEeBnPKKSxglpBMEmSPFoDGQTAYzBBaDmkMYGaBjlaMUyurRqmYpYVoxTK6mMUwK23nth365R72F/hNSSbP2hP8AAP8AUvzmsLKgcp9ectYd9369JUTWMTT4c+kpLIry4HxPrfDQ+tOn5SslS66bxrx4D9I2k4O7w4dZUYtJ8vX0kluvxPT8oIbT/wCvXGCzetespiniiadQVBuOjeHOZBHBsefu/X/MTVTOpFvn1lbAVCpNM8N39PLyk+U9jIVB64+71umS7I7U/dcZTqE2UNkfl7N+61/C9/ITGk6f59GV2OVvXocvdNpH0PV0aYXtkScKwH3in/IH6QuzG0f3rBUqhN2VfZvxJdO7c9SLHziu1f8A2jEfdKH/AHgfWcJNZaXfGgF92u7TynQOxWLWpg0C76Wamw6hiQfMH5znLNvvxme7CY4Uq3sye7WJQ8g/3D79P7p2yx3j/wARjdV0PaOHFbD1aR/8lN6f/spH1nAVa4B421n0IjWM4Jtaj7LEVqf+nVqIP6c7ZfhaRx3uxWTHOdfXSeP5fKDVPrWeB+XrdOqQFtbROJrlSAOV4dT1/iV8SdQeklpjtquu+448Rf6TaNgV81ED8BKeW8fP4TUK1S1jyuePK31ma7KV2u6nTMA48jY/MScmxsxaCzQS0AmQJLQWMgmAzQIdovNIdorNClBGj1aVEMepkiwpjVMQDDUzRV27rQbxW3XvD6XmskzYtua0T/Up+P6zW5sBBrSxQrc/r0/KVhPEa+usoZL2Q+0mh87HfKvtzSqFW0BNxwFjBpOR1g7TF1VuO74TbemM0rArf8/XCC59a9fzlDZtYlLHh+ssk315W67zK3uJ12sIfXulbFUyCKi7114a7o2ny6D5CONO4t9Byj08TSqBlBHH1vgVR6/SV8CTmdL6KSRzll93jN9jG+fsv2lZqmGY/bAqr/Utlf3gqf7TNt7SrmwlQfhyt5KwJ+U5L2XxLUsZRZf9RV5d1zlI9zGdh2wt6FUfyP8A8TOOXWUqp45lW33k4ZyjhlNiO8D/ADDdJqj52+ESh19cp6Y5ux4bECoiVBudVceDAGce7d0vZ7Rr8nKVB4Mi3+IadL7L1C2Cok8M6+SuwHwAmh/tNpgYxG4vQW/9rOB8558estOl7jS6x9e/lIDae/nzkVBp8PnAU8PH5zqxNT1/iU8UdAeUtudPQlPGaC3Xy3HhMpFf7TAchf8AzMpsbEZcSgG4gofMX+YEwlIksdbWtul/AtashH+oo/3CTvcVpvBMEtIYyDIYkmJdpLRLmFPO0VmnnMVMNP/Z",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle2}>
                        <Image
                          style={{
                            width: 29.4,
                            height: 29.4,
                            borderRadius: 100,
                          }}
                          source={{
                            uri:
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2Cz4tCOQOBgweFlT5OEjSjZCmOMdz3JzGQ&usqp=CAU",
                          }}
                        />
                      </View>
                      <View style={styles.personCircle3}>
                        <Icon name="plus" color="white" size={18} />
                      </View>
                    </View>
                    <View style={styles.date}>
                      <Icon name="calendar-range" color="#1F4E5F" size={17} />
                      <Text style={styles.dataRange}>17 Октября, 2021</Text>
                    </View>
                  </View>
                  <View style={styles.secondHalf}>
                    <View style={styles.circleBar}>
                      <CircularProgress
                        radius={57}
                        value={31}
                        textColor="#1F4E5F"
                        fontSize={17}
                        valueSuffix={"%"}
                        inActiveStrokeColor={"#61C877"}
                        inActiveStrokeOpacity={0.2}
                        inActiveStrokeWidth={6}
                        duration={3000}
                        onAnimationComplete={() => setValue(50)}
                      />
                    </View>
                    <View style={styles.taskContainer}>
                      <Icon
                        name="checkbox-marked-outline"
                        color="#1F4E5F"
                        size={17}
                      />
                      <Text style={styles.taskRange}>12 Задач</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    width: "85%",
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
    width: "85%",
    alignSelf: "center",
  },
  projectBox: {
    backgroundColor: "white",
    height: 183,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 11,
    borderColor: "#3C6C8F",
  },
  projectBox2: {
    backgroundColor: "white",
    height: 183,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 11,
    borderColor: "#EF6D5E",
    marginTop: 15,
  },
  boxContainer: {
    marginTop: 2,
    height: "85%",
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
  },
  firsthalf: {
    backgroundColor: "transparent",
    height: "100%",
    width: "50%",
    flexDirection: "column",
  },
  textContainer: {
    backgroundColor: "transparent",
  },
  caption: {
    color: "#1F4E5F",
    fontSize: 20,
    fontFamily: "Rubik_500Medium",
  },
  description: {
    color: "#4E6E79",
    fontSize: 12,
    fontFamily: "Rubik_400Regular",

    paddingTop: 5,
  },

  teamCaption: {
    paddingTop: 20,
    paddingLeft: 6,
    color: "#1F4E5F",
    fontSize: 12,
    fontFamily: "Rubik_500Medium",
  },
  personsContainer: {
    marginLeft: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 6,
    height: 35,
  },
  personCircle: {
    backgroundColor: "#3C6C8F",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  personCircle1: {
    backgroundColor: "#3C6C8F",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  personCircle2: {
    backgroundColor: "#3C6C8F",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  personCircle3: {
    backgroundColor: "#FF895D",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    marginLeft: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  personCircle4: {
    backgroundColor: "#FF895D",
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "absolute",
    marginLeft: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    flexDirection: "row",
    marginLeft: 6,
    marginTop: 10,
  },
  dataRange: {
    marginLeft: 6,
    marginTop: 1,
    color: "#4E6E79",
    fontSize: 12,
    fontFamily: "Rubik_400Regular",
  },
  secondHalf: {
    width: "50%",
    backgroundColor: "transparent",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  circleBar: {
    paddingBottom: 5,
  },
  taskContainer: {
    flexDirection: "row",
    marginLeft: 6,
    marginTop: 9,
  },
  taskRange: {
    marginLeft: 6,
    marginTop: 1,
    color: "#4E6E79",
    fontSize: 12,
    fontFamily: "Rubik_400Regular",
  },
});
