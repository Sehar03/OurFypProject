import React, { useContext, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Text, TouchableOpacity, View, Modal, Button } from 'react-native';
import TextStyles from '../../assets/Styles/TextStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import AppContext from '../../Context/AppContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Lottie from 'lottie-react-native';
import AppColors from '../../assets/colors/AppColors';
import axios from 'axios';
import { Neomorph } from 'react-native-neomorph-shadows';

const DealCard = ({ navigation, item,updateTotalQuantity,updateTotalAmount,restaurant_id,restaurantName}) => {
  const {
    selectedFoodFeature,
    selectedRestaurants,
    baseUrl,
    currentUser,
    storeRestaurantId,
    storeRestaurantName
  } = useContext(AppContext);



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
          storeRestaurantId(restaurant_id)
          storeRestaurantName(restaurantName)
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
    const formData = new FormData();
    formData.append("customer_id", currentUser.userId)
    formData.append("productName", item.foodDealTitle);
    formData.append("productPrice", item.foodDealPrice);
    formData.append("productPricePerPerson",item.foodDealPrice/2);
    formData.append("productDescription",item.foodDealDescription);
    formData.append("productSelectedDateAndTime",selectedDate ? selectedDate.toString(): null)
    formData.append("productImage", {
      uri: baseUrl + item.foodDealImage,
      name: "foodDealImage.jpg",
      type: "image/jpg",
    });

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
  const [selectedDate, setSelectedDate] = useState(null);

  const showDateTimePicker = () => setModalVisible(true);
  const hideDateTimePicker = () => setModalVisible(false);
  const handleDateConfirm = date => {
    setSelectedDate(date);
    hideDateTimePicker();
  };
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
            productId:item._id,
            restaurant_id:restaurant_id,
            productImage: baseUrl+ item.foodDealImage,
            productName: item.foodDealTitle,
            productPrice: item.foodDealPrice,
            productDescription: item.foodDealDescription,
            productPricePerPerson:item.foodDealPrice/2,
            productDescription:item.foodDealDescription,
            productSelectedDateAndTime:selectedDate ? selectedDate.toString(): null

          });
        }}>
        <Text style={[TextStyles.leftText, { marginTop: hp('2%') }]}>
          {item.foodDealTitle}
        </Text>
        <Text style={[TextStyles.dealText, { maxWidth: wp('60%') }]}>
          {truncateText(item.foodDealDescription,50)}..
        </Text>
        <Text style={[TextStyles.dealPriceText]}>Rs. {item.foodDealPrice}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SingleProductDetail', {
            productId:item._id,
            restaurant_id:restaurant_id,
            productImage:baseUrl+ item.foodDealImage,
            productName: item.foodDealTitle,
            productPrice: item.foodDealPrice,
            productDescription: item.foodDealDescription,
            productPricePerPerson:item.foodDealPrice/2,
            productDescription:item.foodDealDescription,
            productSelectedDateAndTime:selectedDate ? selectedDate.toString(): null

          });
        }}>
        <View style={{ position: 'absolute', left: wp('70%'), bottom: hp('0%') }}>
          <Image source={{ uri: baseUrl + item.foodDealImage }} style={[ImageStyles.smallSquareBoxImage]} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if(selectedFoodFeature === 'Full Price Food' &&
          selectedRestaurants == 'Restaurants'){
            addCartProducts();
          }
          else{
            addShareFoodProducts();
          }                
          // setIsAddedIntoSchedule(!isAddedIntoSchedule);
          // setIsAddedIntoCart(!isAddedIntoCart);

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
        visible={isAddedIntoCart}
        transparent={true}
        animationType="slide"

      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
              width: wp('80'),
            }}
          >
            <Neomorph
              darkShadowColor={AppColors.primary}
              lightShadowColor={AppColors.darkgray}
              swapShadows // <- change zIndex of each shadow color
              style={{
                shadowRadius: 2,
                backgroundColor: AppColors.white,
                borderRadius: wp('1%'),
                height: hp('4%'),
                width: wp('8%'),
                shadowOpacity: 0.3,
                marginLeft: wp('65'),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsAddedIntoCart(!isAddedIntoCart);
                }}>
                <AntDesign
                  name="close"
                  size={wp('4%')}
                  style={{ color: AppColors.primary }}
                />
              </TouchableOpacity>
            </Neomorph>
            <Lottie
              source={require('../../assets/animations/Done.json')}
              autoPlay
              loop
              style={{ width: wp('80'), height: hp('25') }}
              speed={1}
            />
            <TouchableOpacity onPress={showDateTimePicker}>
              <Text style={[TextStyles.simpleText2, { color: "red" }]}>{DesiredText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if(selectedFoodFeature === 'Full Price Food' &&
                selectedRestaurants == 'Restaurants'){
                  addCartProducts();
                }
                else{
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
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isModalVisible}
              mode="datetime"
              onConfirm={handleDateConfirm}
              onCancel={hideDateTimePicker}
            />
          </View>
        </View>
      </Modal>


      <View style={[ContainerStyles.bottomBorder]}></View>
    </View>
  );
};

export default DealCard;
