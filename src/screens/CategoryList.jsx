import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import { Button, IconButton, Colors, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const CategoryList = (props) => {
  const { navigation } = props;

  const project =
    navigation.state.params && navigation.state.params.project
      ? navigation.state.params.project
      : {
          _id: 0,
          name: "Uninformed",
        };

  const [categories, setCategories] = useState(props.categories);

  const [category, setCategory] = useState({
    _id: 0,
    name: "",
  });

  const [categoryEdit, setCategoryEdit] = useState({
    _id: 0,
    name: "",
  });

  useEffect(() => {
    if (props.auth.loading) {
      props.checkToken();
    }
  }, [props.auth.loading]);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  const addCategory = async () => {
    await props.onAdd(category, project._id);

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

  const deleteCategory = async (_id) => {
    await props.onDelete(_id);
  };

  const editCategory = async () => {
    await props.onEdit(categoryEdit, project._id);

    setCategoryEdit({
      _id: 0,
      name: "",
    });
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

export default connect(
  (state) => ({
    categories: state.category.categories,
    auth: state.auth,
  }),
  (dispatch) => ({
    onAdd: (form, projectId) =>
      dispatch(actions.createCategory(form, projectId)),
    onDelete: (_id) => dispatch(actions.deleteCategory(_id)),
    onEdit: (form, projectId) =>
      dispatch(actions.editCategory(form, projectId)),
    checkToken: () => dispatch(actions.checkToken()),
  })
)(CategoryList);

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
