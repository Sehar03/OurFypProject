import React, { useContext, useState, useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppColors from '../../assets/colors/AppColors';
import ProductsBackButton from '../../components/headers/ProductsBackButton';
import TextStyles from '../../assets/Styles/TextStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import { Neomorph } from 'react-native-neomorph-shadows';
import AppContext from '../../Context/AppContext';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconStyles from '../../assets/Styles/IconStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextFieldStyles from '../../assets/Styles/TextFieldStyles';

const SingleSharedFoodDetail = ({ navigation, route }) => {
  const { currentUser, baseUrl } = useContext(AppContext)
  const { productId,currentOrderRoute } = route.params;
  const [allSharedFood, setAllSharedFood] = useState([]);

  const viewSingleSharedFoodProduct = async () => {
    try {
      const response = await axios.post(

        `${baseUrl}/viewSingleSharedFoodProduct/${productId}`,
      );
      setAllSharedFood(response.data);
      console.log('response', response.data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    viewSingleSharedFoodProduct();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      
      {allSharedFood.map((item) => (
          <>
      <ScrollView>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />

            <ImageBackground
              source={{ uri: baseUrl + item.productImage }}
              style={{ height: hp('40%'), width: wp('100%') }}>
              <ProductsBackButton navigation={navigation} />
              <View
                style={[ContainerStyles.foldedViewStyle]}>
              </View>

            </ImageBackground>

            <Text style={[TextStyles.ProductNameText]}>
              {item.productName}
            </Text>

            <View style={{ marginTop: hp('2') }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  marginLeft: wp('4'),
                  fontSize: wp('4'),
                }}>
                Description:
              </Text>
              <ScrollView>
                <Text
                  style={[TextStyles.productDescription]}>
                  {item.productDescription}
                </Text>
              </ScrollView>
              <Text style={[TextStyles.foodPrices, { fontSize: hp('1.8') }]}>Total Price:   Rs.{item.productPrice}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="arrow-forward" size={20} style={[IconStyles.signupIcons, { marginTop: hp('1.2'), marginLeft: wp('6') }]} />
                <Text style={[TextStyles.foodPrices, { fontSize: hp('1.8'), color: AppColors.black }]}>Price Per Person:   Rs.{item.productPrice / 2}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginLeft: wp('2'), marginTop: hp('2'), flex: 1 }}>
              <FontAwesome name="calendar" size={20} style={[IconStyles.signupIcons, { marginTop: 0 }]} />
              <Text
                style={{
                  color: AppColors.black,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Date:  {item.productSelectedDate}
              </Text>
              <View style={{ flexDirection: "row",flex:1 }}>
                <Ionicons name="time-outline" size={20} style={[IconStyles.signupIcons, { marginTop: hp('0') }]} />
                <Text
                  style={{
                    color: AppColors.black,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Time:  {item.productSelectedTime}
                </Text>
              </View>
            </View>
            <Text style={[TextStyles.foodPrices,{fontSize:hp('2.2')}]}>Guests</Text>
                <View style={{ alignSelf: "center" }}>
                  <Neomorph
                    darkShadowColor={AppColors.primary}
                    lightShadowColor={AppColors.background2}
                    style={[ContainerStyles.inputFieldNeomorphContainer, { shadowOpacity: 0.15, }]}>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons name="person-outline" size={20} style={IconStyles.signupIcons} />
                      <TextInput
                        style={[TextFieldStyles.inputField, { color: 'black' }]}
                        value={"2 Guests"}
                        editable={false} // Disable manual input
                      />
                    </View>
                  </Neomorph>

                </View>
                   
       
      </ScrollView>
      {currentOrderRoute === "Shared" ?(
        <View style={{ alignSelf: "center" }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('CheckOutReservation', {
            productId: item._id
          })
        }}>
          <Neomorph
            darkShadowColor="white"
            lightShadowColor="white"
            swapShadows // <- change zIndex of each shadow color
            style={
              ContainerStyles.singleProductTouchableOpacityNeomorphContainer
            }>
            <Text style={[TextStyles.whiteCenteredLable3]}>Reserve Now</Text>
          </Neomorph>
        </TouchableOpacity>
      </View>
      ):(
        <>
        </>
        )}
          

      </>
      ))}

    </SafeAreaView>
  );
};

export default SingleSharedFoodDetail;
