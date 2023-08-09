import React from 'react'
import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../colors/AppColors';
const TextFieldStyles =StyleSheet.create({
    inputField:{
        width:wp('53%'),
        height:hp('7%'),
   
    },
    inputFieldEdit:{
        width:wp('70%'),
        height:hp('7%'),
        marginLeft:wp('3'),
        

   
    },


    profileInputField:{
        marginLeft: wp('8'), marginTop: hp('2.5'),color:AppColors.black    
   
    },
    profileInputFieldText:{
        
            fontFamily: 'Poppins-SemiBold',
            marginLeft: wp('8'),
            marginTop: hp('2'),
            color:AppColors.black
          
    },
    profileInputField2:{
        marginLeft: wp('6'),
        marginTop: hp('1.5'),
        color: AppColors.black,
        fontFamily:"Poppins-SemiBold"
      }
  
})

export default TextFieldStyles