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
import LottieView from 'lottie-react-native';

const LargeCard = ({ navigation }, props) => {
  const { baseUrl, storeSelectedRestaurants, currentUser } = useContext(AppContext);
  const [allResturantsCards, setAllResturantsCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewAllRestaurants = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllRestaurants`);
        setAllResturantsCards(response.data);
     } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
    };

    viewAllRestaurants();
  }, []);

  return (
    <View>
    {loading ? (
     <View style={ { padding: 20,alignSelf:"center"}}>
     <LottieView
       source={require('../../assets/animations/Loading.json')}
       autoPlay
       loop
       style={{ width: 100, height: 100,marginTop:hp('10') }}
     />
   </View>
    ) : (
    <FlatList
      data={allResturantsCards}
      Vertical
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View
          style={{ flex: 1, backgroundColor: AppColors.white, }}>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => {
            storeSelectedRestaurants('Restaurants'),
            navigation.navigate('Products', {
              restaurant_id: item._id,
              restaurantImage:baseUrl+item.restaurantImage,
              restaurantName:item.restaurantName   
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
    )}
    </View>
  );
};
export default LargeCard;
