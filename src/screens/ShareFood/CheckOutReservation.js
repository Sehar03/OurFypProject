import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import { Neomorph } from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppContext from '../../Context/AppContext';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BackButtonHeader from '../../components/headers/BackButtonHeader';

import IconStyles from '../../assets/Styles/IconStyles';


const CheckOutReservation = ({ navigation, route }) => {
  const { currentUser, baseUrl, restaurantFcmToken, restaurantAddress } = useContext(AppContext);
  const { productId } = route.params;
  const [sharedFood, setShareFood] = useState([]);
  const [isEditingMobileNumber, setIsEditingMobileNumber] = useState(false);
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(currentUser.phoneNumber);
  const [userName, setUserName] = useState(currentUser.name);
  const [deliveryAddress, setDeliveryAddress] = useState(restaurantAddress);






  const viewSingleSharedFoodProduct = async () => {
    try {
      const response = await axios.post(

        `${baseUrl}/viewSingleSharedFoodProduct/${productId}`,
      );
      setShareFood(response.data);
      // console.log('response', response.data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    viewSingleSharedFoodProduct();
  }, []);




  const updateSingleSharedFood = async (sharedFood_id) => {

    const formData = new FormData();
    formData.append("requestReceiver_id", currentUser.userId);
    formData.append("requestReceiverName", currentUser.name);
    formData.append("requestReceiverPhoneNumber", currentUser.phoneNumber);
    formData.append("status","Confirmed")
    axios({
      method: 'post',
      url: `${baseUrl}/updateSingleSharedFood/${sharedFood_id}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    console.log(formData)
      .then(function (response) {
        if (response.data.message == true) {

          console.log(response.data)

        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    // console.warn("Stop");

  }










  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };


  return (
    <SafeAreaView style={{ backgroundColor: AppColors.white, flex: 1 }}>
      <BackButtonHeader navigation={navigation} title="CheckOut" />
      {sharedFood.map((item) => (
        <>
          <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Neomorph
                darkShadowColor={AppColors.primary}
                lightShadowColor={AppColors.background}
                swapShadows
                style={{
                  height: hp('11'),
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


                <View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity>
                      <Ionicons
                        name="restaurant-outline"
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
                      Restaurant Name
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
                    <View style={{ width: wp('90'), height: hp('2.5') }}>
                      <Text style={{
                        marginLeft: wp('3.5'),
                      }}>
                        {truncateText("Baba Freed Barger Point", 45)}
                      </Text>

                    </View>


                  </View>

                </View>

              </Neomorph>
            </View>
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
                      Restaurant Address
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        // Use Linking to open the device's map application with the specified location (delivery address)
                        const addressForMap = encodeURIComponent(deliveryAddress);
                        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${addressForMap}`);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="navigation-variant-outline"
                        size={23}
                        style={{ marginTop: hp('2'), color: AppColors.primary, marginLeft: wp('39') }}
                      />
                    </TouchableOpacity>
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
                    <View style={{ width: wp('90'), height: hp('6.5') }}>
                      <Text style={{
                        marginLeft: wp('3.5'),
                      }}>
                        {deliveryAddress && deliveryAddress.length > 0 ? deliveryAddress[0].formattedAddress : ''}
                      </Text>

                    </View>


                  </View>

                </View>

              </Neomorph>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Neomorph
                darkShadowColor={AppColors.primary}
                lightShadowColor={AppColors.background}
                swapShadows
                style={{
                  height: hp('11'),
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
                {isEditingUserName ? (
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
                        Your Name
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
                          marginLeft: wp(3.2),
                          marginBottom: 10,
                          padding: 8,
                          fontSize: 16,
                        }}
                        autoFocus  // Auto focus the TextInput when editing starts
                        selectionColor={AppColors.primary}
                        value={userName}
                        onChangeText={text => setUserName(text)}
                      />
                      <TouchableOpacity onPress={() => setIsEditingUserName(!isEditingUserName)}>
                        <MaterialIcons
                          name={isEditingUserName ? 'done' : 'edit'}
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
                        <Octicons
                          name="person"
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
                        Your Name
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
                      }}>{userName}</Text>
                      <TouchableOpacity onPress={() => setIsEditingUserName(!isEditingUserName)}>
                        <MaterialIcons
                          name={isEditingUserName ? 'done' : 'edit'}
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
                swapShadows
                style={{
                  height: hp('11'),
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
                          marginLeft: wp(3.2),
                          marginBottom: 10,
                          padding: 8,
                          fontSize: 16,
                        }}
                        autoFocus  // Auto focus the TextInput when editing starts
                        selectionColor={AppColors.primary}
                        value={item.requestSenderPhoneNumber}
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


              <View style={{
                width: wp(95),
                marginBottom: hp('1.5'),
                borderWidth: 2,
                borderColor: AppColors.background2,
                borderRadius: 5,
                marginTop: hp('1.4%'),
              }}>
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
                  data={sharedFood}
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
                        {truncateText(`${item.productName}`, 30)}
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
                    borderTopWidth: hp('0.2'),
                    borderColor: AppColors.background2,
                  }}>
                  <View style={{ flexDirection: "row", marginLeft: wp('2'), marginTop: hp('2') }}>
                    <FontAwesome name="calendar" size={20} style={[IconStyles.signupIcons, { marginTop: 0 }]} />
                    <Text
                      style={{
                        color: AppColors.black,
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Date:  {item.productSelectedDate}
                    </Text>
                    <View style={{ flexDirection: "row", marginLeft: wp('3') }}>
                      <Ionicons name="time-outline" size={20} style={[IconStyles.signupIcons, { marginTop: hp('0') }]} />
                      <Text
                        style={{
                          color: AppColors.black,
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Time:  {item.productSelectedTime}
                      </Text>
                    </View>
                  </View>
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
              </View>

            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1.2') }}>
              <Neomorph
                darkShadowColor={AppColors.primary}
                lightShadowColor={AppColors.background}
                swapShadows // <- change zIndex of each shadow color
                style={{
                  height: hp('6'),
                  width: wp('94'),
                  borderRadius: wp('1.3%'),
                  shadowRadius: 2,
                  backgroundColor: AppColors.white,
                  marginVertical: hp('1%'),
                  shadowOpacity: 0.2,
                  marginTop: hp('0%'),
                  flex: 1,
                }}>

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('90%'),
                    marginTop: hp('1.5'),
                    justifyContent: 'space-between'
                  }}>
                  <Ionicons
                    name="pricetag-outline"
                    size={20}
                    color={AppColors.primary}
                    style={{ marginLeft: wp('4') }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: AppColors.black,
                      marginRight: wp('26'),
                      fontSize: hp('2'),
                    }}>
                    Price Per Person
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: AppColors.black,
                      fontSize: hp('2'),
                    }}>
                    Rs. {item.productPricePerPerson}
                  </Text>
                </View>
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
                    {item.productPricePerPerson}
                  </Text>
                </View>
              </Neomorph>
            </View>

            <View style={{ height: hp('1') }}>

            </View>

          </ScrollView>



          <TouchableOpacity
            onPress={() => {
              if (sharedFood.length > 0) {
                const sharedFood_id = sharedFood[0]._id; // Assuming you want the ID from the first item

                updateSingleSharedFood(sharedFood_id);
              }
            }}
          >

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
                  fontSize: hp('2.1'),
                }}>
                Confirm Reservation
              </Text>
            </Neomorph>
          </TouchableOpacity>
        </>
      ))}
    </SafeAreaView>
  );
};

export default CheckOutReservation;
