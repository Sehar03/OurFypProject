import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProductsBackButton from '../../components/headers/ProductsBackButton';
import { Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AppContext from '../../Context/AppContext';
import Octicons from 'react-native-vector-icons/Octicons';

const OrderDetail = ({ navigation, route, item }) => {
  const { orderId } = route.params;
  const [viewSingleOrder, setViewSingleOrder] = useState([]);
  const { baseUrl, currentUser } = useContext(AppContext);

  const ViewSingleOrder = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewSingleOrder/${orderId}`);
      setViewSingleOrder(response.data);
      console.log('response', response.data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      ViewSingleOrder();
    }, [orderId]),
  );



  console.log('orderId', orderId);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <ScrollView>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        {viewSingleOrder.map((item) => (
          <>
            <ImageBackground
              source={{ uri: baseUrl + item.restaurantImage }}
              style={{ height: hp('40%'), width: wp('100%') }}>
              <ProductsBackButton navigation={navigation} />

              <View
                style={{
                  flexDirection: 'row',
                  width: wp('100%'),
                  borderTopLeftRadius: 72,
                  borderTopRightRadius: 72,
                  marginTop: hp('24'),
                  height: hp('6'),
                  backgroundColor: 'white',
                }}>
              </View>
            </ImageBackground>
            <View style={{ alignItems: "center" }}>

              <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: hp('2.2'), color: AppColors.black }}>Order #{orderId}</Text>
              <Text style={{ fontFamily: "Poppins-Regular", fontSize: hp('1.8'), color: AppColors.black }}>{item.status} on {item.orderDateTime}</Text>
            </View>
            <View style={{ marginLeft: wp('8'), marginTop: hp('3'), marginRight: wp('7') }}>
              <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <Octicons
                  name="location"
                  size={20}
                  color={AppColors.primary}
                  style={{ color: AppColors.primary }}
                />
                <Text style={{ fontFamily: "Poppins-Regular", marginHorizontal: wp('2') }}>Order from</Text>
              </View>
              <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: hp('2.2'), color: AppColors.primary, marginHorizontal: wp('6') }}>{item.restaurantName}</Text>
              <View style={{ flexDirection: "row" }}>
                <Octicons
                  name="location"
                  size={20}
                  color={AppColors.primary}
                  style={{ color: AppColors.Gray, marginTop: hp('1') }}
                />
                <Text style={{ fontFamily: "Poppins-Regular", marginTop: hp('1'), marginHorizontal: wp('2') }}>Delivered to</Text>
              </View>
              <Text style={{ fontFamily: "Poppins-Regular", color: AppColors.black, fontSize: hp('1.7'), marginHorizontal: wp('6'), textAlign: "justify" }}>{item.deliveryAddress}</Text>
            </View>
            <View
              style={{
                marginTop: hp('2'),
                width: wp('100'),
                borderBottomWidth: hp('1'),
                borderColor: AppColors.background2,
              }}></View>
            {item.products && item.products.map((product, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginTop: hp('1.5'),
                  justifyContent: 'space-between',
                  marginLeft: wp('8'),
                  marginRight: wp('7'),
                  marginTop: hp('2'),
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: AppColors.black,
                    fontSize: hp('2'),
                  }}
                >
                  {truncateText(`${product.qty} x ${product.productName}`, 30)}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: AppColors.black,
                    fontSize: hp('1.9'),
                  }}
                >
                  Rs. {product.productPrice}
                </Text>
              </View>
            ))}




            <View
              style={{
                marginTop: hp('1.5'),
                width: wp('100'),
                borderBottomWidth: hp('0.3'),
                borderColor: AppColors.background2,
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('1.5'),
                justifyContent: 'space-between',
                marginLeft: wp('8'),
                marginRight: wp('7'),
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.9'),
                }}>
                Subtotal
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.8'),
                  color: AppColors.black,
                }}>
               Rs. {item.
                  totalAmount - item.
                    deliveryFee}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('0.5'),
                justifyContent: 'space-between',
                marginLeft: wp('8'),
                marginRight: wp('7'),
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.9'),
                }}>
                Delivery Fee
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.8'),
                  color: AppColors.black,
                }}>
                Rs. {item.deliveryFee}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('0.5'),
                justifyContent: 'space-between',
                marginLeft: wp('8'),
                marginRight: wp('7'),
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: hp('2.2'),
                  color: AppColors.black
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.8'),
                  color: AppColors.black,
                }}>
                Rs. {item.totalAmount}
              </Text>
            </View>
            <View
              style={{
                marginTop: hp('1'),
                width: wp('100'),
                borderBottomWidth: hp('0.3'),
                borderColor: AppColors.background2,
              }}></View>
            <Text style={{
              marginLeft: wp('8'), fontFamily: 'Poppins-SemiBold', fontSize: hp('2'), color: AppColors.black, marginTop: hp('2')
            }}>Paid with</Text>
            <View
              style={{
                flexDirection: 'row',
                width: wp('100%'),
                marginTop: hp('1'),
                marginLeft: wp('8'),
                marginRight: wp('7'),
                marginBottom: hp('4')

              }}>
              <MaterialCommunityIcons
                name="cash"
                size={24}
                color={AppColors.Gray}
                style={{}}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: AppColors.black,
                  marginLeft: wp('1.4'),
                  fontSize: hp('1.8'),
                }}>
                Cash on Deleivery
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: AppColors.black,
                  marginLeft: wp('30'),
                  fontSize: hp('1.9'),
                }}>
                Rs. {item.totalAmount}
              </Text>
            </View>

          </>

        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;
