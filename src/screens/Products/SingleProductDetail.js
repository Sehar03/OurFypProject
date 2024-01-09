import React, { useContext, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  Modal,
} from 'react-native';
import { TextInput } from 'react-native-paper';
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

const SingleProductDetail = ({ navigation, route }) => {
  const { currentUser, baseUrl, selectedFoodFeature, selectedRestaurants,storeRestaurantId,storeRestaurantName } = useContext(AppContext)
  const { productImage, productName, productPrice, productDescription,productId,restaurant_id,restaurantName} = route.params;
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAddedIntoSchedule, setIsAddedIntoSchedule] = useState('');
  const [isAddedIntoCart, setIsAddedIntoCart] = useState('');
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  
  const openShareModal = () => {
    setShareModalVisible(true);
  };

  const closeShareModal = () => {
    setShareModalVisible(false);
  };

  const addCartProducts = async() => {
    try {
      const cartResponse = await axios.post(`${baseUrl}/viewAllCartsProduct/${currentUser.userId}`);
      const existingCartItems = cartResponse.data;
  
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
    formData.append("productId",productId)
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
    formData.append("productName", productName);
    formData.append("productId",productId)
    formData.append("productPrice", productPrice);
    formData.append("productPricePerPerson", productPrice / 2);
    formData.append("productDescription", productDescription);
    formData.append("productSelectedDateAndTime", selectedDate ? selectedDate.toString() : null)
    formData.append("productImage", {
      uri: productImage,
      name: "productImage.jpg",
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
           openShareModal();
        } else {

          alert("Some thing went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



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


  const showDateTimePicker = () => setModalVisible(true);
  const hideDateTimePicker = () => setModalVisible(false);
  const handleDateConfirm = date => {
    setSelectedDate(date);
    hideDateTimePicker();
  };
  const handleDateClick = () => {
    // Show date picker only when ShareFood is selected
    if (selectedFoodFeature === 'ShareFood' && selectedRestaurants === 'Restaurants') {
      setShowDatePicker(true);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <ScrollView>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <ImageBackground
          source={{ uri: productImage }}
          style={{ height: hp('40%'), width: wp('100%') }}>
          <ProductsBackButton navigation={navigation} />
          <View
            style={[ContainerStyles.foldedViewStyle]}>
          </View>

        </ImageBackground>

        <Text style={[TextStyles.ProductNameText]}>
          {productName}
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
              {productDescription}
            </Text>
          </ScrollView>
          <Text style={[TextStyles.foodPrices]}>Rs.{productPrice}</Text>
        </View>


        <View>
          <Text style={[TextStyles.leftMediumText, { fontSize: hp('2') }]}>Special instructions</Text>
          <Text style={{
            textAlign: 'justify', // You can use 'left' if you want strict left alignment
            paddingRight: 16, // Adjust the padding as per your design
            paddingLeft: 16,
          }}>Please let us know if you are allergic to anything or if we need to avoid anything</Text>
          <TextInput
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
          //  setIsAddedIntoSchedule(!isAddedIntoSchedule);
          //  setIsAddedIntoCart(!isAddedIntoCart);
           if (selectedFoodFeature === 'Full Price Food' &&
             selectedRestaurants == 'Restaurants') {
             addCartProducts();
           }
           else {
             openShareModal();
           }
          //  setIsAddedIntoSchedule(!isAddedIntoSchedule);
          //  setIsAddedIntoCart(!isAddedIntoCart);
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
                      closeModal()
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
                <Text style={[TextStyles.leftSmallText]}>
                    Product is Successfully Added
                  </Text>
                  <TouchableOpacity onPress={() => {
                  navigation.navigate('Cart');
                }}>
                  <Neomorph
                    darkShadowColor={AppColors.white}
                    lightShadowColor={AppColors.white}
                    swapShadows // <- change zIndex of each shadow color
                    style={[ContainerStyles.smallConfirmButtonNeomorph, { marginLeft: 0 }]}>
                    <Text
                      style={[TextStyles.smallButtonText]}>
                      View Cart
                    </Text>
                  </Neomorph>
                </TouchableOpacity>
               
       
              </View>
            </View>
          </Modal>

         
          <Modal
            animationType="slide"
            transparent={true}
            visible={isShareModalVisible}
            onRequestClose={closeShareModal}>
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
                      closeShareModal()
                    }}>
                    <AntDesign
                      name="close"
                      size={wp('4%')}
                      style={{ color: AppColors.primary }}
                    />
                  </TouchableOpacity>
                </Neomorph>
                
                <TouchableOpacity>
                  <Text style={[TextStyles.simpleText2, { color: "red" }]}>{DesiredText}</Text>
                </TouchableOpacity>
  {showDatePicker && (

          <TouchableOpacity
            onPress={() => {
             addShareFoodProducts();
            }}>
            <Text style={{
              color: AppColors.black,
              fontFamily: 'Poppins-Regular',
            }}>
              Add To Schedule
            </Text>
          </TouchableOpacity>
        )}
                 <DateTimePickerModal
                  isVisible={showDatePicker}
                  mode="datetime"
                  onConfirm={handleDateConfirm}
                  onCancel={() => {
                    setShowDatePicker(false);
                    hideDateTimePicker();
                 }}
                 />
              </View>
            </View>
          </Modal>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleProductDetail;
