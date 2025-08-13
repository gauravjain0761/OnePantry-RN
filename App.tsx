import "react-native-gesture-handler";
import { LogBox } from "react-native";
import React from "react";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./src/Store";
import RootStack from "./src/Navigations/RootStack";
import Providers from "./src/Providers/index";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const persister = persistStore(store);
const App = () => {
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    "Require cycle:",
  ]);
  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <RootStack />
          </PersistGate>
          <FlashMessage position="bottom" icon="auto" />
        </Provider>
      </Providers>
    </GestureHandlerRootView>
  );
};
export default App;
