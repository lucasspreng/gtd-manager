import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Login, Home } from "./screens";

const Router = createStackNavigator(
  {
    Login,
    Home,
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
  }
);

export default createAppContainer(Router);
