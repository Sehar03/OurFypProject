import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
const logoutUser = () => {
  AsyncStorage.clear();
  navigation.navigate('/login');
};

const LogoutScreen = () => {
  return (
    <TouchableOpacity onPress={logoutUser}>
      <FontAwesome name="sign-out" size={size} color={color} />
    </TouchableOpacity>
  );
};
const DrawerScreens = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomeDrawer {...props} />}
      screenOptions={({route}) => ({
        drawerIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <FontAwesome name="home" size={size} color={color} />;
          } else if (route.name === 'Login') {
            return <FontAwesome name="search" size={size} color={color} />;
          } else if (route.name === 'Signup') {
            return <FontAwesome name="search" size={size} color={color} />;
          } else if (route.name === 'Splash') {
            return <FontAwesome name="search" size={size} color={color} />;
          } else if (route.name === 'Logout') {
            return;
            // <TouchableOpacity onPress={()=>{
            //   logoutUser();
            //   // AsyncStorage.removeItem('token');

            // }}>
            <FontAwesome name="search" size={size} color={color} />;
            // </TouchableOpacity>
          }
        },
        headerShown: false,
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
        },
        drawerActiveBackgroundColor: '#4832850f',
        drawerActiveTintColor: 'black',
      })}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen name="Splash" component={Splash} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="FurtherScreens" component={FurtherScreens} />
      <Drawer.Screen name="Address" component={Address} />

      {/* <Drawer.Screen name="Logout" component={LogoutScreen} /> */}
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={AppColors.white} // Background color of the status bar
        barStyle="dark-content" // Light text color for dark backgrounds
      />

      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Drawer">
        <Stack.Screen name="Drawer" component={DrawerScreens} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="FullPriceHomeScreen"
          component={FullPriceHomeScreen}
        />
        <Stack.Screen name="FurtherScreens" component={FurtherScreens} />
        <Stack.Screen name="EditProfle" component={EditProfile} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen
          name="SingleProductDetail"
          component={SingleProductDetail}
        />
        <Stack.Screen name="FoodShareScreen" component={FoodShareScreen} />
        <Stack.Screen name="AfterSignup" component={AfterSignup} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
