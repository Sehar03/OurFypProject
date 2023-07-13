import React from "react";
import {View,TouchableOpacity,Text} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


const DrawerHeader = ({navigation,title})=>{
    
    return <View style={{height:hp('15%'),width:wp('90%'),backgroundColor:"black",marginTop:100}}>
        <TouchableOpacity
                onPress={()=>{
                    navigation.toggleDrawer()
                }}
            >
            <AntDesign name="menu-fold" size={wp('10%')} style={{color:"#D43D7C"}} />
            <Text style={{color:'white'}}>{title}</Text>
        </TouchableOpacity>
        
    </View>
}

export default DrawerHeader;