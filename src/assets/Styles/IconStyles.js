import React from 'react'
import { StyleSheet } from 'react-native'
import AppColors from '../colors/AppColors';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
const IconStyles =StyleSheet.create({
    signupIcons:{
        color: AppColors.primary,
         margin: 15
    },
    drawerManuIcon:{
        color:"white",
        marginTop:hp('1.5')
    },

    editIcon:{
        marginLeft:wp('60'),marginTop:hp('2'),color:AppColors.primary
    },
    LocationIcon:{
        marginLeft:wp('4'),marginTop:hp('2'),color:AppColors.primary
    },

    EditIcons:{
        marginLeft:wp('8'),marginTop:hp('2'),color:AppColors.primary
    },
    Trash:{
        marginLeft:wp('2'),marginTop:hp('2'),color:AppColors.primary
    }


})

export default IconStyles