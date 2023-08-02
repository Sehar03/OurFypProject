import React,{useState} from 'react';
import {View, TouchableOpacity, Text, TextInput, Button, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AppColors from '../../assets/colors/AppColors';
import TextStyles from '../../assets/Styles/TextStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import IconStyles from '../../assets/Styles/IconStyles';
import { Neomorph } from 'react-native-neomorph-shadows';
import DrawerHeader from '../../components/headers/DrawerHeader';
import BackButtonHeader from '../../components/headers/BackButtonHeader';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';



const MainHeader = ({navigation,item}) => {
  return (
    <View style={{backgroundColor:AppColors.white}}>
  <View style={{backgroundColor:AppColors.white,height:hp('10'),width:wp('100'),flexDirection:"row"}}>
  <TouchableOpacity
          onPress={()=>{
              navigation.goBack();
          }}>         
      <AntDesign name="arrowleft" size={wp('6%')} style={{color:AppColors.primary,marginTop:hp('4%'),marginLeft:wp(3)}}/>
      
  </TouchableOpacity>
  <View style={{flexDirection:"column"}}>
  <Text style={{color:"black",marginTop:hp('2.5'),marginLeft:wp('5'),fontFamily:"Poppins-Bold"}}>Home</Text>
  <Text style={{marginLeft:wp('4'),fontFamily:"Poppins-Medium"}}>{item}</Text>
  </View>
  <TouchableOpacity>
  <AntDesign name="hearto" size={wp('6%')} style={{color:AppColors.primary,marginTop:hp('4%'),marginLeft:wp('37')}}/>
  </TouchableOpacity>
  <TouchableOpacity>
  <AntDesign name="shoppingcart" size={wp('6%')} style={{color:AppColors.primary,marginTop:hp('4%'),marginLeft:wp('5')}}/>
  </TouchableOpacity>
  </View> 
  <View>

      
    </View>
  </View>
  )   
};

export default MainHeader;
