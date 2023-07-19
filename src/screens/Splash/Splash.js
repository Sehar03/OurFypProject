import React from 'react'
import { SafeAreaView, Text ,Image} from 'react-native'

const Splash = ({navigation}) => {
  return (<SafeAreaView style={{backgroundColor:"white"}}>
   <Image source={require('../../assets/Images/image1.png')} style={{height:400,width:200}}/>
  <Image source={require('../../assets/Images/logo.png')} style={{height:100,width:120,marginLeft:140}}/>
  <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center",color:"black"}}>Food For Each</Text>
  <Image source={require('../../assets/Images/image2.png')} style={{height:200,width:400,marginTop:60}}/>
    
  </SafeAreaView>
  )
}

export default Splash;