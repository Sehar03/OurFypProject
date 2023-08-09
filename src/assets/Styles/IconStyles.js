import React from 'react'
import { StyleSheet } from 'react-native'
import AppColors from '../colors/AppColors';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from "react-native-responsive-screen";
const IconStyles =StyleSheet.create({
    signupIcons:{
        color: AppColors.primary,
         margin: 15
    },
    drawerManuIcon:{
        color:"white",
        marginTop:hp('1.5')
    },
    productsIcon:{
        color: AppColors.primary,
         marginLeft: wp('4%'),
         marginVertical:hp('1%')
    },
    fireIcon:{
        color: AppColors.goldenYellow,
         marginLeft: wp('4%'),
         marginVertical:hp('1%')
    }
})

export default IconStyles