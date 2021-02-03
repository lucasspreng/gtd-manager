import * as actionTypes from "../actions/actionTypes";
import update from "immutability-helper";

const initialState = {
  categories: [],
};

const reducer = (state = initialState, action) => {
  let categoryIndex;
  let cardIndex;

  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return update(state, { categories: { $set: action.payload } });
    case actionTypes.CATEGORY_CREATE:
      return update(state, {
        categories: {
          $push: [{ ...action.payload }],
        },
      });
    case actionTypes.CATEGORY_DELETE:
      return update(state, {
        categories: {
          $apply: (list) => list.filter((el) => el._id !== action.payload),
        },
      });
    case actionTypes.CATEGORY_UPDATE:
      categoryIndex = state.categories.findIndex(
        (el) => el._id === action.payload._id
      );
      return update(state, {
        categories: { [categoryIndex]: { $merge: action.payload } },
      });

    case actionTypes.CARD_CREATE:
      categoryIndex = state.categories.findIndex(
        (el) => el._id === action.payload.categoryId
      );

      return update(state, {
        categories: {
          [categoryIndex]: {
            cards: {
              $push: [{ ...action.payload }],
            },
          },
        },
      });

    case actionTypes.CARD_DELETE:
      categoryIndex = state.categories.findIndex(
        (el) => el._id === action.payload.categoryId
      );

      return update(state, {
        categories: {
          [categoryIndex]: {
            cards: {
              $apply: (list) =>
                list.filter((el) => el._id !== action.payload._id),
            },
          },
        },
      });

    case actionTypes.CARD_UPDATE:
      categoryIndex = state.categories.findIndex(
        (el) => el._id === action.payload.categoryId
      );

      cardIndex = state.categories[categoryIndex].cards.findIndex(
        (el) => el._id === action.payload._id
      );

      return update(state, {
        categories: {
          [categoryIndex]: {
            cards: { [cardIndex]: { $merge: action.payload } },
          },
        },
      });
    default:
      return state;
  }
};

export default reducer;
