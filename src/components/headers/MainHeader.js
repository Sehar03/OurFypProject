import React from 'react';
import { View, TouchableOpacity, Text, TextInput, Button, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import TextStyles from '../../assets/Styles/TextStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import IconStyles from '../../assets/Styles/IconStyles';
const MainHeader = ({ navigation, item }) => {
  return (
    <View style={{ backgroundColor: AppColors.white }}>
      <View style={[ContainerStyles.PrimaryheaderViewStyle]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={wp('6%')} style={[IconStyles.arrowLeftIcon]} />
        </TouchableOpacity>
        <View style={{ flexDirection: "column" }}>
          <Text style={[TextStyles.leftText,{marginTop:hp('2.5')}]}>Home</Text>
          <Text style={[TextStyles.fetchTextStyle]}>{item}</Text>
        </View>
        <TouchableOpacity>
          <AntDesign name="hearto" size={wp('6%')} style={[IconStyles.heartIcon]} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="shoppingcart" size={wp('6%')} style={[IconStyles.shoppingCartIcon]} />
        </TouchableOpacity>
      </View>
      </View>
  )
};

export default MainHeader;
