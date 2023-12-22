import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList, SafeAreaView, Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RestaurantsCard from './RestaurantsCard';
import AppContext from '../../Context/AppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from '../../assets/colors/AppColors';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import axios from 'axios';

const LargeCard = ({ navigation }, props) => {
  const { baseUrl, storeSelectedRestaurants, currentUser } = useContext(AppContext);
  const [allResturantsCards, setAllResturantsCards] = useState([])
  useEffect(() => {
    const viewAllRestaurants = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllRestaurants`);
        console.log("Response from server:", response.data);
  
        const restaurantsData = response.data.map(item => {
          // Check if restaurantCategories is defined before using it
          const categoriesArray = item.restaurantCategories || [];
  
          // Log the item and categoriesArray for debugging
          console.log("Item:", item);
          console.log("Categories Array:", categoriesArray);
  
          // Add the categories array to the item
          return { ...item, categoriesArray };
        });
  
        setAllResturantsCards(restaurantsData);
        console.log("++++++++++&&&&&&&&&&", response);
      } catch (error) {
        console.error('Error fetching Products:', error);
      }
    };
  
    viewAllRestaurants();
  }, []);
  
  
  

  return (
    <FlatList
      data={allResturantsCards}
      Vertical
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View
          style={{ flex: 1, backgroundColor: AppColors.white, }}>
          {/* <TouchableOpacity style={{alignItems:"center"}} onPress={()=>{
          storeSelectedRestaurants('Restaurants')
          navigation.navigate('Products',{
          imageUri:item.uri,
          imageTitle:item.title,
          imageDeliveryTime:item.deliveryTime
        });
        }}> */}
          <TouchableOpacity onPress={() => {
            navigation.navigate
            navigation.navigate('FurtherScreens', {
              categoryName: item.categoriesArray,
              restaurant_id: item._id
            });
          }}>
            <ImageBackground
              source={{ uri: baseUrl + item.restaurantImage }}
              style={{ height: hp('26%'), width: wp('92%') }}
              imageStyle={{ borderRadius: hp('2%'), marginVertical: hp('2%') }}>
              <View style={[ContainerStyles.tabScreenTextContainer]}>
                <Text
                  style={{ color: AppColors.white, fontFamily: 'Poppins-SemiBold' }}>
                  {' '}
                  Welcome gift : free delivery
                </Text>
              </View>
              <View style={[ContainerStyles.tabScreenDeliveryTextContainer]}>
                <Text
                  style={[TextStyles.simpleText]}>
                  {' '}
                  {item.deliveryTime}{' '}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <Text style={[TextStyles.leftText]}>{item.restaurantName}</Text>
          <Text style={{ marginLeft: wp('4%'), fontFamily: "Poppins-Regular" }}>$ . {item.category}</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="bike"
              size={wp('5%')}
              style={{ marginLeft: wp('4%'), color: AppColors.primary }}
            />
            <Text style={{ color: AppColors.primary, fontFamily: "Poppins-Regular" }}> Free dlivery</Text>
          </View>
        </View>

      )}
    />
  );
};
export default LargeCard;
