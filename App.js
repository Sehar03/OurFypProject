import 'react-native-gesture-handler';
import React from 'react';
import { Image, Text, View ,TouchableOpacity,SafeAreaView,ScrollView } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import Home from './src/screens/Food/Home';
import Splash from './src/screens/Splash/Splash';
import FullPriceHomeScreen from './src/screens/Food/FullPriceHomeScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppColors from './src/assets/colors/AppColors';
import CustomeDrawer from './src/components/CustomeDrawer';
import { FadeOutDown } from 'react-native-reanimated';
import Cart from './src/screens/Cart/Cart';
import Profile from './src/screens/Profile/Profile';
import FoodShareScreen from './src/screens/Food/FoodShareScreen';
import SelectedFoodScreen from './src/screens/Food/SelectedFood';
import FurtherScreens from './src/screens/Food/TabScreens/FurtherScreens';
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
      <Stack.Screen name="FullPriceHomeScreen" component={FullPriceHomeScreen} />
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
    
    <Drawer.Navigator drawerContent={props=><CustomeDrawer {...props}/>}
    screenOptions={({ route }) => ({ drawerIcon: ({ focused, color, size }) => {
        

      if (route.name === 'Home') {
        return <FontAwesome name="home" size={size} color={color} />;
        
      } else if (route.name === 'Login') {
        return <FontAwesome name="search" size={size} color={color} />;
      }
      else if (route.name === 'Signup') {
        return <FontAwesome name="search" size={size} color={color} />;
      }
      else if (route.name === 'Splash') {
        return <FontAwesome name="search" size={size} color={color} />;
      }
      else if (route.name === 'Logout') {
        return <FontAwesome name="search" size={size} color={color} />;
      }
    },
    headerShown:false,
    drawerLabelStyle:{
      fontFamily:"Poppins-Medium",
    },
    drawerActiveBackgroundColor:"#4832850f",
    drawerActiveTintColor:"black",
  })}
   >
    
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
        <Drawer.Screen name="Splash" component={Splash} />
        <Drawer.Screen name="Cart" component={Cart} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="FurtherScreens" component={FurtherScreens} />

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
        <Stack.Screen name="FullPriceHomeScreen" component={FullPriceHomeScreen} />
        <Stack.Screen name="FoodShareScreen" component={FoodShareScreen} />
        <Stack.Screen name="SelectedFood" component={SelectedFoodScreen} />
        <Stack.Screen name="Food" component={FoodStack} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
