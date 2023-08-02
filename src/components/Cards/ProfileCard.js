import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, FlatList ,TouchableOpacity,Button} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Neomorph } from 'react-native-neomorph-shadows';
const ProfileCard = () => {
return (
<View style={{margin:wp('8'),alignItems: 'center'}}>
<Neomorph
darkShadowColor={AppColors.primary}
lightShadowColor={AppColors.background}
// inner // <- enable shadow inside of neomorph
swapShadows // <- change zIndex of each shadow color
style={{
shadowRadius: 4,
shadowOpacity:0.3,
borderRadius: 10,
backgroundColor: 'white',
width: hp('43'),
height: hp('12'),

}}>
    <View style={{flexDirection:"row"}}>
</View>
</Neomorph>
</View> 

);

};


export default ProfileCard;