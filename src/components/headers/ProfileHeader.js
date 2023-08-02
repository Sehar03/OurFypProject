import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AppColors from '../../assets/colors/AppColors';
import TextStyles from '../../assets/Styles/TextStyles';

const ProfileHeader = ({item, navigation}) => {
  return (
    <View style={{backgroundColor:AppColors.background,height:hp('8'),width:wp('100'),flexDirection:"row"}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <AntDesign name="close" size={wp('7')} style={{color:AppColors.primary,marginTop:hp('3%'),marginLeft:wp('6%')}}/>
      </TouchableOpacity>
      <Text style={[TextStyles.cartTextStyle]}>{item}</Text>
    </View>
  );
};
export default ProfileHeader;

