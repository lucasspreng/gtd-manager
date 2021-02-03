import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const AddCard = (props) => {
  const { navigation } = props;

  const params = navigation.state.params
    ? navigation.state.params
    : { projectId: undefined, categoryId: undefined };

  const [form, setForm] = useState({ title: "", description: "" });

  const onSubmit = async () => {
    await props.onAdd(form, params.projectId, params.categoryId, () =>
      navigation.navigate("Project")
    );
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Project")} />

      <Header>Add Card</Header>

      <TextInput
        label="Title"
        returnKeyType="next"
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
        autoCapitalize="none"
      />

      <TextInput
        label="Description"
        returnKeyType="done"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />

      <Button mode="contained" onPress={onSubmit}>
        Save
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  (dispatch) => ({
    onAdd: (form, projectId, categoryId, cb) =>
      dispatch(actions.createCard(form, projectId, categoryId, cb)),
    checkToken: () => dispatch(actions.checkToken()),
  })
)(AddCard);
