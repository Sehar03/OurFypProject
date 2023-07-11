// In App.js in a new project

import * as React from 'react';
import { View, Text, SafeAreaView ,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomeScreen=()=>{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const DetailsScreen=()=> {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
      <Text>Details Screen</Text>
    </View>
  );
}


const Stack = createNativeStackNavigator();

const App=() =>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// const App=()=>{
//   return(
// <SafeAreaView>
// <View style={{backgroundColor:"darkred",height:800,width:400}}>
//   <Image source={{uri: 'https://static.vecteezy.com/system/resources/previews/007/679/655/original/people-eating-talking-drinking-and-working-at-tables-on-cafe-or-restaurant-in-flat-cartoon-illustration-vector.jpg'}} style={{  height:hp('47'),width:wp('99'),marginTop:100,marginLeft:10}} />
//   <Text style={{fontSize:25,textAlign:"center",fontWeight:"bold",color:"white"}}>Food For Each</Text>
//   </View>
// </SafeAreaView>
//   )
// }
// export default App;