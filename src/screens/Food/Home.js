import React from 'react'
import DrawerHeader from '../../components/headers/DrawerHeader'
import { Neomorph } from 'react-native-neomorph-shadows';
import { Image, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
        <DrawerHeader navigation={navigation} />
        <View style={ContainerStyles.itemsCenter}>
          <View style={{
            flexDirection: "row",
            marginTop: hp('4%'),
            alignItems: "center"
          }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('FullPriceHomeScreen'
              )

            }}>
              <Neomorph
                darkShadowColor={AppColors.primary}
                lightShadowColor={AppColors.darkOrange}
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={[ContainerStyles.largeNeomorphStyle]}>

                <Text style={[TextStyles.primaryText]}>Full Price Food </Text>
                <Text style={[TextStyles.smallText]}>Order food from your favourite resturants</Text>
                <Image source={require('../../assets/Images/image5.png')} style={{ height: hp(10), width: hp(18), marginTop: hp('14'), marginLeft: wp('4') }} />
              </Neomorph>
            </TouchableOpacity>

            <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('FoodShareScreen'
              )

            }}>
                <Neomorph
                  darkShadowColor={AppColors.primary}
                  lightShadowColor={AppColors.darkOrange}
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={[ContainerStyles.smallNeomorphStyle]}

                >

                  <Text style={[TextStyles.primaryText]}>Share Food</Text>
                  <Text style={[TextStyles.smallText]}>Share with your friend</Text>
                  <Image source={require('../../assets/Images/image8.png')} style={{ height: hp(3), width: hp(17), marginLeft: 20 }} />
                </Neomorph>
              </TouchableOpacity>

              <TouchableOpacity>
                <Neomorph
                  darkShadowColor={AppColors.primary}
                  lightShadowColor={AppColors.darkOrange}
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={[ContainerStyles.smallNeomorphStyle, { marginTop: 10 }]}

                >

                  <Text style={[TextStyles.primaryText]}>Free Food</Text>
                  <Image source={require('../../assets/Images/image9.png')} style={{ height: hp(10), width: hp(18), marginTop: 10, marginLeft: 15 }} />
                </Neomorph>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Image source={require('../../assets/Images/image10.png')} style={[ImageStyles.rightCornerImage]} />

      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
