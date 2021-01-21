import { theme } from "../../utils/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
    color: "#4A4A4A",
    letterSpacing: 1,
    lineHeight: 25.5,
    textAlign: "justify",
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
    width: "100%",
  },
  shadow: {
    shadowColor: "#8898AA",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  buttonEditar: {
    color: theme.COLORS.PRIMARY,
    paddingHorizontal: 9,
    paddingVertical: 7,
    backgroundColor: theme.COLORS.GREY,
    opacity: 1,
    borderRadius: 5,
    borderColor: theme.COLORS.GREY,
    borderWidth: 1,
    justifyContent: "center",
    marginRight: 15,
  },
  buttonExcluir: {
    color: theme.COLORS.DANGER,
    paddingHorizontal: 9,
    paddingVertical: 7,
    backgroundColor: theme.COLORS.GREY,
    opacity: 1,
    borderRadius: 5,
    borderColor: theme.COLORS.GREY,
    borderWidth: 1,
    justifyContent: "center",
  },
});

export default styles;
