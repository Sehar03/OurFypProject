import React from 'react'
import { ImageBackground, Text,View,Image,TouchableOpacity} from 'react-native'
import { DrawerContentScrollView,DraweItem, DrawerItemList} from '@react-navigation/drawer';
import AppColors from '../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContainerStyles from '../assets/Styles/ContainerStyles';
import TextStyles from '../assets/Styles/TextStyles';
import ImageStyles from '../assets/Styles/ImageStyles';
const CustomeDrawer = (props) => {
  return (
    <View style={{flex: 1}}>
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{backgroundColor: AppColors.primary}}>
      <ImageBackground   source={require('../assets/Images/image36.jpg')}
       style={{alignItems:"center",height:hp('30')}}>
        <Image
          source={require('../assets/Images/image13.png')}
          style={[ImageStyles.logoImageStyle]}
        />
        <Text
          style={[TextStyles.whiteCenteredLable]}>
          Toqeer Fatima
        </Text>
        </ImageBackground>
   
      <View style={{flex: 1, backgroundColor: AppColors.white , paddingTop: 10}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
    
    <View style={{padding: 20, borderTopWidth: 1, borderTopColor: AppColors.background}}>
    <TouchableOpacity  style={{paddingVertical: 15}}>
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="settings-outline" size={22} />
            <Text
              style={[TextStyles.mediumTextStyle]}>
              Setting
            </Text>
          </View>
        </TouchableOpacity>
    <TouchableOpacity  style={{paddingVertical: 15}}>
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="exit-outline" size={22} />
            <Text
             style={[TextStyles.mediumTextStyle]}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
  </View>
  </View>
  )
}

export default CustomeDrawer