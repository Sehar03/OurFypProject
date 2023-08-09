import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text} from 'react-native';
import CardComponent from '../../components/Cards/CardComponent';
import TextStyles from '../../assets/Styles/TextStyles';
import SmallCard from '../../components/Cards/SmallCard';
import LargeCard from '../../components/Cards/LargeCard';
import MainHeader from '../../components/headers/MainHeader';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SearchComponent from '../../components/SearchComponent';
import {View} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
const FullPriceHomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      {/* <StatusBar backgroundColor={AppColors.white} barStyle="dark-content" /> */}

      <MainHeader navigation={navigation} item=" Full Price Food " />
      <ScrollView>
        <SearchComponent />
        <CardComponent />
        <Text
          style={[
            TextStyles.primaryText,
            {textAlign: 'left', marginLeft: wp('5')},
          ]}>
          Food For You
        </Text>
        <SmallCard  navigation={navigation}/>
        <Text
          style={[
            TextStyles.primaryText,
            {textAlign: 'left', marginLeft: wp('5')},
          ]}>
          All Restaurants
        </Text>
        <View style={{marginBottom: hp('12')}}>
          <LargeCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FullPriceHomeScreen;
