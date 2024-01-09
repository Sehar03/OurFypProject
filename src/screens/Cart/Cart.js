import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Image, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import CartHeader from '../../components/headers/CartHeader';
import { Neomorph } from 'react-native-neomorph-shadows';
import AppColors from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextStyles from '../../assets/Styles/TextStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import OtherStyles from '../../assets/Styles/OtherStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';
import AppContext from '../../Context/AppContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
const Cart = ({ navigation,route }) => {
  const{restaurant_id} = route.params
  const { baseUrl, currentUser } = useContext(AppContext);
  const [myCart, setMyCart] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const viewAllCartProducts = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/viewAllCartsProduct/${currentUser.userId}`,
      );
      setMyCart(response.data);
      setIsCartEmpty(response.data.length === 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      viewAllCartProducts();
    }, [currentUser.userId]),
  );
  const deleteProduct = async delId => {
    try {
      const response = await axios.delete(`${baseUrl}/deleteCartProduct/${delId}`);
      console.log('Delete Product Response:', response.data);

      if (response.data.success) {
        viewAllCartProducts();
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [productQuantities, setProductQuantities] = useState({});

  const incrementCount = async (productId) => {
    try {
      await axios.post(`${baseUrl}/incrementCartProduct/${productId}`);
      viewAllCartProducts();

    } catch (error) {
      console.error("Error incrementing product quantity:", error);
    }
  };

  const decrementCount = async (productId) => {
    try {
      await axios.post(`${baseUrl}/decrementCartProduct/${productId}`);

      viewAllCartProducts();

    } catch (error) {
      console.error("Error decrementing product quantity:", error);
    }
  };


  const subtotal = myCart.reduce((acc, item) => {
    const quantity = productQuantities[item._id] || 1;
    const updatedProductPrice = parseFloat(item.productPrice) * quantity;
    return acc + updatedProductPrice;
  }, 0);

  const deliveryFee = 20; // Set your delivery fee
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <CartHeader navigation={navigation} item="Cart" />
      <ScrollView>
        {isCartEmpty ? (
          <View style={{
            marginTop: hp('20'),
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
          }}>
            <LottieView
              source={require('../../assets/animations/cartEmpty.json')}
              autoPlay
              loop
              style={{ width: wp(90), height: hp(30) }}
            />
            <Text style={[TextStyles.cartEmptyText]}>Your cart is empty!</Text>
          </View>
        ) : (
          <View>
            <View style={{ margin: hp('2'), alignItems: 'center' }}>
              <Neomorph
                darkShadowColor={AppColors.primary}
                lightShadowColor={AppColors.background}
                swapShadows
                style={ContainerStyles.cartNeomorph}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../assets/Images/deliveryboy.jpg')}
                    style={[ImageStyles.deliveryImg]}
                  />
                  <View style={{ flexWrap: 'wrap' }}>
                    <Text
                      style={{ marginTop: hp('4'), fontFamily: 'Poppins-SemiBold' }}>
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


            <FlatList
              data={myCart}
              scrollEnabled={false} // Disable the scroll behavior
              Vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: wp('0.4'),
                    borderColor: AppColors.background,
                    height: hp('16')
                  }}>

                    <Neomorph
                      darkShadowColor={AppColors.primary}
                      lightShadowColor={AppColors.background}
                      swapShadows // <- change zIndex of each shadow color
                      style={ContainerStyles.incrementDecrementNeomorph}>
                      <TouchableOpacity onPress={() => {
                        incrementCount(item._id)
                      }}
                      >
                        <Text style={{ textAlign: 'center', fontSize: hp('2.5') }}>
                          +
                        </Text>
                      </TouchableOpacity>

                      <Text style={[TextStyles.productQuantityText]}>
                        {item.qty}
                      </Text>

                      <TouchableOpacity onPress={() => {
                        decrementCount(item._id);
                      }}

                      >
                        <Text style={{ textAlign: 'center', fontSize: hp('3.5') }}>
                          -
                        </Text>
                      </TouchableOpacity>
                    </Neomorph>
                    <Image
                      source={{ uri: baseUrl + item.productImage }}
                      style={[ImageStyles.cartImage]}
                    />
                    <View
                      style={{
                        marginTop: hp('3'),
                        marginLeft: wp('2.5')

                      }}>
                      <View style={{ width: wp('47') }}>
                        <Text style={[OtherStyles.text]}>{item.productName}</Text>
                      </View>
                      <Text style={{ color: AppColors.black }}>{item.productPrice}</Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => {
                        deleteProduct(item._id)
                      }} style={{ marginLeft: wp('1'), marginTop: hp('4.5') }}>
                        <FontAwesome name="trash" size={20} color={AppColors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />

            <View style={{
              borderColor: AppColors.background, marginTop: hp('2')
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                marginLeft: wp('4')
              }}>
                <Text style={{ fontFamily: "Poppins-SemiBold" }}>
                  SubTotal
                </Text>
                <Text style={[TextStyles.cartRupeesText]}>
                  Rs. {subtotal}
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                marginLeft: wp('4'),
                marginTop: hp('1')
              }}>
                <Text style={{ fontFamily: "Poppins-SemiBold" }}>
                  Delivery Fee
                </Text>
                <Text style={[TextStyles.cartRupeesText]}>
                  Rs. 20
                </Text>


              </View>
              <Text style={{ marginLeft: wp('4'), color: AppColors.background, fontSize: wp('10') }}>
                ---------------------------------
              </Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                marginLeft: wp('4'),
                marginTop: hp('1')
              }}>
                <Text style={{ fontFamily: "Poppins-SemiBold" }}>
                  Total
                </Text>
                <Text style={[TextStyles.cartRupeesText]}>
                  Rs.{total}
                </Text>
              </View>

            </View>
          </View>
        )}
      </ScrollView>
      {isCartEmpty ? (
        <Text></Text>
      ) : (
        <TouchableOpacity onPress={()=>{
          navigation.navigate('Checkout',{
            subtotal:subtotal,
            deliveryFee:deliveryFee,
            total:total,
            restaurant_id:restaurant_id
          })
        }}>
          <Neomorph
            // darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            // inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={ContainerStyles.touchableOpacityNeomorphContainer2}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={[TextStyles.whiteCenteredLable2]}>
                Confirm payment and address
              </Text>
            </View>
          </Neomorph>
        </TouchableOpacity>


      )}
    </SafeAreaView>
  );
};
export default Cart;