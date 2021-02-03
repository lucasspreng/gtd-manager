import React, { memo } from "react";
import { StyleSheet } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";

const Login = ({ navigation }) => {
  const _onLoginPressed = () => {
    navigation.navigate("ProjectList");
  };

  return (
    <Background>
      {/* <BackButton goBack={() => navigation.navigate("Home")} /> */}
      <Logo />

      <Header>Welcome</Header>

      <Button mode="outlined" onPress={_onLoginPressed}>
        Acessar com Google
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

export default memo(Login);
