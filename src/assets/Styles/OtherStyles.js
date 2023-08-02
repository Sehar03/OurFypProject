import React from 'react'
import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';

const OtherStyles =StyleSheet.create({
    cartImage:{
        width: hp('10'),marginLeft: wp('3'),marginTop: hp('2'),borderRadius:wp('2'),
        height: hp('10'),borderWidth:4
    },
    text:{
        fontFamily:"poppins-Thin",color:AppColors.primary,fontSize:hp('2.5')
    },
    text2:{fontFamily:"poppins-Thin",color:AppColors.primary,fontSize:hp('2'),marginHorizontal:wp('8')},

    text3:{left:wp('6'),fontFamily:"Poppins-SemiBold",fontSize:hp('2.3'),letterSpacing:-1},

    cartNeomorph:{
        shadowRadius: 4,
        shadowOpacity:0.3,
        borderRadius: 10,
        backgroundColor: 'white',
        width: hp('43'),
        height: hp('15'),
        
        }
})
export default OtherStyles;