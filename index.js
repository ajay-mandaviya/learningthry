/**
 * @format
 */

if (__DEV__) {
    // for reactotron help for debugging and network requests
    require("./ReactotronConfig");
  }

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
