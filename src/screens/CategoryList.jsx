import React, { memo, useState } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import { Button, IconButton, Colors, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";

const CategoryList = ({ navigation }) => {
  const [categories, setCategories] = useState([
    {
      _id: 1,
      name: "Category 01",
    },
    {
      _id: 2,
      name: "Category 02",
    },
    {
      _id: 3,
      name: "Category 03",
    },
  ]);

  const [category, setCategory] = useState({
    _id: 0,
    name: "",
  });

  const [categoryEdit, setCategoryEdit] = useState({
    _id: 0,
    name: "",
  });

  const addCategory = () => {
    setCategories([...categories, { ...category, _id: categories.length + 1 }]);
    setCategory({
      _id: 0,
      name: "",
    });
    setCategoryEdit({
      _id: 0,
      name: "",
    });
  };

  const prepareEditCategory = (category) => {
    setCategoryEdit(category);
  };

  const deleteCategory = (_id) => {
    setCategories([...categories.filter((category) => category._id !== _id)]);
  };

  const editCategory = () => {
    const index = categories.findIndex((el) => el._id === categoryEdit._id);

    const helper = [...categories];

    helper[index] = { ...categoryEdit };

    setCategoryEdit({
      _id: 0,
      name: "",
    });

    setCategories([...helper]);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Project")} />
      <Header>My Categories</Header>
      {categories.map((category) => (
        <View style={styles.list} key={category._id}>
          {category._id !== categoryEdit._id ? (
            <>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate("Project", {
                    category: category,
                  })
                }
                style={styles.listItem}
                color={Colors.grey300}
                uppercase={false}
                compact
              >
                {category.name}
              </Button>
              <IconButton
                icon="pencil"
                color={Colors.blue500}
                size={20}
                style={styles.icon}
                onPress={() => prepareEditCategory(category)}
              />
              <IconButton
                icon="delete"
                color={Colors.red500}
                size={20}
                style={styles.icon}
                onPress={() => deleteCategory(category._id)}
              />
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                value={categoryEdit.name}
                onChangeText={(text) =>
                  setCategoryEdit({ ...category, name: text })
                }
              />
              <IconButton
                icon="pencil"
                color={Colors.amber500}
                size={20}
                style={styles.icon}
                onPress={() => editCategory()}
              />
              <IconButton
                icon="cancel"
                color={Colors.red500}
                size={20}
                style={styles.icon}
                onPress={() =>
                  setCategoryEdit({
                    _id: 0,
                    name: "",
                  })
                }
              />
            </>
          )}
        </View>
      ))}

      <View style={styles.list}>
        <TextInput
          style={styles.input}
          selectionColor={theme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          value={category.name}
          onChangeText={(text) => setCategory({ ...category, name: text })}
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
