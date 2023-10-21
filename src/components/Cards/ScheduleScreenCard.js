import React from 'react';
import {Text,View,Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextStyles from '../../assets/Styles/TextStyles';
import AppColors from '../../assets/colors/AppColors';
import ImageStyles from '../../assets/Styles/ImageStyles';
import OtherStyles from '../../assets/Styles/OtherStyles';

const ScheduleScreenCard = ({item}) => {
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
                  source={item.imageUri}
                  style={[ImageStyles.scheduleImage]}
                />
                <View
                  style={{
                    marginTop: hp('2'),
                    marginLeft: wp('2.5'),
                  }}>
                  <View style={{width: wp('47')}}>
                    <Text style={[OtherStyles.text]}>{item.imageTitle}</Text>
                  </View>
                  <View style={{width: wp('45')}}>
                    <Text
                      style={[
                        TextStyles.mediumTextStyle,
                        {marginLeft: wp('0'), fontSize: hp('1.8')},
                      ]}>
                      {item.imageDescription}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: AppColors.black,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Total Price: {item.imagePrice}
                  </Text>

                  <Text
                    style={{
                      color: AppColors.black,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Price Per Person: {item.pricePerPerson}
                  </Text>
                </View>
              </View>

              <Text style={[TextStyles.simpleText2, {marginLeft: wp('10'),marginRight:wp('5')}]}>
                Date And Time: {item.selectedDate.toString()}
              </Text>
              {/* <TouchableOpacity>
          <Text style={[TextStyles.text3,{marginLeft:wp('35'),color:"blue"}]}>Confirm Order</Text>
        </TouchableOpacity> */}
            </View>
  )
}

export default ScheduleScreenCard