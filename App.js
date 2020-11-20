import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/core/theme";
import App from "./src";

export default function Index() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
