import React from "react";
import { Text } from "react-native";
import { theme } from "../../utils/constants";
import Block from "../../components/Block";
import styles from "./style";

class Card extends React.Component {
  render() {
    const {
      item,
      horizontal,
      style,
      titleStyle,
      onDelete,
      onPrepareEdit,
    } = this.props;

    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];

    const blockItem = (item, isView) => {
      if (isView && item && item !== "") {
        return (
          <Block>
            <Text style={titleStyles} size={12} color={theme.COLORS.BLACK}>
              {item}
            </Text>
          </Block>
        );
      }

      return null;
    };

    const actionsButton = () => {
      return (
        <>
          <Block flex right={true}>
            <Text
              style={styles.buttonEditar}
              size={12}
              bold
              onPress={onPrepareEdit}
            >
              Editar
            </Text>
          </Block>

          <Block flex left={true}>
            <Text
              style={styles.buttonExcluir}
              size={12}
              bold
              onPress={onDelete}
            >
              Excluir
            </Text>
          </Block>
        </>
      );
    };

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <Block flex space="between" style={styles.cardDescription}>
          {blockItem(item.name, true)}
          {blockItem(item.description, true)}

          <Block row space="between">
            {actionsButton()}
          </Block>
        </Block>
      </Block>
    );
  }
}

export default Card;
