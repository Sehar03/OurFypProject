
import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import AdvertiseCard from '../../components/Cards/AdvertiseCard';
import TextStyles from '../../assets/Styles/TextStyles';
import SmallCard from '../../components/Cards/SmallCard';
import LargeCard from '../../components/Cards/LargeCard';
import MainHeader from '../../components/headers/MainHeader';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SearchComponent from '../../components/SearchComponent';
import AppColors from '../../assets/colors/AppColors';
const FoodShareScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: AppColors.white }}>
      <MainHeader navigation={navigation} item="Share Food" />
      <ScrollView>
        <SearchComponent />
       
      </ScrollView>
    </SafeAreaView>
  )
}


export default FoodShareScreen;
