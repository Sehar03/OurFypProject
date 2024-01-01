import React, { useContext } from 'react';
import {Text,View,Image, TouchableOpacity} from 'react-native';
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
import { useFocusEffect } from '@react-navigation/native';

const SharedFoodCard = ({item,setMySchedule}) => {
 const {baseUrl} = useContext(AppContext)


  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '..';
    }
    return text;
  };
  console.log("item",item)

  return (
    <View
              style={{
                borderBottomWidth: wp('0.4'),
                borderColor: AppColors.background,
                paddingBottom: hp('3'),
                marginTop:hp('3')
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri:baseUrl+item.productImage}}
                  style={[ImageStyles.scheduleImage]}
                />
                <View
                  style={{
                    marginTop: hp('2'),
                    marginLeft: wp('2.5'),
                  }}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{width:wp('47')}}>
                    <Text style={[OtherStyles.text]}>{item.productName}</Text>
                    </View>
                    {/* <TouchableOpacity onPress={() => {
                    deleteShareFoodProduct(item._id)
                  }} style={{ marginLeft: wp('1'), marginLeft: hp('0') }}>
                    <FontAwesome name="trash" size={20} color={AppColors.primary} />
                  </TouchableOpacity> */}
                  </View>
                  <View style={{width: wp('45')}}>
                    <Text
                      style={[
                        TextStyles.mediumTextStyle,
                        {marginLeft: wp('0'), fontSize: hp('1.8')},
                      ]}>
                      {truncateText(item.productDescription, 30)}..
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: AppColors.black,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Total Price: {item.productPrice}
                  </Text>

                  <Text
                    style={{
                      color: AppColors.black,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Price Per Person: {item.productPricePerPerson}
                  </Text>
                </View>
              </View>

              <Text style={[TextStyles.simpleText2, {marginLeft: wp('10'),marginRight:wp('5')}]}>
                Date And Time: {item.productSelectedDateAndTime.toString()}
              </Text>
              <TouchableOpacity>
          <Text style={[TextStyles.text3,{marginLeft:wp('35'),color:"green"}]}>Confirm Order</Text>
        </TouchableOpacity>
            </View>
  )
}

export default SharedFoodCard;