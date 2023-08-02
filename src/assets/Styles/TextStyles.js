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
        // textAlign: 'center',
        marginTop: hp('1%'),
      },
      cartTextStyle:{
        color:"black", fontSize:hp('3%'), marginLeft:wp('7%'),fontFamily:"Poppins-SemiBold",marginTop:hp('2%')

      },
      whiteCenteredLable2:{
        color:AppColors.white ,
        // fontWeight: '600',
        fontFamily:"Poppins-SemiBold",
        fontSize: hp('2%'),
        // textAlign: 'center',
        marginTop: hp('1.9%'),}

})

export default TextStyles