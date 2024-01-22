import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import CartHeader from '../../components/headers/CartHeader';
import ImageStyles from '../../assets/Styles/ImageStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Neomorph} from 'react-native-neomorph-shadows';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import AppContext from '../../Context/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const Orders = ({navigation}) => {
  const [pastOrders, setPastOrders] = useState([]);
const [activeOrders, setActiveOrders] = useState([]);

  const { baseUrl, currentUser } = useContext(AppContext);

  // const [ongoingOrders, setOngoingOrders] = useState([
  //   {
  //     id: '1',
  //     name: 'Happy Biryani & Fast Food',
  //     delivery: 'Delivered on 28 Sep 19:05',
  //     description: 'Cream Bhallay, Double Egg Burger',
  //     uri: require('../../assets/Images/biryani5.jpeg'),
  //     price: '337',
  //   },
  // ]);
  const viewOrders = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewCustomerOrder/${currentUser.userId}`);
      const orders = response.data;
  
      const past = orders.filter(order => order.status === 'Order Delivered' || order.status === 'Order Cancelled');
      const active = orders.filter(order => order.status === 'New Order' || order.status === 'Order on the way'|| order.status === 'Ongoing Order');
    
  
      setPastOrders(past);
      setActiveOrders(active);
 
  
      console.log('Past Orders:', past);
      console.log('Active Orders:', active);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  

  useFocusEffect(
    React.useCallback(() => {
      viewOrders();
    }, [currentUser.userId]),
  );
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <CartHeader navigation={navigation} item="Orders" />
      <ScrollView>
      <Text
        style={[TextStyles.orderText]}>
        Past orders
      </Text>

      <FlatList
        data={pastOrders}
        scrollEnabled={false}
        renderItem={({item}) => {
          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=>{
                navigation.navigate('OrderDetail',{
                  orderId:item.orderId
                })
              }}>
              <Neomorph
                darkShadowColor={AppColors.primary}
                lightShadowColor={AppColors.darkgray}
                swapShadows // <- change zIndex of each shadow color
                style={[ContainerStyles.orderNeomorph]}>
                <View style={{flexDirection: 'row', width: wp('70')}}>
                  <Image
                    source={{uri:baseUrl+item.restaurantImage}}
                    style={[ImageStyles.orderImage]}
                  />

                  <View
                    style={{
                      marginTop: hp('2'),
                      marginLeft: wp('2.5'),
                      marginRight:wp('2'),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: hp(2),
                        color: AppColors.black,
                      }}>
                    {item.restaurantName}</Text>
                    <Text style={{marginTop: hp('-0.10')}}>{item.status} on {item.orderDateTime}</Text>

                    
                      {item.products && item.products.map((product, index)=>(
                        <Text key ={index} style={{marginTop: hp('0.3')}}>{product.productName}</Text>

                      ))}
                    
                    <Text
                      style={{
                        marginLeft: 0,
                        fontFamily: 'Poppins-Medium',
                        marginTop: hp('0.1'),
                        fontSize:hp('2')
                      }}>
                      Total Rs. {item.totalAmount}
                    </Text>
                  </View>
                </View>
                
              </Neomorph>
              </TouchableOpacity>
            </View>
          );
        }}
      />



<Text
        style={[TextStyles.orderText]}>
        Active Orders
      </Text>

      <FlatList
              scrollEnabled={false}

        data={activeOrders}
        renderItem={({item}) => {
          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
             <TouchableOpacity onPress={()=>{
                navigation.navigate('OrderDetail',{
                  orderId:item.orderId,orderDetails: item
                })
              }}>
              <Neomorph
                darkShadowColor={AppColors.primary}
                lightShadowColor={AppColors.darkgray}
                swapShadows // <- change zIndex of each shadow color
                style={[ContainerStyles.orderNeomorph]}>
                <View style={{flexDirection: 'row', width: wp('70')}}>
                  <Image
                    source={{uri:baseUrl+item.restaurantImage}}
                    style={[ImageStyles.orderImage]}
                  />

                  <View
                    style={{
                      marginTop: hp('2'),
                      marginLeft: wp('2.5'),
                      marginRight:wp('2'),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: hp(2),
                        color: AppColors.black,
                      }}>
                    {item.restaurantName}</Text>
                    <Text style={{marginTop: hp('0.-10')}}>{item.status} on {item.orderDateTime}</Text>

                    
                      {item.products && item.products.map((product, index)=>(
                        <Text key ={index} style={{marginTop: hp('0.3')}}>{product.productName}</Text>

                      ))}
                    
                    <Text
                      style={{
                        marginLeft: 0,
                        fontFamily: 'Poppins-Medium',
                        marginTop: hp('0.1'),
                        fontSize:hp('2')
                      }}>
                      Total Rs. {item.totalAmount}
                    </Text>
                  </View>
                </View>
                
              </Neomorph>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Orders;
