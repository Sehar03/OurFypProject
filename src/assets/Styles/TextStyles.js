import React from 'react'
import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';

const TextStyles =StyleSheet.create({
    leftHeading:{
        marginTop: hp('7%'),
        marginLeft: wp('11%'),
        // fontWeight: '600',
        fontFamily:"Poppins-SemiBold",
        // fontWeight:"700",
        fontSize:hp('4%') ,
        marginBottom: hp('2%'),
      },
      whiteCenteredLable:{
        color:AppColors.white ,
        // fontWeight: '600',
        fontFamily:"Poppins-SemiBold",
        fontSize: hp('2.5%'),
        textAlign: 'center',
        marginTop: hp('1%'),
      },
      errorText:{
        color:AppColors.primary,
        fontFamily:'Poppins-Regular',
      fontSize:hp('1.5%'),
      marginTop:hp('0.7%')
    },
    backButtonTitle:{
       position: "absolute",
     left: wp('15%'),
     top: hp('3%'),
    fontFamily:"Poppins-SemiBold",
    color:"black"
  },
  leftText:{
    color: AppColors.black, 
    fontFamily: 'Poppins-SemiBold',
  marginTop:hp('3%'),
  marginLeft:wp('4%')
}
})

export default TextStyles