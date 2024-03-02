import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    FlatList,
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import CloseHeader from '../../components/headers/CloseHeader';
import ImageStyles from '../../assets/Styles/ImageStyles';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Neomorph } from 'react-native-neomorph-shadows';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import AppContext from '../../Context/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const OrderCard = ({ navigation, item,currentOrderRoute }) => {
    console.log('kdfkdjfkjdf',item)
    const { baseUrl, currentUser } = useContext(AppContext);
return(
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => {
            navigation.navigate('OrderDetail', {
                orderId: item.orderId
            })
        }}>
            <Neomorph
                darkShadowColor={AppColors.primary}
                lightShadowColor={AppColors.darkgray}
                swapShadows // <- change zIndex of each shadow color
                style={[ContainerStyles.orderNeomorph]}>
                <View style={{ flexDirection: 'row', width: wp('70') }}>
                    <Image
                        source={{ uri: baseUrl + item.restaurantImage }}
                        style={[ImageStyles.orderImage]}
                    />

                    <View
                        style={{
                            marginTop: hp('2'),
                            marginLeft: wp('2.5'),
                            marginRight: wp('2'),
                        }}>
                        <Text
                            style={{
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: hp(2),
                                color: AppColors.black,
                            }}>
                            {item.restaurantName}</Text>
                        <Text style={{ marginTop: hp('0.-10'),fontFamily:"Poppins-Regular" }}>{item.status}.. {item.orderDateTime}</Text>


                        {item.products && item.products.map((product, index) => (
                            <Text key={index} style={{ marginTop: hp('0.3'),fontFamily:"Poppins-Regular"  }}>{product.productName}</Text>

                        ))}

                        <Text
                            style={{
                                marginLeft: 0,
                                fontFamily: 'Poppins-Medium',
                                marginTop: hp('0.1'),
                                fontSize: hp('2')
                            }}>
                            Total Rs. {item.totalAmount}
                        </Text>
                    </View>
                </View>

            </Neomorph>
        </TouchableOpacity>
    </View>
)
}

export default OrderCard