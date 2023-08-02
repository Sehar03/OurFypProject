import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';


import AppColors from '../../assets/colors/AppColors';
import TextStyles from '../../assets/Styles/TextStyles';

const BackButtonHeader = ({navigation,title}) => {
 
  return (
    <View style={{backgroundColor:AppColors.background,height:hp('8%'),width:wp('100%'),justifyContent:"center"}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <FontAwesome name="chevron-left" size={wp('7%')} style={{color:AppColors.primary,marginTop:hp('1%'),marginLeft:wp('6%')}}/>
      </TouchableOpacity>
      <Text style={[TextStyles.backButtonTitle]}>{title}</Text>
    </View>
  );
};

export default BackButtonHeader;
