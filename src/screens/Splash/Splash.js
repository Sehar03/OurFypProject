import React from 'react'
import { SafeAreaView, Text ,Image, View, StatusBar,ScrollView} from 'react-native'
import AppColors from '../../assets/colors/AppColors';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Splash = ({navigation}) => {
  return (
    <ScrollView>
  <SafeAreaView style={{flex:1,backgroundColor:AppColors.white}}>
   <Image source={require('../../assets/Images/image1.png')} style={{height:hp('56%'),width:wp('56%')}}/>
   <View style={{alignItems:"center"}}>
  <Image source={require('../../assets/Images/logo.png')} style={{height:hp('14%'),width:wp('32%')}}/>
  <Text style={{fontSize:hp('3%'),fontWeight:"bold",color:"black"}}>Food For Each</Text>
  </View>
  <Image source={require('../../assets/Images/image2.png')} style={{height:hp('28%'),width:wp('100%'),marginTop:hp('9%')}}/>
    
  </SafeAreaView>
  </ScrollView>
  )
}

export default Splash;