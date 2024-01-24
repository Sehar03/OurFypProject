import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import TextStyles from '../../assets/Styles/TextStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import AppContext from '../../Context/AppContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppColors from '../../assets/colors/AppColors';
import axios from 'axios';
import { Neomorph } from 'react-native-neomorph-shadows';
import IconStyles from '../../assets/Styles/IconStyles';
import TextFieldStyles from '../../assets/Styles/TextFieldStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const DealCard = ({ navigation, item, updateTotalQuantity, updateTotalAmount}) => {
  const flatListRef = useRef(null);
  const {
    selectedFoodFeature,
    selectedRestaurants,
    baseUrl,
    currentUser,
    restaurantName,
    restaurantAddress,
    restaurant_id
  } = useContext(AppContext);
  const [dateError, setDateError] = useState('')
console.log('restaurantAddress',restaurantAddress)

  const addCartProducts = async () => {
    // Fetch the current cart details to check if it already contains items
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

      // Proceed to add the product to the cart
      const formData = new FormData();
      formData.append("customer_id", currentUser.userId);
      formData.append("productId", item._id);
      formData.append("restaurant_id", restaurant_id);
      formData.append("productName", item.foodDealTitle);
      formData.append("productPrice", item.foodDealPrice);
      formData.append("pricePerProduct", item.foodDealPrice);
      formData.append("productImage", {
        uri: baseUrl + item.foodDealImage,
        name: "foodDealImage.jpg",
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
            alert("Product is added into Cart");
            updateTotalQuantity();
            updateTotalAmount();
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
    if(!selectedDate){
      setDateError('First choose Date')
    }
    if (!selectedDate) {
      return false;
    }

    const formData = new FormData();
    formData.append("productName", item.foodDealTitle);
    formData.append("productPrice", item.foodDealPrice);
    formData.append("productPricePerPerson", item.foodDealPrice / 2);
    formData.append("productDescription", item.foodDealDescription);
    formData.append("productSelectedDate", moment(selectedDate).format('MMM DD, YYYY'));
    formData.append("productSelectedTime", selectedHour === 12 ? '12:00 AM' : `${selectedHour}:00 PM`)
    formData.append("productImage", {
      uri: baseUrl + item.foodDealImage,
      name: "foodDealImage.jpg",
      type: "image/jpg",
    });
    formData.append("restaurant_id", restaurant_id);
    formData.append("restaurantName",restaurantName);
    formData.append("restaurantAddress",JSON.stringify(restaurantAddress));    
    formData.append("requestSender_id",currentUser.userId);
    formData.append("requestSenderName",currentUser.name);
    formData.append("requestSenderPhoneNumber",currentUser.phoneNumber)

 
    console.log(formData);
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



  const [isAddedIntoSchedule, setIsAddedIntoSchedule] = useState('');
  const [isAddedIntoCart, setIsAddedIntoCart] = useState('');
  let navigateToScreen = ''; // Declare the variable
  let DesiredText = ''; // Declare the variable
  let AddItem = ''; // Declare the variable

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
  const [isModalVisible, setModalVisible] = useState(false);


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
  // const showDateTimePicker = () => setModalVisible(true);
  // const hideDateTimePicker = () => setModalVisible(false);
  // const handleDateConfirm = date => {
  //   setSelectedDate(date);
  //   hideDateTimePicker();
  // };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '..';
    }
    return text;
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SingleProductDetail', {
            productId: item._id,
            restaurant_id: restaurant_id,
            productImage: baseUrl + item.foodDealImage,
            productName: item.foodDealTitle,
            productPrice: item.foodDealPrice,
            productDescription: item.foodDealDescription,
            productPricePerPerson: item.foodDealPrice / 2,
            productDescription: item.foodDealDescription,
            productSelectedDateAndTime: selectedDate ? selectedDate.toString() : null

          });
        }}>
        <Text style={[TextStyles.leftText, { marginTop: hp('2%') }]}>
          {item.foodDealTitle}
        </Text>
        <Text style={[TextStyles.dealText, { maxWidth: wp('60%') }]}>
          {truncateText(item.foodDealDescription, 50)}..
        </Text>
        <Text style={[TextStyles.dealPriceText]}>Rs. {item.foodDealPrice}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SingleProductDetail', {
            productId: item._id,
            restaurant_id: restaurant_id,
            productImage: baseUrl + item.foodDealImage,
            productName: item.foodDealTitle,
            productPrice: item.foodDealPrice,
            productDescription: item.foodDealDescription,
            productPricePerPerson: item.foodDealPrice / 2,
            productDescription: item.foodDealDescription,
            productSelectedDateAndTime: selectedDate ? selectedDate.toString() : null

          });
        }}>
        <View style={{ position: 'absolute', left: wp('70%'), bottom: hp('0%') }}>
          <Image source={{ uri: baseUrl + item.foodDealImage }} style={[ImageStyles.smallSquareBoxImage]} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (selectedFoodFeature === 'Full Price Food' &&
            selectedRestaurants == 'Restaurants') {
            addCartProducts();
          }
          else {
            openModal()
          }
        }}>
        <View style={[ContainerStyles.productsCartButtonContainer]}>
          <Text
            style={[
              TextStyles.whiteCenteredLable,
              {
                fontSize: wp('6%'),
                marginTop: hp('0%'),
                fontFamily: 'Poppins-Regular',
              },
            ]}>
            +
          </Text>
        </View>
      </TouchableOpacity>

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
                style={{ height: hp('22'), width: wp('43'), top: -75 }} // Set the desired width and height of the image
              />

            </View>
            <View style={{ top: -90 }}>
              <View style={{ justifyContent: "center", alignItems: "center", marginTop: hp('2') }}>
                <View>
                  {/* <Text style={[TextStyles.label,{marginBottom:hp('0')}]}>
          Set DATE:
        </Text> */}
                  <TouchableOpacity onPress={()=>{
                      showDatePicker();
                      setDateError('')
                  }}>
                     {dateError ? (
                        <Text style={[TextStyles.errorText,{marginTop:hp('0'),bottom:-8}]}>{dateError}</Text>
                      ) : null}
                    <Neomorph
                      darkShadowColor={AppColors.primary}
                      lightShadowColor={AppColors.background2}
                      style={[ContainerStyles.inputFieldNeomorphContainer, { shadowOpacity: 0.15, }]}>
                      <View style={{ flexDirection: "row" }}>
                        <FontAwesome name="calendar" size={20} style={IconStyles.signupIcons} />
                        <TextInput
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
                    <TextInput
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
                    <TextInput
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
              {/* <TouchableOpacity onPress={showDateTimePicker}>
              <Text style={[TextStyles.simpleText2, { color: "red" }]}>{DesiredText}</Text>
            </TouchableOpacity> */}
              {/* <TouchableOpacity
              onPress={() => {
                if (selectedFoodFeature === 'Full Price Food' &&
                  selectedRestaurants == 'Restaurants') {
                  addCartProducts();
                }
                else {
                  addShareFoodProducts();
                }
                setIsAddedIntoSchedule(!isAddedIntoSchedule);
                setIsAddedIntoCart(!isAddedIntoCart);
              }}>
              <Text style={{
                color: AppColors.black,
                fontFamily: 'Poppins-Regular',
              }}>
                {AddItem}
              </Text>
            </TouchableOpacity> */}
              {/* <DateTimePickerModal
              isVisible={isModalVisible}
              mode="datetime"
              onConfirm={handleDateConfirm}
              onCancel={hideDateTimePicker}
            /> */}
            </View>
          </View>
        </View>
      </Modal>


      <View style={[ContainerStyles.bottomBorder]}></View>
    </View>
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

export default DealCard;
