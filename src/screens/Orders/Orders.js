import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import CartHeader from '../../components/headers/CartHeader';
import ImageStyles from '../../assets/Styles/ImageStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabBarStyles from '../../assets/Styles/TabBarStyles';

import { Neomorph } from 'react-native-neomorph-shadows';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import AppContext from '../../Context/AppContext';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import axios from 'axios';
import ProfileHeader from '../../components/headers/ProfileHeader';
import OrderCard from '../../components/Cards/OrderCard';
const Tab = createMaterialTopTabNavigator();





          
const ActiveOrders = ({ navigation }) => {
  const { baseUrl, currentUser } = useContext(AppContext);
  const [activeOrderCards, setActiveOrderCards] = useState([]);
  const [visibleActiveOrders, setVisibleActiveOrders] = useState(6);
  const [hiddenActiveOrders, setHiddenActiveOrders] = useState([]);

  const viewActiveOrders = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewCustomerOrder/${currentUser.userId}`, {
        status: 'New Order',
      });
      const allActiveOrders = response.data.filter(
        (order) => order.status === 'New Order' || order.status === 'Preparing Order' || order.status === 'Ongoing Order'
      );

      setActiveOrderCards(allActiveOrders.slice(0, visibleActiveOrders));
      setHiddenActiveOrders(allActiveOrders.slice(visibleActiveOrders));
    } catch (error) {
      console.error('Error fetching Active orders:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      viewActiveOrders();
    }, []),
  )
  useEffect(() => {
    viewActiveOrders();
  }, []);

  const route = useRoute();
  const handleLoadMoreActiveOrders = () => {
    setVisibleActiveOrders((prevVisibleOrders) => prevVisibleOrders + 6);
    setActiveOrderCards((prevVisibleOrders) => [
      ...prevVisibleOrders,
      ...hiddenActiveOrders.slice(0, 6),
    ]);
    setHiddenActiveOrders((prevHiddenOrders) => prevHiddenOrders.slice(6));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      {activeOrderCards.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No Active orders at the moment.</Text>
        </View>
      ) : (
        <FlatList
          data={activeOrderCards}
          renderItem={({ item }) => {
            return (
              <OrderCard navigation={navigation} item={item} currentOrderRoute={route.name} />
            );
          }}
        />
      )}

      {hiddenActiveOrders.length > 0 && (
        <TouchableOpacity
          onPress={handleLoadMoreActiveOrders}
          style={{ padding: 5, alignItems: 'center'}}
        >
          <Text style={{ fontFamily: 'Poppins-Regular',fontSize:hp('1.9'),color:AppColors.primary
}}>View More...</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const PastOrders = ({ navigation }) => {
  const { baseUrl, currentUser } = useContext(AppContext);
  const [pastOrderCards, setPastOrderCards] = useState([]);
  const [visiblePastOrders, setVisiblePastOrders] = useState(6);
  const [hiddenPastOrders, setHiddenPastOrders] = useState([]);

  const viewPastOrders = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewCustomerOrder/${currentUser.userId}`, {
        status: 'Order Past',
      });
      const allPastOrders = response.data.filter(
        (order) => order.status === 'Order Delivered' || order.status === 'Order Cancelled'
      );

      setPastOrderCards(allPastOrders.slice(0, visiblePastOrders));
      setHiddenPastOrders(allPastOrders.slice(visiblePastOrders));
    } catch (error) {
      console.error('Error fetching past orders:', error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      viewPastOrders();
    }, []),
  );
  useEffect(() => {
    viewPastOrders();
  }, []);



  const route = useRoute();
  const handleLoadMorePastOrders = () => {
    setVisiblePastOrders((prevVisibleOrders) => prevVisibleOrders + 6);
    setPastOrderCards((prevVisibleOrders) => [
      ...prevVisibleOrders,
      ...hiddenPastOrders.slice(0, 6),
    ]);
    setHiddenPastOrders((prevHiddenOrders) => prevHiddenOrders.slice(6));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      {pastOrderCards.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No orders have been canceled yet.</Text>
        </View>
      ) : (
        <FlatList
          data={pastOrderCards}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={({ item }) => {
            return (
              <OrderCard navigation={navigation} item={item} currentOrderRoute={route.name} />
            );
          }}
        />
      )}

      {hiddenPastOrders.length > 0 && (
        <TouchableOpacity
          onPress={handleLoadMorePastOrders}
          style={{ padding: 10, alignItems: 'center' }}
        >
          <Text>View More...</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
const Orders = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: AppColors.white, flex: 1 }}>
      <ProfileHeader navigation={navigation} item="Our Order's" />
      <Tab.Navigator screenOptions={TabBarStyles.customTabBar}>
        <Tab.Screen name="ActiveOrders" component={ActiveOrders} />
        <Tab.Screen name="PastOrders" component={PastOrders} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Orders;

