import React from 'react';
import { View, Text, StyleSheet, Image, FlatList ,TouchableOpacity} from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import { Card } from 'react-native-elements';
import AppColors from '../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
const data = [
  {
    id: '1',
    image: require('../../assets/Images/image25.jpg'),
  },{
    id: '2',
    image: require('../../assets/Images/image26.jpg'),
  },{
    id: '3',
    image: require('../../assets/Images/image27.jpg'),
  },{
    id: '4',
    image: require('../../assets/Images/image28.jpg'),
  },{
    id: '5',
    image: require('../../assets/Images/image29.jpg'),
  },{
    id: '6',
    image: require('../../assets/Images/image30.jpg'),
  },
];

const CartComponent = () => { 
  const renderItem = ({ item }) => (
  <TouchableOpacity>
  <Neomorph
   inner // <- enable shadow inside of neomorph
   swapShadows // <- change zIndex of each shadow color
   darkShadowColor={AppColors.primary}
   lightShadowColor={AppColors.darkOrange}
  style={{ 
    shadowRadius: 4,
    shadowOpacity:0.5,
    borderRadius: 10,
    backgroundColor: AppColors.white,
    width: wp('40'),
    height: hp('25'),
    marginLeft:wp('4'),
    marginTop:hp(3)
  }}
  >
   <Image source={item.image} style={{height:hp(25),width:wp(40),borderRadius:10}}/>
  </Neomorph>
  </TouchableOpacity>
  );

  return (
  
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
     showsHorizontalScrollIndicator={false}
    />
  );
};
export default CartComponent;