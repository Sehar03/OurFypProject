import React from 'react';
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';

const ImageStyles = StyleSheet.create({
  signupImage: {
    width: wp('80%'),
   height: hp('28%'),
    borderRadius: 20
},
loginImage:{ 
    width: wp('80%'),
 height: hp('30%'),
borderRadius:20 ,
marginTop:30
}
});

export default ImageStyles;
