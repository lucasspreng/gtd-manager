import React, { memo, useState } from "react";
import Header from "../components/Header";
import { Button, Paragraph } from "react-native-paper";
import { StyleSheet } from "react-native";
import BackButton from "../components/BackButton";
import { View } from "react-native-web";
import Block from "../components/Block";
import Card from "../components/Card";
import { theme } from "../utils/constants";

const Project = ({ navigation }) => {
  const project =
    navigation.state.params && navigation.state.params.project
      ? navigation.state.params.project
      : {
          _id: 0,
          name: "Uninformed",
        };

  const [categories, setCategories] = useState([
    {
      _id: 1,
      category: "Category 01",
      cards: [
        {
          _id: 1,
          name: "Card 01",
          description: "Description...",
        },
        {
          _id: 2,
          name: "Card 02",
          description: "Description...",
        },
      ],
    },
    {
      _id: 2,
      category: "Category 02",
      cards: [
        {
          _id: 1,
          name: "Card 01",
          description: "Description...",
        },
      ],
    },
  ]);

  const deleteCard = (indexCategory, card) => {
    categories[indexCategory].cards = categories[indexCategory].cards.filter(
      (item) => item._id !== card._id
    );

    setCategories([...categories]);
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={() => navigation.navigate("ProjectList")} />
      <View style={styles.header}>
        <Header>{project.name}</Header>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate("CategoryList")}
        >
          Manage Categories
        </Button>

        <Button
          style={styles.addCard}
          mode="outlined"
          onPress={() => navigation.navigate("AddCard")}
        >
          Add Card
        </Button>
      </View>

      <View style={styles.categories}>
        {categories.map(
          (item, index) =>
            item.cards.length > 0 && (
              <View style={styles.category} key={item._id}>
                <Paragraph style={styles.categoryName}>
                  {item.category}
                </Paragraph>

                {item.cards.map((el) => (
                  <Block style={styles.block} key={el._id}>
                    <Card
                      item={el}
                      horizontal
                      navigation={navigation}
                      rota=""
                      onDelete={() => deleteCard(index, el)}
                      onPrepareEdit={() =>
                        navigation.navigate("EditCard", {
                          card: {
                            name: el.name,
                            description: el.description,
                          },
                        })
                      }
                    />
                  </Block>
                ))}
              </View>
            )
        )}
      </View>
    </View>
  );
};

export default memo(Project);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    backgroundColor: theme.COLORS.BASE,
  },
  header: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 30,
  },
  categories: {
    padding: 10,
    backgroundColor: theme.COLORS.GREY,
    borderRadius: 3,
  },
  category: {
    marginTop: 10,
  },
  block: {
    maxWidth: "100%",
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
