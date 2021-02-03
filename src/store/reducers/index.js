import { combineReducers } from "redux";
import authReducer from "./auth";
import projectReducer from "./project";
import categoryReducer from "./category";

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  category: categoryReducer,
});
