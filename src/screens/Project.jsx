import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Button, Paragraph } from "react-native-paper";
import { StyleSheet, ScrollView } from "react-native";
import BackButton from "../components/BackButton";
import { View } from "react-native-web";
import Block from "../components/Block";
import Card from "../components/Card";
import { theme } from "../utils/constants";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const Project = (props) => {
  const { navigation } = props;

  const project =
    navigation.state.params && navigation.state.params.project
      ? navigation.state.params.project
      : {
          _id: 0,
          name: "Uninformed",
        };

  const [categories, setCategories] = useState(
    props.categories ? props.categories : []
  );

  useEffect(() => {
    if (props.auth.loading) {
      props.checkToken();
    }
  }, [props.auth.loading]);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  const deleteCard = async (_id, categoryId) => {
    await props.onDeleteCard(_id, categoryId);
  };

  return (
    <ScrollView style={styles.container}>
      <BackButton goBack={() => navigation.navigate("ProjectList")} />

      <View style={styles.header}>
        <Header>{project.name}</Header>

        <Button
          mode="outlined"
          onPress={() =>
            navigation.navigate("CategoryList", {
              project: project,
            })
          }
        >
          Manage Categories
        </Button>
      </View>

      <View style={styles.scrollView}>
        <View>
          {categories &&
            categories
              .filter((el) => el.projectId === project._id)
              .map((item) => (
                <View style={styles.categories} key={item._id}>
                  <View style={styles.category}>
                    <Paragraph style={styles.categoryName}>
                      {item.category}
                    </Paragraph>

                    <Button
                      style={styles.addCard}
                      mode="outlined"
                      onPress={() =>
                        navigation.navigate("AddCard", {
                          projectId: project._id,
                          categoryId: item._id,
                        })
                      }
                    >
                      Add Card
                    </Button>

                    {item.cards.map((el) => (
                      <Block style={styles.block} key={el._id}>
                        <Card
                          item={el}
                          horizontal
                          navigation={navigation}
                          rota=""
                          onDelete={() => deleteCard(el._id, item._id)}
                          onPrepareEdit={() =>
                            navigation.navigate("EditCard", {
                              card: {
                                _id: el._id,
                                title: el.title,
                                description: el.description,
                                projectId: project._id,
                                categoryId: item._id,
                              },
                            })
                          }
                        />
                      </Block>
                    ))}
                  </View>
                </View>
              ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default connect(
  (state) => ({
    categories: state.category.categories,
    auth: state.auth,
  }),
  (dispatch) => ({
    onDeleteCard: (_id, categoryId) =>
      dispatch(actions.deleteCard(_id, categoryId)),
    checkToken: () => dispatch(actions.checkToken()),
  })
)(Project);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "auto",
    maxWidth: "100%",
    backgroundColor: theme.COLORS.BASE,
  },
  header: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 15,
  },
  categories: {
    padding: 10,
    backgroundColor: theme.COLORS.GREY,
    // marginBottom: 30,
    borderRadius: 3,
    maxWidth: "100%",
  },
  category: {
    marginTop: 10,
  },
  block: {
    // maxWidth: "100%",
    marginTop: 5,
    marginBottom: 5,
  },
  categoryName: {
    fontWeight: "bold",
    color: "#4A4A4A",
    letterSpacing: 1,
    lineHeight: 25.5,
    textAlign: "justify",
  },
  addCard: {
    marginTop: 20,
  },
});
