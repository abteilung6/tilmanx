/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';

import App from './src/App';
import {name as appName} from './app.json';
import {ignoreLogs} from './src/lib/logs';

// First level modules here
ignoreLogs();

AppRegistry.registerComponent(appName, () => App);
