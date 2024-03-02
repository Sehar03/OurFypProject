import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextStyles from '../../assets/Styles/TextStyles';
import AppColors from '../../assets/colors/AppColors';
import ImageStyles from '../../assets/Styles/ImageStyles';
import OtherStyles from '../../assets/Styles/OtherStyles';
import AppContext from '../../Context/AppContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useFocusEffect} from '@react-navigation/native';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import {Neomorph} from 'react-native-neomorph-shadows';
import IconStyles from '../../assets/Styles/IconStyles';
import moment from 'moment';

const SharedFoodCard = ({item, navigation, currentOrderRoute}) => {
  const {baseUrl} = useContext(AppContext);
  const [statusUpdated, setStatusUpdated] = useState(false);

  const updateReservationStatus = async (reservationId, status) => {
    try {
      const response = await axios.post(
        `${baseUrl}/updateReservationStatus/${reservationId}/${status}`,
      );
      console.log('Reservation status updated:', response.data);
    } catch (error) {
      console.error(
        'Error updating updateReservationStatus Reservation status:',
        error,
      );
    }
  };
  useEffect(() => {
    const currentDate = moment();
    const selectedDate = moment(item.productSelectedDate, 'MMM DD, YYYY');
    const selectedTime = moment(
      `${item.productSelectedDate} ${item.productSelectedTime}`,
      'MMM DD, YYYY h:mm A',
    );

    console.log('Current Date:', currentDate);
    console.log('Selected Date:', selectedDate);
    console.log('Selected Time:', selectedTime);

    // Check if the current date is after or same as the selected date and time
    if (
      currentDate.isSameOrAfter(selectedDate) &&
      currentDate.isSameOrAfter(selectedTime)
    ) {
      console.log('Updating status to Completed');
      updateReservationStatus(item.reservationId, 'Completed');
      setStatusUpdated(true);
    }
  }, [item.productSelectedDate, item.productSelectedTime]);

  const deleteShareFoodProduct = async delId => {
    try {
      const response = await axios.delete(
        `${baseUrl}/deleteShareFoodProduct/${delId}`,
      );
      if (response.data.success) {
        viewAllShareFoodProducts();
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '..';
    }
    return text;
  };

  return (
    <View
      style={[
        {alignSelf: 'center', marginTop: hp('1'), marginBottom: hp('1')},
      ]}>
      <Neomorph
        darkShadowColor={AppColors.primary}
        lightShadowColor={AppColors.background}
        swapShadows // <- change zIndex of each shadow color
        style={[ContainerStyles.ScheduleCardNeomorph, {overflow: 'hidden'}]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image
            source={{uri: baseUrl + item.productImage}}
            style={[ImageStyles.scheduleImage]}
          />
          <View
            style={{
              marginTop: hp('1.5'),
              marginRight: wp('2'),
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: wp('45')}}>
                <Text style={[OtherStyles.text]}>
                  {truncateText(item.productName, 25)}
                </Text>
              </View>
              {currentOrderRoute === 'MyFood' ? (
                <TouchableOpacity
                  onPress={() => {
                    deleteShareFoodProduct(item._id);
                  }}
                  style={{marginLeft: wp('9')}}>
                  <FontAwesome
                    name="trash"
                    size={20}
                    color={AppColors.primary}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SingleSharedFoodDetail', {
                      productId: item._id,
                      currentOrderRoute: currentOrderRoute,
                    });
                  }}
                  style={{marginLeft: wp('5')}}>
                  <Image
                    source={require('../../assets/Images/detailIcon.png')}
                    style={{height: hp('3.5'), width: wp('7')}}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{width: wp('45')}}>
              <Text
                style={[
                  TextStyles.mediumTextStyle,
                  {marginLeft: wp('0'), fontSize: hp('1.6')},
                ]}>
                {truncateText(item.productDescription, 30)}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  // color: AppColors.black,
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('1.5'),
                }}>
                Total Price:
              </Text>
              <Text
                style={{fontFamily: 'Poppins-SemiBold', fontSize: hp('1.5')}}>
                {' '}
                Rs.{item.productPrice}
              </Text>
            </View>

            <Text
              style={{
                color: AppColors.black,
                fontFamily: 'Poppins-SemiBold',
                marginLeft: wp('0'),
              }}>
              Price Per Person: {item.productPricePerPerson}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: hp('2'), flex: 1}}>
          <FontAwesome
            name="calendar"
            size={20}
            style={[IconStyles.signupIcons, {marginTop: 0}]}
          />
          <Text
            style={{
              color: AppColors.black,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Date: {item.productSelectedDate}
          </Text>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Ionicons
              name="time-outline"
              size={20}
              style={[IconStyles.signupIcons, {marginTop: hp('0')}]}
            />
            <Text
              style={{
                color: AppColors.black,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Time: {item.productSelectedTime}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: hp('8%'),
            width: wp('100'),
            justifyContent: 'center',
            // borderTopEndRadius: wp('3%'),
            // borderTopStartRadius: wp('3'),
            borderTopWidth: hp('0.2'),
            borderColor: AppColors.background2,
            flex: 1,
          }}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text
              style={{
                color: 'green',
                fontSize: wp('4'),
                fontFamily: 'Poppins-SemiBold',
              }}>
              Share Food Status :{' '}
            </Text>
            <Text
              style={{
                color:
                  item.status === 'Order Delivered' ? 'green' : 'firebrick',
                marginLeft: wp('1.5'),
                fontSize: wp('4'),
                fontFamily: 'Poppins-SemiBold',
              }}>
              {item.status}
            </Text>

            {currentOrderRoute == 'Confirmed' ? (
  <TouchableOpacity
    onPress={() => {
      navigation.navigate('ChatWithPartner', {
        reservationId: item.reservationId,
      });
    }}
  >
    <MaterialIcons
      name="chat"
      size={20}
      style={{marginTop: hp('0.5'),marginLeft:wp('15'), color: AppColors.goldenYellow }}
    />
  </TouchableOpacity>
) : null}

          </View>
        </View>
      </Neomorph>
    </View>
  );
};

export default SharedFoodCard;
