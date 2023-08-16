import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import ProductsBackButton from '../../components/headers/ProductsBackButton';
import TextStyles from '../../assets/Styles/TextStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import {Neomorph} from 'react-native-neomorph-shadows';

const SingleProductDetail = ({navigation, route}) => {
  const [count, setCount] = useState(1);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if(count > 1){
    setCount(count - 1);
    }
  };
  const {imageUri, imageTitle, imagePrice} = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <ImageBackground
        source={imageUri}
        style={{height: hp('30%'), width: wp('100%')}}>
        <ProductsBackButton navigation={navigation} />
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          width: wp('100%'),
          justifyContent: 'space-evenly',
        }}>
        <Text style={[TextStyles.leftText]}>{imageTitle}</Text>
        <Text style={[TextStyles.simpleText, {marginTop: hp('2%')}]}>
          {imagePrice}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 0.25,
          borderColor: AppColors.Gray,
          position: 'absolute',
          width: wp('100%'),
          height: hp('10%'),
          bottom: 0,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity onPress={()=>{
          decrementCount();
        }}>
          <View
            style={[
              ContainerStyles.productBackButtonContainer,
              {backgroundColor: AppColors.primary, marginLeft: wp('1%')},
            ]}>
            <Text
              style={{
                color: AppColors.white,
                marginBottom: hp('2%'),
                fontSize: wp('5%'),
              }}>
              _
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: hp('4%'),
            fontSize: wp('5%'),
            fontFamily: 'Poppins-Regular',
            color: AppColors.black,
            marginLeft: wp('2%'),
          }}>
         {count}
        </Text>
        <TouchableOpacity onPress={()=>{
          incrementCount();
        }}>
          <View
            style={[
              ContainerStyles.productBackButtonContainer,
              {backgroundColor: AppColors.primary, marginRight: wp('3%')},
            ]}>
            <Text
              style={{
                color: AppColors.white,
                marginBottom: hp('1%'),
                fontSize: wp('7%'),
              }}>
              +
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Neomorph
            darkShadowColor="white"
            lightShadowColor="white"
            swapShadows // <- change zIndex of each shadow color
            style={[
              ContainerStyles.singleProductTouchableOpacityNeomorphContainer,
            ]}>
            <Text style={TextStyles.whiteCenteredLable}>Add To Cart</Text>
          </Neomorph>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SingleProductDetail;
