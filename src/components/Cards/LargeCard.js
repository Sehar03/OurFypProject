import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RestaurantsCard from './RestaurantsCard';
import AppContext from '../../Context/AppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from '../../assets/colors/AppColors';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconStyles from '../../assets/Styles/IconStyles';

const LargeCard = ({navigation, searchText}, props) => {
  const {
    baseUrl,
    storeSelectedRestaurants,
    storeRestaurantFcmToken,
    storeRestaurantAddress,
    storeRestaurantId,
    storeRestaurantName,
    storeRestaurantImage,
  } = useContext(AppContext);
  const [allResturantsCards, setAllResturantsCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    const viewAllRestaurants = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllRestaurants`);
        setAllResturantsCards(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    viewAllRestaurants();
  }, []);

  

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setLatitude(info.coords.latitude);
        setLongitude(info.coords.longitude);

        Geocoder.init('AIzaSyB1BMfNjd-6DlS7RUWSzfokIF0XeSMzHzY');
        Geocoder.from(info.coords.latitude, info.coords.longitude)
          .then(json => {
            console.log(json.results[0].formatted_address);
            console.log(json.results[0].address_components[6].long_name);
          })
          .catch(error => {
            console.log(error);
          });
      },
      error => {
        if (error.PERMISSION_DENIED) {
          Alert.alert(
            'Denied!',
            'We are displaying deals available in your area. To show available deals near you, please enable location by...\n1. Go to settings\n2. Scroll down to LINCS_APP\n3. Select LINCS_APP and allow Location.\n4. To keep yourself up-to-date with new deals, please turn on notification too.',
          );
        }
      },
    );
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c; // Distance in km
    const distanceMeters = distanceKm * 1000; // Distance in meters
    return { km: distanceKm, meters: distanceMeters };
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  // Calculate delivery time based on distance
  const calculateDeliveryTime = distance => {
    // Assuming an average speed for delivery in km/h
    const averageSpeed = 20; // Adjust this value based on your context
    const estimatedTime = distance.km / averageSpeed; // Time in hours
    const deliveryTimeInMinutes = Math.round(estimatedTime * 60); // Convert time to minutes

    // Calculate hours and remaining minutes
    const hours = Math.floor(deliveryTimeInMinutes / 60);
    const remainingMinutes = deliveryTimeInMinutes % 60;

    // Format the result
    if (hours > 0 && remainingMinutes > 0) {
      return `${hours} hr ${remainingMinutes} min`;
    } else if (hours > 0) {
      return `${hours} hr`;
    } else {
      return `${remainingMinutes} min`;
    }
  };

  // Calculate delivery charges based on distance
  const calculateDeliveryCharges = distance => {
    // Calculate delivery charges based on the cost per meter
    const charges = Math.round(distance.meters * 0.02);
    return charges;
  };

  // useEffect(() => {
  //   if (latitude && longitude && filteredRestaurants.length > 0) {
  //     const firstRestaurant = filteredRestaurants[0];
  //     const restaurantLatitude = firstRestaurant.restaurantAddress[0].latitude;
  //     const restaurantLongitude =
  //       firstRestaurant.restaurantAddress[0].longitude;
  //     const distance = calculateDistance(
  //       latitude,
  //       longitude,
  //       restaurantLatitude,
  //       restaurantLongitude,
  //     );

  //     // Calculate delivery charges
  //     const charges = calculateDeliveryCharges(distance);

  //     // Update delivery time based on the calculated distance
  //     const estimatedDeliveryTime = calculateDeliveryTime(distance);
  //     setDeliveryTime(estimatedDeliveryTime);
  //   }
  // }, [latitude, longitude, filteredRestaurants]);


  //   const filteredRestaurants = allResturantsCards.filter((item) =>
  //   item.restaurantName && searchText && item.restaurantName.toLowerCase().includes(searchText.toLowerCase())
  // );

const filteredRestaurants = allResturantsCards.filter((item) =>
  item.restaurantName.toLowerCase().includes(searchText.toLowerCase())
);


  return (
    <View>
      {loading ? (
        <View style={{ padding: 20, alignSelf: "center" }}>
          <LottieView
            source={require('../../assets/animations/Loading.json')}
            autoPlay
            loop
            style={{ width: 100, height: 100, marginTop: hp('10') }}
          />
          <Text>Loading Restaurants</Text>
        </View>

      ) : (
        <View>
          <Text
            style={[
              TextStyles.primaryText,
              { textAlign: 'left', marginLeft: wp('3'), fontSize: wp('6') },
            ]}>
            All Restaurants
          </Text>
          <FlatList
            data={filteredRestaurants}
            Vertical
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const restaurantLatitude = item.restaurantAddress[0].latitude;
              const restaurantLongitude = item.restaurantAddress[0].longitude;
              const distance = calculateDistance(
                latitude,
                longitude,
                restaurantLatitude,
                restaurantLongitude,
              );

              // Calculate delivery charges
              const charges = calculateDeliveryCharges(distance);
              const estimatedDeliveryTime = calculateDeliveryTime(distance);

              return (
                <View style={{ flex: 1, backgroundColor: AppColors.white }}>
                  <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        storeSelectedRestaurants('Restaurants'),
                        storeRestaurantAddress(item.restaurantAddress),
                        storeRestaurantId(item._id);
                      storeRestaurantName(item.restaurantName);
                      storeRestaurantFcmToken(item.fcmToken);
                      storeRestaurantImage(item.restaurantImage);



                      navigation.navigate('Products', {
                        restaurant_id: item._id,
                        restaurantImage: baseUrl + item.restaurantImage,
                        restaurantName: item.restaurantName,
                        distance: distance,
                        deliveryTime: estimatedDeliveryTime,
                        deliveryCharges: charges, // Pass delivery charges to the next screen
                      });
                    }}>
                    <ImageBackground
                      source={{ uri: baseUrl + item.restaurantImage }}
                      style={{ height: hp('26%'), width: wp('92%') }}
                      imageStyle={{
                        borderRadius: hp('2%'),
                        marginVertical: hp('2%'),
                      }}>
                      <View style={[ContainerStyles.tabScreenTextContainer]}>
                        <Text
                          style={{
                            color: AppColors.white,
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          {' '}
                          Welcome gift: free delivery
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                  <Text style={[TextStyles.leftText, { marginTop: hp('3') }]}>
                    {item.restaurantName} - {item.restaurantAddress[0].elaqa}
                  </Text>
                  <Text
                    style={{
                      marginLeft: wp('4%'),
                      fontFamily: 'Poppins-Regular',
                      fontSize: wp('2.8'),
                      color: AppColors.black,
                    }}>
                    $$ . Fast Food
                  </Text>

                  <View style={{ flexDirection: 'row', width: wp('100'), }}>
                    <MaterialIcons
                      name="access-time"
                      size={wp('4%')}
                      style={{ marginLeft: wp('4%'), color: AppColors.primary }}
                    />
                    <Text
                      style={{
                        marginLeft: wp('1.5%'),
                        fontFamily: 'Poppins-Regular',
                        fontSize: wp('2.8'),
                        color: AppColors.black,
                      }}>
                      {estimatedDeliveryTime}
                    </Text>
                    <MaterialCommunityIcons
                      name="bike"
                      size={wp('4%')}
                      style={{ marginLeft: wp('4%'), color: AppColors.primary }}
                    />
                    <Text
                      style={{
                        marginLeft: wp('1.5%'),
                        fontFamily: 'Poppins-Regular',
                        fontSize: wp('2.8'),
                        color: AppColors.black,
                      }}>
                      Rs. {charges}
                    </Text>
                    <View style={{width: wp('55')}}>

                      <Text
                        style={{
                          marginLeft: wp('1.5%'),
                          fontFamily: 'Poppins-Regular',
                          fontSize: wp('2.8'),
                          color: AppColors.black,
                          alignSelf: "flex-end",
                          textAlign: "right"
                        }}>
                        {distance.km.toFixed()} km away
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          {filteredRestaurants.length === 0 && !loading && (
            <Text style={{ textAlign: 'center', marginTop: 90 }}>
              No Restaurants available.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default LargeCard;
