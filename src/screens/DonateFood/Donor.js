import React from 'react'
import { ImageBackground, SafeAreaView, StatusBar, Text } from 'react-native'
import ProductsBackButton from '../../components/headers/ProductsBackButton'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextStyles from '../../assets/Styles/TextStyles';

const Donor = ({navigation,route}) => {
 const   {imageUri,name}=route.params

  return (
    <SafeAreaView >
         <StatusBar
    barStyle="light-content"
    backgroundColor="transparent"
    translucent={true}
  />
    
      <ImageBackground
        source={imageUri}
        style={{height: hp('30%'), width: wp('100%')}}>
        <ProductsBackButton navigation={navigation} />
        <Text style={[TextStyles.whiteCenteredLable]}>{name}</Text>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Donor