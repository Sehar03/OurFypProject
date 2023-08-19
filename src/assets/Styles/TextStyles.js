import React from 'react';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';

const TextStyles = StyleSheet.create({
  leftHeading: {
    marginTop: hp('7%'),
    marginLeft: wp('11%'),
    // fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    // fontWeight:"700",
    fontSize: hp('4%'),
    marginBottom: hp('2%'),
  },
  whiteCenteredLable: {
    color: AppColors.white,
    // fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp('2.5%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  whiteMediumHeading: {
    color: 'white',
    fontSize: hp('3'),
    marginLeft: wp('19'),
    marginTop: hp('2'),
    fontFamily:"Poppins-Medium"
  },
  primaryText: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: hp('3.4'),
    textAlign: 'center',
    margin: 10,
    marginBottom: 0,
  },
  smallText: {
    color: AppColors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: hp('1.7'),
    marginLeft: wp('4'),
  },
  mediumTextStyle: {
    fontSize: hp('2.1'),
    fontFamily: 'Poppins-Medium',
    marginLeft: wp('6'),
  },
  errorText: {
    color: AppColors.primary,
    fontFamily: 'Poppins-Regular',
    fontSize: hp('1.5%'),
    marginTop: hp('0.7%'),
  },
  backButtonTitle: {
    position: 'absolute',
    left: wp('15%'),
    top: hp('3%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  leftText: {
    color: AppColors.black,
    fontFamily: 'Poppins-SemiBold',
    marginTop: hp('2%'),
    marginLeft: wp('4%'),
  },
  leftMediumText: {
    color: AppColors.black,
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp('3%'),
    marginTop: hp('1%'),
    marginLeft: wp('4%'),
  },
  leftSmallText: {
    color: AppColors.black,
    fontFamily: 'Poppins-Regular',
    marginLeft: wp('4%'),
  },
  popularFoodLabel: {
    color: AppColors.white,
    fontFamily: 'Poppins-SemiBold',
    marginTop: hp('2%'),
    marginLeft: wp('5%'),
  },
  simpleText: {
    color: AppColors.black,
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp('1.9'),
  },

  fetchTextStyle: {
    fontFamily: 'Poppins-Medium',
    marginLeft: wp('5'),
  },

  whiteCenteredLable2: {
    color: AppColors.white,
    // fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp('2%'),
    // textAlign: 'center',
    marginTop: hp('1.9%'),
  },
  simpleText2: {
    marginTop: hp('3%'),
    marginLeft: wp('6'),
    color: AppColors.black,
    fontFamily: 'Poppins-Regular',
  },
  cartTextStyle: {
    color: 'black',
    fontSize: hp('3%'),
    marginLeft: wp('8%'),
    fontFamily: 'Poppins-SemiBold',
    marginTop: hp('2.4%'),
  },
  text3: {
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.primary,
    fontSize: hp('2.1'),
    marginLeft: wp('4'),
    letterSpacing: -1,
    marginTop: hp('3')
  },
  profileSimpleText: {

    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('8'),  
    marginTop: hp('2'),
    fontSize: hp('2.5'),
    marginTop: hp('4'),
    letterSpacing: -1,
    color: AppColors.black

  },
  profileTextStyle: {
    color: "black", 
    fontSize: hp('2.2%'), 
    marginLeft: wp('7%'), 
    fontFamily: "Poppins-SemiBold",
     marginTop: hp('2.4%'),
  },
  productsLeftText:{
    fontFamily:"Poppins-Regular",
    marginTop:hp('1'),
    marginLeft:wp('4'),
    
  },
  dealText: {
    fontFamily: 'Poppins-Regular',
    marginLeft: wp('4%'),
  },
  dealPriceText: {
    color: AppColors.black,
    fontFamily: 'Poppins-Regular',
    // fontSize: hp('1.7'),
    marginLeft:wp('4%')
  },
  whiteCenteredLable3: {
    color: AppColors.white,
    // fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    // fontSize: hp('2.5%'),
    textAlign: 'center',
    marginTop: hp('2%'),
  },
});

export default TextStyles;
