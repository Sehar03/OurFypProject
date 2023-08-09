import React from 'react';
import {ImageBackground, SafeAreaView, Text, View} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import ProductsBackButton from '../../components/headers/ProductsBackButton';
import TextStyles from '../../assets/Styles/TextStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ContainerStyles from '../../assets/Styles/ContainerStyles';

const SingleProductDetail = ({navigation, route}) => {
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
        <Text style={[TextStyles.simpleText, {marginTop: hp('3%')}]}>
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
        <View
          style={[
            ContainerStyles.productBackButtonContainer,
            {backgroundColor: AppColors.primary},
          ]}>
          <Text style={{color: AppColors.white, marginBottom: hp('2%')}}>
            _
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingleProductDetail;
