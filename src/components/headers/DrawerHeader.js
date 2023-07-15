import React from "react";
import {View,TouchableOpacity,Text} from "react-native";
import Entypo from "react-native-vector-icons/Entypo"
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";




  

const DrawerHeader = ({navigation})=>{
    
    return <View style={{height:hp('8%'),width:wp('100%'),backgroundColor:"darkorange",flexDirection:"row"}}>
        <TouchableOpacity
                onPress={()=>{
                    navigation.toggleDrawer()
                }}>         
            <Entypo name="menu" size={wp('10%')} style={{color:"white",marginTop:10}} />
            
        </TouchableOpacity>
        <Text style={{color:"white",fontSize:20,marginLeft:85,marginTop:15}}>Home Screen</Text>
        
    </View>
    
}

export default DrawerHeader;