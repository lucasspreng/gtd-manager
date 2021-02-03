import * as actionTypes from "../actions/actionTypes";
import update from "immutability-helper";

const initialState = {
  projects: [],
};

const reducer = (state = initialState, action) => {
  let projectIndex;

  switch (action.type) {
    case actionTypes.SET_PROJECTS:
      return update(state, { projects: { $set: action.payload } });
    case actionTypes.PROJECT_CREATE:
      return update(state, {
        projects: {
          $push: [{ ...action.payload }],
        },
      });
    case actionTypes.PROJECT_DELETE:
      return update(state, {
        projects: {
          $apply: (list) => list.filter((el) => el._id !== action.payload),
        },
      });
    case actionTypes.PROJECT_UPDATE:
      projectIndex = state.projects.findIndex(
        (el) => el._id === action.payload._id
      );
      return update(state, {
        projects: { [projectIndex]: { $merge: action.payload } },
      });
    default:
      return state;
  }
};

export default reducer;
