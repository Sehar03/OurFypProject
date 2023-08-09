import React from 'react'
import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import Profile from '../../screens/Profile/Profile';

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
},
cartTextStyle:{
  color:"black", fontSize:hp('3%'), marginLeft:wp('7%'),fontFamily:"Poppins-SemiBold",marginTop:hp('2.4%')

},

profileTextStyle:{
  color:"black", fontSize:hp('2.2%'), marginLeft:wp('7%'),fontFamily:"Poppins-SemiBold",marginTop:hp('2.4%')

},



whiteCenteredLable2:{
  color:AppColors.white ,
  // fontWeight: '600',
  fontFamily:"Poppins-SemiBold",
  fontSize: hp('2%'),
  // textAlign: 'center',
  marginTop: hp('1.9%'),},




profleSimpleText:{
  
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('8'),
    marginTop: hp('2'),
    fontSize: hp('2.5'),
    marginTop: hp('4'),
    letterSpacing: -1,
    color:AppColors.black
  
},
simpleText:{
  marginLeft:wp(5),marginTop:hp('0.5'),color:AppColors.black
},

text3: {
  fontFamily: 'Poppins-SemiBold',
  color: AppColors.primary,
  fontSize: hp('2.1'),
  marginLeft: wp('4'),
  letterSpacing: -1,
  marginTop:hp('2')
},

simpleText2:{
  marginTop: hp('3%'),
  marginLeft: wp('6'),
  color: AppColors.black,
  fontFamily:"Poppins-Regular",
  
}

})


export default TextStyles