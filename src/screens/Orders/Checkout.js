import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import TabScreensHeader from '../../components/headers/TabScreensHeader';
import { Neomorph } from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../Context/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BackButtonHeader from '../../components/headers/BackButtonHeader';


const Checkout = ({ navigation, route }) => {
  const { currentUser, baseUrl } = useContext(AppContext);
  const [isEditingMobileNumber, setIsEditingMobileNumber] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(currentUser.phoneNumber);
  const [isEditingDeliveryAddress, setIsEditingDeliveryAddress] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser.addresses);
  const [cartProducts, setCartProducts] = useState([]);
  const [orderSummaryHeight, setOrderSummaryHeight] = useState(0);
  const { subtotal, deliveryFee, total, restaurant_id } = route.params;


  const addOrder = () => {
    const formData = new FormData();
    formData.append("customer_id", currentUser.userId);
    formData.append("customerName", currentUser.name);
    formData.append("customerPhoneNumber", mobileNumber);
    formData.append("customerEmail", currentUser.email);
    if (deliveryAddress && deliveryAddress.length > 0) {
      const firstAddress = deliveryAddress[0];
      formData.append("deliveryAddress", firstAddress.formattedAddress);
    }
    const productsArray = cartProducts.map((product) => ({
      productName: product.productName,
      qty: product.qty,
      productPrice: product.productPrice,
    }));
    formData.append("products", JSON.stringify(productsArray));

    formData.append("deliveryFee", deliveryFee);
    formData.append("totalAmount", total);
    formData.append("restaurant_id", restaurant_id);


    ;

    console.log(formData);
    axios({
      method: "post",
      url: `${baseUrl}/addOrder`,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then((response) => {
        if (response.data.added) {
          alert("Order is placed");
        } else {

          alert("Some thing went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };






  const viewAllCartProducts = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewAllCartsProduct/${currentUser.userId}`);
      setCartProducts(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      viewAllCartProducts();
    }, [currentUser.userId]),
  );

  const calculateOrderSummaryHeight = () => {
    // Calculate the height based on the number of products and other components
    const productsHeight = cartProducts.length * hp('3.5'); // Adjust the value based on your UI
    const otherComponentsHeight = hp('25'); // Adjust the value based on your UI

    // Calculate the total height required for the Neomorph
    const totalHeight = productsHeight + otherComponentsHeight;

    setOrderSummaryHeight(totalHeight);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const handleDeliveryAddressChange = (text) => {
    // Update the deliveryAddress state when it's being edited
    setDeliveryAddress([{ formattedAddress: text }]);
  };

  return (
    <SafeAreaView style={{ backgroundColor: AppColors.white, flex: 1 }}>
      <BackButtonHeader navigation={navigation} title="CheckOut" />
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows
            style={{
              height: hp('16'),
              width: wp('94'),
              borderRadius: wp('1.3%'),
              shadowRadius: 2,
              backgroundColor: AppColors.white,
              marginVertical: hp('1%'),
              shadowOpacity: 0.2,
              marginTop: hp('1.4%'),
              paddingBottom: hp('3'),
              flex: 1,
            }}>
            {isEditingDeliveryAddress ? (
              <View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity>
                    <Octicons
                      name="location"
                      size={wp('4.5')}
                      style={{ marginTop: hp('2.2'), color: AppColors.primary, marginLeft: wp('3.5') }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: wp('3.5'),
                      marginTop: hp('2'),
                      color: AppColors.black,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Delivery Address
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: hp('0.5'),
                    width: wp('94'),
                    borderBottomWidth: hp('0.2'),
                    borderColor: AppColors.background2,
                  }}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ width: wp('85'), height: hp('20') }}>
                    <TextInput
                       style={{
                        height: 40,
                        marginLeft:wp(3.2),
                        marginBottom: 10,
                        padding: 8,
                        fontSize: 16,
                      }}
                      autoFocus  // Auto focus the TextInput when editing starts
                    selectionColor={AppColors.primary}
                      value={deliveryAddress && deliveryAddress.length > 0 ? deliveryAddress[0].formattedAddress : ''}
                      onChangeText={(text) => handleDeliveryAddressChange(text)}
                    />
                  </View>
                  <TouchableOpacity onPress={() => setIsEditingDeliveryAddress(!isEditingDeliveryAddress)}>
                    {/* Add a button to confirm the changes */}
                    <MaterialIcons
                      name={isEditingDeliveryAddress ? 'done' : 'edit'}
                      size={20} color={AppColors.primary}
                      style={{ marginRight: wp('2'), marginTop: hp('1.4') }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity>
                    <Octicons
                      name="location"
                      size={wp('4.5')}
                      style={{ marginTop: hp('2.2'), color: AppColors.primary, marginLeft: wp('3.5') }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: wp('3.5'),
                      marginTop: hp('2'),
                      color: AppColors.black,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Delivery Address
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: hp('0.5'),
                    width: wp('94'),
                    borderBottomWidth: hp('0.2'),
                    marginBottom: hp('1'),
                    borderColor: AppColors.background2,
                  }}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ width: wp('85') }}>
                    <Text style={{
                      marginLeft: wp('3.5'),
                    }}>
                      {deliveryAddress && deliveryAddress.length > 0 ? deliveryAddress[0].formattedAddress : ''}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setIsEditingDeliveryAddress(!isEditingDeliveryAddress)}>
                    <MaterialIcons
                      name={isEditingDeliveryAddress ? 'done' : 'edit'}
                      size={20} color={AppColors.primary}
                      style={{ marginRight: wp('2') }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Neomorph>
        </View>


        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows
            style={{
              height: hp('13'),
              width: wp('94'),
              borderRadius: wp('1.3%'),
              shadowRadius: 2,
              backgroundColor: AppColors.white,
              marginVertical: hp('1%'),
              shadowOpacity: 0.2,
              marginTop: hp('1.4%'),
              paddingBottom: hp('3'),
              flex: 1,
            }}>
            {isEditingMobileNumber ? (
              <View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity>
                    <FontAwesome
                      name="phone"
                      size={wp('4.5')}
                      style={{ marginTop: hp('2.3'), color: AppColors.primary, marginLeft: wp('3.5') }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: wp('3.5'),
                      marginTop: hp('2'),
                      color: AppColors.black,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Mobile number
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: hp('0.5'),
                    width: wp('94'),
                    borderBottomWidth: hp('0.2'),
                    borderColor: AppColors.background2,
                  }}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                  <TextInput
                    style={{
                      height: 40,
                      marginLeft:wp(3.2),
                      marginBottom: 10,
                      padding: 8,
                      fontSize: 16,
                    }}
                    autoFocus  // Auto focus the TextInput when editing starts
                    selectionColor={AppColors.primary}
                    value={mobileNumber}
                    onChangeText={text => setMobileNumber(text)}
                  />
                  <TouchableOpacity onPress={() => setIsEditingMobileNumber(!isEditingMobileNumber)}>
                    <MaterialIcons
                      name={isEditingMobileNumber ? 'done' : 'edit'}
                      size={20}
                      color={AppColors.primary}
                      style={{ marginRight: wp('2'), marginTop: hp('1.4') }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity>
                    <FontAwesome
                      name="phone"
                      size={wp('4.5')}
                      style={{ marginTop: hp('2.2'), color: AppColors.primary, marginLeft: wp('3.5') }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: wp('3.5'),
                      marginTop: hp('2'),
                      color: AppColors.black,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Mobile number
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: hp('0.5'),
                    width: wp('94'),
                    borderBottomWidth: hp('0.2'),
                    marginBottom: hp('1'),
                    borderColor: AppColors.background2,
                  }}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{
                    marginLeft: wp('3.5'),
                  }}>{mobileNumber}</Text>
                  <TouchableOpacity onPress={() => setIsEditingMobileNumber(!isEditingMobileNumber)}>
                    <MaterialIcons
                      name={isEditingMobileNumber ? 'done' : 'edit'}
                      size={20}
                      color={AppColors.primary}
                      style={{ marginRight: wp('2'), marginTop: hp('0') }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Add a button to toggle between editing and displaying mode */}

          </Neomorph>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows // <- change zIndex of each shadow color
            style={{
              height: hp('13'),
              width: wp('94'),
              borderRadius: wp('1.3%'),
              shadowRadius: 2,
              backgroundColor: AppColors.white,
              marginVertical: hp('1%'),
              shadowOpacity: 0.2,
              marginTop: hp('1.4%'),
              paddingBottom: hp('3'),
              flex: 1,
            }}>
            <View style={{ flexDirection: 'row', width: wp('100%') }}>
              <MaterialIcons
                name="payment"
                size={24}
                color={AppColors.primary}
                style={{ marginLeft: wp('4'), marginTop: hp('3') }}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: AppColors.black,
                  marginTop: hp('3'),
                  marginLeft: wp('4'),
                  fontSize: hp('2.2'),
                }}>
                Payment Method
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                marginTop: hp('1.5'),
                justifyContent: 'space-between'
              }}>
              <MaterialCommunityIcons
                name="cash"
                size={24}
                color={AppColors.Gray}
                style={{ marginLeft: wp('4') }}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: AppColors.black,
                  marginRight: wp('53'),
                  fontSize: hp('2'),
                }}>
                Cash
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: AppColors.black,
                  fontSize: hp('2'),
                }}>
                {total}
              </Text>
            </View>
          </Neomorph>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>


          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.darkgray}
            swapShadows // <- change zIndex of each shadow color
            style={{
              height: orderSummaryHeight,
              width: wp('94'),
              borderRadius: wp('1.3%'),
              shadowRadius: 2,
              backgroundColor: AppColors.white,
              marginVertical: hp('1%'),
              shadowOpacity: 0.3,
              marginTop: hp('1.4%'),
              paddingBottom: hp('3'),
              flex: 1,
            }}
            onLayout={() => calculateOrderSummaryHeight()}
          >
            <View style={{ flexDirection: 'row', width: wp('100%') }}>
              <Entypo
                name="text-document"
                size={24}
                color={AppColors.primary}
                style={{ marginLeft: wp('4'), marginTop: hp('3') }}
              />

              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: AppColors.black,
                  marginTop: hp('3'),
                  marginLeft: wp('4'),
                  fontSize: hp('2.2'),
                }}>
                Order Summary
              </Text>
            </View>
            <FlatList
              data={cartProducts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp('1.5'),
                    justifyContent: 'space-between',
                    marginLeft: wp('4.8'),
                    marginRight: wp('3'),
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: AppColors.black,
                      fontSize: hp('1.8'),
                    }}>
                    {truncateText(`${item.qty} x ${item.productName}`, 30)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: AppColors.black,
                      fontSize: hp('1.7'),
                    }}>
                    Rs. {item.productPrice}
                  </Text>
                </View>
              )}
            />

            <View
              style={{
                marginTop: hp('2'),
                width: wp('94'),
                borderBottomWidth: hp('0.2'),
                borderColor: AppColors.background2,
              }}>

            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('1.5'),
                justifyContent: 'space-between',
                marginLeft: wp('4'),
                marginRight: wp('3'),
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.8'),
                }}>
                Subtotal
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.8'),
                }}>
                {subtotal}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('1.5'),
                justifyContent: 'space-between',
                marginLeft: wp('4'),
                marginRight: wp('3'),
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.8'),
                }}>
                Deleivery Fee
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.8'),
                }}>
                {deliveryFee}
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                marginTop: hp('1.5'),
                justifyContent: 'space-between',
                marginLeft: wp('4'),
                marginRight: wp('3'),
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.8'),
                }}>
                Plateform Fee
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.8'),
                }}>
                Rs. 10
              </Text>
            </View> */}
          </Neomorph>

        </View>
        <View style={{ height: hp('4') }}>

        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          marginTop: hp('1'),
          justifyContent: 'space-between',
          marginLeft: wp('5'),
          marginRight: wp('4'),
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: AppColors.black,

            fontSize: hp('2.5'),
          }}>
          Total
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: AppColors.black,
            fontSize: hp('2.2'),
          }}>
          {total}
        </Text>
      </View>

      <TouchableOpacity onPress={() => {
        addOrder()
      }}>
        <Neomorph
          // darkShadowColor={AppColors.primary}
          lightShadowColor={AppColors.background}
          // inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={{
            shadowRadius: 2,
            backgroundColor: AppColors.primary,
            borderRadius: wp('1.3'),
            height: hp('6.2%'),
            width: wp('94%'),
            marginVertical: hp('1.4%'),
            shadowOpacity: 0.2,
            marginLeft: wp('3'),
            marginRight: wp('4'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: AppColors.white,
              fontFamily: 'Poppins-SemiBold',
              fontSize: hp('2.5'),
            }}>
            Place Order
          </Text>
        </Neomorph>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Checkout;
