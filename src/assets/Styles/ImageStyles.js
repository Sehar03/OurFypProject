import React from 'react';
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../colors/AppColors';

const ImageStyles = StyleSheet.create({
  signupImage: {
    width: wp('65%'),
   height: hp('30%'),
    // borderRadius: 20
    marginTop:hp('3%'),

},
loginImage:{ 
    width: wp('65%'),
 height: hp('30%'),
borderRadius:wp('2%') ,
marginTop:hp('6%'),
}
});

export default ImageStyles;
