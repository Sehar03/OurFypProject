import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import Home from './src/screens/Food/Home';
import Splash from './src/screens/Splash/Splash';
import FullPriceHomeScreen from './src/screens/Food/FullPriceHomeScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppColors from './src/assets/colors/AppColors';
import CustomeDrawer from './src/components/CustomeDrawer';
import Cart from './src/screens/Cart/Cart';
import Profile from './src/screens/Profile/Profile';
import FurtherScreens from './src/screens/TabScreens/FurtherScreens';
import EditProfile from './src/screens/Profile/EditProfile';
import Address from './src/screens/Addresses/Address';
import AddAddress from './src/screens/Addresses/AddAddress';
import SingleProductDetail from './src/screens/Products/SingleProductDetail';
import FoodShareScreen from './src/screens/Food/FoodShareScreen';
import SelectedFoodScreen from './src/screens/Food/SelectedFood';
import Products from './src/screens/Products/Products';

import AfterSignup from './src/screens/Auth/AfterSignup';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DraweNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }} 
      drawerStyle={{
        width: wp('85'),
      }}
      drawerContent={CustomeDrawer}>
      <Drawer.Screen name="Main" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="FullPriceHomeScreen" component={FullPriceHomeScreen} />
      <Stack.Screen name="FurtherScreens" component={FurtherScreens} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="SingleProductDetail" component={SingleProductDetail} />
      <Stack.Screen name="FoodShareScreen" component={FoodShareScreen} />
      <Stack.Screen name="SelectedFood" component={SelectedFoodScreen} />
      <Stack.Screen name="AfterSignup" component={AfterSignup} />
    </Stack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Drawer" component={DraweNavigator} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer> 

      <AuthStackNavigator />

    </NavigationContainer>
  );
};

export default App;

