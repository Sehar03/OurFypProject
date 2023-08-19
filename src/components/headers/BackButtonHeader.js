import React from 'react';
import {View, TouchableOpacity, Text,StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import TextStyles from '../../assets/Styles/TextStyles';
import IconStyles from '../../assets/Styles/IconStyles';
const BackButtonHeader = ({navigation,title}) => {
  return (
    <View style={{flex:1,backgroundColor:AppColors.white,height:hp('10%'),width:wp('100%'),justifyContent:"center"}}>
      <StatusBar
      barStyle="dark-content"
      backgroundColor={AppColors.white}
      translucent={true}
  />
<TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={wp('6%')} style={[IconStyles.arrowLeftIcon]} />
      </TouchableOpacity>
      <Text style={[TextStyles.backButtonTitle]}>{title}</Text>
    </View>
  );
};

export default BackButtonHeader;