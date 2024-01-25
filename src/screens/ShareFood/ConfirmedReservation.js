import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AppContext from '../../Context/AppContext';
import CartHeader from '../../components/headers/CartHeader';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import {Neomorph} from 'react-native-neomorph-shadows';
import IconStyles from '../../assets/Styles/IconStyles';

const ConfirmedReservation = ({navigation, route}) => {
  const {restaurantName, currentUser, baseUrl} = useContext(AppContext);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <CartHeader navigation={navigation} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: AppColors.primary,
            height: hp('13'),
            width: wp('27'),
            borderRadius: 100,
            // marginTop: hp('10'),
          }}>
          <MaterialCommunityIcons
            name="check"
            size={60}
            style={[IconStyles.signupIcons, {color: AppColors.white}]}
          />
        </View>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: 'Poppins-Bold',
            fontSize: hp('3'),
            color: AppColors.black,
            marginTop: hp('1.5'),
          }}>
          Successfully
        </Text>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: 'Poppins-Bold',
            fontSize: hp('3'),
            color: AppColors.black,
            top: -8,
          }}>
          Reserved Your Table!
        </Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: hp('1.8')}}>
            Reservation ID :{' '}
          </Text>
          <Text
            style={{
              color: AppColors.primary,
              fontFamily: 'Poppins-Regular',
              fontSize: hp('1.8'),
            }}>
            afjkls38
          </Text>
        </View>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate('ChatWithPartner')
        }}
  style={{
    backgroundColor: AppColors.primary,
    paddingVertical: hp('2'),
    paddingHorizontal: wp('5'),
    borderRadius: wp('2'),
    marginTop: hp('3'),
    alignItems: 'center',
  }}
>
  <Text style={{color: AppColors.white, fontFamily: 'Poppins-Bold', fontSize: hp('2')}}>
    Chat with your Partner
  </Text>
</TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmedReservation;
