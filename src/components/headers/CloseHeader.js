import React from 'react';
import { View, TouchableOpacity, Text, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AppColors from '../../assets/colors/AppColors';
import TextStyles from '../../assets/Styles/TextStyles';


const CloseHeader = ({ item, navigation }) => {
  
  return (
    <View style={{
            height: hp('7'),
            borderBottomWidth: wp('0.4'),
            borderColor: AppColors.background2,
            flexDirection:"row",
            marginTop:hp("3.5"),
    }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home')
        }}>
        <AntDesign name="close" size={wp('6')} style={{ color: AppColors.primary, marginTop: hp('3%'), marginLeft: wp('5') }} />
      </TouchableOpacity>
      <Text style={[TextStyles.headerTextStyle,{marginLeft:wp('14')}]}>{item}</Text>
    </View>
  );
};
export default CloseHeader;

