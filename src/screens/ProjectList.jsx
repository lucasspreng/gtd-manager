import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import { Button, IconButton, Colors, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const ProjectList = (props) => {
  const { navigation } = props;

  const [projects, setProjects] = useState(props.projects);

  const [project, setProject] = useState({
    _id: 0,
    name: "",
  });

  const [projectEdit, setProjectEdit] = useState({
    _id: 0,
    name: "",
  });

  useEffect(() => {
    if (props.auth.loading) {
      props.checkToken();
    }
  }, [props.auth.loading]);

  useEffect(() => {
    setProjects(props.projects);
  }, [props.projects]);

  const addProject = async () => {
    await props.onAdd(project);

    setProject({
      _id: 0,
      name: "",
    });

    setProjectEdit({
      _id: 0,
      name: "",
    });
  };

  const prepareEditProject = (project) => {
    setProjectEdit(project);
  };

  const deleteProject = async (_id) => {
    await props.onDelete(_id);
  };

  const editProject = async () => {
    await props.onEdit(projectEdit);

    setProjectEdit({
      _id: 0,
      name: "",
    });
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Home")} />
      <Header>My Projects</Header>
      {projects.map((project) => (
        <View style={styles.list} key={project._id}>
          {project._id !== projectEdit._id ? (
            <>
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
                {project.name}
              </Button>
              <IconButton
                icon="pencil"
                color={Colors.blue500}
                size={20}
                style={styles.icon}
                onPress={() => prepareEditProject(project)}
              />
              <IconButton
                icon="delete"
                color={Colors.red500}
                size={20}
                style={styles.icon}
                onPress={() => deleteProject(project._id)}
              />
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                value={projectEdit.name}
                onChangeText={(text) =>
                  setProjectEdit({ ...project, name: text })
                }
              />
              <IconButton
                icon="pencil"
                color={Colors.amber500}
                size={20}
                style={styles.icon}
                onPress={() => editProject()}
              />
              <IconButton
                icon="cancel"
                color={Colors.red500}
                size={20}
                style={styles.icon}
                onPress={() =>
                  setProjectEdit({
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
          value={project.name}
          onChangeText={(text) => setProject({ ...project, name: text })}
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

export default connect(
  (state) => ({
    projects: state.project.projects,
    auth: state.auth,
  }),
  (dispatch) => ({
    onAdd: (form) => dispatch(actions.createProject(form)),
    onDelete: (_id) => dispatch(actions.deleteProject(_id)),
    onEdit: (form) => dispatch(actions.editProject(form)),
    checkToken: () => dispatch(actions.checkToken()),
  })
)(ProjectList);

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
