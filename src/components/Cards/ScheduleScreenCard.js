import React, { useContext } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
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
import { useFocusEffect } from '@react-navigation/native';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import { Neomorph } from 'react-native-neomorph-shadows';
import IconStyles from '../../assets/Styles/IconStyles';

const ScheduleScreenCard = ({ item, setMySchedule }) => {
  const { baseUrl, currentUser } = useContext(AppContext)

  const viewAllShareFoodProducts = async () => {
    try {
      const response = await axios.post(

        `${baseUrl}/viewAllShareFoodProducts/${currentUser.userId}`,
      );
      setMySchedule(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      viewAllShareFoodProducts();
    }, [currentUser.userId]),
  );

  const deleteShareFoodProduct = async delId => {
    try {
      const response = await axios.delete(`${baseUrl}/deleteShareFoodProduct/${delId}`);
      console.log('Delete Product Response:', response.data);

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
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };


  return (
    <View style={[{alignSelf:"center", marginTop: hp('1'),marginBottom:hp('1') }]}>
      <Neomorph
        darkShadowColor={AppColors.primary}
        lightShadowColor={AppColors.background}
        swapShadows // <- change zIndex of each shadow color
        style={[
          ContainerStyles.ScheduleCardNeomorph,
          { overflow: 'hidden' },
        ]}>
        <View style={{ flexDirection: 'row',justifyContent: "space-between" }}>
          <Image
            source={{ uri: baseUrl + item.productImage }}
            style={[ImageStyles.scheduleImage]}
          />
          <View
            style={{
              marginTop: hp('1.5'),
              marginRight: wp('4'),
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: wp('45')}}>
                <Text style={[OtherStyles.text]}>{truncateText(item.productName, 25)}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                deleteShareFoodProduct(item._id)
              }} style={{ marginLeft : wp('9')}}>
                <FontAwesome name="trash" size={20} color={AppColors.primary} />
              </TouchableOpacity>
            </View>
            <View style={{ width: wp('45') }}>
              <Text
                style={[
                  TextStyles.mediumTextStyle,
                  { marginLeft: wp('0'), fontSize: hp('1.6') },
                ]}>
                {truncateText(item.productDescription, 30)}
              </Text>
            </View>
            <View style={{flexDirection:"row"}}>
            <Text
              style={{
                // color: AppColors.black,
                fontFamily: 'Poppins-Regular',
                fontSize:hp('1.5')
              }}>
              Total Price: 
            </Text>
            <Text style={{fontFamily:'Poppins-SemiBold',fontSize:hp('1.5')}}>   Rs.{item.productPrice}</Text>
            </View>
                        
            <Text
              style={{
                color: AppColors.black,
                fontFamily: 'Poppins-SemiBold',
                marginLeft:wp('0')
              }}>
              Price Per Person: {item.productPricePerPerson}
            </Text>
            </View>
            </View>
            
            <View style={{flexDirection:"row",marginLeft:wp('2'),marginTop:hp('2')}}>
            <FontAwesome name="calendar" size={20} style={[IconStyles.signupIcons,{marginTop:0}]} />
             <Text
              style={{
                color: AppColors.black,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Date:  {item.productSelectedDate}
            </Text>
            <View style={{flexDirection:"row",marginLeft:wp('3')}}>
            <Ionicons name="time-outline" size={20} style={[IconStyles.signupIcons,{marginTop:hp('0')}]} />
             <Text
              style={{
                color: AppColors.black,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Time:  {item.productSelectedTime}
            </Text>
            </View>
            </View>

        {/* <Text style={[TextStyles.simpleText2, { marginLeft: wp('2'), marginRight: wp('0') }]}>
          Date And Time: {item.productSelectedDateAndTime}
        </Text> */}
        {/* <TouchableOpacity>
          <Text style={[TextStyles.text3,{marginLeft:wp('35'),color:"blue"}]}>Confirm Order</Text>
        </TouchableOpacity> */}
    </Neomorph>
    
    </View>
    
   
  )
}

export default ScheduleScreenCard;