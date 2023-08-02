import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AppColors from '../../assets/colors/AppColors';
import TextStyles from '../../assets/Styles/TextStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import IconStyles from '../../assets/Styles/IconStyles';

const BackButtonHeader = ({navigation,item}) => {

  return <View style={{backgroundColor:AppColors.white,height:hp('8'),width:wp('100'),flexDirection:"row"}}>
  <TouchableOpacity
          onPress={()=>{
              navigation.goBack()
          }}>         
      <FontAwesome name="chevron-left" size={wp('7%')} style={{color:AppColors.primary,marginTop:hp('3%')}}/>
      
  </TouchableOpacity>
  <Text style={[TextStyles.primaryText,{marginLeft:wp(20),fontFamily:"Poppins-SemiBold"}]}>{item}</Text>
  
</View>
    // <View style={{backgroundColor:AppColors.background,height:hp('8'),width:wp('100'),justifyContent:"center"}}>
    //   <TouchableOpacity
    //     onPress={() => {
    //       navigation.goBack();
    //     }}>
    //     <FontAwesome name="chevron-left" size={wp('7')} style={{color:AppColors.primary,marginTop:hp('3%'),marginLeft:wp('6%')}}/>
    //   </TouchableOpacity>
    //   <Text style={[TextStyles.whiteMediumHeading]}>{title}</Text>
    // </View>
  
};

export default BackButtonHeader;
