import React from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import AppColors from '../../../assets/colors/AppColors';
import BackButtonHeader from '../../../components/headers/BackButtonHeader';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Pizza from './Pizza';
import Biryani from './Biryani';
import Burger from './Burger';
import Shawarma from './Shawarma';
import Pasta from './Pasta';
import Chinese from './Chinese';
const Tab = createMaterialTopTabNavigator();

const FurtherScreens = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <BackButtonHeader title="Biryani" navigation={navigation} />
      {/* <Text style={{color:AppColors.primary}}>Biryani</Text> */}
      {/* {MyTabs()} */}
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: AppColors.primary, // Color of the active tab label
          inactiveTintColor: 'black', // Color of the inactive tab label
          labelStyle: {fontFamily: 'Poppins-SemiBold', textTransform: 'none'}, // Style for the tab labels
          indicatorStyle: {backgroundColor: AppColors.primary}, // Style for the tab indicator
          style: {backgroundColor: 'white'}, // Style for the tab bar container
          tabStyle: {width: wp('35%')}, // Style for individual tab
          scrollEnabled: true, // Enable horizontal scrolling for tabs
        }}>
        <Tab.Screen name="Pizza" component={Pizza} />
        <Tab.Screen name="Burger" component={Burger} />
        <Tab.Screen name="Shawarma" component={Shawarma} /> 
        <Tab.Screen name="Biryani" component={Biryani} />
        <Tab.Screen name="Pasta" component={Pasta} />
        <Tab.Screen name="Chinese" component={Chinese} />

      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default FurtherScreens;
