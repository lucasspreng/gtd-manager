import React, { memo, useState } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import { Button, IconButton, Colors, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";

const CategoryList = ({ navigation }) => {
  const [categories, setCategories] = useState([
    "Category 01",
    "Category 02",
    "Category 03",
  ]);
  const [categoryName, setCategoryName] = useState("");

  const addCategory = () => {
    setCategories([...categories, categoryName]);
    setCategoryName("");
  };

  const deleteCategory = (_id) => {
    setCategories([...categories.filter((project) => project !== _id)]);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Project")} />
      <Header>My Categories</Header>
      {categories.map((project) => (
        <View style={styles.list} key={project}>
          <Button
            mode="contained"
            style={styles.listItem}
            color={Colors.grey300}
            uppercase={false}
            compact
          >
            {project}
          </Button>
          <IconButton
            icon="pencil"
            color={Colors.blue500}
            size={20}
            style={styles.icon}
            onPress={() => console.log("Pressed")}
          />
          <IconButton
            icon="delete"
            color={Colors.red500}
            size={20}
            style={styles.icon}
            onPress={() => deleteCategory(project)}
          />
        </View>
      ))}
      <View style={styles.list}>
        <TextInput
          style={styles.input}
          selectionColor={theme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          value={categoryName}
          onChangeText={(text) => setCategoryName(text)}
        />
        <IconButton
          icon="plus"
          color={Colors.red500}
          size={30}
          mode={"contained"}
          style={styles.icon}
          onPress={addCategory}
        />
      </View>
    </Background>
  );
};

export default memo(CategoryList);

const styles = StyleSheet.create({
  listItem: {
    margin: 0,
    padding: 0,
    width: 220,
  },
  list: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    padding: 0,
  },
  icon: {
    flexGrow: 1,
    padding: 0,
  },
  addButton: {},
  input: {
    height: 35,
    width: 220,
    backgroundColor: "white",
  },
});
