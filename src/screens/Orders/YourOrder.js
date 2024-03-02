import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AppContext from '../../Context/AppContext';
import CloseHeader from '../../components/headers/CloseHeader';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import { Neomorph } from 'react-native-neomorph-shadows';


const YourOrder = ({ navigation, route }) => {
  const { restaurantName, currentUser, baseUrl } = useContext(AppContext);
  const [currentOrder, setCurrentOrder] = useState([])
  const { orderId, deliveryAddress, subtotal, deliveryFee, total } = route.params;



  const viewCurrentOrder = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewCurrentOrder/${orderId}`);
      const orderWithId = response.data.find(order => order.orderId === orderId);
      setCurrentOrder(orderWithId)
    } catch (error) {
      console.error('Error fetching Order:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      viewCurrentOrder();
    }, [orderId]),

  );
  console.log("currentOrder", currentOrder)
  // const viewAllCartProducts = async () => {
  //   try {
  //     const response = await axios.post(`${baseUrl}/viewAllCartProducts/${currentUser.userId}`);
  //     const filteredCart = response.data.filter(product => product.isPurchased === 1);
  //     setCartProducts(filteredCart);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     viewAllCartProducts();
  //   }, [currentUser.userId]),
  // );




  const handleBackButtonPress = () => {
    navigation.navigate('FullPriceHomeScreen');
    return true; // Prevent default behavior (exit the app)
  };

  useEffect(() => {
    // Add a listener for the back button press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress
    );

    // Cleanup function to remove the listener when the component is unmounted
    return () => {
      backHandler.remove();
    };
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: AppColors.white }}>
        <CloseHeader navigation={navigation} item="       Your Order"/>

      </View>
      <ScrollView>
        <View
          style={{
            padding: 20,
            flex: 1,
            alignItems: 'center',
            backgroundColor: AppColors.white,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: AppColors.black,
              fontSize: hp('2.3'),
            }}>
            Estimated Delivery time
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                color: AppColors.primary,
                fontSize: hp('2.6'),
                marginTop: hp('0.1')
              }}>
              10:05 - 10:15
            </Text>
            {/* <LottieView
            source={require('../../assets/animations/waiting.json')}
            autoPlay
            loop
            style={{ width: 30, height: 30 ,marginLeft:wp('10')}}
          /> */}
          </View>
          <LottieView
            source={require('../../assets/animations/estimateDeleivery.json')}
            autoPlay
            loop
            style={{ width: 170, height: 170 }}
          />
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: AppColors.black,
              fontSize: hp('2                .5'),
            }}>
            Got your Order!
          </Text>
        </View>
        <View
          style={{
            backgroundColor: AppColors.white,
            marginVertical: hp('1%'),
            paddingBottom: hp('3'),
            flex: 1,
          }}>
          <View style={{ flexDirection: 'row', width: wp('100%') }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: AppColors.black,
                marginTop: hp('3'),
                marginLeft: wp('4'),
                fontSize: hp('2.2'),
              }}>
              Order Details
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1.5'),
              justifyContent: 'space-between',
              marginLeft: wp('4'),
              marginRight: wp('3'),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: AppColors.black,
                fontSize: hp('1.8'),
              }}>
              Order number:
            </Text>
            <View style={{ backgroundColor: AppColors.background, height: hp(3.2), width: wp(23), borderRadius: 80, justifyContent: 'space-between', alignItems: "center", flexDirection: "row" }}>
              <AntDesign
                name="exclamationcircle"
                size={13}
                color={AppColors.Gray}
                style={{ marginLeft: wp('2') }}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: AppColors.black,
                  fontSize: hp('1.7'),
                  marginRight: wp('1.4'),
                  marginTop: hp('0.2')
                }}>
                {orderId}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1.5'),
              justifyContent: 'space-between',
              marginLeft: wp('4'),
              marginRight: wp('3'),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: AppColors.black,
                fontSize: hp('1.8'),
              }}>
              Order from:
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: AppColors.primary,
                fontSize: hp('1.7'),
              }}>
              {restaurantName}
            </Text>
          </View>


          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1.5'),
              justifyContent: 'space-between',
              marginLeft: wp('4'),
              marginRight: wp('1'),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: AppColors.black,
                fontSize: hp('1.8'),
              }}>
              Delivery address:
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                // textAlign:"justify",
                color: AppColors.black,
                fontSize: hp('1.7'),
                width: wp('50')
              }}>
              {deliveryAddress && deliveryAddress.length > 0 ? deliveryAddress[0].formattedAddress : ''}
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: AppColors.primary, fontSize: hp('6') }}>...</Text>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1.5'),
              justifyContent: 'space-between',
              marginLeft: wp('4'),
              marginRight: wp('3'),
              marginTop: hp('3'),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: AppColors.black,
                fontSize: hp('1.8'),
              }}>
              {truncateText('2x   Fresh Fried Egg', 30)}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: AppColors.black,
                fontSize: hp('1.7'),
              }}>
              Rs. 160
            </Text>
          </View> */}
          <FlatList
            data={currentOrder.products}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp('1.5'),
                  justifyContent: 'space-between',
                  marginLeft: wp('4.8'),
                  marginRight: wp('3'),
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: AppColors.black,
                    fontSize: hp('1.8'),
                  }}>
                  {truncateText(`${item.qty} x ${item.productName}`, 30)}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: AppColors.black,
                    fontSize: hp('1.7'),
                  }}>
                  Rs. {item.productPrice}
                </Text>
              </View>
            )}
          />
          <View
            style={{
              marginTop: hp('2'),
              width: wp('100'),
              borderBottomWidth: hp('0.3'),
              borderColor: AppColors.background2,
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1.5'),
              justifyContent: 'space-between',
              marginLeft: wp('4'),
              marginRight: wp('3'),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: hp('1.8'),
                color: AppColors.black,
              }}>
              Subtotal
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: hp('1.8'),
                color: AppColors.black,
              }}>
              Rs. {subtotal}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1.5'),
              justifyContent: 'space-between',
              marginLeft: wp('4'),
              marginRight: wp('3'),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: hp('1.8'),
                color: AppColors.black,
              }}>
              Deleivery Fee
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: hp('1.8'),
                color: AppColors.black,
              }}>
              Rs. {deliveryFee}
            </Text>

          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp('1'),
              justifyContent: 'space-between',
              marginLeft: wp('4'),
              marginRight: wp('3'),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: AppColors.black,
                fontSize: hp('2.2'),
              }}>
              Total
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: AppColors.black,
                fontSize: hp('2.2'),
              }}>
              Rs. {total}
            </Text>
          </View>
          <View
            style={{
              marginTop: hp('2'),
              width: wp('100'),
              borderBottomWidth: hp('0.3'),
              borderColor: AppColors.background2,
            }}></View>
          <Text style={{
            fontFamily: 'Poppins-SemiBold',
            color: AppColors.black,
            fontSize: hp('2.2'),
            marginLeft: wp('4'),
            marginTop: hp('2')
          }}
          >Paid with
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: hp('1') }}>
            <MaterialCommunityIcons
              name="cash"
              size={24}
              color={AppColors.Gray}
              style={{ marginLeft: wp('4') }}
            />
            <Text style={{ marginRight: wp('40'), marginTop: hp('0.23') }}> Cash on Delivery</Text>
            <Text style={{ marginRight: wp('3.5') }}>Rs. {total}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: AppColors.white }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('TrackOrderStatus', {
            orderId: orderId
          })
        }}>
          <Neomorph
            darkShadowColor="white"
            lightShadowColor="white"
            swapShadows // <- change zIndex of each shadow color
            style={{
              shadowRadius: 2,
              backgroundColor: AppColors.primary,
              borderRadius: wp('1.3'),
              height: hp('6.2%'),
              width: wp('94%'),
              marginVertical: hp('1.4%'),
              shadowOpacity: 0.2,
              marginLeft: wp('3'),
              marginRight: wp('4'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: AppColors.white,
                fontFamily: 'Poppins-SemiBold',
                fontSize: hp('2.1'),
              }}>
              Track Order Status
            </Text>
          </Neomorph>
        </TouchableOpacity>
      </View>






    </SafeAreaView>
  );
};

export default YourOrder;
