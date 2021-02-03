import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/core/theme";
import App from "./src";

import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

// REDUCERS

import rootReducer from "./src/store/reducers";

const composeEnhancers = compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default class Index extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false,
  };

  render() {
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </Provider>
    );
  }

  _loadResourcesAsync = async () => {
    this.setState({ fontLoaded: true });
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
