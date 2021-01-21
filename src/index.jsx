import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import {
  Login,
  Home,
  ProjectList,
  Project,
  CategoryList,
  AddCard,
  EditCard,
} from "./screens";

const Router = createStackNavigator(
  {
    Login,
    Home,
    ProjectList,
    Project,
    CategoryList,
    AddCard,
    EditCard,
  },
  {
    initialRouteName: "ProjectList",
    headerMode: "none",
  }
);

export default createAppContainer(Router);
