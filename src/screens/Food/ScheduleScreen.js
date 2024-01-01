import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView,FlatList,Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProfileHeader from '../../components/headers/ProfileHeader';
import TextStyles from '../../assets/Styles/TextStyles';
import AppColors from '../../assets/colors/AppColors';
import AppContext from '../../Context/AppContext';
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
      setMySchedule(response.data);
      console.log('sjfljsljfljljflkj',response.data)
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
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <FlatList
        data={mySchedule}
        renderItem={({item}) => {
          return ( <ScheduleScreenCard navigation={navigation} item={item} setMySchedule={setMySchedule}/>
            
          );
        }}
      />
    </SafeAreaView>
  );
};
const SharedFood = ({navigation}) => {
  const { baseUrl} = useContext(AppContext);
  const [allSharedFood,setAllSharedFood] = useState([]);
  
  const viewAllSharedFoodProducts = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewAllSharedFoodProducts`);
      setAllSharedFood(response.data);
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
const ScheduleScreen = ({navigation}) => {
  return(
  <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
  <TabScreensHeader  navigation={navigation} />
  <Tab.Navigator 
   initialRouteName="MySharedFood"// Set the initial route based on categoryName
    screenOptions={TabBarStyles.customTabBar}>

    <Tab.Screen name="MySharedFood" component={MySharedFood} />
    <Tab.Screen name="SharedFood" component={SharedFood} />

  </Tab.Navigator>
</SafeAreaView>
  )
}
export default ScheduleScreen;
