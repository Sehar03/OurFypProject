import React from 'react';
import {Image} from 'react-native';
import {Text, TouchableOpacity, View} from 'react-native';
import TextStyles from '../../assets/Styles/TextStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
const DealCard = ({navigation, item}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SingleProductDetail',{
            imageUri:item.uri,
            imageTitle: item.title,
            imagePrice: item.price,

          });
        }}>
        <Text style={[TextStyles.leftText, {marginTop: hp('0%')}]}>
          {item.title}
        </Text>
        <Text style={[TextStyles.dealText, {maxWidth: wp('60%')}]}>
          {item.description}
        </Text>
        <Text style={[TextStyles.dealPriceText]}>{item.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => {
          navigation.navigate('SingleProductDetail',{
            imageUri:item.uri,
            imageTitle: item.title,
            imagePrice: item.price,

          });
        }}
      >
        <View style={{position: 'absolute', left: wp('70%'), bottom: hp('0%')}}>
          <Image source={item.uri} style={[ImageStyles.smallSquareBoxImage]} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Cart')
      }}>
      <View style={[ContainerStyles.productsCartButtonContainer]}>
        <Text
          style={[
            TextStyles.whiteCenteredLable,
            {fontSize: wp('6%'), marginTop: hp('0%'),fontFamily:"Poppins-Regular"},
          ]}>
          +
        </Text>
      </View>
      </TouchableOpacity>
      <View style={[ContainerStyles.bottomBorder]}></View>
    </View>
  );
};

export default DealCard;
