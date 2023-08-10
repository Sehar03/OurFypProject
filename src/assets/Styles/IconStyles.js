import React from 'react'
import { StyleSheet } from 'react-native'
import AppColors from '../colors/AppColors';

import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from "react-native-responsive-screen";

const IconStyles = StyleSheet.create({
    signupIcons: {

        color: AppColors.primary,
        margin: 15,
    },
    drawerManuIcon:{
        color:"white",
        marginTop:hp('1.5')
    },
    drawerManuIcon: {
        color: "white",
        marginTop: hp('1.5'),
        marginLeft:wp('3')
    },
    arrowLeftIcon: {
        color: AppColors.primary,
        marginTop: hp('4%'),
        marginLeft: wp('3')
    },
    heartIcon: {
        color: AppColors.primary,
        marginTop: hp('4%'),
        marginLeft: wp('37')
    },
    shoppingCartIcon: {
        color: AppColors.primary,
        marginTop: hp('4%'),
        marginLeft: wp('45'),
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
        marginLeft:wp('2'),
        marginTop:hp('2'),
        color:AppColors.primary
    },
    fireIcon:{
        color:AppColors.goldenYellow,
        marginLeft:wp('4'),
        marginVertical:hp('1')
    },
    productsIcon:{
        color:AppColors.primary,
        marginLeft:wp('4'),
        marginVertical:hp('1')
    

    }
})

export default IconStyles