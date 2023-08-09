import React from 'react';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppColors from '../colors/AppColors';

const ImageStyles = StyleSheet.create({
  signupImage: {
    width: wp('65%'),
    height: hp('30%'),
    // borderRadius: 20
    marginTop: hp('3%'),

  },
  loginImage: {
    width: wp('65%'),
    height: hp('30%'),
    borderRadius: wp('2%'),
    marginTop: hp('6%'),
  },
  rightCornerImage: {
    height: hp('40'),
    width: hp('80'),
    marginTop: hp('12')
  },
  logoImageStyle: {
    height: hp('11.5'),
    width: wp('23'),
    borderRadius: 40,
    marginBottom: hp('2'),
    marginTop: hp('8')
  },
  advertiseImageStyle: {
    height: hp('25'),
    width: wp('40'),
    borderRadius: 10,
    marginLeft: wp('3'),
    marginTop: hp('3')
  }

});

export default ImageStyles;
