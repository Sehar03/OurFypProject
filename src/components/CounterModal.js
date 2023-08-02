import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../assets/colors/AppColors';
const CounterModal = () => {
  const [count, setCount] = useState(1);
const add=()=>
    setCount(prevCount=>prevCount+1)
    const subtract=()=>
    setCount(prevCount=>prevCount-1)

  return (<Neomorph

    // inner // <- enable shadow inside of neomorph
    swapShadows // <- change zIndex of each shadow color
    style={{
    borderRadius: 10,
    borderWidth:2,
    borderColor:"lightgray",
backgroundColor: 'white',
width: hp('10'),
height: hp('8'),
marginLeft:wp('7'),
marginTop:hp('3'),
}}>
    <View style={{flexDirection:"row",height:hp(8),width:wp(75),alignItems:"center",marginLeft:wp('1')}}>
    <TouchableOpacity onPress={subtract}>
<Text style={{fontSize:25,margin:12,color:"gray"}}>-</Text>
    </TouchableOpacity> 
    
<Text style={{fontSize:16,color:"#EB5703"}}>{count}</Text>
   
    <TouchableOpacity onPress={add}>
                <Text style={{fontSize:20,color:"gray",marginLeft:wp(2)}}>+</Text>
   </TouchableOpacity> 
</View>
</Neomorph>
     
       
);
  }
export default CounterModal
