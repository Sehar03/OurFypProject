import React, { useContext, useRef, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  Modal,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import AppColors from '../../assets/colors/AppColors';
import ProductsBackButton from '../../components/headers/ProductsBackButton';
import TextStyles from '../../assets/Styles/TextStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Lottie from 'lottie-react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import { Neomorph } from 'react-native-neomorph-shadows';
import TextFieldStyles from '../../assets/Styles/TextFieldStyles';
import AppContext from '../../Context/AppContext';
import axios from 'axios';
import IconStyles from '../../assets/Styles/IconStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

const SingleProductDetail = ({ navigation, route }) => {
  const flatListRef = useRef(null);
  const { currentUser, baseUrl, selectedFoodFeature, selectedRestaurants, storeRestaurantId, storeRestaurantName, restaurantAddress, restaurant_id, restaurantName } = useContext(AppContext)
  const { productId,foodDealId } = route.params;
  const [currentProduct, setCurrentProduct] = useState([]);
  const [currentFoodDeal, setCurrentFoodDeal] = useState([]);

  const viewCurrentProduct = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/viewCurrentProduct/${productId}`);
      setCurrentProduct(response.data)
      console.log('item', response.data)
    } catch (error) {
      console.error('Error in View Product:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // Check if productId has a value before calling viewCurrentProduct
      if (productId) {
        viewCurrentProduct();
      }
    }, [productId]), // Dependency array to re-run the effect when productId changes
  );


  const viewCurrentFoodDeal = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/viewCurrentFoodDeal/${foodDealId}`);
        setCurrentFoodDeal(response.data)
      console.log('item', response.data)
    } catch (error) {
      console.error('Error in View Product:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // Check if foodDealId has a value before calling viewCurrentProduct
      if (foodDealId) {
        viewCurrentFoodDeal();
      }
    }, [foodDealId]), // Dependency array to re-run the effect when productId changes
  );
  
  const [dateError, setDateError] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addCartProducts = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewAllCartProducts/${currentUser.userId}`);
      const existingCartItems = response.data.filter(product => product.isPurchased === 0);
      // Check if the cart is not empty
      if (existingCartItems.length > 0) {
        // Check if the restaurant_id of the existing items matches the current product's restaurant_id
        const isMatchingRestaurant = existingCartItems.every(item => item.restaurant_id === restaurant_id);

        if (!isMatchingRestaurant) {
          // Show an alert if the restaurant_id does not match
          alert("Clear your cart before adding this item, as items from another restaurant are already in your cart.");
          return;
        }
      }
      const formData = new FormData();
      formData.append("customer_id", currentUser.userId)
      formData.append("productId", productId)
      formData.append("restaurant_id", restaurant_id);
      formData.append("productName", productName);
      formData.append("productPrice", productPrice);
      formData.append("pricePerProduct", productPrice);
      formData.append("productImage", {
        uri: productImage,
        name: "productImage.jpg",
        type: "image/jpg",
      });

      axios({
        method: "post",
        url: `${baseUrl}/addCartProducts`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      })
        .then((response) => {
          if (response.data.added) {
            storeRestaurantId(restaurant_id);
            storeRestaurantName(restaurantName)
            alert("Product is added into Cart");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.error('Error fetching cart details:', error);
    }
  };
  const addShareFoodProducts = () => {
    if (!selectedDate) {
      setDateError('First choose Date')
    }
    if (!selectedDate) {
      return false;
    }
    const generateRandomString = (length) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    };
    const reservationId = generateRandomString(6); // Generates a fixed-length random string with 6 characters
    const Addresses = [
      {
        formattedAddress: restaurantAddress[0].formattedAddress,
        locality: restaurantAddress[0].locality,
        elaqa: restaurantAddress[0].elaqa,
        streetName: restaurantAddress[0].streetName,
        label: restaurantAddress[0].label,
        latitude: restaurantAddress[0].latitude,
        longitude: restaurantAddress[0].longitude
      },
    ];
    const formData = new FormData();
    if(productId){
      
        currentProduct.map((item) => {
          formData.append("productName", item.productName);
          formData.append("productPrice", item.productPrice);
          formData.append("productPricePerPerson", item.productPrice / 2);
          formData.append("productDescription", item.productDescription);
          formData.append("productImage", {
            uri: baseUrl + item.productImage,
            name: "productImage.jpg",
            type: "image/jpg",
          });
        })
      
    }
    else{
      currentProduct.map((item) => {
        formData.append("productName", item.foodDealTitle);
        formData.append("productPrice", item.foodDealPrice);
        formData.append("productPricePerPerson", item.foodDealPrice / 2);
        formData.append("productDescription", item.foodDealDescription);
        formData.append("productImage", {
          uri: baseUrl + item.foodDealImage,
          name: "foodDealImage.jpg",
          type: "image/jpg",
        });
      })
  }
    formData.append("reservationId", reservationId)
    formData.append("productSelectedDate", moment(selectedDate).format('MMM DD, YYYY'));
    formData.append("productSelectedTime", selectedHour === 12 ? '12:00 AM' : `${selectedHour}:00 PM`)
    formData.append("restaurant_id", restaurant_id);
    formData.append("restaurantName", restaurantName);
    formData.append("restaurantAddress", JSON.stringify(Addresses));
    formData.append("requestSender_id", currentUser.userId);
    formData.append("requestSenderName", currentUser.name);
    formData.append("requestSenderPhoneNumber", currentUser.phoneNumber)

    axios({
      method: "post",
      url: `${baseUrl}/addShareFoodProducts`,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then((response) => {
        if (response.data.added) {
          alert("Product is added into Schedule");
        } else {

          alert("Some thing went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (
    selectedFoodFeature === 'Full Price Food' &&
    selectedRestaurants == 'Restaurants'
  ) {
    navigateToScreen = 'Cart'; // Navigate to CartScreen
    DesiredText = ' ';
    AddItem = 'Add To Cart'
  } else if (
    selectedFoodFeature === 'ShareFood' &&
    selectedRestaurants == 'Restaurants'
  ) {
    navigateToScreen = 'ScheduleScreen'; // Navigate to ScheduleScreen
    DesiredText = 'First Set Date And Time';
    AddItem = 'Add To Schedule'
  }


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };





  const [selectedHour, setSelectedHour] = useState(12);

  const hours = Array.from({ length: 12 }, (_, index) => index + 1);

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
    // Scroll the FlatList to the new selected hour
    flatListRef.current.scrollToIndex({ index: hour - 1, animated: true });
  };

  const renderItem = ({ item }) => (

    <TouchableOpacity
      onPress={() => handleHourChange(item)}
      style={[
        styles.hourButton,
        {
          borderColor: selectedHour === item ? AppColors.goldenYellow : 'gray',
          backgroundColor: selectedHour === item ? "coral" : 'white',
        },
      ]}
    >
      <Text style={{
        fontFamily: "Poppins-Regular", fontSize: hp('1.8'),
        color: selectedHour === item ? AppColors.white : 'gray',
      }}>{item === 12 ? '12 AM' : `${item} PM`}</Text>
    </TouchableOpacity>

  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <ScrollView>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        {currentProduct.map((item) => (
          <>
            <ImageBackground
              source={{ uri: baseUrl+ item.productImage }}
              style={{ height: hp('40%'), width: wp('100%') }}>
              <ProductsBackButton navigation={navigation} />
              <View
                style={[ContainerStyles.foldedViewStyle]}>
              </View>

            </ImageBackground>

            <Text style={[TextStyles.ProductNameText]}>
              {item.productName}
            </Text>

            <View style={{ height: hp('25'), marginTop: hp('2') }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  marginLeft: wp('4'),
                  fontSize: wp('4'),
                }}>
                Description:
              </Text>
              <ScrollView>
                <Text
                  style={[TextStyles.productDescription]}>
                  {item.productDescription}
                </Text>
              </ScrollView>
              <Text style={[TextStyles.foodPrices]}>Rs.{item.productPrice}</Text>
            </View>

            <View>
          <Text style={[TextStyles.leftMediumText, { fontSize: hp('2') }]}>Special instructions</Text>
          <Text style={{
            textAlign: 'justify', // You can use 'left' if you want strict left alignment
            paddingRight: 16, // Adjust the padding as per your design
            paddingLeft: 16,
          }}>Please let us know if you are allergic to anything or if we need to avoid anything</Text>
          <PaperTextInput
            label="e.g. no mayo"
            placeholderTextColor={AppColors.logInBorder}
            value={specialInstructions}
            onChangeText={text => {
              setSpecialInstructions(text);
            }} mode="outlined" // You can also use "flat"
            multiline={true} // Enable multiline
            style={[TextFieldStyles.instructionInputField]}
            theme={{
              colors: {
                primary: AppColors.Gray, // Change this color to your desired outline color
              },
            }}
          />
        </View>
        
        <View style={[ContainerStyles.cartButtonContainer]}>

          <TouchableOpacity onPress={() => {
            if (selectedFoodFeature === 'Full Price Food' &&
              selectedRestaurants == 'Restaurants') {
              addCartProducts();
            }
            else {
              openModal()
            }
          }}>
            <Neomorph
              darkShadowColor="white"
              lightShadowColor="white"
              swapShadows // <- change zIndex of each shadow color
              style={
                ContainerStyles.singleProductTouchableOpacityNeomorphContainer
              }>
              <Text style={[TextStyles.whiteCenteredLable3]}>{AddItem}</Text>
            </Neomorph>
          </TouchableOpacity>


        </View>


          </>
        ))}
       {currentFoodDeal.map((item) => (
          <>
            <ImageBackground
              source={{ uri: baseUrl+ item.foodDealImage }}
              style={{ height: hp('40%'), width: wp('100%') }}>
              <ProductsBackButton navigation={navigation} />
              <View
                style={[ContainerStyles.foldedViewStyle]}>
              </View>

            </ImageBackground>

            <Text style={[TextStyles.ProductNameText]}>
              {item.foodDealTitle}
            </Text>

            <View style={{ height: hp('25'), marginTop: hp('2') }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  marginLeft: wp('4'),
                  fontSize: wp('4'),
                }}>
                Description:
              </Text>
              <ScrollView>
                <Text
                  style={[TextStyles.productDescription]}>
                  {item.foodDealDescription}
                </Text>
              </ScrollView>
              <Text style={[TextStyles.foodPrices]}>Rs.{item.foodDealPrice}</Text>
            </View>

            <View>
          <Text style={[TextStyles.leftMediumText, { fontSize: hp('2') }]}>Special instructions</Text>
          <Text style={{
            textAlign: 'justify', // You can use 'left' if you want strict left alignment
            paddingRight: 16, // Adjust the padding as per your design
            paddingLeft: 16,
          }}>Please let us know if you are allergic to anything or if we need to avoid anything</Text>
          <PaperTextInput
            label="e.g. no mayo"
            placeholderTextColor={AppColors.logInBorder}
            value={specialInstructions}
            onChangeText={text => {
              setSpecialInstructions(text);
            }} mode="outlined" // You can also use "flat"
            multiline={true} // Enable multiline
            style={[TextFieldStyles.instructionInputField]}
            theme={{
              colors: {
                primary: AppColors.Gray, // Change this color to your desired outline color
              },
            }}
          />
        </View>
        
        <View style={[ContainerStyles.cartButtonContainer]}>

          <TouchableOpacity onPress={() => {
            if (selectedFoodFeature === 'Full Price Food' &&
              selectedRestaurants == 'Restaurants') {
              addCartProducts();
            }
            else {
              openModal()
            }
          }}>
            <Neomorph
              darkShadowColor="white"
              lightShadowColor="white"
              swapShadows // <- change zIndex of each shadow color
              style={
                ContainerStyles.singleProductTouchableOpacityNeomorphContainer
              }>
              <Text style={[TextStyles.whiteCenteredLable3]}>{AddItem}</Text>
            </Neomorph>
          </TouchableOpacity>


        </View>


          </>
        ))}


        













        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.65)'
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                width: wp('100'),
                height: hp('80'),
                marginTop: hp('30')
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={{
                    color: AppColors.primary,
                    fontSize: hp('5'),
                    fontFamily: "Poppins-SemiBold",
                    marginTop: hp('2'),
                    marginLeft: wp('9'),
                    marginBottom: -hp('1.5')
                  }}>Reserve</Text>
                  <Text style={{
                    color: AppColors.black,
                    fontSize: hp('2'),
                    marginLeft: wp('9'),
                    fontFamily: "Poppins-SemiBold",


                  }}>Your table now!</Text>
                </View>

                <Image
                  source={require('../../assets/Images/plate.png')} // Specify the source of the image
                  style={{ height: hp('22'), width: wp('45'), top: -75 }} // Set the desired width and height of the image
                />

              </View>
              <View style={{ top: -90 }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: hp('2') }}>
                  <View>
                    <TouchableOpacity onPress={() => {
                      showDatePicker();
                      setDateError('')
                    }}>
                      {dateError ? (
                        <Text style={[TextStyles.errorText, { marginTop: hp('0'), bottom: -8 }]}>{dateError}</Text>
                      ) : null}
                      <Neomorph
                        darkShadowColor={AppColors.primary}
                        lightShadowColor={AppColors.background2}
                        style={[ContainerStyles.inputFieldNeomorphContainer, { shadowOpacity: 0.15, }]}>
                        <View style={{ flexDirection: "row" }}>
                          <FontAwesome name="calendar" size={20} style={IconStyles.signupIcons} />
                          <RNTextInput
                            placeholder="Choose Date"
                            style={[TextFieldStyles.inputField, { color: 'black' }]}
                            value={selectedDate ? moment(selectedDate).format('MMM DD, YYYY') : ''}
                            editable={false}
                          />
                        </View>

                      </Neomorph>
                    </TouchableOpacity>

                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>

                </View>
                <Text style={{ color: AppColors.primary, fontFamily: "Poppins-SemiBold", marginLeft: wp('11'), fontSize: hp('2') }}> Set Time</Text>
                <View style={{ alignSelf: "center" }}>
                  <Neomorph
                    darkShadowColor={AppColors.primary}
                    lightShadowColor={AppColors.background2}
                    style={[ContainerStyles.inputFieldNeomorphContainer, { shadowOpacity: 0.15, }]}>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons name="time-outline" size={20} style={IconStyles.signupIcons} />
                      <RNTextInput
                        style={[TextFieldStyles.inputField, { color: 'black' }]}
                        value={selectedHour === 12 ? '12:00 AM' : `${selectedHour}:00 PM`}
                        editable={false} // Disable manual input
                      />
                    </View>
                  </Neomorph>
                </View>

                <View style={styles.container}>
                  <View style={{ width: wp('65'), alignSelf: "center" }}>
                    <FlatList
                      ref={flatListRef}
                      data={hours}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.toString()}
                      contentContainerStyle={styles.flatListContainer}
                    />
                  </View>
                  <View style={styles.arrowsContainer}>
                    <TouchableOpacity onPress={() => handleHourChange(selectedHour > 1 ? selectedHour - 1 : 12)}>
                      <AntDesign name="arrowleft" size={20} style={{ marginLeft: wp('6'), marginTop: hp('1.5'), color: AppColors.primary }} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleHourChange(selectedHour < 12 ? selectedHour + 1 : 1)}>
                      <AntDesign name="arrowright" size={20} style={{ marginRight: wp('6'), marginTop: hp('1.5'), color: AppColors.primary }} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={{ color: AppColors.primary, fontFamily: "Poppins-SemiBold", marginLeft: wp('11'), fontSize: hp('2') }}>Guests</Text>
                <View style={{ alignSelf: "center" }}>
                  <Neomorph
                    darkShadowColor={AppColors.primary}
                    lightShadowColor={AppColors.background2}
                    style={[ContainerStyles.inputFieldNeomorphContainer, { shadowOpacity: 0.15, }]}>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons name="person-outline" size={20} style={IconStyles.signupIcons} />
                      <RNTextInput
                        style={[TextFieldStyles.inputField, { color: 'black' }]}
                        value={"2 Guests"}
                        editable={false} // Disable manual input
                      />
                    </View>
                  </Neomorph>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <TouchableOpacity onPress={closeModal}>
                    <Neomorph
                      darkShadowColor="white"
                      lightShadowColor="white"
                      swapShadows // <- change zIndex of each shadow color
                      style={[
                        ContainerStyles.touchableOpacitySmallNeomorphContainer,
                        , { marginLeft: wp('9'), backgroundColor: AppColors.white, borderWidth: 0.4, borderColor: AppColors.primary }
                      ]}>
                      <Text style={[TextStyles.whiteCenteredLable, { color: AppColors.black, fontSize: hp('2'), marginTop: hp('1.5') }]}>Cancel</Text>
                    </Neomorph>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    addShareFoodProducts();
                  }}>
                    <Neomorph
                      darkShadowColor="white"
                      lightShadowColor="white"
                      swapShadows // <- change zIndex of each shadow color
                      style={[
                        ContainerStyles.touchableOpacitySmallNeomorphContainer,
                        , { marginRight: wp('14') }
                      ]}>
                      <Text style={[TextStyles.whiteCenteredLable, { fontSize: hp('2'), alignSelf: "center", marginTop: hp('1.5') }]}>Schedule it</Text>
                    </Neomorph>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>




      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    position: 'relative',
  },
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  arrow: {
    fontSize: 20,
  },
  selectedHour: {
    fontSize: 18,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  hourButton: {
    padding: 10,
    borderWidth: 0.4,
    borderRadius: 20,
    marginRight: 10,
  },
});
export default SingleProductDetail;
