import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Login, Home, ProjectList } from "./screens";

const Router = createStackNavigator(
  {
    Login,
    Home,
    ProjectList,
  },
  {
    initialRouteName: "ProjectList",
    headerMode: "none",
  }
);

export default createAppContainer(Router);
