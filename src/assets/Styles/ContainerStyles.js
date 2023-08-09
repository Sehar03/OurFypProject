import React from 'react';
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppColors from '../colors/AppColors';


const ContainerStyles = StyleSheet.create({

   inputFieldNeomorphContainer:{
    width: wp('80%'),
    height: hp('7%'),
    borderRadius: wp('3%'),
    shadowRadius: 4,
    backgroundColor: AppColors.white,
    marginVertical: hp('3%'),
    shadowOpacity: 0.3,
    marginTop: hp('1.4%'),
   } ,
   touchableOpacityNeomorphContainer:{
      marginTop:hp('3%'),

   inputFieldNeomorphContainer: {
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


   },
   touchableOpacityNeomorphContainer: {
      marginTop: hp('3%'),

      shadowRadius: 6,
      backgroundColor: AppColors.primary,
      borderRadius: wp('3%'),
      height: hp('6%'),
      width: wp('80%'),
      marginVertical: hp('1.4%'),
      shadowOpacity: 0.3,

   },
   headerViewStyle: {
      height: hp('8%'),
      width: wp('100%'),
      backgroundColor: AppColors.primary,
      flexDirection: "row"
   },
   itemsCenter: {
      alignItems: "center",

   },
   largeNeomorphStyle: {
      shadowRadius: 4,
      shadowOpacity: 0.2,
      borderRadius: 25,
      backgroundColor: AppColors.white,
      width: wp('42'),
      height: hp('43'),
   },
   smallNeomorphStyle:
   {
      shadowRadius: 4,
      shadowOpacity: 0.2,
      borderRadius: 25,
      backgroundColor: AppColors.white,
      width: wp('42.3'),
      height: hp('21'),

   },
   TwoitemsCenter: {
      flexDirection: 'row',
       alignItems: 'center'
    },
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
squareBoxHalfScreenContainer:{
   width:wp('44'),
   height:hp('22'),
   shadowRadius: 4,
   backgroundColor: AppColors.white,
   marginHorizontal:wp('2'),
   marginVertical:hp('1'),
   borderRadius:wp('3')
},
popularFoodPiceTextContainer:{
   height:hp('3%'),
width:wp('22%'),
backgroundColor:AppColors.white,
position:"absolute",
top:hp('18.5%'),
right:wp('1%'),
borderRadius:wp('5%'),
justifyContent:"center",
alignItems:"center"
},
productBackButtonContainer:{
   height:hp('5%'),
width:wp('10%'),
justifyContent:"center",
backgroundColor:AppColors.white,
marginLeft:wp('4%'),
alignItems:"center",
marginTop:hp('3%'),
borderRadius:hp('10%')
},

   tabScreenTextContainer: {
      height: hp('4%'),
      width: wp('60%'),
      backgroundColor: AppColors.primary,
      position: "absolute",
      top: hp('3.5%'),
      borderTopRightRadius: wp('5%'),
      borderBottomRightRadius: wp('5%'),
      justifyContent: "center"
   },
   tabScreenDeliveryTextContainer: {
      height: hp('4%'),
      width: wp('18%'),
      backgroundColor: AppColors.white,
      position: "absolute",
      top: hp('22%'),
      left: wp('4%'),
      borderRadius: wp('5%'),
      justifyContent: "center",
      alignItems: "center"
   },
   PrimaryheaderViewStyle: {
      height: hp('10'),
      width: wp('100'),
      flexDirection: "row"
   },
   searchNeomorphStyle: {
      width: wp('80%'),
      height: hp('7%'),
      borderRadius: wp('10%'),
      shadowRadius:3,
      backgroundColor: AppColors.white,
      shadowOpacity: 0.13,
      marginTop: hp('1.4%'),
      marginLeft: wp('10'),
      marginBottom: hp('3')
   },
   smallCategoriesNeomorphStyle:{
      width: wp('33'), // Adjust card width as per your requirement
      height:hp('14'),
      borderRadius:15,
      shadowRadius: 4,
      backgroundColor: AppColors.white,
      shadowOpacity: 0.2,
      marginTop:hp('2'),
      marginLeft:wp('3'),
      alignItems:'center',
   }

})

export default ContainerStyles