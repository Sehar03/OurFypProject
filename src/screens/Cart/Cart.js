import React from 'react';
import { SafeAreaView, View,Image} from 'react-native';
import CartHeader from '../../components/headers/CartHeader';
import { Neomorph } from 'react-native-neomorph-shadows';
import AppColors from '../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EstimatedDeliveryCard from '../../components/Cards/EstimatedDeliveryCard';
import CounterModal from '../../components/CounterModal';
import ImageStyles from '../../assets/Styles/ImageStyles';
import { Text } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TextStyles from '../../assets/Styles/TextStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';

import OtherStyles from '../../assets/Styles/OtherStyles';

const Cart = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:AppColors.white}}>
    <CartHeader navigation={navigation} item="Cart" />
    <ScrollView>
    <EstimatedDeliveryCard/>
    <View style={{flexDirection:"row"}} >
    <CounterModal /> 
<Image
      source={require('../../assets/Images/image11.png')} // Specify the source of the image
      style={[OtherStyles.cartImage]} // Set the desired width and height of the image
    />
    <View style={{flexWrap:"wrap",marginHorizontal:wp('4'),marginVertical:hp('3')}}>
    <Text style={[OtherStyles.text]}>Summer Deal</Text>
    <Text>Rs.330.00</Text>
    </View>
    </View>
    <View style={{borderBottomWidth:0.3,marginVertical:hp('2')}}></View>

    <TouchableOpacity>
    <Text style={[OtherStyles.text2]}>Add more items</Text>
    </TouchableOpacity>
    <View style={{height:hp('0.8'),backgroundColor:AppColors.background,marginVertical:hp(3.7)}}></View>
    <Text style={[OtherStyles.text3]}>Popular with your order</Text>
    {/* <Text style={{left:wp('6'),letterSpacing:-1,fontFamily:"poppins-Thin"}}>Other customers also bought these</Text> */}
   
        </ScrollView>  
            <Neomorph
          darkShadowColor={AppColors.primary}
          lightShadowColor={AppColors.background}
          // inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={[ContainerStyles.touchableOpacityNeomorphContainer2]}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
              }}>
              <Text style={[TextStyles.whiteCenteredLable2]}>Confirm payment and address</Text>
            </TouchableOpacity>
          </View>
        </Neomorph>
   
  </SafeAreaView>

  )
}
export default Cart;