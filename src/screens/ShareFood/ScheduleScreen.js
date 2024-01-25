import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView,FlatList,Text, View} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import AppContext from '../../Context/AppContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScheduleScreenCard from '../../components/Cards/ScheduleScreenCard';
import TabBarStyles from '../../assets/Styles/TabBarStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabScreensHeader from '../../components/headers/TabScreensHeader';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import SharedFoodCard from '../../components/Cards/SharedFoodCard';

const Tab = createMaterialTopTabNavigator();

const MySharedFood = ({navigation}) => {
  const { baseUrl, currentUser } = useContext(AppContext);
  const [mySchedule,setMySchedule] = useState([]);
  const viewAllShareFoodProducts = async () => {
    try {
      const response = await axios.post(

        `${baseUrl}/viewAllShareFoodProducts/${currentUser.userId}`,
      );
      const pendingReservation = response.data.filter(order => order.status === 'Pending');
      setMySchedule(pendingReservation);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      viewAllShareFoodProducts();
    }, [currentUser.userId]),
  );

 
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: AppColors.white}}>
      <FlatList
        data={mySchedule}
        renderItem={({item}) => {
          return ( <ScheduleScreenCard navigation={navigation} item={item} setMySchedule={setMySchedule} />
          
          );
          
        }}
      />
      
    </SafeAreaView>
  );
};
const SharedFood = ({navigation}) => {
  const { baseUrl,currentUser} = useContext(AppContext);
  const [allSharedFood,setAllSharedFood] = useState([]);
  
  const viewAllSharedFoodProducts = async () => {
    try {
      const response = await axios.post(

        `${baseUrl}/viewAllSharedFoodProducts/${currentUser.userId}`,
      );
      const pendingReservation = response.data.filter(order => order.status === 'Pending');
      setAllSharedFood(pendingReservation);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    viewAllSharedFoodProducts();
  }, []);
 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <FlatList
        data={allSharedFood}
        renderItem={({item}) => {
          return ( <SharedFoodCard  navigation={navigation}  item={item} />
            
          );
        }}
      />
    </SafeAreaView>
  );
};



const ConfirmedShareFood = ({navigation}) => {
  const { baseUrl,currentUser} = useContext(AppContext);
  const [allSharedFood,setAllSharedFood] = useState([]);
  
  const ConfirmedShareFood = async () => {
    try {
      const response = await axios.post(

        `${baseUrl}/viewAllShareFoodProducts/${currentUser.userId}`,
      );
      const pendingReservation = response.data.filter(order => order.status === 'Ongoing');
      setAllSharedFood(pendingReservation);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    ConfirmedShareFood();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <FlatList
        data={allSharedFood}
        renderItem={({item}) => {
          return ( <SharedFoodCard  navigation={navigation}  item={item} />
            
          );
        }}
      />
    </SafeAreaView>
  );
};

  const CompletedShareFood = ({navigation}) => {
    const { baseUrl,currentUser} = useContext(AppContext);
    const [allSharedFood,setAllSharedFood] = useState([]);
    
    const CompletedShareFood = async () => {
      try {
        const response = await axios.post(
  
          `${baseUrl}/viewAllShareFoodProducts/${currentUser.userId}`,
        );
        const completedReservation = response.data.filter(order => order.status === 'Completed');
        setAllSharedFood(completedReservation);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    useEffect(() => {
      CompletedShareFood();
    }, []);
 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <FlatList
        data={allSharedFood}
        renderItem={({item}) => {
          return ( <SharedFoodCard  navigation={navigation}  item={item} />
            
          );
        }}
      />
    </SafeAreaView>
  );
};
const ScheduleScreen = ({navigation}) => {
  return(
  <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
  <TabScreensHeader  navigation={navigation}  title ="Share Food"/>
  <Tab.Navigator 
   initialRouteName="MySharedFood"// Set the initial route based on categoryName
    screenOptions={TabBarStyles.customTabBar}>
    <Tab.Screen name="MyFood" component={MySharedFood} />
    <Tab.Screen name="SharedFood" component={SharedFood} />
    <Tab.Screen name="ConfirmedFood" component={ConfirmedShareFood} />
    <Tab.Screen name="Completed" component={CompletedShareFood} />
  </Tab.Navigator>
</SafeAreaView>
  )
}
export default ScheduleScreen;
