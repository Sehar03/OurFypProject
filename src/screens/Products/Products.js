import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StatusBar,
  ImageBackground,
  FlatList,
  ScrollView
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import ProductsBackButton from '../../components/headers/ProductsBackButton';
import TextStyles from '../../assets/Styles/TextStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconStyles from '../../assets/Styles/IconStyles';
import TabBarStyles from '../../assets/Styles/TabBarStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Neomorph } from 'react-native-neomorph-shadows';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import PopularFoodCard from '../../components/Cards/PopularFoodCard';

const Tab = createMaterialTopTabNavigator();

const Popular = ({navigation}) => {
  const[allPopularCards,setAllPopularCards]=useState([{
    uri:require('../../assets/Images/exclusiveDeal2.jpg'),
    title:"Exclusive Deal 2",
    price:"Rs. 350.00"

  },
  {
    uri:require('../../assets/Images/burger2.webp'),
    title:"Chicken Zinger Burger",
    price:"Rs. 350.00"

  },
  {
    uri:require('../../assets/Images/shawarma4.jpg'),
    title:"Chicken Zinger Paratha Roll",
    price:"Rs. 260.00"

  },
  {
    uri:require('../../assets/Images/exclusiveDeal.jpg'),
    title:"Exclusive Deal 1",
    price:"Rs. 410.00"

  },{
    uri:require('../../assets/Images/plainFries2.jpeg'),
    title:"Plain Fries",
    price:"Rs. 180.00"

  },{
    uri:require('../../assets/Images/masalaFries.jpg'),
    title:"Masala Fries",
    price:"Rs. 180.00"

  }
])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
       {/* <ScrollView> */}
      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons
          name="fire"
          size={wp('8%')}
          style={IconStyles.fireIcon}
        />
        <Text style={[TextStyles.leftMediumText]}>Popular</Text>
      </View>
      <Text style={[TextStyles.leftSmallText]}>Most ordered right now. </Text>
      <FlatList
      numColumns={2}
        data={allPopularCards}
        // scrollEnabled={false} // Disable the scroll behavior
        renderItem={({item}) => {
          return <PopularFoodCard navigation={navigation} item={item} />;
        }}
      />
      <Text> Deals </Text>
      
{/* </ScrollView> */}
    </SafeAreaView>
  );
};
const Products = ({navigation, route}, props) => {
  const {imageUri, imageTitle, imageDeliveryTime} = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
 <StatusBar
    barStyle="light-content"
    backgroundColor="transparent"
    translucent={true}
  />
    
      <ImageBackground
        source={imageUri}
        style={{height: hp('20%'), width: wp('100%')}}>
        <ProductsBackButton navigation={navigation} />
      </ImageBackground>
      <Text style={[TextStyles.leftText]}>{imageTitle}</Text>
      <View style={{flexDirection: 'row'}}>
        <MaterialIcons
          name="access-time"
          size={wp('6%')}
          style={IconStyles.productsIcon}
        />
        <Text style={[TextStyles.productsLeftText]}>
          Delivery : {imageDeliveryTime}{' '}
        </Text>
      </View>

      <Tab.Navigator screenOptions={TabBarStyles.customTabBar}>
        <Tab.Screen name="Popular" component={Popular} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Products;
