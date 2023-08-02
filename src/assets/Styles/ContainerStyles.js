import React from 'react';
import { SafeAreaView,StyleSheet,Text } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../colors/AppColors';


const ContainerStyles = StyleSheet.create({
   inputFieldNeomorphContainer:{
    width: wp('80%'),
    height: hp('7%'),
    borderRadius: wp('3%'),
    shadowRadius: 4,
    backgroundColor: AppColors.white,
    // alignSelf:"center",
    // alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: hp('3%'),
    shadowOpacity: 0.3,
    marginTop: hp('1.4%'),

   } ,
   touchableOpacityNeomorphContainer:{
      marginTop:hp('3%'),
      shadowRadius: 6,
      backgroundColor:AppColors.primary,
      borderRadius:wp('3%'),
      height:hp('6%'),
      width:wp('80%'),
      marginVertical: hp('1.4%'),
      shadowOpacity: 0.3,
  
     } ,
     tabScreenTextContainer:{
      height:hp('4%'),
     width:wp('60%'),
     backgroundColor:AppColors.primary,
     position:"absolute",
     top:hp('3.5%') ,
     borderTopRightRadius:wp('5%'),
     borderBottomRightRadius:wp('5%'),
     justifyContent:"center"
   },
   tabScreenDeliveryTextContainer:{
      height:hp('4%'),
   width:wp('18%'),
   backgroundColor:AppColors.white,
   position:"absolute",
   top:hp('22%'),
   left:wp('4%'),
   borderRadius:wp('5%'),
   justifyContent:"center",
   alignItems:"center"
},

})

export default ContainerStyles