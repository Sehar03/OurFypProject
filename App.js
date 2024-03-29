import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import Home from './src/screens/Food/Home';
import Splash from './src/screens/Splash/Splash';
import FullPriceHomeScreen from './src/screens/Food/FullPriceHomeScreen';
import CustomeDrawer from './src/components/CustomeDrawer';
import Cart from './src/screens/Cart/Cart';
import Profile from './src/screens/Profile/Profile';
import FurtherScreens from './src/screens/TabScreens/FurtherScreens';
import EditProfile from './src/screens/Profile/EditProfile';
import Address from './src/screens/Addresses/Address';
import AddAddress from './src/screens/Addresses/AddAddress';
import SingleProductDetail from './src/screens/Products/SingleProductDetail';
import FoodShareScreen from './src/screens/ShareFood/FoodShareScreen';
import Products from './src/screens/Products/Products';
import AfterSignup from './src/screens/Auth/AfterSignup';
import ForgetPassword from './src/screens/Auth/ForgetPassword';
import DonateHome from './src/screens/DonateFood/DonateHome';
import Donor from './src/screens/DonateFood/Donor';
import Recipient from './src/screens/DonateFood/Recipient';
import { AppProvider } from './src/Context/AppContext';
import ScheduleScreen from './src/screens/ShareFood/ScheduleScreen';
import Notification from './src/screens/Notification/Notification';
import Orders from './src/screens/Orders/Orders';
import OngoingOrder from './src/screens/Orders/OngoingOrder';
import Setting from './src/screens/Setting/Setting';
import Checkout from './src/screens/Orders/Checkout';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import YourOrder from './src/screens/Orders/YourOrder';
import OrderDetail from './src/screens/Orders/OrderDetail';
import TrackOrderStatus from './src/screens/Orders/TrackOrderStatus';
import SingleSharedFoodDetail from './src/screens/ShareFood/SingleSharedFoodDetail';
import CheckOutReservation from './src/screens/ShareFood/CheckOutReservation';
import ConfirmedReservation from './src/screens/ShareFood/ConfirmedReservation';
import ChatWithPartner from './src/screens/ShareFood/ChatWithPartner';
import PrivacyPolicy from './src/screens/Setting/PrivacyPolicy';
import TermsOfUse from './src/screens/Setting/TermsOfUse';
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
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
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
      <Stack.Screen name="AfterSignup" component={AfterSignup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="DonateHome" component={DonateHome} />
      <Stack.Screen name="Donor" component={Donor} />
      <Stack.Screen name="Recipient" component={Recipient} />
      <Stack.Screen name="FoodShareScreen" component={FoodShareScreen} />
      <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
      <Stack.Screen name="SingleSharedFoodDetail" component={SingleSharedFoodDetail} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OngoingOrder" component={OngoingOrder} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="YourOrder" component={YourOrder} />
      <Stack.Screen name='OrderDetail' component={OrderDetail}/>
      <Stack.Screen name='TrackOrderStatus' component={TrackOrderStatus} />
      <Stack.Screen name='CheckOutReservation' component={CheckOutReservation}/>
      <Stack.Screen name='ConfirmedReservation' component={ConfirmedReservation}/>
      <Stack.Screen name='ChatWithPartner' component={ChatWithPartner}/>
      <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
      <Stack.Screen name='TermsOfUse' component={TermsOfUse} />

    </Stack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Drawer" component={DraweNavigator} />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(()=>{
    getDeviceToken();
  },[]);
  const getDeviceToken= async ()=>{
  let token = await messaging().getToken();
  console.log("This is FCM Token:",token);
  }
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  return (
    <AppProvider>
    <NavigationContainer> 

      <AuthStackNavigator />

    </NavigationContainer>
    </AppProvider>
  );
};

export default App;

