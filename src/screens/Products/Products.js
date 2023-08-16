import React, {useState} from 'react';
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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
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
import {Neomorph} from 'react-native-neomorph-shadows';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import PopularFoodCard from '../../components/Cards/PopularFoodCard';
import { Image } from 'react-native-elements';
import ImageStyles from '../../assets/Styles/ImageStyles';
import DealCard from '../../components/Cards/DealCard';

const Tab = createMaterialTopTabNavigator();

const Popular = ({navigation}) => {
  const [allPopularCards, setAllPopularCards] = useState([
    {
      uri: require('../../assets/Images/exclusiveDeal2.jpg'),
      title: 'Exclusive Deal 2',
      price: 'Rs. 350.00',
    },
    {
      uri: require('../../assets/Images/burger2.webp'),
      title: 'Chicken Zinger Burger',
      price: 'Rs. 350.00',
    },
    {
      uri: require('../../assets/Images/shawarma4.jpg'),
      title: 'Chicken Zinger Paratha Roll',
      price: 'Rs. 260.00',
    },
    {
      uri: require('../../assets/Images/exclusiveDeal.jpg'),
      title: 'Exclusive Deal 1',
      price: 'Rs. 410.00',
    },
    {
      uri: require('../../assets/Images/plainFries2.jpeg'),
      title: 'Plain Fries',
      price: 'Rs. 180.00',
    },
    {
      uri: require('../../assets/Images/masalaFries.jpg'),
      title: 'Masala Fries',
      price: 'Rs. 180.00',
    },
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      {/* <ScrollView> */}
      <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
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
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
// Strong pepsi deals
const StrongPepsiDeals = ({navigation}) => {
  const[allPepsiDealCards,setAllPepsiDealCards]=useState([{
    uri:require('../../assets/Images/exclusiveDeal.jpg'),
    title:'Pepsi Deal',
    description:"Chicken Patty Burger + 345ml Pepsi",
    price:"Rs. 349.00"
  }])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <View
        style={[ContainerStyles.productsContainerSeparator]}></View>
      <View style={{flexDirection: 'row'}}>
        <Text style={[TextStyles.cartTextStyle, {marginLeft: wp('4%')}]}>
          Strong Pepsi Deals
        </Text>
        {/* mai ne iss ko imort b saii kiya hai name b saii diya hai phr b invalid name prop ka error de rha` */}
        {/* <Ionicons
          name="sparkles" 
          size={wp('6%')}                            
          style={IconStyles.productsIcon}
        /> */}
      </View>
      <FlatList
        data={allPepsiDealCards}
        // scrollEnabled={false} // Disable the scroll behavior
        renderItem={({item}) => {
          return <DealCard navigation={navigation} item={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const SummerDeals = ({navigation}) => {
  const[allSummerDealCards,setAllSummerDealCards]=useState([{
    uri:require('../../assets/Images/paratha.jpeg'),
    title:'Summer Deal 7',
    description:"2 parathay, 1 omelette, 1 sweet egg",
    price:"Rs. 380.00"
  },
  {
    uri:require('../../assets/Images/paratha2.jpeg'),
    title:'Summer Deal 6',
    description:"2 parathay , 1 omelette,2 Shami kabab",
    price:"Rs. 349.00"
  },
  {
    uri:require('../../assets/Images/paratha3.webp'),
    title:'Summer Deal 8',
    description:"2 parathay, 1 omelette, 1 sweet egg",
    price:"Rs. 380.00"
  },
])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <View
        style={[ContainerStyles.productsContainerSeparator]}></View>
      <View style={{flexDirection: 'row'}}>
        <Text style={[TextStyles.cartTextStyle, {marginLeft: wp('4%')}]}>
          Summer Deals
        </Text>
        <MaterialCommunityIcons
          name="fire"
          size={wp('8%')}
          style={IconStyles.fireIcon2}
        />
      </View>
        <Text style={[TextStyles.dealPriceText, { maxWidth: wp('90%') }]}>Amazing Dishes Use Voucher HC75  for 75 Rupees Discount</Text>
      
      <FlatList
        data={allSummerDealCards}
        // scrollEnabled={false} // Disable the scroll behavior
        renderItem={({item}) => {
          return <DealCard navigation={navigation} item={item} />;
        }}
      />
    </SafeAreaView>
  );
};


const BreakfastDeals = ({navigation}) => {
  const[allBreakfastDealCards,setAllBreakfastDealCards]=useState([{
    uri:require('../../assets/Images/paratha.jpeg'),
    title:'Breakfat Deal 1',
    description:"2 parathay, 1 omelette, 1 sweet egg",
    price:"Rs. 130.00"
  },
  {
    uri:require('../../assets/Images/paratha2.jpeg'),
    title:'Breakfast Deal 2',
    description:"2 parathay , 1 omelette,2 Shami kabab",
    price:"Rs. 190.00"
  },
  {
    uri:require('../../assets/Images/paratha3.webp'),
    title:'Breakfast deal 3',
    description:"2 parathay, 1 omelette, 1 sweet egg",
    price:"Rs. 280.00"
  },
])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <View
        style={[ContainerStyles.productsContainerSeparator]}></View>
      <View style={{flexDirection: 'row'}}>
        <Text style={[TextStyles.cartTextStyle, {marginLeft: wp('4%')}]}>
          Breakfast Deals
        </Text>
     
      </View>
        <Text style={[TextStyles.dealPriceText, { maxWidth: wp('90%') }]}>Amazing Dishes Use Voucher HC75  for 75 Rupees Discount</Text>
      
      <FlatList
        data={allBreakfastDealCards}
        // scrollEnabled={false} // Disable the scroll behavior
        renderItem={({item}) => {
          return <DealCard navigation={navigation} item={item} />;
        }}
      />
    </SafeAreaView>
  );
};
const Products = ({navigation, route}, props) => {
  const {imageUri, imageTitle, imageDeliveryTime} = route.params;
  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
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
        <Popular navigation={navigation} />
        <StrongPepsiDeals navigation={navigation} />
        <SummerDeals navigation={navigation} />
<BreakfastDeals navigation={navigation}/>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Products;
