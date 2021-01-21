import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Login, Home, ProjectList, Project, CategoryList } from "./screens";

const Router = createStackNavigator(
  {
    Login,
    Home,
    ProjectList,
    Project,
    CategoryList,
  },
  {
    initialRouteName: "Project",
    headerMode: "none",
  }
);

export default createAppContainer(Router);
