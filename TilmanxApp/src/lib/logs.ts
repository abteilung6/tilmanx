import {LogBox} from 'react-native';

export const ignoreLogs = (): void => {
  // Caused by react-navigation package.
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);
};
