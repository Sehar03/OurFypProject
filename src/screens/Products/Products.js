import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StatusBar,
  ImageBackground,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import ProductsBackButton from '../../components/headers/ProductsBackButton';
import TextStyles from '../../assets/Styles/TextStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconStyles from '../../assets/Styles/IconStyles';
import TabBarStyles from '../../assets/Styles/TabBarStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Neomorph } from 'react-native-neomorph-shadows';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import PopularFoodCard from '../../components/Cards/PopularFoodCard';
import { Image } from 'react-native-elements';
import ImageStyles from '../../assets/Styles/ImageStyles';
import DealCard from '../../components/Cards/DealCard';
import AppContext from '../../Context/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const Popular = ({ navigation, restaurant_id ,restaurantName}) => {
  const { baseUrl } = useContext(AppContext)
  const [allPopularCards, setAllPopularCards] = useState([]);

  const viewAllProducts = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/viewAll/${restaurant_id}`,
      );
      setAllPopularCards(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      viewAllProducts();
    }, [restaurant_id]),
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      {/* <ScrollView> */}
      {/* <View style={{flexDirection: 'row', marginTop: hp('1%')}}> */}

      {/* <ScrollView> */}
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          name="fire"
          size={wp('8%')}
          style={IconStyles.fireIcon}
        />
        <Text style={[TextStyles.leftMediumText]}>Products</Text>
      </View>
      <Text style={[TextStyles.leftSmallText]}>Most ordered right now. </Text>
      <FlatList
        numColumns={2}
        data={allPopularCards}
        // scrollEnabled={false} // Disable the scroll behavior
        renderItem={({ item }) => {
          return <PopularFoodCard navigation={navigation} restaurantName={restaurantName} item={item} restaurant_id={restaurant_id}/>;
        }}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
// Strong pepsi deals
const SpecialDeals = ({ navigation, restaurant_id, updateTotalQuantity, updateTotalAmount,restaurantName }) => {
  const {baseUrl} = useContext(AppContext)
  const [myCart, setMyCart] = useState([]);

  const viewAllProducts = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/viewAllFoodDeals/${restaurant_id}`,
      );
      setMyCart(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      viewAllProducts();
    }, [restaurant_id]),
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <View style={[ContainerStyles.productsContainerSeparator]}></View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[TextStyles.cartTextStyle, { marginLeft: wp('4%') }]}>
          Special Deals
        </Text>
      </View>
      <FlatList
        data={myCart}
        renderItem={({ item }) => {
          return <DealCard navigation={navigation} myCart={myCart} item={item} updateTotalQuantity={updateTotalQuantity} updateTotalAmount={updateTotalAmount} restaurantName={restaurantName} restaurant_id={restaurant_id}/>;
        }}
      />
    </SafeAreaView>
  );
};

// const SummerDeals = ({navigation}) => {
//   const [allSummerDealCards, setAllSummerDealCards] = useState([
//     {
//       uri: require('../../assets/Images/paratha.jpeg'),
//       title: 'Summer Deal 7',
//       description: '2 parathay, 1 omelette, 1 sweet egg',
//       price: '780.00',
//     },
//     {
//       uri: require('../../assets/Images/paratha2.jpeg'),
//       title: 'Summer Deal 6',
//       description: '2 parathay , 1 omelette,2 Shami kabab',
//       price: '890.00',
//     },
//     {
//       uri: require('../../assets/Images/paratha3.webp'),
//       title: 'Summer Deal 8',
//       description: '2 parathay, 1 omelette, 1 sweet egg',
//       price: '1030.00',
//     },
//   ]);
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
//       <View style={[ContainerStyles.productsContainerSeparator]}></View>
//       <View style={{flexDirection: 'row'}}>
//         <Text style={[TextStyles.cartTextStyle, {marginLeft: wp('4%')}]}>
//           Summer Deals
//         </Text>
//         <MaterialCommunityIcons
//           name="fire"
//           size={wp('8%')}
//           style={IconStyles.fireIcon2}
//         />
//       </View>
//       <Text style={[TextStyles.dealPriceText, {maxWidth: wp('90%')}]}>
//         Amazing Dishes Use Voucher HC75 for 75 Rupees Discount
//       </Text>

//       <FlatList
//         data={allSummerDealCards}
//         // scrollEnabled={false} // Disable the scroll behavior
//         renderItem={({item}) => {
//           return <DealCard navigation={navigation} item={item} />;
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// const BreakfastDeals = ({navigation}) => {
//   const [allBreakfastDealCards, setAllBreakfastDealCards] = useState([
//     {
//       uri: require('../../assets/Images/paratha.jpeg'),
//       title: 'Breakfat Deal 1',
//       description: '2 parathay, 1 omelette, 1 sweet egg',
//       price: '530.00',
//     },
//     {
//       uri: require('../../assets/Images/paratha2.jpeg'),
//       title: 'Breakfast Deal 2',
//       description: '2 parathay , 1 omelette,2 Shami kabab',
//       price: '690.00',
//     },
//     {
//       uri: require('../../assets/Images/paratha3.webp'),
//       title: 'Breakfast deal 3',
//       description: '2 parathay, 1 omelette, 1 sweet egg',
//       price: '780.00',
//     },
//   ]);
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
//       <View style={[ContainerStyles.productsContainerSeparator]}></View>
//       <View style={{flexDirection: 'row'}}>
//         <Text style={[TextStyles.cartTextStyle, {marginLeft: wp('4%')}]}>
//           Breakfast Deals
//         </Text>
//       </View>
//       <Text style={[TextStyles.dealPriceText, {maxWidth: wp('90%')}]}>
//         Amazing Dishes Use Voucher HC75 for 75 Rupees Discount
//       </Text>

//       <FlatList
//         data={allBreakfastDealCards}
//         // scrollEnabled={false} // Disable the scroll behavior
//         renderItem={({item}) => {
//           return <DealCard navigation={navigation} item={item} />;
//         }}
//       />
//     </SafeAreaView>
//   );
// };
const Products = ({ navigation, route }) => {
  const { currentUser, baseUrl, selectedFoodFeature, selectedRestaurants} = useContext(AppContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  if (
    selectedFoodFeature === 'Full Price Food' &&
    selectedRestaurants == 'Restaurants'
  ) {
    navigateToScreen = 'Cart';
    DesiredText = 'View Your Cart'; // Navigate to CartScreen
  } else if (
    selectedFoodFeature === 'ShareFood' &&
    selectedRestaurants == 'Restaurants'
  ) {
    navigateToScreen = 'ScheduleScreen';
    DesiredText = 'View Your Schedule'; // Navigate to ScheduleScreen
  }
  const { restaurantImage, restaurantName, imageDeliveryTime, restaurant_id } = route.params;


  const updateTotalQuantity = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewAllCartsProduct/${currentUser.userId}`);
      setCartProducts(response.data);
      const newTotalQuantity = response.data.reduce((total, product) => total + product.qty, 0);
      setTotalQuantity(newTotalQuantity);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const updateTotalAmount = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewAllCartsProduct/${currentUser.userId}`);
      setCartProducts(response.data);
        const newTotalAmount = response.data.reduce((acc, product) => {
          return acc + parseFloat(product.pricePerProduct) * product.qty;
        }, 0);
        
        setTotalAmount(newTotalAmount);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      updateTotalQuantity();
      updateTotalAmount()  // Check if this is being called
    }, [restaurant_id]),
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <ScrollView>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <ImageBackground
          source={{ uri: restaurantImage }}
          style={{ height: hp('20%'), width: wp('100%') }}>
          <ProductsBackButton navigation={navigation} />
        </ImageBackground>
        <Text style={[TextStyles.leftText]}>{restaurantName}</Text>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons
            name="access-time"
            size={wp('6%')}
            style={IconStyles.productsIcon}
          />
          <Text style={[TextStyles.productsLeftText]}>
            Delivery : {imageDeliveryTime}{' '}
          </Text>
        </View>
        <Popular navigation={navigation} restaurant_id={restaurant_id} restaurantName={restaurantName} />
        <SpecialDeals navigation={navigation} restaurant_id={restaurant_id} restaurantName={restaurantName} updateTotalQuantity={updateTotalQuantity} updateTotalAmount={updateTotalAmount} />
        {/* <SummerDeals navigation={navigation} />
        <BreakfastDeals navigation={navigation} /> */}
      </ScrollView>
      {selectedFoodFeature === 'Full Price Food' && selectedRestaurants == 'Restaurants' && (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigateToScreen,{
            restaurant_id:restaurant_id
          });
        }}>
        <Neomorph
          // darkShadowColor={AppColors.primary}
          lightShadowColor={AppColors.background}
          // inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={[ContainerStyles.touchableOpacityNeomorphContainer2]}>
          <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
            <View style={{ height: hp('3.5'), width: wp('7'), backgroundColor: AppColors.white, borderRadius: 100, marginTop: hp('1.5'), marginLeft: wp('3'), justifyContent: "center" }}>
              <Text style={{ color: AppColors.primary, alignSelf: 'center' }}>
                {totalQuantity}
              </Text>
            </View>
            <Text style={[TextStyles.whiteCenteredLable2]}>{DesiredText}</Text>
            <Text style={{ marginTop: hp('2'), marginRight: wp('3.2'), color: AppColors.white, fontFamily: "Poppins-SemiBold" }}>Rs. {totalAmount}.00</Text>
          </View>
        </Neomorph>
      </TouchableOpacity>
      )}
      {selectedFoodFeature === 'ShareFood' && selectedRestaurants == 'Restaurants' && (
      <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigateToScreen);
      }}>
      <Neomorph
        // darkShadowColor={AppColors.primary}
        lightShadowColor={AppColors.background}
        // inner // <- enable shadow inside of neomorph
        swapShadows // <- change zIndex of each shadow color
        style={[ContainerStyles.touchableOpacityNeomorphContainer2]}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={[TextStyles.whiteCenteredLable2]}>{DesiredText}</Text>
        </View>
      </Neomorph>
    </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Products;
