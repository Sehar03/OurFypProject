import React from 'react'
import {
    Text,
    SafeAreaView,
    View,
    ImageBackground,
    TouchableOpacity,
  } from 'react-native';
  import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
  import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from '../../assets/colors/AppColors';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
const ChineseCard = ({item,props}) => {
  return (
    <SafeAreaView
    style={{flex: 1, backgroundColor: AppColors.white,}}>
    <TouchableOpacity style={{alignItems:"center"}}>
      <ImageBackground
        source={item.uri}
        style={{height: hp('26%'), width: wp('92%')}}
        imageStyle={{borderRadius: hp('2%'), marginVertical: hp('2%')}}>
        <View style={[ContainerStyles.tabScreenTextContainer]}>
          <Text
            style={{color: AppColors.white, fontFamily: 'Poppins-SemiBold'}}>
            {' '}
            Welcome gift : free delivery
          </Text>
        </View>
        <View style={[ContainerStyles.tabScreenDeliveryTextContainer]}>
          <Text
            style={{color: AppColors.black, fontFamily: 'Poppins-SemiBold'}}>
            {' '}
            {item.deliveryTime}{' '}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
    <Text style={[TextStyles.leftText]}>{item.title}</Text>
    <Text style={{marginLeft:wp('4%'),fontFamily:"Poppins-Regular"}}>$ . Chinese</Text>
    <View style={{flexDirection:"row"}}>
    <MaterialCommunityIcons
            name="bike"
            size={wp('5%')}
            style={{marginLeft:wp('4%'),color:AppColors.primary}}
          />
<Text style={{color:AppColors.primary,fontFamily:"Poppins-Regular"}}> Free dlivery</Text>
    </View>
  </SafeAreaView>
  )
}

export default ChineseCard