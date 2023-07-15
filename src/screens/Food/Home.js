import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DrawerHeader from '../../components/headers/DrawerHeader'
import { Neomorph } from 'react-native-neomorph-shadows';
import { Image, Text, View ,TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor:"white"}}>
        <DrawerHeader navigation={navigation}/>

<View style={{flexDirection:"row",margin:25}}>
 <TouchableOpacity>
  <Neomorph
  darkShadowColor='#EB5703'
  lightShadowColor='darkorange'
  inner // <- enable shadow inside of neomorph
  swapShadows // <- change zIndex of each shadow color
  style={{
    shadowRadius: 4,
    shadowOpacity:0.3,
    borderRadius: 25,
    backgroundColor: 'white',
    width: hp('22'),
    height: hp('43'), 
  }}>
  <Text style={{color:"black",fontWeight:"bold",fontSize:24,textAlign:"center",margin:10}}>Full Price Food </Text>
  <Text style={{color:"black",fontSize:12,marginLeft:20}}>Order food from your favourite resturants</Text>
  <Image source={require('../../assets/Images/image5.png')} style={{height:hp(10),width:hp(18),marginTop:110,marginLeft:14}}/>
</Neomorph>
</TouchableOpacity>   

<View style={{flexDirection:"column",marginLeft:10}}>
<TouchableOpacity>
  <Neomorph
  darkShadowColor='#EB5703'
  lightShadowColor='darkorange'
  inner // <- enable shadow inside of neomorph
  swapShadows // <- change zIndex of each shadow color
  style={{
    shadowRadius: 4,
    shadowOpacity:0.3,
    borderRadius: 25,
    backgroundColor: 'white',
    width: hp('22'),
    height: hp('21'),
   
  }}

>

  <Text style={{color:"black",fontWeight:"bold",fontSize:24,textAlign:"center",marginTop:10}}>Share Food</Text>
  <Text style={{color:"black",fontSize:12,marginLeft:20}}>Share with your friend Half food in half price.</Text>
  <Image source={require('../../assets/Images/image8.png')} style={{height:hp(4.2),width:hp(17),marginTop:20,marginLeft:20}}/>
</Neomorph>
</TouchableOpacity>

<TouchableOpacity>
  <Neomorph
  darkShadowColor='#EB5703'
  lightShadowColor='darkorange'
  inner // <- enable shadow inside of neomorph
  swapShadows // <- change zIndex of each shadow color
  style={{
    shadowRadius: 4,
    shadowOpacity:0.3,
    borderRadius: 25,
    backgroundColor: 'white',
    width: hp('22'),
    height: hp('21'),
   marginTop:10,
  
  }}

>

  <Text style={{color:"black",fontWeight:"bold",textAlign:"center",fontSize:24,marginTop:10}}>Free Food</Text>
  <Image source={require('../../assets/Images/image9.png')} style={{height:hp(10),width:hp(18),marginTop:15,marginLeft:15}}/>
</Neomorph>
</TouchableOpacity>
</View>
</View>
<Image source={require('../../assets/Images/image10.png')} style={{height:hp(40),width:hp(80),marginTop:100}}/>

    </SafeAreaView>

  )
}

export default Home