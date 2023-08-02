import 'react-native-gesture-handler';
import React from 'react';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import Home from './src/screens/Food/Home';
import Splash from './src/screens/Splash/Splash';
import Cart from './src/screens/Cart/Cart';
import Profile from './src/screens/Profile/Profile';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const MyTabs=()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const FoodStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Pizza" component={Pizza} />
        <Stack.Screen name="Biryani" component={Biryani} />
    </Stack.Navigator>
  );
};

const DrawerScreens = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
        <Drawer.Screen name="Splash" component={Splash} />
        <Drawer.Screen name="Cart" component={Cart} />
        <Drawer.Screen name="Profile" component={Profile} />

    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FoodStack">
        <Stack.Screen name="Drawer" component={DrawerScreens} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Food" component={FoodStack} />
        <Stack.Screen name="FurtherScreens" component={FurtherScreens} />
        



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
