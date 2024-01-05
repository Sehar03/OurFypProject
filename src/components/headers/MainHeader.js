import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import TextStyles from '../../assets/Styles/TextStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import IconStyles from '../../assets/Styles/IconStyles';
import AppContext from '../../Context/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const MainHeader = ({ navigation, item }) => {
  const { currentUser, baseUrl, selectedFoodFeature,restaurant_id, selectedRestaurants } = useContext(AppContext)
  const [cartProducts, setCartProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  console.log("restaurant_id",restaurant_id)
  const updateTotalQuantity = async () => {
    try {
      const response = await axios.post(`${baseUrl}/viewAllCartsProduct/${currentUser.userId}`);
      setCartProducts(response.data);
      const newTotalQuantity = response.data.reduce((total, product) => total + product.qty, 0);
      console.log("New Total Quantity:", newTotalQuantity);
      setTotalQuantity(newTotalQuantity);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      console.log("Calling updateTotalQuantity");
      updateTotalQuantity();  // Check if this is being called
    }, [currentUser.userId]),
  );

  return (
    <View style={{ backgroundColor: AppColors.white, marginTop: hp('3') }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
      />
      <View style={[ContainerStyles.PrimaryheaderViewStyle]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={wp('6%')} style={[IconStyles.arrowLeftIcon]} />
        </TouchableOpacity>
        <View style={{ flexDirection: "column", height: hp(10), width: wp('50') }}>
          <Text style={[TextStyles.leftText, { marginTop: hp('2.5'), marginLeft: wp('5') }]}>Home</Text>
          <Text style={[TextStyles.fetchTextStyle]}>{item}</Text>
        </View>
        <View style={{ marginTop: 0, flexDirection: "row" }}>

          {selectedFoodFeature === 'Full Price Food' && (
            <TouchableOpacity onPress={() => 
              navigation.navigate('Cart',{
              restaurant_id:restaurant_id
            })}>
              <View style={{ position: 'relative', marginRight: wp('3') }}>
                <AntDesign name="shoppingcart" size={wp('6.2')} style={[IconStyles.shoppingCartIcon]} />
                {totalQuantity > 0 && (
                  <View style={{ backgroundColor: AppColors.primary, height: hp('2'), width: wp('4'), borderRadius: 100, position: 'absolute', top: hp('4.5'), right: -wp('2.5') }}>
                    <Text style={{ color: AppColors.white, fontSize: wp('3'), textAlign: 'center' }}>{totalQuantity}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default MainHeader;
