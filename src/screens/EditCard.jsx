import React, { memo, useState } from "react";
import { StyleSheet } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";

const EditCard = ({ navigation }) => {
  const [form, setForm] = useState(
    navigation.state.params && navigation.state.params.card
      ? navigation.state.params.card
      : { name: "", description: "" }
  );

  const onSubmit = () => {
    navigation.navigate("Project");
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Project")} />

      <Header>Edit Card</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
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

export default memo(EditCard);
