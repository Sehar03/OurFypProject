import 'react-native-gesture-handler';
import React from 'react';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import Home from './src/screens/Food/Home';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const DrawerScreens = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Drawer">
        <Stack.Screen name="Drawer" component={DrawerScreens} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Auth" component={AuthStack} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
