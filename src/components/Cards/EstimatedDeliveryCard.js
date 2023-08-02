import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, FlatList ,TouchableOpacity,Button} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Neomorph } from 'react-native-neomorph-shadows';
import OtherStyles from '../../assets/Styles/OtherStyles';
const EstimatedDeliveryCard = () => {
return (
<View style={{margin:25,alignItems: 'center'}}>
<Neomorph
darkShadowColor={AppColors.primary}
lightShadowColor={AppColors.background}
// inner // <- enable shadow inside of neomorph
swapShadows // <- change zIndex of each shadow color
style={[OtherStyles.cartNeomorph]}>
<View style={{flexDirection:"row"}}>
<Image source={require('../../assets/Images/deliveryboy.jpg')} style={{height:hp('12.5'),width:wp('25'),margin:10,borderRadius:15}}/>
<View style={{flexWrap:"wrap"}}>
<Text style={{marginTop:hp('4'),fontFamily:"Poppins-SemiBold" ,
}}>Estimated delivery</Text>
<Text style={{fontFamily:"Poppins-SemiBold",fontSize:hp('2.5%'),fontWeight:"bold",color:AppColors.black}}>Now (30 min)</Text>
</View>
</View>
</Neomorph>
</View> 

);

};


export default EstimatedDeliveryCard;