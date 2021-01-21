import React, { memo, useState } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import { Button, IconButton, Colors, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";

const ProjectList = ({ navigation }) => {
  const [projects, setProjects] = useState(["School", "Job", "Hobby"]);
  const [projectName, setProjectName] = useState("");

  const addProject = () => {
    setProjects([...projects, projectName]);
    setProjectName("");
  };

  const deleteProject = (_id) => {
    setProjects([...projects.filter((project) => project !== _id)]);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Home")} />
      <Header>My Projects</Header>
      {projects.map((project) => (
        <View style={styles.list} key={project}>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("Project", {
                project: project,
              })
            }
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
            onPress={() => deleteProject(project)}
          />
        </View>
      ))}
      <View style={styles.list}>
        <TextInput
          style={styles.input}
          selectionColor={theme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          value={projectName}
          onChangeText={(text) => setProjectName(text)}
        />
        <IconButton
          icon="plus"
          color={Colors.red500}
          size={30}
          mode={"contained"}
          style={styles.icon}
          onPress={addProject}
        />
      </View>
    </Background>
  );
};

export default memo(ProjectList);

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
