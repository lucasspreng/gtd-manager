import React, { memo } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";

const Home = ({ navigation }) => (
  <Background>
    <Header>Screens</Header>
    <Button mode="outlined" onPress={() => navigation.navigate("Login")}>
      Login
    </Button>
    {/* <Button mode="outlined" onPress={() => navigation.navigate("ProjectList")}>
      Projects
    </Button> */}
  </Background>
);

export default memo(Home);
