import React from 'react';
import { SafeAreaView,StyleSheet,Text } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../colors/AppColors';


const ContainerStyles = StyleSheet.create({
   inputFieldNeomorphContainer:{
    width: wp('80%'),
    height: hp('7%'),
    borderRadius: 15,
    shadowRadius: 4,
    backgroundColor: 'white',
    // alignSelf:"center",
    // alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: 10,
    shadowOpacity: 0.3,
    marginTop: 10,

   } ,
   touchableOpacityNeomorphContainer:{
      marginTop:30,
      shadowRadius: 6,
      backgroundColor:AppColors.primary,
      borderRadius:15,
      height:hp('7%'),
      width:wp('50%'),
      marginVertical: 10,
      shadowOpacity: 0.3,
  
     } 
})

export default ContainerStyles