import React from 'react';
import {SafeAreaView, View, Image} from 'react-native';
import CartHeader from '../../components/headers/CartHeader';
import {Neomorph} from 'react-native-neomorph-shadows';
import AppColors from '../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CounterModal from '../../components/CartCard';
import {Text} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import TextStyles from '../../assets/Styles/TextStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import CardComponent from '../../components/Cards/CardComponent';
import OtherStyles from '../../assets/Styles/OtherStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';
import CartPopularItems from '../../components/Cards/CartPopularItems';
const Cart = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <CartHeader navigation={navigation} item="Cart" />
      <ScrollView>
        <View style={{margin: hp('2'), alignItems: 'center'}}>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            // inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={[ContainerStyles.cartNeomorph]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/Images/deliveryboy.jpg')}
                style={[ImageStyles.deliveryImg]}
              />
              <View style={{flexWrap: 'wrap'}}>
                <Text
                  style={{marginTop: hp('4'), fontFamily: 'Poppins-SemiBold'}}>
                  Estimated delivery
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: hp('2.5%'),
                    fontWeight: 'bold',
                    color: AppColors.black,
                  }}>
                  Now (30 min)
                </Text>
              </View>
            </View>
          </Neomorph>
        </View>

        <CounterModal />

        <TouchableOpacity>
          <Text style={[TextStyles.text3]}>Add more items</Text>
        </TouchableOpacity>
        <View
          style={{
            height: hp('0.8'),
            backgroundColor: AppColors.background,
            marginVertical: hp(3.7),
          }}></View>
        <Text style={[OtherStyles.text4]}>Popular with your order</Text>
        <Text style={{marginLeft: wp('4')}}>
          Other customer also bought these
        </Text>

        <CartPopularItems />
        {/* <SmallCard/> */}
      </ScrollView>
      <TouchableOpacity>
      <Neomorph
        // darkShadowColor={AppColors.primary}
        lightShadowColor={AppColors.background}
        // inner // <- enable shadow inside of neomorph
        swapShadows // <- change zIndex of each shadow color
        style={[ContainerStyles.touchableOpacityNeomorphContainer2]}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={[TextStyles.whiteCenteredLable2]}>
              Confirm payment and address
            </Text>
        </View>
      </Neomorph>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Cart;
