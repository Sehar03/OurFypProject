import React from 'react'
import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
const TextFieldStyles =StyleSheet.create({
    inputField:{
        width:wp('53%'),
        height:hp('7%'),
   
    }
})

export default TextFieldStyles