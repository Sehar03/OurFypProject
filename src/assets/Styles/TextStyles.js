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
      whiteMediumHeading:{
        color:"white",
        fontSize:hp('3'),
        marginLeft:wp('25'),
        marginTop:hp('2')
      },
      primaryText:{
        color:"black",
        fontFamily: 'Poppins-Medium',
        fontSize:hp('3.4'),
        textAlign:"center",
        margin:10,
        marginBottom:0
       
      },
      smallText:{
        color:"black",
        fontFamily: 'Poppins-Regular',
        fontSize:hp('1.7'),
        marginLeft:wp('4')
      },
     mediumTextStyle:{
        fontSize: hp('2.1'),
        fontFamily: 'Poppins-Medium',
        marginLeft: wp('6'),
      
     },
     
})

export default TextStyles