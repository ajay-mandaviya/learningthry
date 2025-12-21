import React, { useState } from 'react';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import RootStack from './src/navigation/RootStack';
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store, { persistor } from './src/redux/store';
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator,  } from 'react-native';
import { ErrorBoundary } from './src/components';

const App = () => {
  const [login, setIsLoading]= useState(false)

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={<ActivityIndicator size="large" color="#0000ff" />} persistor={persistor}>
          <RootStack />
          </PersistGate>
        </Provider>
      </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}





export default App;
