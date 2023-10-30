import React, {useContext} from 'react';
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
const Tab = createMaterialTopTabNavigator();

const MySharedFood = ({navigation}) => {
  const {mySchedule} = useContext(AppContext);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <FlatList
        data={mySchedule}
        renderItem={({item}) => {
          return ( <ScheduleScreenCard item={item} />
            
          );
        }}
      />
    </SafeAreaView>
  );
};
const SharedFood = ({navigation}) => {
  const {mySchedule} = useContext(AppContext);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <FlatList
        data={mySchedule}
        renderItem={({item}) => {
          return ( <ScheduleScreenCard item={item} />
            
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
          initialRouteName={MySharedFood} // Set the initial route based on categoryName
    screenOptions={TabBarStyles.customTabBar}>
    <Tab.Screen name="MySharedFood" component={MySharedFood} />
    <Tab.Screen name="SharedFood" component={SharedFood} />

  </Tab.Navigator>
</SafeAreaView>
  )
}
export default ScheduleScreen;
