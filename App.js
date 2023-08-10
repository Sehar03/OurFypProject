import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
} from 'react-native';
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
      else if (route.name === 'Profile') {
        return <FontAwesome name="search" size={size} color={color} />;
      }
      else if (route.name === 'Address') {
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
        <Drawer.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Address" component={Address} />

    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
 
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Drawer">
        <Stack.Screen name="Drawer" component={DrawerScreens} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="FullPriceHomeScreen"component={FullPriceHomeScreen}/>
        <Stack.Screen name="FurtherScreens" component={FurtherScreens} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="SingleProductDetail" component={SingleProductDetail} />
        <Stack.Screen name="FoodShareScreen" component={FoodShareScreen} />
        <Stack.Screen name="SelectedFood" component={SelectedFoodScreen} />
        <Stack.Screen name="Cart" component={Cart} />
     </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
