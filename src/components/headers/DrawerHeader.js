import React from "react";
import {View,TouchableOpacity,Text} from "react-native";
import Entypo from "react-native-vector-icons/Entypo"
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ContainerStyles from "../../assets/Styles/ContainerStyles";
import IconStyles from "../../assets/Styles/IconStyles";
import TextStyles from "../../assets/Styles/TextStyles";

const DrawerHeader = ({navigation})=>{
    
    return <View style={[ContainerStyles.headerViewStyle]}>
        <TouchableOpacity
                onPress={()=>{
                    navigation.toggleDrawer()
                }}>         
            <Entypo name="menu" size={wp('10%')} style={[IconStyles.drawerManuIcon]} />
            
        </TouchableOpacity>
        <Text style={[TextStyles.whiteMediumHeading]}>Home Screen</Text>
        
    </View>
    
}

export default DrawerHeader;