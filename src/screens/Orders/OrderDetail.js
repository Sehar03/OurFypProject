import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextStyles from '../../assets/Styles/TextStyles';
import ProductsBackButton from '../../components/headers/ProductsBackButton';
import {Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AppContext from '../../Context/AppContext';
import Octicons from 'react-native-vector-icons/Octicons';
import IconStyles from '../../assets/Styles/IconStyles';

const OrderDetail = ({navigation, route, item}) => {
const {orderId} = route.params;
const[viewSingleOrder,setViewSingleOrder] = useState([]);
const { baseUrl, currentUser } = useContext(AppContext);

const ViewSingleOrder = async () => {
  try {
    const response = await axios.post(`${baseUrl}/viewSingleOrder/${orderId}`);
setViewSingleOrder(response.data);
console.log('response',response.data)
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
useFocusEffect(
  React.useCallback(() => {
    ViewSingleOrder();
  }, [orderId]),
);



console.log('orderId',orderId);
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      };
    
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
     <ScrollView>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
{viewSingleOrder.map((item) => (
  <>
      <ImageBackground
        source={{uri:baseUrl+item.restaurantImage}}
        style={{height: hp('40%'), width: wp('100%')}}>
        <ProductsBackButton navigation={navigation} />

        <View
          style={{
            flexDirection: 'row',
            width: wp('100%'),
            borderTopLeftRadius: 70,
            borderTopRightRadius: 70,
            marginTop: hp('22'),
            height: hp('8'),
            backgroundColor: 'white',
          }}>
          </View>
      </ImageBackground>
      <View style={{alignItems:"center"}}>

      <Text style={{fontFamily:"Poppins-SemiBold",fontSize:hp('2.2'),color:AppColors.black}}>Order #{orderId}</Text>
      <Text style={{fontFamily:"Poppins-Regular",fontSize:hp('1.8'),color:AppColors.black}}>Delivered on { item.orderDateTime}</Text>
      </View>
      <View style={{marginLeft:wp('8'),marginTop:hp('3'),marginRight:wp('7')}}>
        <View style={{flexDirection:"row", alignItems: 'center'}}>
        <Octicons
                  name="location"
                  size={20}
                  color={AppColors.primary}
                  style={{color:AppColors.primary}}
                />
        <Text style={{fontFamily:"Poppins-Regular",marginHorizontal:wp('2')}}>Order from</Text>
        </View>
        <Text style={{fontFamily:"Poppins-SemiBold",fontSize:hp('2.2'),color:AppColors.primary,marginHorizontal:wp('6')}}>{item.restaurantName}</Text>
        <View style={{flexDirection:"row"}}>
        <Octicons
                  name="location"
                  size={20}
                  color={AppColors.primary}
                  style={{color:AppColors.Gray,marginTop:hp('2')}}
                />
        <Text style={{fontFamily:"Poppins-Regular",marginTop:hp('2'),marginHorizontal:wp('3')}}>Delivered to</Text>
        </View>
        <Text style={{fontFamily:"Poppins-Regular",color:AppColors.black,fontSize:hp('2'),marginHorizontal:wp('6')}}>{item.deliveryAddress}</Text>
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
              marginTop: hp('3'),
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
              marginLeft: wp('8'),
              marginRight: wp('7'),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: hp('2'),
              }}>
              Subtotal
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: hp('1.9'),
                color: AppColors.black,
              }}>
                  {item.
totalAmount-item.
deliveryFee}
            </Text>
          </View>
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
                fontSize: hp('2'),
              }}>
              Delivery Fee
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: hp('1.8'),
                color: AppColors.black,
              }}>
              Rs. 20
            </Text>
          </View>
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
                fontFamily: 'Poppins-SemiBold',
                fontSize: hp('2.3'),
                color:AppColors.black
              }}>
              Total
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: hp('1.9'),
                color: AppColors.black,
              }}>
              {item.totalAmount}
            </Text>
          </View>
          <View
            style={{
              marginTop: hp('2'),
              width: wp('100'),
              borderBottomWidth: hp('0.3'),
              borderColor: AppColors.background2,
            }}></View>
            <Text style={{marginLeft:wp('8'),fontFamily: 'Poppins-SemiBold', fontSize: hp('2'), color:AppColors.black,marginTop:hp('4')
}}>Paid with</Text>
<View
              style={{
                flexDirection: 'row',
                width: wp('100%'),
                marginTop: hp('1.5'),
                marginLeft:wp('8'),
                marginRight:wp('7'),
                marginBottom:hp('4')

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
                  marginLeft: wp('2'),
                  fontSize: hp('2'),
                }}>
                Cash on Deleivery
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: AppColors.black,
                  marginLeft: wp('26'),
                  fontSize: hp('2'),
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
